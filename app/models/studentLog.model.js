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

module.exports = { StudentLog, logStudent }