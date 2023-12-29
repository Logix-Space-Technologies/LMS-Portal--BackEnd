const { request, response } = require("express");
const { Student, Payment, Tasks } = require("../models/student.model");
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Validator = require("../config/data.validate");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const fileNameWithoutSpaces = Date.now() + file.originalname.replace(/\s/g, '');
        cb(null, fileNameWithoutSpaces);
    },
});

const upload = multer({ storage: storage }).single('studProfilePic');

exports.createStudent = (req, res) => {
    upload(req, res, function (err) {
        if (err) {
            console.error("Error uploading image:", err);
            return res.json({ "status": err });
        }

        const { collegeId, batchId, studName, admNo, rollNo, studDept, course, studEmail, studPhNo, aadharNo, password, rpPaymentId, rpOrderId, rpAmount } = req.body;

        const saltRounds = 10;

        const studProfilePic = req.file ? req.file.filename : null;

        // Validation
        const validationErrors = {};

        if (Validator.isEmpty(collegeId).isValid) {
            validationErrors.collegeId = Validator.isEmpty(collegeId).message;
        }

        if (Validator.isEmpty(batchId).isValid) {
            validationErrors.batchId = Validator.isEmpty(batchId).message;
        }

        if (Validator.isEmpty(studName).isValid) {
            validationErrors.studName = Validator.isEmpty(studName).message;
        }

        if (!Validator.isValidName(studName).isValid) {
            validationErrors.studName = Validator.isValidName(studName).message;
        }

        if (Validator.isEmpty(admNo).isValid) {
            validationErrors.admNo = Validator.isEmpty(admNo).message;
        }

        if (Validator.isEmpty(rollNo).isValid) {
            validationErrors.rollNo = Validator.isEmpty(rollNo).message;
        }

        if (Validator.isEmpty(studDept).isValid) {
            validationErrors.studDept = Validator.isEmpty(studDept).message;
        }

        if (Validator.isEmpty(course).isValid) {
            validationErrors.course = Validator.isEmpty(course).message;
        }

        if (Validator.isEmpty(aadharNo).isValid) {
            validationErrors.aadharNo = Validator.isEmpty(aadharNo).message;
        }

        if (!Validator.isValidAadharNumber(aadharNo).isValid) {
            validationErrors.aadharNo = Validator.isValidAadharNumber(aadharNo).message;
        }

        if (Validator.isEmpty(studEmail).isValid) {
            validationErrors.studEmail = Validator.isEmpty(studEmail).message;
        }

        if (!Validator.isValidEmail(studEmail).isValid) {
            validationErrors.studEmail = Validator.isValidEmail(studEmail).message;
        }

        if (!Validator.isValidPhoneNumber(studPhNo).isValid) {
            validationErrors.studPhNo = Validator.isValidPhoneNumber(studPhNo).message;
        }

        if (!Validator.isValidPassword(password).isValid) {
            validationErrors.password = Validator.isValidPassword(password).message;
        }

        if (request.file && !Validator.isValidImageWith1mbConstratint(request.file).isValid) {
            validationErrors.image = Validator.isValidImageWith1mbConstratint(request.file).message;
        }



        // If validation fails
        if (Object.keys(validationErrors).length > 0) {
            return res.json({ "status": "Validation failed", "data": validationErrors });
        }

        bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
            if (err) {
                return res.json({ "status": err });
            }

            const newStudent = new Student({
                collegeId: collegeId,
                batchId: batchId,
                studName: studName,
                admNo: admNo,
                rollNo: rollNo,
                studDept: studDept,
                course: course,
                studEmail: studEmail,
                studPhNo: studPhNo,
                studProfilePic: studProfilePic,
                aadharNo: aadharNo,
                password: hashedPassword
            });

            Student.create(newStudent, (err, data) => {
                if (err) {
                    return res.json({ "status": err });
                } else {
                    // Payment creation logic can be added here
                    const newPayment = new Payment({
                        studId: data.id, // Assuming 'id' is the student's ID
                        rpPaymentId: rpPaymentId,
                        rpOrderId: rpOrderId,
                        rpAmount: rpAmount
                    });

                    Payment.create(newPayment, (paymentErr, paymentData) => {
                        if (paymentErr) {
                            return res.json({ "status": paymentErr });
                        } else {
                            return res.json({ "status": "success", "data": data, "paymentData": paymentData });
                        }
                    });
                }
            });
        });
    });
};



exports.studLog = (request, response) => {
    const { studEmail, password } = request.body

    const getStudEmail = request.body.studEmail
    const getPassword = request.body.password

    Student.findByEmail(studEmail, (err, stud) => {
        if (err) {
            if (err.status === "Null") {
                return response.json({ "status": "Email and Password cannot be null" })
            }
            if (err.kind === "not_found") {
                return response.json({ "status": "Student does not Exist." })
            } else {
                return response.json({ "status": err })
            }
        }

        const passwordMatch = bcrypt.compareSync(password, stud.password)
        if (passwordMatch) {
            jwt.sign({ studEmail: getStudEmail, password: getPassword }, "lmsappstud", { expiresIn: "1d" },
                (error, token) => {
                    if (error) {
                        return response.json({ "status": "Unauthorized User!!" })
                    } else {
                        return response.json({ "status": "Success", "data": stud, "token": token })
                    }
                })
        } else {
            return response.json({ "status": "Invalid Email or Password !!!" })
        }

    })
}



