const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const College = require("../models/college.model");
const { request, response } = require("express");

const multer = require("multer");
const storage = multer.diskStorage({
    destination: (request, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (request, file, cb) => {
        cb(null, Date.now() + file.originalname);
    },
})

const upload = multer({ storage: storage }).single('collegeImage');

exports.collegeCreate = (request, response) => {
    upload(request, response, function (err) {
        if (err) {
            console.error("Error uploading image:", err);
            response.json({ "status": "Error uploading image" });

        }
        const college = new College({
            collegeName: request.body.collegeName,
            collegeAddress: request.body.collegeAddress,
            website: request.body.website,
            email: request.body.email,
            collegePhNo: request.body.collegePhNo,
            collegeImage: request.file ? request.file.filename : null

        });

        const collegeToken = request.body.token;

        if (college.collegeName !== "" && college.collegeName !== null) {
            College.collegeCreate(college, (data, err) => {
                if (err) {
                    response.json({ "status": err });
                } else {
                    jwt.verify(collegeToken, "lmsapp", (err, decoded) => {
                        if (decoded) {
                            response.json({ "status": "success", "data": data });
                        } else {
                            response.json({ "status": "Unauthorized User!!" });
                        }
                    });
                }
            });
        } else {
            response.json({ "status": "Content cannot be empty." });
        }
    }
    )
};
