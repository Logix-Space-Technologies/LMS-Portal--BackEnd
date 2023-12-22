const jwt = require("jsonwebtoken");
const College = require("../models/college.model");
const { request, response } = require("express");
const multer = require("multer");
const Validator = require("../config/data.validate");
const { json } = require("body-parser");

const storage = multer.diskStorage({
    destination: (request, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (request, file, cb) => {
        const fileNameWithoutSpaces = Date.now() + file.originalname.replace(/\s/g, '');
        cb(null, fileNameWithoutSpaces);
    },
});


const upload = multer({ storage: storage }).single('collegeImage');

exports.collegeCreate = (request, response) => {
    upload(request, response, function (err) {
        if (err) {
            console.error("Error uploading image:", err);
            return response.json({ "status": err });
        }
        const collegeToken = request.body.token;

        console.log(collegeToken)

        const { collegeName, collegeAddress, website, email, collegePhNo, collegeMobileNumber } = request.body;
        if (!request.file) {
            return response.json({ "status": "Please upload an image" });
        }
        jwt.verify(collegeToken, "lmsapp", (err, decoded) => {
            if (decoded) {

                const validationErrors = {};

                if (Validator.isEmpty(collegeName).isValid) {
                    validationErrors.name = Validator.isEmpty(collegeName).message;
                }
                if (!Validator.isValidName(collegeName).isValid) {
                    validationErrors.name = Validator.isValidName(collegeName).message;
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
                    collegeAddress: collegeAddress,
                    website: website,
                    email: email,
                    collegePhNo: collegePhNo,
                    collegeMobileNumber: collegeMobileNumber,
                    collegeImage: collegeImage  // Set the collegeImage field with the filename
                });

                College.collegeCreate(college, (err, data) => {
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


    });
};


exports.collegeAllView = (request, response) => {
    const clgviewToken = request.body.token
    console.log(clgviewToken)
    jwt.verify(clgviewToken, "lmsapp", (err, decoded) => {
        if (decoded) {
            College.collegeViewAll((err, data) => {
                if (err) {
                    response.json({ "status": err })
                } else {
                    response.json({ status: "success", "data": data });
                }
            })
        } else {
            response.json({ "status": "Unauthorized User!!" });
        }
    })
}

exports.updateCollege = (request, response) => {
    upload(request, request, function (err) {
        if (err) {
            console.log("Error Uploading Image : ", err)
            response.json({ "status": "Error Uploading Image." })
        }
        const collegeUpdateToken = request.body.token
        const collegeImage = request.file ? request.file.filename : null

        if (!request.file) {
            return response.json({ "status": "Image cannot be empty!!" })
        }
        jwt.verify(collegeUpdateToken, "lmsapp", (err, decoded) => {
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
                    collegeImage: collegeImage
                })

                College.updateCollege(clgUpdate, (err, data) => {
                    if (err) {
                        if (err.kind === "not_found") {
                            return response.json({ "status": "College Details Not Found.." })
                        } else {
                            response.json({ "status": err })
                        }
                    } else {
                        return response.json({ "status": "College Details Updated", "data": data })
                    }
                })
            } else {
                response.json({ "status": "Unauthorized Access!!!" })
            }
        })
    })
}


exports.deleteCollege = (request, response) => {
    const collegedeleteToken = request.body.token
    console.log(collegedeleteToken)
    jwt.verify(collegedeleteToken, "lmsapp", (err, decoded) => {
        if (decoded) {
            const clgDlt = new College({
                'id': request.body.id
            })
            College.delete(clgDlt, (err, data) => {
                if (err) {
                    if (err.kind === "not_found") {
                        console.log(({ "status": "College id not found." }))

                    } else {
                        response.send({ "status": err })
                    }
                } 
            })
        }else {
            response.json({ "status": "Unauthorized User!!" });
        }
    })
}

