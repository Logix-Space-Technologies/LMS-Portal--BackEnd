const { response } = require("express")
const db = require("../models/db")

const StudentLog = function (studentlogs) {
    this.StudentId = studentlogs.StudentId
    this.Action = studentlogs.Action
}

const logStudent = (studentId, action) => {
    const studlogs = new StudentLog({
        StudentId: studentId,
        Action: action
    })

    db.query("INSERT INTO studentlogs SET ?", [studlogs], (logErr, logRes) => {
        if (logErr) {
            console.log("error: ", logErr)
        }
    })
}



StudentLog.getAll = async (result) => {
    let query = "SELECT c.collegeName, b.batchName, s.membership_no, s.studName, stl.* FROM studentlogs stl JOIN student s ON stl.StudentId = s.id JOIN college c ON c.id = s.collegeId JOIN batches b ON b.id = s.batchId WHERE s.deleteStatus = 0 AND s.isActive = 1 AND stl.DateTime >= DATE_SUB(NOW(), INTERVAL 1 MONTH) ORDER BY stl.DateTime DESC"
    db.query(query, (err, response) => {
        if (err) {
            console.log("Error : ", err)
            result(err, null)
            return
        } else {
            const formattedStudentLog = response.map(studentstafflog => ({
                ...studentstafflog,
                DateTime: studentstafflog.DateTime.toLocaleString('en-IN', {
                    timeZone: 'Asia/Kolkata',
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                })
            }));
            console.log("Student Log : ", formattedStudentLog)
            result(null, formattedStudentLog)
        }
    })
}


//Admin & AdminStaff Search StudentLog
StudentLog.adminSearchStudLog = (searchKey, result ) => {
    const adminSearchStudLogQuery = '%' + searchKey + '%'
    db.query("SELECT c.collegeName, b.batchName, s.membership_no, s.studName, stl.* FROM studentlogs stl JOIN student s ON stl.StudentId = s.id JOIN college c ON c.id = s.collegeId JOIN batches b ON b.id = s.batchId WHERE s.deleteStatus = 0 AND s.isActive = 1 AND stl.DateTime >= DATE_SUB(NOW(), INTERVAL 1 MONTH) AND (c.collegeName LIKE ? OR b.batchName LIKE ? OR s.membership_no LIKE ? OR s.studName LIKE ? OR stl.Action LIKE ?) ORDER BY stl.DateTime DESC;",
    [adminSearchStudLogQuery, adminSearchStudLogQuery, adminSearchStudLogQuery, adminSearchStudLogQuery, adminSearchStudLogQuery],
    (err, res) => {
        if (err) {
            console.log("Error : ", err)
            result(err, null)
            return
        } else {
            const formattedStudentLog = res.map(studentstafflog => ({
                ...studentstafflog,
                DateTime: studentstafflog.DateTime.toLocaleString('en-IN', {
                    timeZone: 'Asia/Kolkata',
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                })
            }));
            console.log("Student Log : ", formattedStudentLog)
            return result(null, formattedStudentLog)
        }
    })
}

module.exports = { StudentLog, logStudent }