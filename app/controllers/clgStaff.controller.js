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

exports.clgStaffCreate = (request, response) => {
  const { collegeId,collegeStaffName, phNo, email, clgStaffAddress, aadharNo, profilePic, department, password } = request.body
  const clgStaffToken = request.body
  //Validation for collegeStaffName
  if (!collegeStaffName || collegeStaffName.trim() === "") {
    return response.json({ "status": "collegeStaffName cannot be empty" })
  }
  //Validation for PhNo
  if (!phNo || !/^\+91[6-9][0-9]{9}$/.test(phNo)) {
    return response.json({ "status": "Invalid Phone Number" });
  }
  //Validation for clgStaffAddress
  if (!clgStaffAddress || clgStaffAddress.length > 2000) {
    return response.json({ "status": "Address cannot be empty" })
  }
  //validation for aadharNO
  if (!aadharNo || !/^\d{12}$/.test(aadharNo)) {
    return response.json({ "status": "Invalid Aadhar Number" });
  }
  // Validation for Email
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return response.json({ "status": "Invalid Email" });
  }
  //validation for department
  if (!department || department.length > 200) {
    return response.json({ "status": "Invalid department" })
  }

  // Validation for Password
  if (!password || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!*#a-zA-Z\d]).{8,12}$/.test(password)) {
    return response.json({ "status": "Password should have minimum 8 and maximum 12 characters and have at least one lowercase letter, one uppercase letter, and one digit." });
  }
  //Validation for collegeId
  if (!collegeId) {
    return response.json({ "status": "Batch Id cannot be empty." });
}

  upload(req, res, function (err) {
    if (err) {
      console.error("Error uploading image:", err);
      return res.json({ "status": "Error uploading image" });
    }

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


