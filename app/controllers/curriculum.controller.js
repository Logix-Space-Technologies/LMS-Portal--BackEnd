const Curriculum = require("../models/curriculum.model");
const jwt = require("jsonwebtoken");
const path = require("path")
const multer = require("multer")
const Validator = require("../config/data.validate");
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');
const fs = require('fs');
require('dotenv').config({ path: '../../.env' });
const { AdminStaffLog, logAdminStaff } = require("../models/adminStaffLog.model")
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
    },
});

exports.createCurriculum = (request, response) => {
    const uploadFile = upload.single('curriculumFileLink');

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


            const curriculumToken = request.headers.token;
            const key = request.headers.key;

            jwt.verify(curriculumToken, key, (err, decoded) => {
                if (decoded) {
                    if (!request.file) {
                        return response.json({ "status": "File cannot be empty!" })
                    }
                    const validationErrors = {};

                    if (Validator.isEmpty(request.body.batchId).isValid) {
                        validationErrors.batchId = Validator.isEmpty(request.body.batchId).message;
                    }

                    if (Validator.isEmpty(request.body.curriculumTitle).isValid) {
                        validationErrors.curriculumTitle = Validator.isEmpty(request.body.curriculumTitle).message;
                    }

                    if (!Validator.isValidName(request.body.curriculumTitle).isValid) {
                        validationErrors.curriculumTitle = Validator.isValidName(request.body.curriculumTitle).message;
                    }

                    if (Validator.isEmpty(request.body.curriculumDesc).isValid) {
                        validationErrors.curriculumDesc = Validator.isEmpty(request.body.curriculumDesc).message;
                    }

                    if (Validator.isEmpty(request.body.addedBy).isValid) {
                        validationErrors.addedBy = Validator.isEmpty(request.body.addedBy).message;
                    }

                    // If validation fails
                    if (Object.keys(validationErrors).length > 0) {
                        return response.json({ "status": "Validation failed", "data": validationErrors });
                    }

                    const addCurriculum = new Curriculum({
                        batchId: request.body.batchId,
                        curriculumTitle: request.body.curriculumTitle,
                        curriculumDesc: request.body.curriculumDesc,
                        addedBy: request.body.addedBy,
                        curriculumFileLink: fileUrl
                    });

                    Curriculum.curriculumCreate(addCurriculum, (err, data) => {
                        if (err) {
                            return response.json({ "status": err });
                        } else {
                            if (key == "lmsapp") {
                                logAdminStaff(0, "Admin Created Curriculum")
                            }
                            return response.json({ "status": "success", "data": data });
                        }
                    });

                } else {
                    return response.json({ "status": "Unauthorized User!!" });
                }
            });

        } catch (err) {
            fs.unlinkSync(file.path);
            response.status(500).json({ "status": err.message });
        }
    });
};

exports.viewAllCurriculum = (request, response) => {
    const curriculumToken = request.headers.token
    key = request.headers.key
    jwt.verify(curriculumToken, key, (err, decoded) => {
        if (decoded) {
            Curriculum.curriculumView((err, data) => {
                if (err) {
                    response.json({ "status": err });
                }
                if (data.length == 0) {
                    response.json({ "status": "No batches found!" });
                } else {
                    response.json({ "status": "success", "data": data });
                }
            })
        } else {
            response.json({ "status": "Unauthorized User!!" });
        }
    })
}




exports.searchCurriculum = (request, response) => {
    const CurriculumSearchQuery = request.body.CurriculumSearchQuery
    const CurriculumSearchToken = request.headers.token
    const key = request.headers.key;

    jwt.verify(CurriculumSearchToken, key, (err, decoded) => {
        if (decoded) {
            if (!CurriculumSearchQuery) {
                console.log("Search Item is required.")
                return response.json({ "status": "Search Item is required." })
            }
            Curriculum.searchCurriculum(CurriculumSearchQuery, (err, data) => {
                if (err) {
                    response.json({ "status": err })
                } else {
                    if (data.length === 0) {
                        response.json({ "status": "No Search Items Found." })
                    } else {
                        response.json({ "status": "Result Found", "data": data })
                    }
                }
            })
        } else {
            response.json({ "status": "Unauthorized User!!" })
        }
    })
}

