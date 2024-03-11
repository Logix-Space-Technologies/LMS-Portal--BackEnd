const Material = require("../models/material.model");
const jwt = require("jsonwebtoken");
const path = require("path")
const multer = require("multer")
const Validator = require("../config/data.validate");
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');
const fs = require('fs');
require('dotenv').config({ path: '../../.env' });

// AWS S3 Client Configuration
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

// Multer Configuration for file upload with unique filename
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // Unique filename: Current timestamp + random number + original extension
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});
const upload = multer({ storage: storage });

exports.createMaterial = (request, response) => {

    const uploadFile = upload.single('uploadFile')

    uploadFile(request, response, async (error) => {

        if (error) {
            return response.status(500).json({ "status": error.message });
        }

        if (request.file) {
            // File handling
            const file = request.file;
            const fileStream = fs.createReadStream(file.path);

            const uploadParams = {
                Bucket: process.env.S3_BUCKET,
                Key: `uploads/${file.filename}`,
                Body: fileStream
            };
            try {
                const data = await s3Client.send(new PutObjectCommand(uploadParams));
                const fileUrl = `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`;

                // Remove the file from local storage
                fs.unlinkSync(file.path);

                const { batchId, fileName, materialDesc, remarks, materialType } = request.body
                const materialToken = request.headers.token

                jwt.verify(materialToken, "lmsappadmstaff", (err, decoded) => {
                    if (decoded) {
                        const validationErrors = {};

                        if (!Validator.isValidAmount(batchId).isValid) {
                            validationErrors.batchId = Validator.isValidAmount(batchId).message;
                        }
                        if (Validator.isEmpty(batchId).isValid) {
                            validationErrors.batchId = Validator.isEmpty(batchId).message;
                        }
                        if (Validator.isEmpty(fileName).isValid) {
                            validationErrors.fileName = Validator.isEmpty(fileName).message;
                        }
                        if (Validator.isEmpty(materialDesc).isValid) {
                            validationErrors.materialDesc = Validator.isEmpty(materialDesc).message;
                        }
                        if (Validator.isEmpty(remarks).isValid) {
                            validationErrors.remarks = Validator.isEmpty(remarks).message;
                        }
                        if (Validator.isEmpty(materialType).isValid) {
                            validationErrors.materialType = Validator.isEmpty(materialType).message;
                        }
                        if (!Validator.isValidAddress(materialDesc).isValid) {
                            validationErrors.materialDesc = Validator.isValidAddress(materialDesc).message;
                        }

                        if (!request.file) {
                            validationErrors.file = 'Please upload a file'
                        }

                        // If validation fails
                        if (Object.keys(validationErrors).length > 0) {
                            return response.json({ "status": "Validation failed", "data": validationErrors });
                        }

                        const addMaterial = new Material({
                            batchId: batchId,
                            fileName: fileName,
                            materialDesc: materialDesc,
                            remarks: remarks,
                            materialType: materialType,
                            uploadFile: fileUrl
                        })

                        Material.materialCreate(addMaterial, (err, data) => {
                            if (err) {
                                return response.json({ "status": err });
                            } else {
                                return response.json({ "status": "success", "data": data });
                            }
                        })

                    } else {
                        return response.json({ "status": "Unauthorized User!!" });
                    }
                })
            } catch (err) {
                fs.unlinkSync(file.path);
                response.status(500).json({ "status": err.message });
            }
        } else {
            const { batchId, fileName, materialDesc, remarks, materialType, uploadFile } = request.body
            const materialToken = request.headers.token

            jwt.verify(materialToken, "lmsappadmstaff", (err, decoded) => {
                if (decoded) {
                    const validationErrors = {};

                    if (!Validator.isValidAmount(batchId).isValid) {
                        validationErrors.batchId = Validator.isValidAmount(batchId).message;
                    }
                    if (Validator.isEmpty(batchId).isValid) {
                        validationErrors.batchId = Validator.isEmpty(batchId).message;
                    }
                    if (Validator.isEmpty(fileName).isValid) {
                        validationErrors.fileName = Validator.isEmpty(fileName).message;
                    }
                    if (Validator.isEmpty(materialDesc).isValid) {
                        validationErrors.materialDesc = Validator.isEmpty(materialDesc).message;
                    }
                    if (Validator.isEmpty(remarks).isValid) {
                        validationErrors.remarks = Validator.isEmpty(remarks).message;
                    }
                    if (Validator.isEmpty(materialType).isValid) {
                        validationErrors.materialType = Validator.isEmpty(materialType).message;
                    }
                    if (!Validator.isValidAddress(materialDesc).isValid) {
                        validationErrors.materialDesc = Validator.isValidAddress(materialDesc).message;
                    }

                    if (!Validator.isValidWebsite(uploadFile).isValid) {
                        validationErrors.website = Validator.isValidWebsite(uploadFile).message;
                    }

                    // If validation fails
                    if (Object.keys(validationErrors).length > 0) {
                        return response.json({ "status": "Validation failed", "data": validationErrors });
                    }

                    const addMaterial = new Material({
                        batchId: batchId,
                        fileName: fileName,
                        materialDesc: materialDesc,
                        remarks: remarks,
                        materialType: materialType,
                        uploadFile: uploadFile
                    })

                    Material.materialCreate(addMaterial, (err, data) => {
                        if (err) {
                            return response.json({ "status": err });
                        } else {
                            return response.json({ "status": "success", "data": data });
                        }
                    })

                } else {
                    return response.json({ "status": "Unauthorized User!!" });
                }
            })
        }
    })

}


