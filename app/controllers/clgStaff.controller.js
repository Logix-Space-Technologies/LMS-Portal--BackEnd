const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { request, response } = require("express");
const CollegeStaff = require("../models/clgStaff.model");

const saltRounds = 10;

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage }).single('profilePic');

exports.clgStaffCreate = (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      console.error("Error uploading image:", err);
      return res.json({ "status": "Error uploading image" });
    }

    const clgstaff = new CollegeStaff({
      collegeId: req.body.collegeId,
      collegeStaffName: req.body.collegeStaffName,
      email: req.body.email,
      phNo: req.body.phNo,
      aadharNo: req.body.aadharNo,
      clgStaffAddress: req.body.clgStaffAddress,
      profilePic: req.file ? req.file.filename : null,
      department: req.body.department,
      password: req.body.password,
    });

    const token = req.body.token;

    bcrypt.hash(clgstaff.password, saltRounds, (err, hashedPassword) => {
      if (err) {
        return res.json({ "status": err });
      }

      clgstaff.password = hashedPassword;

      if (clgstaff.collegeStaffName.trim() !== "") {
        CollegeStaff.clgStaffCreate(clgstaff, (data, err) => {
          if (err) {
            return res.json({ "status": err });
          }

          jwt.verify(token, "lmsapp", (error, decoded) => {
            if (decoded) {
              return res.json({ "status": "success", "data": data });
            } else {
              return res.json({ "status": "Unauthorized access!!" });
            }
          });
        });
      } else {
        return res.json({ "status": "Content cannot be empty." });
      }
    });
  });
};

exports.viewCollegeStaff=(request,response)=>{
  const collegeToken = request.body.token
  CollegeStaff.getAll((err,data)=>{
     if(err){
      console.log(err)
      response.json({"status":err})
     } 
     //response.json(data)
      jwt.verify(collegeToken, "lmsapp", (err, decoded)=>{
          if (decoded) {
              response.json(data)
          } else {
              response.json({ "status": "Unauthorized User!!" });
          }
      } )
     
  })
}
