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

CollegeStaff.clgStaffDelete = (staffId, result) => {
    db.query("UPDATE college_staff SET isActive=0, deleteStatus=1 WHERE id=?", staffId, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err,null);
        return;
      } 
      if(res.affectedRows === 0){
        result({ kind: "not_found"}, null)
        return
    }

    console.log("Delete college staff with id: ", staffId)
    result(null,res)
    });
  };
  

CollegeStaff.getAll = async(result) =>{
    let query ="SELECT * FROM college_staff"
    db.query(query, (err, response) => {
        if(err){
            console.log("error: ",err)
            result(null,err)
            return
        }else{
            console.log("College staff: ",response)
            result(null,response)
        }
    })
}


CollegeStaff.updateCollegeStaff = (id, clgstaff, result) => {
    db.query("UPDATE college_staff SET collegeId=?,collegeStaffName=?,email=?,phNo=?,aadharNo=?,clgStaffAddress=?,profilePic=?,department=?,updatedDate = CURRENT_DATE() WHERE id=?",
        [clgstaff.collegeId, clgstaff.collegeStaffName, clgstaff.email, clgstaff.phNo, clgstaff.aadharNo, clgstaff.clgStaffAddress, clgstaff.profilePic, clgstaff.department, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null); 
                return;
            }

            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated college staff details: ", { id: id, ...clgstaff });
            result(null, { id: id, ...clgstaff });
        });
}


module.exports = CollegeStaff