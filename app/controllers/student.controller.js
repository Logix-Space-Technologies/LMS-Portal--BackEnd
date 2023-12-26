const { request, response } = require("express");
const { Student, Payment } = require("../models/student.model");
const multer = require('multer');
const bcrypt = require('bcrypt');
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

        if (!Validator.isValidEmail(studEmail).isValid) {
            validationErrors.studEmail = Validator.isValidEmail(studEmail).message;
        }

        if (!Validator.isValidPhoneNumber(studPhNo).isValid) {
            validationErrors.studPhNo = Validator.isValidPhoneNumber(studPhNo).message;
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