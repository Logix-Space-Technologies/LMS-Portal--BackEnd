const { response } = require("express")
const db = require("../models/db")

const CollegeStaffLog = function (collegeStaffLog){
    this.ClgStaffId = collegeStaffLog.ClgStaffId
    this.Action = collegeStaffLog.Action
}

const logCollegeStaff = (clgStaffId, action) =>{
     const collegeStaffLog = new CollegeStaffLog({
        ClgStaffId: clgStaffId,
        Action: action
     })

     db.query("INSERT INTO clgstafflog SET ?", collegeStaffLog, (logErr, logRes) =>{
        if (logErr) {
            console.log("error: ", logErr);
        }
     })
}


CollegeStaffLog.getAll = async(result) => {
    let query = "SELECT cs.collegeStaffName, csl.* FROM clgstafflog csl JOIN college_staff cs ON csl.ClgStaffId = cs.id WHERE cs.deleteStatus = 0 AND cs.isActive = 1"
    db.query(query, (err, response) => {
        if (err) {
            console.log("Error : ", err)
            result(err, null)
            return
        } else {
            console.log("College Staff Log : ", response)
            result(null, response)
        }
    })
}







module.exports = {CollegeStaffLog, logCollegeStaff}