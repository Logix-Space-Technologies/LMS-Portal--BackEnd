const jwt = require("jsonwebtoken");
const Validator = require("../config/data.validate")
const mailContents = require('../config/mail.content');
const mail = require('../../sendEmail');
require('dotenv').config({ path: '../../.env' });
const Attendence = require("../models/attendence.model")
const Session = require("../models/session.model");

exports.markAttendance = (request, response) => {
    const attendanceToken = request.headers.token;

    jwt.verify(attendanceToken, "lmsappstud", (err, decoded) => {
        if (decoded) {
            const attendenceCode = request.body.attendenceCode;
            const studId = request.body.studId;

            const validationErrors = {};

            if (Validator.isEmpty(attendenceCode).isValid) {
                validationErrors.attendanceCode = Validator.isEmpty(attendenceCode).message;
            }
            if (Validator.isEmpty(studId).isValid) {
                validationErrors.studId = Validator.isEmpty(studId).message;
            }

            if (Object.keys(validationErrors).length > 0) {
                return response.json({ "status": "Validation failed", "data": validationErrors })
            }

            Session.fetchAttendenceCode(attendenceCode, (err, data) => {
                if (err) {
                    return response.json({ "status": err })
                } else {
                    const sessionId = data
                    console.log(sessionId)
                    const attendance = new Attendence({
                        studId: studId,
                        sessionId: sessionId
                    })
                    console.log(attendance)

                    Attendence.markAttendence(attendance, (err, data) => {
                        if (err) {
                            return response.json({ "status": err });
                        } else {
                            return response.json({ "status": "success" });
                        }
                    })
                }
            })

        } else {
            response.json({ "status": "Unauthorized User!!" });
        }
    })
}

exports.collegeStaffViewAttendance = (request, response) => {
    const attendanceToken = request.headers.token;
    const key = request.headers.key;
    const collegeId = request.body.collegeId;
    jwt.verify(attendanceToken, key, (err, decoded) => {
        if (decoded) {
            Attendence.collegeStaffViewAttendance(collegeId, (err, data) => {
                if (err) {
                    response.json({ "status": err });
                }
                if (data.length == 0) {
                    response.json({ "status": "No attendance records found!" });
                } else {
                    response.json({ "status": "success", "data": data });
                }
            });
        } else {
            response.json({ "status": "Unauthorized User!!" });
        }
    });
};