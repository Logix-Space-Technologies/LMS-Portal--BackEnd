const jwt = require("jsonwebtoken")
const CollegeStaffLog = require("../models/collegeStaffLog.model")
const { request, response } = require("express")

exports.viewCollegeStaffLog = (request, response) => {
    const clgStaffLogToken = request.headers.token
    jwt.verify(clgStaffLogToken, "lmsapp", (err, decoded) => {
        if (decoded) {
            CollegeStaffLog.CollegeStaffLog.getAll((err, data) => {
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