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

AdminStaffLog.getAll = async (result) => {
    let query = "SELECT asg.AdStaffName, asl.* FROM adminstafflog asl JOIN admin_staff asg ON asl.AdmStaffId=asg.id WHERE asg.deleteStatus=0 AND asg.isActive=1 AND asl.DateTime>=DATE_SUB(CURRENT_TIMESTAMP(), INTERVAL 1 MONTH) AND asl.DateTime<=CURRENT_TIMESTAMP() ORDER BY asl.DateTime DESC;"
    db.query(query, (err, response) => {
        if (err) {
            console.log("Error : ", err)
            result(err, null)
            return
        } else {
            const formattedAdmStaffLog = response.map(admstafflog => ({
                ...admstafflog,
                DateTime: admstafflog.DateTime.toLocaleString('en-IN', {
                    timeZone: 'Asia/Kolkata',
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                })
            }));
            console.log("Admin Staff Log : ", formattedAdmStaffLog)
            result(null, formattedAdmStaffLog)
        }
    })

}

AdminStaffLog.searchAdminStaffLog = (search, result) => {
    const searchTerm = '%' + search + '%'
    db.query("SELECT asg.AdStaffName, asl.* FROM adminstafflog asl JOIN admin_staff asg ON asl.AdmStaffId = asg.id WHERE asg.deleteStatus = 0 AND asg.isActive = 1 AND asg.AdStaffName LIKE ? AND asl.DateTime >= DATE_SUB(CURRENT_TIMESTAMP(), INTERVAL 1 MONTH) AND asl.DateTime <= CURRENT_TIMESTAMP() ORDER BY asl.DateTime DESC;",
        [searchTerm],
        (err, res) => {
            if (err) {
                console.log("Error : ", err)
                result(err, null)
                result
            } else {
                const formattedAdmStaffLog = res.map(admstafflog => ({
                    ...admstafflog,
                    DateTime: admstafflog.DateTime.toLocaleString('en-IN', {
                        timeZone: 'Asia/Kolkata',
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                    })
                }));
                console.log("AdminStaff Log Details : ", formattedAdmStaffLog)
                result(null, formattedAdmStaffLog)
            }
        })
}


module.exports = { AdminStaffLog, logAdminStaff }