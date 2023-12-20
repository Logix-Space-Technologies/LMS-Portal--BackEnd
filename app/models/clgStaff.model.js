const { response } = require("express")
const db = require("../models/db")

const CollegeStaff = function (collegestaff) {
    this.id=collegestaff.id
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
                    result("Email already exists",null);
                    return;
                } else {
                    db.query("INSERT INTO college_staff SET ?", newClgStaff, (err, res) => {
                        if (err) {
                            console.log("error: ", err);
                            result(err,null);
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




CollegeStaff.updateCollegeStaff = (clgstaff, result) => {
    db.query("UPDATE college_staff SET collegeId=?,collegeStaffName=?,email=?,phNo=?,clgStaffAddress=?,profilePic=?,department=?,updatedDate = CURRENT_DATE() WHERE id=?",
        [clgstaff.collegeId, clgstaff.collegeStaffName, clgstaff.email, clgstaff.phNo, clgstaff.clgStaffAddress, clgstaff.profilePic, clgstaff.department, clgstaff.id],
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

            console.log("updated college staff details: ", { id: clgstaff.id, ...clgstaff });
            result(null, { id: clgstaff.id, ...clgstaff });
        });
}



CollegeStaff.clgStaffDelete = (collegeStaffId, result) => {
    db.query("UPDATE college_staff SET isActive=0, deleteStatus=1 WHERE id=?",[collegeStaffId.id], 
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        if (res.affectedRows === 0) {
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("Delete college staff with id: ", { id: collegeStaffId.id });
        result(null, { id: collegeStaffId.id });
      }
    );
  };
  

CollegeStaff.getAll = async(result) =>{
    let query = "SELECT c.collegeName, cs.* FROM college_staff cs JOIN college c ON cs.collegeId = c.id";
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

CollegeStaff.getOne = async(collegeId,result) =>{
    let query = "SELECT c.collegeName, cs.* FROM college_staff cs JOIN college c ON cs.collegeId = c.id WHERE cs.collegeId = ?";
    db.query(query,[collegeId], (err, response) => {
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




module.exports = CollegeStaff