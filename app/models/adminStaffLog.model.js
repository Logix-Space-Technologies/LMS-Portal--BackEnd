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

AdminStaffLog.getAll = async(result) => {
    let query = "SELECT asg.AdStaffName,asl.* FROM adminstafflog asl JOIN admin_staff asg ON asl.AdmStaffId=asg.id WHERE asg.deleteStatus=0 AND asg.isActive=1"
    db.query(query, (err, response) => {
        if (err) {
            console.log("Error : ",err)
            result(err, null)
            return           
        } else {
            const formattedAdmStaffLog = response.map(admstafflog => ({ ...admstafflog, DateTime: admstafflog.DateTime.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })}));
            console.log("Admin Staff Log : ", formattedAdmStaffLog)
            result(null, formattedAdmStaffLog)
        }
    })

}


module.exports = { AdminStaffLog, logAdminStaff }