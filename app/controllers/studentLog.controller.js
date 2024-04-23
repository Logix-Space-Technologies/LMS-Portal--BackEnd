const jwt = require("jsonwebtoken")
const StudentLog = require("../models/studentLog.model")
const { request, response } = require("express")


exports.viewStudentLog = (request, response) => {
    const studentLogToken = request.headers.token
    key = request.headers.key;
    jwt.verify(studentLogToken, key, (err, decoded) => {
        if (decoded) {
            StudentLog.StudentLog.getAll((err, data) => {
                if (err) {
                    console.log(err)
                    return response.json({ "status": err })
                } else {
                    return response.json(data)
                }
            })
        } else {
            return response.json({ "status": "Unauthorized User!!" })
        }
    })
}


//Admin & AdminStaff Search StudentLog
exports.adminSearchStudentLog = (request, response) => {
    const adminSearchStudLogQuery = request.body.adminSearchStudLogQuery
    const token = request.headers.token
    jwt.verify(token, "lmsapp", (err, decoded) => {
        if (decoded) {
            if (!adminSearchStudLogQuery) {
                console.log("Search Item is required.")
                return response.json({ "status": "Search Item is required." })
            }
            StudentLog.StudentLog.adminSearchStudLog(adminSearchStudLogQuery, (err, data) => {
                if (err) {
                    return response.json({ "status": err })
                } else {
                    if (data.length === 0) {
                        return response.json({ "status": "No Search Items Found" })
                    } else {
                        return response.json({ "status": "Result Found", "data": data })
                    }
                }
            })
        } else {
            return response.json({ "status": "Unauthorized User!!" })
        }
    })
}