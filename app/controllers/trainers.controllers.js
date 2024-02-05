const Trainers = require("../models/trainers.model.js");
const jwt = require("jsonwebtoken");
const path = require("path")
const multer = require("multer")
const Validator = require("../config/data.validate");
const bcrypt = require("bcrypt");
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');
const fs = require('fs');
require('dotenv').config({ path: '../../.env' });
const { AdminStaffLog, logAdminStaff } = require("../models/adminStaffLog.model")
const saltRounds = 10;

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
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});

exports.createTrainer = (request, response) => {
    const uploadSingle = upload.single('profilePicture');
    uploadSingle(request, response, async (error) => {
        if (error) {
            return response.status(500).json({ "status": error.message });
        }

        if (!request.file) {
            return response.status(400).json({ "status": "No file uploaded" });
        }

        const file = request.file;
        const fileStream = fs.createReadStream(file.path);

        const uploadParams = {
            Bucket: process.env.S3_BUCKET,
            Key: `uploads/${file.filename}`,
            Body: fileStream
        };

        try {
            const data = await s3Client.send(new PutObjectCommand(uploadParams));
            const imageUrl = `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`;
            // Remove the file from local storage
            fs.unlinkSync(file.path);

            const trainerToken = request.headers.token;
            const key = request.headers.key; //give key of respective logins of admin and adminstaff.

            jwt.verify(trainerToken, key, (err, decoded) => {
                if (decoded) {
                    const profilePicture = request.file ? request.file.filename : null;

                    if (!request.file) {
                        return response.json({ "status": "Please upload a profile picture" });
                    }

                    const validationErrors = {};

                    if (Validator.isEmpty(request.body.trainerName).isValid) {
                        validationErrors.trainerName = "Please enter your name";
                    }
                    if (Validator.isEmpty(request.body.about).isValid) {
                        validationErrors.about = "Please enter something about you";
                    }
                    if (Validator.isEmpty(request.body.email).isValid) {
                        validationErrors.email = "Please enter your email";
                    }
                    if (Validator.isEmpty(request.body.password).isValid) {
                        validationErrors.password = "Please enter your password";
                    }
                    if (Validator.isEmpty(request.body.phoneNumber).isValid) {
                        validationErrors.phoneNumber = "Please enter your phone number";
                    }
                    if (!Validator.isValidName(request.body.trainerName).isValid) {
                        validationErrors.trainerName = "Please enter a valid name";
                    }
                    if (!Validator.isValidEmail(request.body.email).isValid) {
                        validationErrors.email = "Please enter a valid email";
                    }
                    if (!Validator.isValidMobileNumber(request.body.phoneNumber).isValid) {
                        validationErrors.phoneNumber = "Please enter a valid phone number";
                    }
                    if (!Validator.isValidPassword(request.body.password).isValid) {
                        validationErrors.password = "Please enter a valid password";
                    }

                    if (Object.keys(validationErrors).length > 0) {
                        return response.json({ "status": "Validation failed", "data": validationErrors });
                    }

                    const trainer = new Trainers({
                        trainerName: request.body.trainerName,
                        about: request.body.about,
                        email: request.body.email,
                        password: request.body.password,
                        phoneNumber: request.body.phoneNumber,
                        profilePicture: imageUrl,
                    });

                    bcrypt.hash(trainer.password, saltRounds, (err, hashedPassword) => {
                        if (err) {
                            return response.json({ "status": "Error hashing password" });
                        }
                        trainer.password = hashedPassword;

                        Trainers.create(trainer, (err, data) => {
                            if (err) {
                                return response.json({ "status": err });
                            }
                            if (key == "lmsapp") {
                                logAdminStaff(0, "Admin Created Trainer")
                            }
                            return response.json({ "status": "success", "data": data });
                        });
                    });
                } else {
                    return response.json({ "status": "Unauthorized access!!" });
                }
            });

        } catch (err) {
            fs.unlinkSync(file.path);
            response.status(500).json({ "status": err.message });
        }
    })
};

//Code To View Trainers
exports.viewTrainers = (request, response) => {
    const trainerToken = request.headers.token;
    const key = request.headers.key; //give respective keys of admin and adminstaff

    jwt.verify(trainerToken, key, (err, decoded) => {
        if (decoded) {
            Trainers.viewTrainers((err, data) => {
                if (err) {
                    return response.json({ "status": err });
                }
                if (data.length === 0) {
                    return response.json({ "status": "No trainers are currently active" });
                } else {
                    return response.json({ "status": "success", "Trainers": data });
                }
            });
        } else {
            return response.json({ "status": "Unauthorized access!!" });
        }
    });
};

