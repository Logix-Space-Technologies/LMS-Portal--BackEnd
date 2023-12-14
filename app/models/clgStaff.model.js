const { response } = require("express")
const db = require("../models/db")

const CollegeStaff = function (collegestaff) {
    this.collegeId = collegestaff.collegeId
    this.collegeStaffName = collegestaff.collegeStaffName
    this.email = collegestaff.email
    this.phNo = collegestaff.phNo
    this.aadharNo = collegestaff.aadharNo
    this.clgStaffAddress = collegestaff.clgStaffAddress
    this.profilePic = collegestaff.profilePic
    this.department = collegestaff.department
    this.password = collegestaff.password

}

CollegeStaff.clgStaffCreate = (newClgStaff, result) => {
    if (newClgStaff.collegeStaffName !== "" && newClgStaff.collegeStaffName !== null) {
        db.query("SELECT * FROM college_staff WHERE email=? ", newClgStaff.email, (err, res) => {
            console.log(newClgStaff)
            if (err) {
                console.log("error: ", err)
                result(null, err)
                return

            } else {
                if (res.length > 0) {
                    console.log("Email already exists");
                    result(null, "Email already exists");
                    return;
                } else {
                    db.query("INSERT INTO college_staff SET ?", newClgStaff, (err, res) => {
                        if (err) {
                            console.log("error: ", err);
                            result(null, err);
                            return;
                        } else {
                            console.log("Added College staff: ", { id: res.id, ...newClgStaff });
                            result(null, { id: res.id, ...newClgStaff });
                        }
                    });
                }

            }
        })
    } else {
        response.json({ "status": "Cannot be empty." })
    }

}



module.exports = CollegeStaff