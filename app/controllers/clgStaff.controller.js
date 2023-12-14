const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { request, response } = require("express");
const CollegeStaff = require("../models/clgStaff.model");


const saltRounds=10;

const multer = require("multer");
const storage = multer.diskStorage({
    destination: (request, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (request, file, cb) => {
        cb(null, Date.now() + file.originalname);
    },
})
const upload = multer({ storage: storage }).single('profilePic')
exports.clgStaffCreate = (request, response) => {
    upload(request, response, function(err){
        if (err) {
            console.error("Error uploading image:", err);
            response.json({ "status": "Error uploading image" })
        }
        
        const clgstaff = new CollegeStaff({
            collegeId:request.body.collegeId,
            collegeStaffName: request.body.collegeStaffName,
            email: request.body.email,
            phNo: request.body.phNo,
            aadharNo: request.body.aadharNo,
            clgStaffAddress: request.body.clgStaffAddress,
            profilePic: request.file ? request.file.filename : null,
            department: request.body.department,
            password: request.body.password,
           
    
        })
        const token = request.body.token
    
    
        bcrypt.hash(clgstaff.password,saltRounds,(err,hashedPassword)=>{
            if (err) {
                response.json({"status":err})
                
            } else {
                clgstaff.password=hashedPassword
                if (clgstaff.collegeStaffName != "" && clgstaff.collegeStaffName != null) {
                    CollegeStaff.clgStaffCreate(clgstaff, (data,err) => {
                        if (err) {
                            response.json({ "status": err })
                        }
                        jwt.verify(token, "lmsapp", (error, decoded) => {
                            if (decoded) {
                                response.json({ "status": "success", "data": data })
                            }
                            else {
                                response.json({ "status": "Unauthorized access!!" })
                            }
                        })
        
        
                    })
                } else {
                    response.json({ "status": "Content cannot be empty." })
                }
                
            }
        })
    })

}