const Trainers = require("../models/trainers.model.js");
const jwt = require("jsonwebtoken");
const path = require("path")
const { request, response } = require("express");
const multer = require("multer")
const Validator = require("../config/data.validate");
const { log } = require("console");
const bcrypt = require("bcrypt");

const saltRounds = 10;
const storage = multer.diskStorage({
    destination: (request, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (request, file, cb) => {
        cb(null, Date.now() + file.originalname.replace(/[^\w\-.]/g, ''));
    },
});

const upload = multer({ storage: storage }).single('profilePicture');

exports.createTrainer = (request, response) => {
    upload(request, response, function (err) {
        if (err) {
            console.error("Error uploading image:", err);
            return response.json({ "status": "Error uploading image" });
        }

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
                    profilePicture: profilePicture,
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
                        return response.json({ "status": "success", "data": data });
                    });
                });
            } else {
                return response.json({ "status": "Unauthorized access!!" });
            }
        });
    });
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

    jwt.verify(TrainerSearchToken, key, (err, decoded) =>{
        if (decoded) {
            if (!TrainerSearchQuery) {
                console.log("Search Item is required.")
                return response.json({"status" : "Search Item is required."})
            }
            Trainers.searchTrainer(TrainerSearchQuery, (err, data) => {
                if (err) {
                    response.json({"status" : err})
                } else {
                    if (data.length === 0) {
                        response.json({"status" : "No Search Items Found."})
                    } else {
                        response.json({"status" : "Result Found", "data" : data})
                    }
                }
            })
        } else {
            response.json({"status" : "Unauthorized User!!"})
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

                return response.json({ "status": "success", "data": data });
            });
        } else {
            return response.json({ "status": "Unauthorized User!!" });
        }
    });
};



// Code For Updating Trainer Details
exports.trainerDetailsUpdate = (request, response) =>{
    upload(request, request, function (err) {
        if (err) {
            console.log("Error Uploading Image : ", err)
            response.json({ "status": "Error Uploading Image." })
        }
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
                    'id' : request.body.id,
                    trainerName: request.body.trainerName,
                    about: request.body.about,
                    email: request.body.email,
                    password: request.body.password,
                    phoneNumber: request.body.phoneNumber,
                    profilePicture: profilePicture,
                });

                Trainers.updateTrainer(trainerUpdate, (err, data) => {
                    if (err) {
                        if (err.kind === "not_found") {
                            return response.json({ "status": "Trainer Details Not Found!!" })
                        } else {
                            response.json({ "status": err })
                        }
                    } else {
                        return response.json({ "status": "Trainer Details Updated", "data": data })
                    }
                })
            } else {
                response.json({ "status": "Unauthorized Access!!!" })
            }
        })
    })
}