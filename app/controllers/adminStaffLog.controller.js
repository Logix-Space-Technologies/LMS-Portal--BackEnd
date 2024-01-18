const jwt = require("jsonwebtoken")
const AdminStaffLog = require("../models/adminStaffLog.model")



exports.viewAdminStaffLog = (request, response) => {
    const adminStaffLogToken = request.headers.token
    jwt.verify(adminStaffLogToken, "lmsapp", (err, decoded) => {
        if (decoded) {
            AdminStaffLog.AdminStaffLog.getAll((err, data) => {
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
