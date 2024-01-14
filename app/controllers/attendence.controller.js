const jwt = require("jsonwebtoken");
const Validator = require("../config/data.validate")
const mailContents = require('../config/mail.content');
const mail = require('../../sendEmail');
require('dotenv').config({ path: '../../.env' });
const Attendance = require("../models/attendence.model")

exports.markAttendance = (request, response) => {
    const attendanceToken = request.headers.token;

    jwt.verify(attendanceToken, "lmsappstud", (err, decoded) => {
        if (decoded) {
            const attendance = new Attendance({
                studId: request.body.studId,
                sessionId: request.body.sessionId
            });

            Attendance.markAttendence(attendance,(err,data)=>{
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