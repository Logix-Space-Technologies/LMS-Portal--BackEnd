const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { request, response } = require("express");
const CollegeStaff = require("../models/clgStaff.model");
const multer = require("multer")
const path = require("path")
const Validator = require("../config/data.validate")
const saltRounds = 10;
const { Student } = require("../models/student.model")
const mailContents = require('../config/mail.content');
const mail = require('../../sendEmail');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');
const fs = require('fs');
require('dotenv').config({ path: '../../.env' });
const db = require('../models/db')



// AWS S3 Client Configuration
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});


// Multer Configuration for file upload with unique filename
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Unique filename: Current timestamp + random number + original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage: storage, limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

exports.clgStaffCreate = (request, response) => {

  const uploadSingle = upload.single('profilePic');

  uploadSingle(request, response, async (error) => {
    if (error) {
      return response.status(500).json({ "status": error.message });
    }

    if (!request.file) {
      return response.status(400).json({ "status": "No file uploaded" });
    }

    // // Read additional form fields
    // const name = request.body.name;
    // const rollNo = request.body.rollNo;

    // File handling
    const file = request.file;
    const fileStream = fs.createReadStream(file.path);

    const uploadParams = {
      Bucket: process.env.S3_BUCKET,
      Key: `uploads/${file.filename}`,
      Body: fileStream
    };

    try {
      const data = await s3Client.send(new PutObjectCommand(uploadParams));
      const imageUrl = `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`;

      // Remove the file from local storage
      fs.unlinkSync(file.path);

      // Respond with the image URL and additional data
      // response.status(200).json({
      //   message: 'File uploaded successfully',
      //   imageUrl: imageUrl,
      //   studentInfo: {
      //     name: name,
      //     rollNumber: rollNo
      //   }
      // });
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
            profilePic: imageUrl,
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
                var collegeName=""
                //send email
                db.query('SELECT collegeName FROM college WHERE id=?', [clgstaff.collegeId], (err, result) => {
                  if (err) {
                    console.log(err)
                  } else {
                  collegeName = result[0].collegeName
                  const collegeStaffName = clgstaff.collegeStaffName
                  const collegeStaffEmail = clgstaff.email
                  const collegeStaffEmailContent = mailContents.collegeStaffHtmlContent(collegeStaffName,collegeName)
                  const collegeStaffTextContent=mailContents.collegeStaffTextContent(collegeStaffName,collegeName)
                  mail.sendEmail(collegeStaffEmail, 'Registration Successful!', collegeStaffEmailContent,collegeStaffTextContent);
                  }
                })
                return response.json({ "status": "success", "data": data });
              }
            });

          });
        } else {
          return response.json({ "status": "Unauthorized access!!" });
        }
      });

    } catch (err) {
      fs.unlinkSync(file.path);
      response.status(500).json({ "status": err.message });
    }
  });
};


exports.clgStaffDelete = (request, response) => {
  const deleteToken = request.headers.token;

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
  const collegeToken = request.headers.token
  key = request.headers.key
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
  const uploadSingle = upload.single('profilePic');
  uploadSingle(req, res, async (error) => {
    if (error) {
      return res.status(500).json({ "status": error.message });
    }
    if (!request.file) {
      return response.status(400).json({ "status": "No file uploaded" });
    }
    // File handling
    const file = request.file;
    const fileStream = fs.createReadStream(file.path);

    const uploadParams = {
      Bucket: process.env.S3_BUCKET,
      Key: `uploads/${file.filename}`,
      Body: fileStream
    };
    try {
      const data = await s3Client.send(new PutObjectCommand(uploadParams));
      const imageUrl = `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`;

      // Remove the file from local storage
      fs.unlinkSync(file.path);
      const Updatetoken = req.headers.token;
      console.log(Updatetoken)
      const validationErrors = {};
      if (!req.file) {
        return res.json({ "status": "Image is required." });
      }
      key = req.headers.key
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

    }
    catch (err) {
      fs.unlinkSync(file.path);
      res.status(500).json({ "status": err.message });
    }
  });
};


exports.searchCollegeStaff = (request, response) => {
  const searchQuery = request.body.searchQuery;
  const collegeStaffToken = request.headers.token;
  const key = request.headers.key;
  jwt.verify(collegeStaffToken, key, (err, decoded) => {
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
  const collegeStaffViewBatchToken = request.headers.token;
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
  const searchstudToken = req.headers.token;
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
  const { email, oldPassword, newPassword} = request.body;
  const token = request.headers.token
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
      } else {
        response.json({ "status": "success" });
      }
    });
  });
};

//To view student

exports.collegeStaffViewStudent = (request, response) => {
  const collegeStaffViewStudent = request.headers.token;
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
  const clgStaffViewTaskToken = request.headers.token
  jwt.verify(clgStaffViewTaskToken, "lmsappclgstaff", (err, decoded) => {
    if (decoded) {
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
  const { collegeId, studentId} = req.body;
  const token = req.headers.token

  if (!collegeId) {
    return res.json({ "status": "College ID is required" });
  }

  if (!studentId) {
    return res.json({ "status": "Student ID is required" });
  }

  if (!token) {
    return res.json({ "status": "Token is required" });
  }

  jwt.verify(token, "lmsappclgstaff", (jwtErr, decoded) => {
    if (jwtErr) {
      return res.json({ "status": "JWT verification failed" });
    }

    CollegeStaff.verifyStudent(collegeId, studentId, (err, result) => {
      if (err) {
        return res.json({ "status": err });
      }

      return res.json({ "status": "Success", "data": result });
    });
  });
};


//College Staff Search Batches
exports.clgStaffSearchBatches = (request, response) => {
  const clgStaffBatchSearchQuery = request.body.clgStaffBatchSearchQuery
  const ClgStaffSearchToken = request.headers.token
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
  const { id } = request.body;
  const clgStaffProfileToken = request.headers.token

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

exports.viewCollegeStaffOfStudent = (request, response) => {
  const { studId } = request.body;
  const clgStaffOfStudentToken = request.headers.token

  if (!studId) {
    return response.json({ "status": "Invalid student ID" });
  }

  if (!clgStaffOfStudentToken) {
    return response.json({ "status": "Token is required." });
  }

  jwt.verify(clgStaffOfStudentToken, "lmsappstud", (err, decoded) => {
    if (err) {
      console.error("Token verification failed:", err);
      return response.json({ "status": "Invalid or expired token." });
    }

    if (!decoded) {
      return response.json({ "status": "Unauthorized Access !!!" });
    }

    CollegeStaff.viewCollegeStaffOfStudent(studId, (err, data) => {
      if (err) {
        console.error("Error while fetching profile:", err);
        return response.json({ "status": err });
      }

      response.json({ "status": "success", "data": data });
    });
  });
}