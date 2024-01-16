const jwt = require("jsonwebtoken")
const StudentLog = require("../models/studentLog.model")
const { request, response } = require("express")


exports.viewStudentLog = (request, response) => {
    const studentLogToken = request.headers.token
    key = request.headers.key;
    jwt.verify(studentLogToken, key , (err, decoded) => {
        if (decoded) {
            StudentLog.StudentLog.getAll((err, data) => {
                if (err) {
                    console.log(err)
                    response.json({ "status": err })
                } else {
                    response.json(data)
                }
            })
        } else {
            response.json({ "status": "Unauthorized User!!" })
        }
    })
}