exports.searchMaterial = async (request, response) => {
    const materialQuery = request.body.materialQuery;
    const materialSearchToken = request.headers.token;

    try {
        const decoded = await jwt.verify(materialSearchToken, "lmsappadmstaff");

        if (!materialQuery) {
            return response.json({ "status": "Provide a search query" });
        }

        if (decoded) {
            Material.searchMaterial(materialQuery, (err, data) => {
                if (err) {
                    response.json({ "status": err });
                } else {
                    if (data.length === 0) {
                        return response.json({ "status": "No Search Items Found" });
                    } else {
                        return response.json({ "status": "success", "data": data });
                    }
                }
            });
        } else {
            return response.json({ "status": "Unauthorized User!!" });
        }
    } catch (error) {
        return response.json({ "status": "Error: " + error.message });
    }
};


exports.updateMaterial = (request, response) => {
    const uploadFile = upload.single('uploadFile');
    uploadFile(request, response, async (error) => {
        if (error) {
            return response.status(500).json({ "status": error.message });
        }

        if (request.file) {
            // File handling
            const file = request.file;
            const fileStream = fs.createReadStream(file.path);

            const uploadParams = {
                Bucket: process.env.S3_BUCKET,
                Key: `uploads/${file.filename}`,
                Body: fileStream
            };

            try {
                await s3Client.send(new PutObjectCommand(uploadParams));
                const fileUrl = `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`;

                // Remove the file from local storage
                fs.unlinkSync(file.path);

                const { id, batchId, fileName, materialDesc, remarks, materialType } = request.body;
                const materialUpdateToken = request.headers.token;

                jwt.verify(materialUpdateToken, "lmsappadmstaff", (err, decoded) => {
                    if (decoded) {
                        const validationErrors = {};

                        if (!Validator.isValidAmount(batchId).isValid) {
                            validationErrors.batchId = Validator.isValidAmount(batchId).message;
                        }
                        if (Validator.isEmpty(batchId).isValid) {
                            validationErrors.batchId = Validator.isEmpty(batchId).message;
                        }
                        if (Validator.isEmpty(fileName).isValid) {
                            validationErrors.fileName = Validator.isEmpty(fileName).message;
                        }
                        if (Validator.isEmpty(materialDesc).isValid) {
                            validationErrors.materialDesc = Validator.isEmpty(materialDesc).message;
                        }
                        if (Validator.isEmpty(remarks).isValid) {
                            validationErrors.remarks = Validator.isEmpty(remarks).message;
                        }
                        if (Validator.isEmpty(materialType).isValid) {
                            validationErrors.materialType = Validator.isEmpty(materialType).message;
                        }
                        if (!Validator.isValidAddress(materialDesc).isValid) {
                            validationErrors.materialDesc = Validator.isValidAddress(materialDesc).message;
                        }

                        if (!request.file) {
                            validationErrors.file = 'Please upload a file'
                        }

                        // If validation fails
                        if (Object.keys(validationErrors).length > 0) {
                            return response.json({ "status": "Validation failed", "data": validationErrors });
                        }

                        const mtrlUpdate = new Material({
                            id: id,
                            batchId: batchId,
                            fileName: fileName,
                            materialDesc: materialDesc,
                            remarks: remarks,
                            materialType: materialType,
                            uploadFile: fileUrl
                        });

                        Material.updateMaterial(mtrlUpdate, (err, data) => {
                            if (err) {
                                if (err.kind === "not_found") {
                                    return response.json({ "status": "Material Details Not Found.." });
                                } else {
                                    return response.json({ "status": err });
                                }
                            } else {
                                return response.json({ "status": "Material Details Updated", "data": data });
                            }
                        });
                    } else {
                        return response.json({ "status": "Unauthorized Access!!!" });
                    }
                });
            } catch (err) {
                fs.unlinkSync(file.path);
                return response.status(500).json({ "status": err.message });
            }
        } else {
            const { id, batchId, fileName, materialDesc, remarks, materialType, uploadFile } = request.body;
            const materialUpdateToken = request.headers.token;

            jwt.verify(materialUpdateToken, "lmsappadmstaff", (err, decoded) => {
                if (decoded) {
                    const validationErrors = {};

                    if (!Validator.isValidAmount(batchId).isValid) {
                        validationErrors.batchId = Validator.isValidAmount(batchId).message;
                    }
                    if (Validator.isEmpty(batchId).isValid) {
                        validationErrors.batchId = Validator.isEmpty(batchId).message;
                    }
                    if (Validator.isEmpty(fileName).isValid) {
                        validationErrors.fileName = Validator.isEmpty(fileName).message;
                    }
                    if (Validator.isEmpty(materialDesc).isValid) {
                        validationErrors.materialDesc = Validator.isEmpty(materialDesc).message;
                    }
                    if (Validator.isEmpty(remarks).isValid) {
                        validationErrors.remarks = Validator.isEmpty(remarks).message;
                    }
                    if (Validator.isEmpty(materialType).isValid) {
                        validationErrors.materialType = Validator.isEmpty(materialType).message;
                    }
                    if (!Validator.isValidAddress(materialDesc).isValid) {
                        validationErrors.materialDesc = Validator.isValidAddress(materialDesc).message;
                    }
                    
                    if (!Validator.isValidWebsite(uploadFile).isValid) {
                        validationErrors.website = Validator.isValidWebsite(uploadFile).message;
                    }

                    // If validation fails
                    if (Object.keys(validationErrors).length > 0) {
                        return response.json({ "status": "Validation failed", "data": validationErrors });
                    }

                    const mtrlUpdate = new Material({
                        id: id,
                        batchId: batchId,
                        fileName: fileName,
                        materialDesc: materialDesc,
                        remarks: remarks,
                        materialType: materialType,
                        uploadFile: uploadFile
                    });

                    Material.updateMaterial(mtrlUpdate, (err, data) => {
                        if (err) {
                            if (err.kind === "not_found") {
                                return response.json({ "status": "Material Details Not Found.." });
                            } else {
                                return response.json({ "status": err });
                            }
                        } else {
                            return response.json({ "status": "Material Details Updated", "data": data });
                        }
                    });
                } else {
                    return response.json({ "status": "Unauthorized Access!!!" });
                }
            });
        }
    });
};

exports.viewBatchMaterials = (request, response) => {
    const batchId = request.body.batchId;
    const batchMaterialToken = request.headers.token;

    jwt.verify(batchMaterialToken, "lmsappstud", (err, decoded) => {
        if (decoded) {
            Material.viewBatchMaterials(batchId, (err, data) => {
                if (err) {
                    response.json({ "status": err });
                } else {
                    if (data.length === 0) {
                        response.json({ "status": "No Materials Found" });
                    } else {
                        response.json({ "status": "success", "data": data });
                    }
                }
            });
        } else {
            response.json({ "status": "Unauthorized User!!" });
        }
    });
};


exports.deleteMaterial = (request, response) => {
    const deleteToken = request.headers.token
    const material = new Material({
        'id': request.body.id
    });

    jwt.verify(deleteToken, "lmsappadmstaff", (err, decoded) => {
        if (!decoded) {
            return response.json({ "status": "Unauthorized User!!" });
        }

        Material.materialDelete(material, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    console.log("Material not found");
                    return response.json({ "status": "Material not found" });
                } else {
                    return response.json({ "status": err });
                }
            } else {
                return response.json({ "status": "Material Deleted Successfully." });
            }
        })
    })
}