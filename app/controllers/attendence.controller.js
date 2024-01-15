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
            Session.fetchAttendenceCode(attendenceCode, (err, data) => {
                if (err) {
                    return response.json({ "status": err })
                } else {
                    const sessionId = data
                    console.log(sessionId)
                    const attendance = new Attendence({
                        studId : studId,
                        sessionId : sessionId
                    })

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