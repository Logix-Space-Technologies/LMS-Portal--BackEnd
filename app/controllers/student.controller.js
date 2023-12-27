const { request, response } = require("express");
const { Student, Payment } = require("../models/student.model");
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Validator = require("../config/data.validate");
const jwt = require("jsonwebtoken")

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
                return response.json({"status" : "Email and Password cannot be null"})
            }
            if (err.kind === "not_found") {
                return response.json({ "status": "Student does not Exist." })
            } else {
                return response.json({ "status": "Error retrieving student details" })
            }
        }
        
        const passwordMatch = bcrypt.compareSync(password, stud.password)
        if (passwordMatch) {
            jwt.sign({ studEmail: getStudEmail, password: getPassword }, "lmsapp", { expiresIn: "1d" },
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

exports.searchStudentByCollegeId = (req, res) => {
    const searchQuery = req.body.searchQuery;
    const collegeId = req.body.collegeId;
    // const searchToken = req.body.searchToken;
    // jwt.verify(searchToken, "lmsapp", (err, decoded) => {
        if(!searchQuery){
            return res.json({ "status": "Search query is empty!!" });
        }
        // if (decoded) {
            Student.searchStudentByCollegeId(searchQuery, collegeId, (err, data) => {
                if (err) {
                    return res.json({ "status": err });
                } else {
                    return res.json({ "status": "success", "data": data });
                }
            });
    //     } else {
    //         return res.json({ "status": "Unauthorized User!!" });
    //     }
    // });

}