exports.currView = (request, response) => {
    const batchId = request.body.batchId
    const curriculumToken = request.headers.token
    key = request.headers.key
    jwt.verify(curriculumToken, key, (err, decoded) => {
        if (decoded) {
            Curriculum.curriculumView(batchId, (err, data) => {
                if (err) {
                    response.json({ "status": err });
                }
                if (!data) {
                    response.json({ "status": "No batches found!" });
                } else {
                    response.json({ "status": "success", "data": data });
                }
            })
        } else {
            response.json({ "status": "Unauthorized User!!" });
        }
    })
}


exports.curriculumDelete = (request, response) => {
    const curriculumDeleteToken = request.headers.token
    jwt.verify(curriculumDeleteToken, "lmsapp", (err, decoded) => {
        if (decoded) {
            const id = request.body.id

            Curriculum.curriculumDelete(id, (err, data) => {
                if (err) {
                    if (err.kind === "not_found") {
                        console.log("Curriculum not found.")
                        return response.json({ "status": "Curriculum not found." })
                    } else {
                        return response.json({ "status": err })
                    }

                } else {
                    return response.json({ "status": "success" })
                }
            })

        } else {

            return response.json({ "status": "Unauthorized User!!" })

        }
    })
}


exports.updateCurriculum = (request, response) => {
    const uploadFile = upload.single('curriculumFileLink');

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

            const curriculumToken = request.headers.token;
            const key = request.headers.key;
            const curriculumFileLink = fileUrl
            jwt.verify(curriculumToken, key, (err, decoded) => {
                if (decoded) {
                    const validationErrors = {};

                    // Validate curriculumTitle
                    if (Validator.isEmpty(request.body.curriculumTitle).isValid) {
                        validationErrors.curriculumTitle = Validator.isEmpty(request.body.curriculumTitle).message;
                    }

                    if (!Validator.isValidName(request.body.curriculumTitle).isValid) {
                        validationErrors.curriculumTitle = Validator.isValidName(request.body.curriculumTitle).message;
                    }

                    // Validate curriculumDesc
                    if (Validator.isEmpty(request.body.curriculumDesc).isValid) {
                        validationErrors.curriculumDesc = Validator.isEmpty(request.body.curriculumDesc).message;
                    }

                    // Validate updatedBy
                    if (Validator.isEmpty(request.body.updatedBy).isValid) {
                        validationErrors.updatedBy = Validator.isEmpty(request.body.updatedBy).message;
                    }

                    // If validation fails
                    if (Object.keys(validationErrors).length > 0) {
                        return response.json({ "status": "Validation failed", "data": validationErrors });
                    }

                    // Create a new Curriculum instance
                    const updCurriculum = new Curriculum({
                        'id': request.body.id,
                        'curriculumTitle': request.body.curriculumTitle,
                        'curriculumDesc': request.body.curriculumDesc,
                        'updatedBy': request.body.updatedBy,
                        'curriculumFileLink': curriculumFileLink
                    });

                    // Call the curriculumUpdate method
                    Curriculum.curriculumUpdate(updCurriculum, (err, data) => {
                        if (err) {
                            return response.json({ "status": err });
                        } else {
                            return response.json({ "status": "success", "data": data });
                        }
                    });

                } else {
                    return response.json({ "status": "Unauthorized User!!" });
                }
            });

        } catch (err) {
            fs.unlinkSync(file.path);
            response.status(500).json({ "status": err.message });
        }
    });
};

exports.viewOneCurriculum = (request, response) => {
    const curriculumToken = request.headers.token;
    const key = request.headers.key; //give respective keys of admin and adminstaff
    const curriculumId = request.body.id;

    jwt.verify(curriculumToken, key, (err, decoded) => {
        if (decoded) {
            Curriculum.viewOneCurriculum(curriculumId, (err, data) => {
                if (err) {
                    return response.json({ "status": err });
                }
                if (data.length === 0) {
                    return response.json({ "status": "No curriculum are currently active" });
                } else {
                    return response.json({ "status": "success", "curriculum": data });
                }
            });
        } else {
            return response.json({ "status": "Unauthorized access!!" });
        }
    });
};
