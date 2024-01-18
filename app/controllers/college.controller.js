const jwt = require("jsonwebtoken");
const College = require("../models/college.model");
const { request, response } = require("express");
const multer = require("multer");
const Validator = require("../config/data.validate");
const { json } = require("body-parser");
const mailContents = require('../config/mail.content');
const mail = require('../../sendEmail');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');
const fs = require('fs');
require('dotenv').config({ path: '../../.env' });
const path = require('path');
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
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});

exports.collegeCreate = (request, response) => {
    const uploadSingle = upload.single('collegeImage');
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
            const imageUrl = `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`;

            // Remove the file from local storage
            fs.unlinkSync(file.path);
            const collegeToken = request.headers.token;

            const { collegeName, collegeCode, collegeAddress, website, email, collegePhNo, collegeMobileNumber } = request.body;
            if (!request.file) {
                return response.json({ "status": "Please upload an image" });
            }
            key = request.headers.key
            jwt.verify(collegeToken, key, (err, decoded) => {
                if (decoded) {
                    console.log("decoded", decoded);
                    const validationErrors = {};

                    if (Validator.isEmpty(collegeName).isValid) {
                        validationErrors.name = Validator.isEmpty(collegeName).message;
                    }
                    if (!Validator.isValidName(collegeName).isValid) {
                        validationErrors.name = Validator.isValidName(collegeName).message;
                    }
                    if (Validator.isEmpty(collegeCode).isValid) {
                        validationErrors.code = Validator.isEmpty(collegeCode).message;
                    }
                    if (!Validator.acceptOnlyCapitalLetters(collegeCode).isValid) {
                        validationErrors.code = Validator.acceptOnlyCapitalLetters(collegeCode).message;
                    }

                    if (!Validator.isValidAddress(collegeAddress).isValid) {
                        validationErrors.address = Validator.isValidAddress(collegeAddress).message;
                    }
                    if (Validator.isEmpty(collegeAddress).isValid) {
                        validationErrors.address = Validator.isEmpty(collegeAddress).message;
                    }
                    if (!Validator.isValidWebsite(website).isValid) {
                        validationErrors.website = Validator.isValidWebsite(website).message;
                    }

                    if (!Validator.isValidEmail(email).isValid) {
                        validationErrors.email = Validator.isValidEmail(email).message;
                    }
                    if (Validator.isEmpty(email).isValid) {
                        validationErrors.email = Validator.isEmpty(email).message;
                    }

                    if (!Validator.isValidPhoneNumber(collegePhNo).isValid) {
                        validationErrors.phone = Validator.isValidPhoneNumber(collegePhNo).message;
                    }

                    if (!Validator.isValidMobileNumber(collegeMobileNumber).isValid) {
                        validationErrors.mobile = Validator.isValidMobileNumber(collegeMobileNumber).message;
                    }
                    if (Validator.isEmpty(collegeMobileNumber).isValid) {
                        validationErrors.mobile = Validator.isEmpty(collegeMobileNumber).message;
                    }

                    if (request.file && !Validator.isValidImageWith1mbConstratint(request.file).isValid) {
                        validationErrors.image = Validator.isValidImageWith1mbConstratint(request.file).message;
                    }

                    // If validation fails
                    if (Object.keys(validationErrors).length > 0) {
                        return response.json({ "status": "Validation failed", "data": validationErrors });
                    }


                    const collegeImage = request.file ? request.file.filename : null;

                    const college = new College({
                        collegeName: collegeName,
                        collegeCode: collegeCode,
                        collegeAddress: collegeAddress,
                        website: website,
                        email: email,
                        collegePhNo: collegePhNo,
                        collegeMobileNumber: collegeMobileNumber,
                        collegeImage: imageUrl
                    });

                    College.collegeCreate(college, (err, data) => {
                        if (err) {
                            return response.json({ "status": err });
                        } else {
                            //send mail to the college email
                            const collegeName = college.collegeName
                            const collegeEmail = college.email
                            const collegeEmailContent = mailContents.collegeHtmlContent(collegeName)
                            const collegeTextContent = mailContents.collegeTextContent(collegeName)
                            mail.sendEmail(collegeEmail, 'Registration Successful!', collegeEmailContent, collegeTextContent);
                            if(key=="lmsapp"){
                                logAdminStaff(0,"Admin Created College")
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


exports.collegeAllView = (request, response) => {
    const clgviewToken = request.headers.token
    key = request.headers.key
    console.log(clgviewToken)
    jwt.verify(clgviewToken, key, (err, decoded) => {
        if (decoded) {
            College.collegeViewAll((err, data) => {
                if (err) {
                    response.json({ "status": err })
                } else {
                    response.json({ "status": "success", "data": data });
                }
            })
        } else {
            response.json({ "status": "Unauthorized User!!" });
        }
    })
}

exports.updateCollege = (request, response) => {
    const uploadSingle = upload.single('collegeImage');
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
            const imageUrl = `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`;

            // Remove the file from local storage
            const collegeUpdateToken = request.headers.token
            const collegeImage = request.file ? request.file.filename : null
            const key = request.headers.key // key for respective tokens
            if (!request.file) {
                return response.json({ "status": "Image cannot be empty!!" })
            }
            jwt.verify(collegeUpdateToken, key, (err, decoded) => {
                if (decoded) {

                    const validationErrors = {}

                    if (Validator.isEmpty(request.body.collegeName).isValid) {
                        validationErrors.name = Validator.isEmpty(request.body.collegeName).message
                    }
                    if (!Validator.isValidName(request.body.collegeName).isValid) {
                        validationErrors.name = Validator.isValidName(request.body.collegeName).message
                    }

                    if (Validator.isEmpty(request.body.collegeAddress).isValid) {
                        validationErrors.address = Validator.isEmpty(request.body.collegeAddress).message
                    }
                    if (!Validator.isValidAddress(request.body.collegeAddress).isValid) {
                        validationErrors.address = Validator.isValidAddress(request.body.collegeAddress).message
                    }

                    if (!Validator.isValidWebsite(request.body.website).isValid) {
                        validationErrors.website = Validator.isValidWebsite(request.body.website).message
                    }

                    if (!Validator.isValidPhoneNumber(request.body.collegePhNo).isValid) {
                        validationErrors.phone = Validator.isValidPhoneNumber(request.body.collegePhNo).message
                    }

                    if (Validator.isEmpty(request.body.collegeMobileNumber).isValid) {
                        validationErrors.mobile = Validator.isEmpty(request.body.collegeMobileNumber).message
                    }
                    if (!Validator.isValidMobileNumber(request.body.collegeMobileNumber).isValid) {
                        validationErrors.mobile = Validator.isValidMobileNumber(request.body.collegeMobileNumber).message
                    }

                    if (Validator.isEmpty(request.file).isValid) {
                        validationErrors.image = Validator.isEmpty(request.file).message
                    }
                    if (!Validator.isValidImageWith1mbConstratint(request.file).isValid) {
                        validationErrors.image = Validator.isValidImageWith1mbConstratint(request.file).message
                    }

                    if (Object.keys(validationErrors).length > 0) {
                        return response.json({ "status": "Validation Failed", "data": validationErrors })
                    }

                    const clgUpdate = new College({
                        'id': request.body.id,
                        collegeName: request.body.collegeName,
                        collegeAddress: request.body.collegeAddress,
                        website: request.body.website,
                        collegePhNo: request.body.collegePhNo,
                        collegeMobileNumber: request.body.collegeMobileNumber,
                        collegeImage: imageUrl
                    })

                    College.updateCollege(clgUpdate, (err, data) => {
                        if (err) {
                            if (err.kind === "not_found") {
                                return response.json({ "status": "College Details Not Found.." })
                            } else {
                                response.json({ "status": err })
                            }
                        } else {
                            if(key=="lmsapp"){
                                logAdminStaff(0,"Admin Updated College")
                            }
                            return response.json({ "status": "College Details Updated", "data": data })
                        }
                    })
                } else {
                    response.json({ "status": "Unauthorized Access!!!" })
                }
            });
            } catch (err) {
                fs.unlinkSync(file.path);
                response.status(500).json({ "status": err.message });
            }
        });
};


exports.deleteCollege = (request, response) => {
    const collegedeleteToken = request.headers.token
    console.log(collegedeleteToken)
    jwt.verify(collegedeleteToken, "lmsapp", (err, decoded) => {
        if (decoded) {
            const clgDlt = new College({
                'id': request.body.id
            })
            College.delete(clgDlt, (err, data) => {
                if (err) {
                    if (err.kind === "not_found") {
                        console.log({ "status": "College id not found." })
                        return response.json({ "status": "College id not found." })
                    } else {
                        return response.json({ "status": err })
                    }
                }
                
                logAdminStaff(0,"Admin Deleted College")
                
                return response.json({ "status": "College deleted." })
            })
        } else {
            response.json({ "status": "Unauthorized User!!" });
        }
    })
}



exports.searchCollege = (request, response) => {
    const collegeSearchQuery = request.body.collegeSearchQuery
    const collegeSearchToken = request.headers.token

    jwt.verify(collegeSearchToken, "lmsapp", (err, decoded) => {
        if (decoded) {
            if (!collegeSearchQuery) {
                console.log("Search Item is required.")
                return response.json({ "status": "Search Item is required." })
            }
            College.searchCollege(collegeSearchQuery, (err, data) => {
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

exports.studentViewCollege = (request, response) => {
    const studentViewCollegeToken = request.headers.token
    const studentId = request.body.studId
    jwt.verify(studentViewCollegeToken, "lmsappstud", (err, decoded) => {
        if (decoded) {
            College.studentViewCollege(studentId, (err, data) => {
                if (err) {
                    response.json({ "status": err })
                } else {
                    if (data.length === 0) {
                        response.json({ "status": "No College Found." })
                    } else {
                        response.json({ "status": "College Found", "data": data })
                    }
                }
            })
        } else {
            response.json({ "status": "Unauthorized User!!" })
        }
    })
}