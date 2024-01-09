const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { request, response } = require("express");
const CollegeStaff = require("../models/clgStaff.model");
const multer = require("multer")
const path = require("path")
const Validator = require("../config/data.validate")
const saltRounds = 10;
const { Student } = require("../models/student.model")

const storage = multer.diskStorage({
  destination: (request, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (request, file, cb) => {
    cb(null, Date.now() + file.originalname.replace(/[^\w\-.]/g, ''));
  },
});

const upload = multer({ storage: storage }).single("profilePic")

exports.clgStaffCreate = (request, response) => {

  upload(request, response, function (err) {
    if (err) {
      console.error("Error uploading image:", err);
      return response.json({ "status": "Error uploading image" });
    }
    const clgStaffToken = request.headers.token
    key = request.headers.key;
    console.log(clgStaffToken)
    jwt.verify(clgStaffToken, key, (err, decoded) => {
      if (decoded) {
        const profilePic = request.file ? request.file.filename : null
        if (!request.file) {
          return response.json({ "status": "Image cannot be empty!" })
        }
        //Checking validations
        const validationErrors = {}

        if (Validator.isEmpty(request.body.collegeId).isValid) {
          validationErrors.id = Validator.isEmpty(request.body.collegeId).message
        }

        if (Validator.isEmpty(request.body.collegeStaffName).isValid) {
          validationErrors.name = Validator.isEmpty(request.body.collegeStaffName).message
        }
        if (!Validator.isValidName(request.body.collegeStaffName).isValid) {
          validationErrors.name = Validator.isValidName(request.body.collegeStaffName).message
        }
        if (Validator.isEmpty(request.body.clgStaffAddress).isValid) {
          validationErrors.address = Validator.isEmpty(request.body.clgStaffAddress).message;
        }
        if (!Validator.isValidAddress(request.body.clgStaffAddress).isValid) {
          validationErrors.address = Validator.isValidAddress(request.body.clgStaffAddress).message;
        }
        if (Validator.isEmpty(request.body.email).isValid) {
          validationErrors.email = Validator.isEmpty(request.body.email).message;
        }
        if (!Validator.isValidEmail(request.body.email).isValid) {
          validationErrors.email = Validator.isValidEmail(request.body.email).message;
        }
        if (Validator.isEmpty(request.body.phNo).isValid) {
          validationErrors.mobile = Validator.isEmpty(request.body.phNo).message;
        }

        if (!Validator.isValidMobileNumber(request.body.phNo).isValid) {
          validationErrors.mobile = Validator.isValidMobileNumber(request.body.phNo).message;
        }
        if (!Validator.isValidImageWith1mbConstratint(request.file).isValid) {
          validationErrors.image = Validator.isValidImageWith1mbConstratint(request.file).message;
        }
        if (Validator.isEmpty(request.body.department).isValid) {
          validationErrors.name = Validator.isEmpty(request.body.department).message;
        }
        if (!Validator.isValidName(request.body.department).isValid) {
          validationErrors.name = Validator.isValidName(request.body.department).message
        }
        if (Validator.isEmpty(request.body.password).isValid) {
          validationErrors.password = Validator.isEmpty(request.body.password).message;
        }

        if (!Validator.isValidPassword(request.body.password).isValid) {
          validationErrors.password = Validator.isValidPassword(request.body.password).message
        }
        if (Validator.isEmpty(request.body.aadharNo).isValid) {
          validationErrors.aadharnumber = Validator.isEmpty(request.body.aadharNo).message;
        }
        if (!Validator.isValidAadharNumber(request.body.aadharNo).isValid) {
          validationErrors.aadharnumber = Validator.isValidAadharNumber(request.body.aadharNo).message
        }
        //If Validation fails
        if (Object.keys(validationErrors).length > 0) {
          console.log(validationErrors)
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

        console.log(clgstaff)



        bcrypt.hash(clgstaff.password, saltRounds, (err, hashedPassword) => {
          if (err) {
            return response.json({ "status": err });
          }


          clgstaff.password = hashedPassword;


          CollegeStaff.clgStaffCreate(clgstaff, (err, data) => {
            if (err) {
              return response.json({ "status": err });
            } else {
              return response.json({ "status": "success", "data": data });
            }
          });

        });
      } else {
        return response.json({ "status": "Unauthorized access!!" });
      }
    });
  });
};


exports.clgStaffDelete = (request, response) => {
  const deleteToken = request.body.token;

  jwt.verify(deleteToken, "lmsapp", (err, decoded) => {
    if (decoded) {
      const collegeStaff = new CollegeStaff({
        'id': request.body.id
      });
      if (!request.body.id) {
        return response.json({ "status": "College staff id should not be empty" })
      }
      CollegeStaff.clgStaffDelete(collegeStaff, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            response.json({ "status": "College Staff ID not found." });
          } else {
            console.error(err);
            response.json({ "status": "Error deleting Staff." });
          }
        } else {
          response.json({ "status": "Deleted successfully" });
        }
      });

    } else {
      response.json({ "status": "Unauthorized User!!" });
    }
  });
};


