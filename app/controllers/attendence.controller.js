const jwt = require("jsonwebtoken");
const Validator = require("../config/data.validate")
const mailContents = require('../config/mail.content');
const mail = require('../../sendEmail');
require('dotenv').config({ path: '../../.env' });
const Attendence = require("../models/attendence.model")

exports.markAttendance = (request, response) => {
    const attendanceToken = request.headers.token;

    jwt.verify(attendanceToken, "lmsappstud", (err, decoded) => {
        if (decoded) {

            const validationErrors = {}

            if (Validator.isEmpty(request.body.studId).isValid) {
                validationErrors.studId = Validator.isEmpty(request.body.studId).message;
            }

            if (Validator.isEmpty(request.body.sessionId).isValid) {
                validationErrors.sessionId = Validator.isEmpty(request.body.sessionId).message;
            }

            if (Object.keys(validationErrors).length > 0) {
                console.log(validationErrors)
                return response.json({ "status": "Validation failed", "data": validationErrors });
            }

            const attendance = new Attendence({
                studId: request.body.studId,
                sessionId: request.body.sessionId
            });

            Attendence.markAttendence(attendance, (err, data) => {
                if (err) {
                    return response.json({ "status": err });
                } else {
                    return response.json({ "status": "Attendence Marked Successfully!!!" });
                }
            })

        } else {
            response.json({ "status": "Unauthorized User!!" });
        }
    })
}