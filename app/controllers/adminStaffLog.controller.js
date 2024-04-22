const jwt = require("jsonwebtoken")
const AdminStaffLog = require("../models/adminStaffLog.model")



exports.viewAdminStaffLog = (request, response) => {
    const adminStaffLogToken = request.headers.token
    jwt.verify(adminStaffLogToken, "lmsapp", (err, decoded) => {
        if (decoded) {
            AdminStaffLog.AdminStaffLog.getAll((err, data) => {
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

exports.searchAdminStaffLog = (request, response) => {
    const adminStaffLogSearchQuery = request.body.SearchQuery
    const adminStaffLogSearchToken = request.headers.token
    const adminStaffLogSearchKey = request.headers.key

    jwt.verify(adminStaffLogSearchToken, adminStaffLogSearchKey, (err, decoded) => {
        if (decoded) {
            if (!adminStaffLogSearchQuery) {
                return response.json({ "status": "Search Item is required." })
            }
            AdminStaffLog.AdminStaffLog.searchAdminStaffLog(adminStaffLogSearchQuery, (err, data) => {
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