exports.viewAllCollegeStaff = (request, response) => {
  const collegeToken = request.body.token
  key = request.body.key
  jwt.verify(collegeToken, key, (err, decoded) => {
    if (decoded) {
      CollegeStaff.getAll((err, data) => {
        if (err) {
          console.log(err)
          response.json({ "status": err })
        } else {
          response.json(data)
        }
      })
    } else {
      response.json({ "status": "Unauthorized User!!" });
    }
  })
}


exports.collegeStaffUpdate = (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      console.error("Error uploading image:", err);
      return res.json({ "status": "Error uploading image" });
    }

    const Updatetoken = req.body.token;
    console.log(Updatetoken)
    const validationErrors = {};
    if (!req.file) {
      return res.json({ "status": "Image is required." });
    }
    key = request.body.key
    jwt.verify(Updatetoken, key, (error, decoded) => {
      if (decoded) {
        if (!req.body.collegeStaffName) {
          validationErrors.name = "Name is required.";
        }
        if (!Validator.isValidName(req.body.collegeStaffName).isValid) {
          validationErrors.name = Validator.isValidName(req.body.collegeStaffName).message;
        }
        if (!req.body.clgStaffAddress) {
          validationErrors.address = "Address is required.";
        }
        if (!Validator.isValidAddress(req.body.clgStaffAddress).isValid) {
          validationErrors.address = Validator.isValidAddress(req.body.clgStaffAddress).message;
        }
        if (!req.body.phNo) {
          validationErrors.phNo = "Mobile number is required.";
        }
        if (!Validator.isValidMobileNumber(req.body.phNo).isValid) {
          validationErrors.phone = Validator.isValidMobileNumber(req.body.phNo).message;
        }
        if (!req.file || !Validator.isValidImageWith1mbConstratint(req.file).isValid) {
          validationErrors.image = Validator.isValidImageWith1mbConstratint(req.file).message;
        }
        if (!req.body.department) {
          validationErrors.department = "Department is required.";
        }
        if (!Validator.isValidName(req.body.department).isValid) {
          validationErrors.department = Validator.isValidName(req.body.department).message;
        }
        if (!req.body.aadharNo) {
          validationErrors.aadharnumber = "Aadhar number is required.";
        }
        if (!Validator.isValidAadharNumber(req.body.aadharNo).isValid) {
          validationErrors.aadharnumber = Validator.isValidAadharNumber(req.body.aadharNo).message;
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
          aadharNo: req.body.aadharNo
        });

        CollegeStaff.updateCollegeStaff(clgstaff, (err, data) => {
          if (err) {
            return res.json({ "status": err });
          }
          return res.json({ "status": "success", "data": data });
        });
      } else {
        return res.json({ "status": "Unauthorized User!!" });
      }
    });
  });
};


exports.searchCollegeStaff = (request, response) => {
  const searchQuery = request.body.searchQuery;
  const collegeStaffToken = request.body.token;

  jwt.verify(collegeStaffToken, "lmsapp", (err, decoded) => {
    if (decoded) {
      if (searchQuery === null || searchQuery === undefined || searchQuery.trim() === "") {
        return response.json({ "status": "Search query is required." });
      }

      CollegeStaff.searchCollegeStaff(searchQuery, (err, data) => {
        if (err) {
          response.json({ "status": err });
        } else {
          if (data.length === 0) {
            response.json({ "status": "No search items found." });
          } else {
            response.json({ "status": "success", "data": data });
          }

        }
      });
    } else {
      response.json({ "status": "Unauthorized User!!" });
    }
  });
};


