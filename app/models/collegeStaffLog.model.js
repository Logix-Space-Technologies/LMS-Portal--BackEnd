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

module.exports = {CollegeStaffLog, logCollegeStaff}