// Code For Searching Trainer Details
exports.searchTrainer = (request, response) => {
    const TrainerSearchQuery = request.body.TrainerSearchQuery
    const TrainerSearchToken = request.headers.token
    const key = request.headers.key;

    jwt.verify(TrainerSearchToken, key, (err, decoded) => {
        if (decoded) {
            if (!TrainerSearchQuery) {
                console.log("Search Item is required.")
                return response.json({ "status": "Search Item is required." })
            }
            Trainers.searchTrainer(TrainerSearchQuery, (err, data) => {
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



exports.deleteTrainer = (request, response) => {
    const trainerDeleteToken = request.headers.token;

    jwt.verify(trainerDeleteToken, "lmsapp", (err, decoded) => {

        if (decoded) {
            const trainerId = request.body.id;

            if (!trainerId) {
                return response.json({ "status": "Trainer ID is required" });
            }

            Trainers.deleteTrainer(trainerId, (err, data) => {
                if (err) {
                    return response.json({ "status": err });
                }
                logAdminStaff(0, "Admin Deleted Trainer")
                return response.json({ "status": "success" });
            });
        } else {
            return response.json({ "status": "Unauthorized User!!" });
        }
    });
};



// Code For Updating Trainer Details
exports.trainerDetailsUpdate = (request, response) => {
    const uploadSingle = upload.single('profilePicture');
    uploadSingle(request, response, async (error) => {
        if (error) {
            return response.status(500).json({ "status": error.message });
        }

        if (!request.file) {
            return response.status(400).json({ "status": "No file uploaded" });
        }

        const file = request.file;
        const fileStream = fs.createReadStream(file.path);

        const uploadParams = {
            Bucket: process.env.S3_BUCKET,
            Key: `uploads/${file.filename}`,
            Body: fileStream
        };

        try {
            const data = await s3Client.send(new PutObjectCommand(uploadParams));
            const imageUrl = `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`;
            // Remove the file from local storage
            fs.unlinkSync(file.path);


            const trainerUpdateToken = request.headers.token
            const key = request.headers.key

            jwt.verify(trainerUpdateToken, key, (err, decoded) => {
                if (decoded) {
                    const profilePicture = request.file ? request.file.filename : null
                    if (!request.file) {
                        return response.json({ "status": "Image cannot be empty!!" })
                    }
                    const validationErrors = {}

                    if (Validator.isEmpty(request.body.trainerName).isValid) {
                        validationErrors.trainerName = "Please enter your name";
                    }
                    if (Validator.isEmpty(request.body.about).isValid) {
                        validationErrors.about = "Please enter something about you";
                    }
                    if (Validator.isEmpty(request.body.phoneNumber).isValid) {
                        validationErrors.phoneNumber = "Please enter your phone number";
                    }
                    if (!Validator.isValidName(request.body.trainerName).isValid) {
                        validationErrors.trainerName = "Please enter a valid name";
                    }
                    if (!Validator.isValidMobileNumber(request.body.phoneNumber).isValid) {
                        validationErrors.phoneNumber = "Please enter a valid phone number";
                    }

                    if (Object.keys(validationErrors).length > 0) {
                        return response.json({ "status": "Validation failed", "data": validationErrors });
                    }

                    const trainerUpdate = new Trainers({
                        'id': request.body.id,
                        trainerName: request.body.trainerName,
                        about: request.body.about,
                        email: request.body.email,
                        password: request.body.password,
                        phoneNumber: request.body.phoneNumber,
                        profilePicture: imageUrl,
                    });

                    Trainers.updateTrainer(trainerUpdate, (err, data) => {
                        if (err) {
                            if (err.kind === "not_found") {
                                return response.json({ "status": "Trainer Details Not Found!!" })
                            } else {
                                response.json({ "status": err })
                            }
                        } else {
                            if (key == "lmsapp") {
                                logAdminStaff(0, "Admin Updated Trainer Details")
                            }
                            return response.json({ "status": "Trainer Details Updated", "data": data })
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

// Code For Updating Trainer Password

exports.viewOneTrainer = (request, response) => {
    const trainerToken = request.headers.token;
    const key = request.headers.key; //give respective keys of admin and adminstaff
    const trainerId = request.body.id; 

    jwt.verify(trainerToken, key, (err, decoded) => {
        if (decoded) {
            Trainers.viewOneTrainer(trainerId, (err, data) => {
                if (err) {
                    return response.json({ "status": err });
                }
                if (data.length === 0) {
                    return response.json({ "status": "No trainers are currently active" });
                } else {
                    return response.json({ "status": "success", "Trainers": data });
                }
            });
        } else {
            return response.json({ "status": "Unauthorized access!!" });
        }
    });
};

// Code to view only one trainer