const { response } = require("express")
const db = require("../models/db")


const AdminStaffLog = function (adminStaffLog) {
    this.AdmStaffid = adminStaffLog.AdmStaffId
    this.Action = adminStaffLog.Action
}

const logAdminStaff = (admStaffId, action) => {
    const adminStaffLog = new AdminStaffLog({
        AdmStaffId: admStaffId,
        Action: action
    });

    db.query("INSERT INTO adminstafflog SET ?", adminStaffLog, (logErr, logRes) => {
        if (logErr) {
            console.log("error: ", logErr);
        }

        // console.log("Admin Staff Log created: ", { id: logRes.insertId, ...adminStaffLog });
    });
};

module.exports = { AdminStaffLog, logAdminStaff }