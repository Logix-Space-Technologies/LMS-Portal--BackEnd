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
const upload = multer({
    storage: storage, limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        // Allow only PDF and DOCX files
        if (file.mimetype === 'application/pdf' || file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF and DOCX files are allowed!'), false);
        }
    }
});
exports.createMaterial = (request, response) => {

    const uploadFile = upload.single('uploadFile')

    uploadFile(request, response, async (error) => {

        if (error) {
            return response.status(500).json({ "status": error.message });
        }

        if (!request.file) {
            return response.status(400).json({ "status": "No file uploaded" });
        }

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

            const { batchId, fileName, materialDesc, remarks } = request.body
            const materialToken = request.headers.token

            jwt.verify(materialToken, "lmsappadmstaff", (err, decoded) => {
                if (decoded) {
                    const validationErrors = {};

                    if (!Validator.isValidAmount(batchId).isValid) {
                        validationErrors.batchId = Validator.isValidAmount(batchId).message;
                    }
                    if (!Validator.isValidName(fileName).isValid) {
                        validationErrors.fileName = Validator.isValidName(fileName).message;
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
    })

}


exports.searchMaterial = (request, response) => {
    const materialQuery = request.headers.materialQuery;
    const materialSearchToken = request.headers.token;

    jwt.verify(materialSearchToken, "lmsappone", (err, decoded) => {
        if (!materialQuery) {
            return response.json({ "status": "Provide a search query" });
        }
        if (decoded) {
            Material.searchMaterial(materialQuery, (err, data) => {
                if (err) {
                    response.json({ "status": err });
                } else {
                    if (data.length === 0) {
                        response.json({ "status": "No Search Items Found" });
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

exports.updateMaterial = (request, response) => {
    const uploadSingle = upload.single('uploadFile')
    uploadSingle(request, response, async (error) => {
        if (error) {
            return response.status(500).json({ "status": error.message });
        }

        if (!request.file) {
            return response.status(400).json({ "status": "No file uploaded" });
        }
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
            const materialUpdateToken = request.headers.token
            const { batchId, fileName, materialDesc, remarks } = request.body

            jwt.verify(materialUpdateToken, "lmsappadmstaff", (err, decoded) => {
                if (decoded) {

                    const validationErrors = {};

                    if (!Validator.isValidAmount(batchId).isValid) {
                        validationErrors.batchId = Validator.isValidAmount(batchId).message;
                    }
                    if (!Validator.isValidName(fileName).isValid) {
                        validationErrors.fileName = Validator.isValidName(fileName).message;
                    }

                    if (!Validator.isValidAddress(materialDesc).isValid) {
                        validationErrors.materialDesc = Validator.isValidAddress(materialDesc).message;
                    }

                    if (!request.file) {
                        validationErrors.file = 'Please upload a file'
                    }

                    // if validation fails
                    if (Object.keys(validationErrors).length > 0) {
                        return response.json({ "status": "Validation failed", "data": validationErrors });
                    }


                    const mtrlUpdate = new Material({
                        'id': request.body.id,
                        batchId: batchId,
                        fileName: fileName,
                        materialDesc: materialDesc,
                        remarks: remarks,
                        uploadFile: fileUrl

                    })

                    Material.updateMaterial(mtrlUpdate, (err, data) => {
                        if (err) {
                            if (err.kind === "not_found") {
                                return response.json({ "status": "Material Details Not Found.." })
                            } else {
                                response.json({ "status": err })
                            }

                        } else {
                            return response.json({ "status": "Material Details Updated", "data": data })

                        }
                    })



                } else {
                    response.json({ "status": "Unauthorized Access!!!" })

                }
            })


        } catch (err) {
            fs.unlinkSync(file.path);
            response.status(500).json({ "status": err.message });
        }
    })
}