//College Staff Login
exports.collegeStaffLogin = (request, response) => {
  const { email, password } = request.body

  const getClgStaffEmail = request.body.email
  const getClgStaffPassword = request.body.password
  const validationErrors = {}

  if (Validator.isEmpty(email).isValid) {
    validationErrors.email = Validator.isEmpty(email).message;
  }
  if (!Validator.isValidEmail(email).isValid) {
    validationErrors.email = Validator.isValidEmail(email).message;
  }

  if (Validator.isEmpty(password).isValid) {
    validationErrors.password = Validator.isEmpty(password).message;
  }


  if (Object.keys(validationErrors).length > 0) {
    return response.json({ "status": "Validation failed", "data": validationErrors });
  }

  CollegeStaff.findByClgStaffEmail(email, (err, clgstaff) => {
    if (err) {
      if (err.kind === "not_found") {
        return response.json({ "status": "College Staff does not Exist." })
      } else {
        return response.json({ "status": "Error retrieving College Staff Details." })
      }
    } else {
      const clgStaffPasswordMatch = bcrypt.compareSync(password, clgstaff.password)
      if (clgStaffPasswordMatch) {
        jwt.sign({ email: getClgStaffEmail, password: getClgStaffPassword }, "lmsappclgstaff", { expiresIn: "30m" },
          (error, token) => {
            if (error) {
              return response.json({ "status": "Unauthorized User!!" })
            } else {
              return response.json({ "status": "Success", "data": clgstaff, "token": token })
            }
          })
      } else {
        return response.json({ "status": "Invalid Email or Password!!!" })
      }
    }
  })
}

exports.collegeStaffViewBatch = (request, response) => {
  const collegeStaffViewBatchToken = request.body.token;
  jwt.verify(collegeStaffViewBatchToken, "lmsappclgstaff", (err, decoded) => {
    if (decoded) {
      // Assuming you have batchId in the request parameters or body
      const collegeId = request.body.collegeId;
      CollegeStaff.viewBatch(collegeId, (err, data) => {
        if (err) {
          response.json({ "status": err });
        }
        if (data.length === 0) {
          response.json({ "status": "No Batch found!" });
        } else {
          response.json({ "status": "success", "data": data });
        }
      });
    } else {
      response.json({ "status": "Unauthorized User!!" });
    }
  });
};

exports.searchStudentByCollegeId = (req, res) => {
  const searchQuery = req.body.searchQuery;
  const collegeId = req.body.collegeId;
  const searchstudToken = req.body.token;
  jwt.verify(searchstudToken, "lmsappclgstaff", (err, decoded) => {
    if (decoded) {
      if (!searchQuery) {
        return res.json({ "status": "Search query is empty!!" });
      }
      Student.searchStudentByCollege(searchQuery, collegeId, (err, data) => {
        if (err) {
          return res.json({ "status": err });
        } else {
          if (data.length === 0) {
            return res.json({ "status": "No search items found." });
          } else {
            return res.json({ "status": "success", "data": data });
          }
        }
      });
    } else {
      return res.json({ "status": "Unauthorized User!!" });
    }
  });

}


exports.collegeStaffChangePassword = (request, response) => {
  const { email, oldPassword, newPassword, token } = request.body;

  // Check if email is provided
  if (!email) {
    return response.json({ "status": "Email is required for password update." });
  }

  // Verify the JWT token
  jwt.verify(token, "lmsappclgstaff", (err, decoded) => {
    if (err || !decoded) {
      response.json({ "status": "Unauthorized User!!" });
      return;
    }

    // Validate old and new passwords
    const validationErrors = {};

    if (!oldPassword) {
      validationErrors.oldPassword = "Old password is required.";
    }

    const passwordValidation = Validator.isValidPassword(newPassword);
    if (!passwordValidation.isValid) {
      validationErrors.newPassword = passwordValidation.message;
    }

    if (Object.keys(validationErrors).length > 0) {
      return response.json({ "status": "Validation failed", "data": validationErrors });
    }

    // Check old password and update if valid
    CollegeStaff.collegeStaffChangePassword({ email, oldPassword, newPassword }, (err, data) => {
      if (err) {
        response.json({ "status": err });
        return;
      }

      if (oldPassword === newPassword) {
        response.json({ "status": "Old password and new password cannot be the same." });
        return;
      }

      if (data.status === "Incorrect Old Password!!") {
        response.json({ "status": "Incorrect Old Password!!" });
      } else if (data.status === "No college staff Found") {
        response.json({ "status": "User Not Found!!!" });
      } else {
        response.json({ "status": "Password Updated Successfully." });
      }
    });
  });
};

