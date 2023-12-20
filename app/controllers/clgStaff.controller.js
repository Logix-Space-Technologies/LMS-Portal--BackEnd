const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { request, response } = require("express");
const CollegeStaff = require("../models/clgStaff.model");
const multer = require("multer")
const path = require("path")
const Validator = require("../config/data.validate")
const saltRounds = 10;


const storage = multer.diskStorage({
  destination: (request, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (request, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("profilePic")

exports.clgStaffCreate = (request, response) => {

  upload(request, response, function (err) {
    if (err) {
      console.error("Error uploading image:", err);
      return res.json({ "status": "Error uploading image" });
    }
    const clgStaffToken = request.body.token
    const profilePic = request.file ? request.file.filename : null

    //Checking validations
    const validationErrors = {}

    if (Validator.isEmpty(request.body.collegeStaffName).isValid) {
      validationErrors.name = Validator.isEmpty(request.body.collegeStaffName).message
    }
    if (!Validator.isValidName(request.body.collegeStaffName).isValid) {
      validationErrors.name = Validator.isValidName(request.body.collegeStaffName).message
    }
    if (!Validator.isValidAddress(request.body.clgStaffAddress).isValid) {
      validationErrors.address = Validator.isValidAddress(request.body.clgStaffAddress).message;
    }
    if (!Validator.isValidEmail(request.body.email).isValid) {
      validationErrors.email = Validator.isValidEmail(request.body.email).message;
    }
    if (!Validator.isValidMobileNumber(request.body.phNo).isValid) {
      validationErrors.phone = Validator.isValidMobileNumber(request.body.phNo).message;
    }
    if (!Validator.isValidImageWith1mbConstratint(request.file).isValid) {
      validationErrors.image = Validator.isValidImageWith1mbConstratint(request.file).message;
    }
    if (!Validator.isValidName(request.body.department).isValid) {
      validationErrors.name = Validator.isValidName(request.body.department).message
    }
    if (Validator.isEmpty(request.body.department).isValid) {
      validationErrors.name = Validator.isEmpty(request.body.department).message;
    }
    if (!Validator.isValidPassword(request.body.password).isValid) {
      validationErrors.password = Validator.isValidPassword(request.body.password).message
    }

    //If Validation fails
    if (Object.keys(validationErrors).length > 0) {
      return response.json({ "status": "Validation failed", "data": validationErrors });
    }




    const clgstaff = new CollegeStaff({

      collegeId: request.body.collegeId,
      collegeStaffName: request.body.collegeStaffName,
      email: request.body.email,
      phNo: request.body.phNo,
      aadharNo: request.body.aadharNo,
      clgStaffAddress: request.body.clgStaffAddress,
      profilePic: profilePic,
      department: request.body.department,
      password: request.body.password,
    });



    bcrypt.hash(clgstaff.password, saltRounds, (err, hashedPassword) => {
      if (err) {
        return response.json({ "status": err });
      }

      clgstaff.password = hashedPassword;


      CollegeStaff.clgStaffCreate(clgstaff, (err, data) => {
        if (err) {
          return response.json({ "status": err });
        }

        jwt.verify(clgStaffToken, "lmsapp", (err, decoded) => {
          if (decoded) {
            return response.json({ "status": "success", "data": data });
          } else {
            return response.json({ "status": "Unauthorized access!!" });
          }
        });
      });

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

    const Updatetoken = req.body.token;
    console.log(Updatetoken)
    const validationErrors = {};
    if(!req.file){
      return res.json({ "status": "Image is required." });
    }
    jwt.verify(Updatetoken, "lmsapp", (error, decoded) => {
      if (decoded) {
        if (!Validator.isValidName(req.body.collegeStaffName).isValid) {
          validationErrors.name = Validator.isValidName(req.body.collegeStaffName).message;
        }
        if (!Validator.isValidAddress(req.body.clgStaffAddress).isValid) {
          validationErrors.address = Validator.isValidAddress(req.body.clgStaffAddress).message;
        }
        if (!Validator.isValidMobileNumber(req.body.phNo).isValid) {
          validationErrors.phone = Validator.isValidMobileNumber(req.body.phNo).message;
        }
        if (!req.body.phNo) {
          validationErrors.phone = "Phone number is required.";
        }
        if (!req.file || !Validator.isValidImageWith1mbConstratint(req.file).isValid) {
          validationErrors.image = Validator.isValidImageWith1mbConstratint(req.file).message;
        }
        if (!Validator.isValidName(req.body.department).isValid) {
          validationErrors.department = Validator.isValidName(req.body.department).message;
        }
        if (!req.body.department) {
          validationErrors.department = "Department is required.";
        }

        if (Object.keys(validationErrors).length > 0) {
          return res.json({ "status": "Validation failed", "data": validationErrors });
        }

        const profilePic = req.file ? req.file.filename : null;
        const clgstaff = new CollegeStaff({
          id: req.body.id,
          collegeId: req.body.collegeId,
          collegeStaffName: req.body.collegeStaffName,
          phNo: req.body.phNo,
          clgStaffAddress: req.body.clgStaffAddress,
          profilePic: profilePic,
          department: req.body.department,
        });

        CollegeStaff.updateCollegeStaff(clgstaff, (err, data) => {
          if (err) {
            if (err.status === "not_found") {
              return res.json({ "status": "College staff not found with the provided ID" });
            } else {
              console.error("Internal Server Error:", err);
              return res.json({ "status": "No College found with the provided ID" });
            }
          }

          return res.json({ "status": "success", "data": data });
        });
      } else {
        return res.json({ "status": "Unauthorized User!!" });
      }
    });
  });
};





