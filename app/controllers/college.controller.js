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
            College.collegeCreate(college, (err,data) => {
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



exports.viewCollege=(request,response)=>{
    const collegeToken = request.body.token
    College.getAll((err, data) => {
        if (err) {
            console.log(err)
            response.json({ "status": err })
        }
        //response.json(data)
        jwt.verify(collegeToken, "lmsapp", (err, decoded) => {
            if (decoded) {
                response.json(data)
            } else {
                response.json({ "status": "Unauthorized User!!" });
            }
        })

    })
}


exports.updateCollege = (request, response) => {
    upload(request, request, function (err) {
        if (err) {
            console.log("Error Uploading Image : ", err)
            response.json({ "status": "Error Uploading Image." })
        }

        const clgUpdate = new College({
            collegeName: request.body.collegeName,
            collegeAddress: request.body.collegeAddress,
            website: request.body.website,
            email: request.body.email,
            collegePhNo: request.body.collegePhNo,
            collegeImage: request.file ? request.file.filename : null
        })
        const id = request.params.id

        College.updateCollege(id, clgUpdate, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    response.json({ "status": "College Details Not Found!!" })
                } else {
                    response.json({ "status": "Error Updating College Details !!!" })
                }
            }

            const collegeUpdateToken = request.body.token
            jwt.verify(collegeUpdateToken, "lmsapp", (err, decoded) => {
                if (decoded) {
                    response.json({ "status": "success", "data": data })
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
