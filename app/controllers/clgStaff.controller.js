const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { request, response } = require("express");
const CollegeStaff = require("../models/clgStaff.model");
const multer=require("multer")
const path=require("path")
const Validator=require("../config/data.validate")
const saltRounds = 10;


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({storage:storage}).single(profilePic)

exports.clgStaffCreate = (request, response) => {
  
  upload(request, response, function (err) {
    if (err) {
      console.error("Error uploading image:", err);
      return res.json({ "status": "Error uploading image" });
    }
    const clgStaffToken=request.body.token
    const profilePic=request.file ? request.file.filename:null

    //Checking validations
    const validationErrors={}

    

    const clgstaff = new CollegeStaff({
      'id':req.body.id,
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
        CollegeStaff.clgStaffCreate(clgstaff, (err, data) => {
          if (err) {
            return res.json({ "status": err });
          }

          jwt.verify(token, "lmsapp", (decoded, error) => {
            if (decoded) {
              return res.json({ "status": "success", "data": data });
            } else {
              return res.json({ "status": "Unauthorized access!!" });
            }
          });
        });
      }
    });
  });
};


exports.clgStaffDelete = (request, response) => {
  const deleteToken = request.body.token;
  const staffId = request.body.id;
  const collegeStaff = new CollegeStaff({
    'id': staffId
  });

  CollegeStaff.clgStaffDelete(collegeStaff, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        console.log({ status: "College Staff id not found." });
      } else {
        response.send({ message: "Error deleting Staff." });
      }
    } else {
      jwt.verify(deleteToken, "lmsapp", (err, decoded) => {
        if (decoded) {
          response.json({ status: "Deleted Successfullly" });
        } else {
          response.json({ status: "Unauthorized User!!" });
        }
      });
    }
  });
};

exports.viewCollegeStaff = (request, response) => {
  const collegeToken = request.body.token
  CollegeStaff.getAll((err, data) => {
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




exports.viewOneCollegeStaff = (request, response) => {
  const collegeToken = request.body.token;
  const collegeId = request.body.collegeId;

  if (!collegeId) {
    return response.json({ "status": "College Name is required." });
  }

  CollegeStaff.getOne(collegeId, (err, data) => {
    if (err) {
      console.log(err);
      response.json({ "status": err });
    } else {
      jwt.verify(collegeToken, "lmsapp", (err, decoded) => {
        if (decoded) {
          response.json(data);
        } else {
          response.json({ "status": "Unauthorized User!!" });
        }
      });
    }
  });
};






exports.collegeStaffUpdate = (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      console.error("Error uploading image:", err);
      return res.json({ "status": "Error uploading image" });
    }

    const clgstaff = new CollegeStaff({
      'id': req.body.id,
      collegeId: req.body.collegeId,
      collegeStaffName: req.body.collegeStaffName,
      email: req.body.email,
      phNo: req.body.phNo,
      aadharNo: req.body.aadharNo,
      clgStaffAddress: req.body.clgStaffAddress,
      profilePic: req.file ? req.file.filename : null,
      department: req.body.department,
    });


    CollegeStaff.updateCollegeStaff(clgstaff, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          return res.json({ "status": "College staff not found with the provided ID" });
        } else {
          return res.json({ "status": "Internal Server Error" });
        }
      }
      const token = req.body.token;
      jwt.verify(token, "lmsapp", (error, decoded) => {
        if (decoded) {
          return res.json({ "status": "success", "data": data });
        } else {
          return res.json({ "status": "Unauthorized access!!" });
        }
      });
    });
  });
};


