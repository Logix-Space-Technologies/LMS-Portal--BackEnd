const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const College = require("../models/college.model");
const { request, response } = require("express");
const multer = require("multer");
const path = require("path");
const Validator = require("../config/data.validate")

const storage = multer.diskStorage({
    destination: (request, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (request, file, cb) => {
        cb(null, Date.now() + file.originalname);
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
        const collegeImage = request.file ? request.file.filename : null;

        // Checking validations
        const validationErrors = {};

        if (Validator.isEmpty(request.body.collegeName).isValid) {
            validationErrors.name = Validator.isEmpty(request.body.collegeName).message;
        }
        if (!Validator.isValidName(request.body.collegeName).isValid) {
            validationErrors.name = Validator.isValidName(request.body.collegeName).message
        }

        if (!Validator.isValidAddress(request.body.collegeAddress).isValid) {
            validationErrors.address = Validator.isValidAddress(request.body.collegeAddress).message;
        }

        if (!Validator.isValidWebsite(request.body.website).isValid) {
            validationErrors.website = Validator.isValidWebsite(request.body.website).message;
        }

        if (!Validator.isValidEmail(request.body.email).isValid) {
            validationErrors.email = Validator.isValidEmail(request.body.email).message;
        }

        if (!Validator.isValidPhoneNumber(request.body.collegePhNo).isValid) {
            validationErrors.phone = Validator.isValidPhoneNumber(request.body.collegePhNo).message;
        }

        if (!Validator.isValidMobileNumber(request.body.collegeMobileNumber).isValid) {
            validationErrors.mobile = Validator.isValidMobileNumber(request.body.collegeMobileNumber).message;
        }
        if (!Validator.isValidImageWith1mbConstratint(request.file).isValid) {
            validationErrors.image = Validator.isValidImageWith1mbConstratint(request.file).message;
        }

        // If validation fails
        if (Object.keys(validationErrors).length > 0) {
            return response.json({ "status": "Validation failed", "data": validationErrors });
        }

        const college = new College({
            collegeName: request.body.collegeName,
            collegeAddress: request.body.collegeAddress,
            website: request.body.website,
            email: request.body.email,
            collegePhNo: request.body.collegePhNo,
            collegeMobileNumber: request.body.collegeMobileNumber,
            collegeImage: collegeImage
        });

        College.collegeCreate(college, (err, data) => {
            if (err) {
                return response.json({ "status": err });
            }

            jwt.verify(collegeToken, "lmsapp", (err, decoded) => {
                if (decoded) {
                    return response.json({ "status": "success", "data": data });
                } else {
                    return response.json({ "status": "Unauthorized User!!" });
                }
            });
        });
    });
};

exports.viewCollege=(request,response)=>{

    const collegeToken = request.body.token
    College.getAll((err, data) => {
        if (err) {
            console.log(err)
            response.json({ "status": err })
        }
        jwt.verify(collegeToken, "lmsapp", (err, decoded) => {
            if (decoded) {
                response.json(data)
            } else {
                response.json({ "status": "Unauthorized User!!" });
            }
        })
    })
}


exports.collegeAllView=(request,response)=>{
    const clgviewToken = request.body.token
    console.log(clgviewToken)
    jwt.verify(clgviewToken, "lmsapp", (err, decoded)=>{
        if (decoded) {
            College.collegeViewAll((err, data)=>{
                if (err) {
                    response.json({"status": err})
                } else {
                    response.json({ status: "success", "data": data });
                }
            })
        } else {
            response.json({ "status": "Unauthorized User!!" });
        }
    } )
}

exports.updateCollege = (request, response) => {
    upload(request, request, function (err) {
        if (err) {
            console.log("Error Uploading Image : ", err)
            response.json({ "status": "Error Uploading Image." })
        }
        const collegeUpdateToken = request.body.token 
        const collegeImage = request.file ? request.file.filename : null

        const validationErrors = {}

        if (Validator.isEmpty(request.body.collegeName).isValid){
            validationErrors.name = Validator.isEmpty(request.body.collegeName).message
        }

        if (!Validator.isValidName(request.body.collegeName).isValid) {
            validationErrors.name = Validator.isValidName(request.body.collegeName).message
        }

        if (!Validator.isValidAddress(request.body.collegeAddress).isValid){
            validationErrors.address = Validator.isValidAddress(request.body.collegeAddress).message
        }

        if (!Validator.isValidWebsite(request.body.website).isValid) {
            validationErrors.website = Validator.isValidWebsite(request.body.website).message
        }

        if (!Validator.isValidEmail(request.body.email).isValid) {
            validationErrors.email = Validator.isValidEmail(request.body.email).message
        }

        if (!Validator.isValidPhoneNumber(request.body.collegePhNo).isValid) {
            validationErrors.phone = Validator.isValidPhoneNumber(request.body.collegePhNo).m
        }

        if (!Validator.isValidMobileNumber(request.body.collegeMobileNumber).isValid) {
            validationErrors.mobile = Validator.isValidMobileNumber(request.body.collegeMobileNumber).message
        }

        if (!Validator.isValidImageWith1mbConstratint(request.file).isValid) {
            validationErrors.image = Validator.isValidImageWith1mbConstratint(request.file).message
        }

        if (Object.keys(validationErrors).length > 0) {
            return response.json({"status" : "Validation Failed", "data" : validationErrors})
        }

        const clgUpdate = new College({
            'id' : request.body.id,
            collegeName: request.body.collegeName,
            collegeAddress: request.body.collegeAddress,
            website: request.body.website,
            email: request.body.email,
            collegePhNo: request.body.collegePhNo,
            collegeMobileNumber : request.body.collegeMobileNumber,
            collegeImage: collegeImage
        })

        College.updateCollege(clgUpdate, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    console.log("College Details Not Found!!")
                    response.json({ "status": "College Details Not Found!!" })
                } else {
                    response.json({ "status": "Error Updating College Details !!!" })
                }
            }
            
            jwt.verify(collegeUpdateToken, "lmsapp", (err, decoded) => {
                if (decoded) {
                    response.json({ "status": "Updated College Details", "data": data })
                } else {
                    response.json({ "status": "Unauthorized Access!!!" })
                }
            })
        })
    })
}


exports.deleteCollege = (request, response)=>{
    const collegedeleteToken = request.body.token
    const clgDlt = new College({
        'id' : request.body.id
    })
    College.delete(clgDlt, (err, data)=>{
        if (err) {
            if (err.kind === "not_found") {
                console.log(({status: "College id not found."}))
                
            } else {
                response.send({ message: "Error deleting College." })
            }
        } else {
        jwt.verify(collegedeleteToken, "lmsapp", (err, decoded)=>{
            if (decoded) {
                response.json({"status": "Deleted Succesfully"})
            } else {
                response.json({ "status": "Unauthorized User!!" });
            }
        } ) }

    })
}
