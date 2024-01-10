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
        const key = request.headers.key;
        
        jwt.verify(trainerToken, key, (err, decoded) => {
            if (decoded) {
                const profilePicture = request.file ? request.file.filename : null;
                
                if (!request.file) {
                    return response.json({ "status": "Please upload a profile picture" });
                }

                const validationErrors = {};

                if (!Validator.isEmpty(request.body.trainerName)) {
                    validationErrors.trainerName = "Please enter your name";
                }
                if (!Validator.isEmpty(request.body.about)) {
                    validationErrors.about = "Please enter something about you";
                }
                if (!Validator.isEmpty(request.body.email)) {
                    validationErrors.email = "Please enter your email";
                }
                if (!Validator.isEmpty(request.body.password)) {
                    validationErrors.password = "Please enter your password";
                }
                if (!Validator.isEmpty(request.body.phoneNumber)) {
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

exports.viewTrainers = (request, response) => {
    const trainerToken = request.headers.token;
    const key = request.headers.key;

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