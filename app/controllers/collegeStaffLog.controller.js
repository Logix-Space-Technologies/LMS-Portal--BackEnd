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

exports.searchCollegeStaffLog = (request, response) => {
    const collegeStaffLogSearchQuery = request.body.SearchQuery
    const collegeStaffLogSearchToken = request.headers.token
    const collegeStaffLogSearchKey = request.headers.key

    jwt.verify(collegeStaffLogSearchToken, collegeStaffLogSearchKey, (err, decoded) => {
        if (decoded) {
            if (!collegeStaffLogSearchQuery) {
                return response.json({ "status": "Search Item is required." })
            }
            CollegeStaffLog.CollegeStaffLog.searchCollegeStaffLog(collegeStaffLogSearchQuery, (err, data) => {
                if (err) {
                    return response.json({ "status": err })
                } else {
                    if (data.length === 0) {
                        return response.json({ "status": "No Search Items Found." })
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