exports.studentTaskView = (request, response) => {
    const studId = request.body.id
    const studTaskToken = request.body.token
    jwt.verify(studTaskToken, "lmsappstud", (err, decoded) => {
        if (decoded) {
            Tasks.studentTaskView(studId, (err, data) => {
                if (err) {
                    response.json({ "status": err });
                } else {
                    if (data.length === 0) {
                        response.json({ "status": "No tasks found!" });
                    } else {
                        response.json({ "status": "success", "data": data });
                    }
                }
            })
        } else {
            response.json({ "status": "Unauthorized User!!" });
        }
    })
}


exports.StdChangePassword = (request, response) => {
    const { studEmail, oldPassword, newPassword, token } = request.body;

    // Verify the JWT token
    jwt.verify(token, "lmsappstud", (err, decoded) => {
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
        Student.StdChangePassword({ studEmail, oldPassword, newPassword }, (err, data) => {
            if (err) {
                response.json({ "status": err });
                return;
            }
            if (oldPassword === newPassword) {
                response.json({ "status": "Old password and new password cannot be same." });
                return;
            }

            if (data.status === "Incorrect Old Password!!") {
                response.json({ "status": "Incorrect Old Password!!" });
            } else if (data.status === "No Student Found") {
                response.json({ "status": "User Not Found!!!" });
            } else {
                response.json({ "status": "Password Updated Successfully." });
            }
        });
    });
};


exports.studentViewProfile = (request, response) => {
    const studId = request.body.studId
    const studProfileToken = request.body.token

    jwt.verify(studProfileToken, "lmsappstud", (err, decoded) => {
        if (decoded) {
            Student.viewStudentProfile(studId, (err, data) => {
                if (err) {
                    response.json({ "status": err })
                } else {
                    response.json({ "status": "success", "data": data });
                }
            })
        } else {
            response.json({ "status": "Unauthorized User!!" });
        }
    })
}


exports.profileUpdateStudent = (request, response) => {
    upload(request, response, function (err) {
        if (err) {
            console.error("Error uploading file:", err);
            return response.json({ "status": err });
        }

        const { studName, admNo, rollNo, studDept, course, studPhNo, studProfilePic, aadharNo } = request.body
 
        const updateProfileToken = request.body.token

        jwt.verify(updateProfileToken, "lmsappstud", (err, decoded) => {
            if (decoded) {
                // Validation
                const validationErrors = {};

                if (Validator.isEmpty(studName).isValid) {
                    validationErrors.studName = Validator.isEmpty(studName).message;
                }

                if (!Validator.isValidName(studName).isValid) {
                    validationErrors.studName = Validator.isValidName(studName).message;
                }

                if (Validator.isEmpty(admNo).isValid) {
                    validationErrors.admNo = Validator.isEmpty(admNo).message;
                }

                if (Validator.isEmpty(rollNo).isValid) {
                    validationErrors.rollNo = Validator.isEmpty(rollNo).message;
                }

                if (Validator.isEmpty(studDept).isValid) {
                    validationErrors.studDept = Validator.isEmpty(studDept).message;
                }

                if (Validator.isEmpty(course).isValid) {
                    validationErrors.course = Validator.isEmpty(course).message;
                }

                if (Validator.isEmpty(aadharNo).isValid) {
                    validationErrors.aadharNo = Validator.isEmpty(aadharNo).message;
                }

                if (!Validator.isValidAadharNumber(aadharNo).isValid) {
                    validationErrors.aadharNo = Validator.isValidAadharNumber(aadharNo).message;
                }

                if (!Validator.isValidPhoneNumber(studPhNo).isValid) {
                    validationErrors.studPhNo = Validator.isValidPhoneNumber(studPhNo).message;
                }


                if (request.file && !Validator.isValidImageWith1mbConstratint(request.file).isValid) {
                    validationErrors.image = Validator.isValidImageWith1mbConstratint(request.file).message;
                }


                // If validation fails
                if (Object.keys(validationErrors).length > 0) {
                    return res.json({ "status": "Validation failed", "data": validationErrors });
                }


                const newStudent = new Student({
                    'id':request.body.id,
                    collegeId: request.body.collegeId,
                    batchId:request.body.batchId,
                    studName: studName,
                    admNo: admNo,
                    rollNo: rollNo,
                    studDept: studDept,
                    course: course,
                    studPhNo: studPhNo,
                    studProfilePic: studProfilePic,
                    aadharNo: aadharNo
                });

                Student.updateStudentProfile(newStudent, (err, data) => {
                    if (err) {
                        if (err.kind === "not_found") {
                            return response.json({ "status": "Student with provided Id and batchId is not found." });
                        } else {
                            return response.json({ "status": err });
                        }
                    } else {
                        response.json({ "status": "success", "data": data });
                    }
                })

            } else {
                response.json({ "status": "Unauthorized User!!" });
            }
        })
    })
}

exports.viewUnverifiedStudents = (request, response) => {
    const token = request.body.token;

    jwt.verify(token, "lmsappclgstaff", (err, decoded) => {
        if (err) {
            return response.json({ "status": "Unauthorized User!!" });
        }

        if (decoded) {
            collegeId=request.body.collegeId;
            Student.viewUnverifiedStudents(collegeId, (err, data) => {
                if (err) {
                    response.json({ "status": err });
                } else {
                    response.json({ "status": "success", "data": data });
                }
            });
        }
    });
};

// View All Students By Admin
exports.viewAllStudsByAdmin = (request, response) => {
    const viewAllStudentByAdminToken = request.body.token
    key = request.body.key
    jwt.verify(viewAllStudentByAdminToken, key, (err, decoded) => {
        if (decoded) {
            Student.viewAllStudentByAdmin((err, data) => {
                if (err) {
                    return response.json({"status" : err})
                } else {
                    return response.json({"status" : "Success", "data" : data})
                }
            })
        } else {
            return response.json({"status" : "Unauthorized User!!"})
        }
    })
}