//To view student

exports.collegeStaffViewStudent = (request, response) => {
  const collegeStaffViewStudent = request.body.token;
  jwt.verify(collegeStaffViewStudent, "lmsappclgstaff", (err, decoded) => {
    if (decoded) {
      const collegeId = request.body.collegeId;
      CollegeStaff.viewStudent(collegeId, (err, data) => {
        if (err) {
          response.json({ "status": err });
        }
        if (!data || data.length === 0) {
          response.json({ "status": "No Student found!" });
        } else {
          response.json({ "status": "success", "data": data });
        }
      });
    } else {
      response.json({ "status": "Unauthorized User!!" });
    }
  });
};


exports.clgStaffViewTask = (request, response) => {
  const clgStaffViewTaskToken = request.body.token
  jwt.verify(clgStaffViewTaskToken, "lmsappclgstaff", (err, decoded) => {
    if (decoded) {


      //Assuming that we have task id in the request params body
      const collegeId = request.body.collegeId
      CollegeStaff.viewTask(collegeId, (err, data) => {
        if (err) {
          response.json({ "status": err })
        }
        if (data.length === 0) {

          response.json({ "status": "No task found" })
        } else {
          response.json({ "status": "success", "data": data })
        }
      })
    } else {
      response.json({ "status": "Unauthorized User!!" })
    }
  })
}


exports.studentVerificationByCollegeStaff = (req, res) => {
  const { collegeStaffId, studentId, token } = req.body;

  if (!collegeStaffId || !studentId || !token) {
    return res.json({ "status": "Validation failed", "data": "CollegeStaff ID, Student ID, and Token are required" });
  }

  jwt.verify(token, "lmsapptwo", (jwtErr, decoded) => {
    if (jwtErr) {
      return res.json({ "status": "Error", "data": "JWT verification failed" });
    }

    CollegeStaff.verifyStudent(collegeStaffId, studentId, (err, result) => {
      if (err) {
        return res.json({ "status": "Error", "data": err });
      }

      return res.json({ "status": "Success", "data": result });
    });
  });
};


//College Staff Search Batches
exports.clgStaffSearchBatches = (request, response) => {
  const clgStaffBatchSearchQuery = request.body.clgStaffBatchSearchQuery
  const ClgStaffSearchToken = request.body.token
  const collegeId = request.body.collegeId
  jwt.verify(ClgStaffSearchToken, "lmsappclgstaff", (err, decoded) => {
    if (decoded) {
      if (!clgStaffBatchSearchQuery) {
        console.log("Search Item is required.")
        return response.json({ "status": "Search Item is required." })
      }
      CollegeStaff.collegeStaffSearchBatch(clgStaffBatchSearchQuery, collegeId, (err, data) => {
        if (err) {
          response.json({ "status": err })
        } else {
          if (data.length === 0) {
            response.json({ "status": "No Search Items Found" })
          } else {
            response.json({ "status": "Result Found", "data": data })
          }
        }
      })
    } else {
      response.json({ "status": "Unauthorized User!!" })
    }
  })
}




exports.viewCollegeStaffProfile = (request, response) => {
  const { id, token: clgStaffProfileToken } = request.body;

  if (!id) {
    return response.json({ "status": "Invalid college staff ID" });
  }

  if (!clgStaffProfileToken) {
    return response.json({ "status": "Token is required." });
  }

  jwt.verify(clgStaffProfileToken, "lmsappclgstaff", (err, decoded) => {
    if (err) {
      console.error("Token verification failed:", err);
      return response.json({ "status": "Invalid or expired token." });
    }

    if (!decoded) {
      return response.json({ "status": "Unauthorized Access !!!" });
    }

    CollegeStaff.viewCollegeStaffProfile(id, (err, data) => {
      if (err) {
        console.error("Error while fetching profile:", err);
        return response.json({ "status": err });
      }

      response.json({ "status": "success", "data": data });
    });
  });
};