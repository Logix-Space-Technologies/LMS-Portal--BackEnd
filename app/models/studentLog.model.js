const { response } = require("express")
const db = require("../models/db")

const StudentLog = function(studentlogs){
    this.StudentId = studentlogs.StudentId
    this.Action = studentlogs.Action
}

const logStudent = (studentId, action) =>{
    const studlogs = new StudentLog({
        StudentId: studentId,
        Action: action
    })

    db.query("INSERT INTO studentlogs SET ?", [studlogs], (logErr, logRes) =>{
        if (logErr) {
            console.log("error: ", logErr)
        }
    })
}



StudentLog.getAll = async(result) => {
    let query = "SELECT s.studName, stl.* FROM studentlogs stl JOIN student s ON stl.StudentId = s.id WHERE s.deleteStatus = 0 AND s.isActive = 1"
    db.query(query, (err, response) => {
        if (err) {
            console.log("Error : ", err)
            result(err, null)
            return
        } else {
            const formattedStudentLog = response.map(studentstafflog => ({ ...studentstafflog, DateTime: studentstafflog.DateTime.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })}));
            console.log("Student Log : ", formattedStudentLog)
            result(null, formattedStudentLog)
        }
    })
}


module.exports = { StudentLog, logStudent }