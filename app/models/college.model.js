const db = require('../models/db')
const { response } = require('express')



const College = function (college) {
    this.id = college.id
    this.collegeName = college.collegeName;
    this.collegeAddress = college.collegeAddress;
    this.website = college.website;
    this.email = college.email;
    this.collegePhNo = college.collegePhNo;
    this.collegeMobileNumber=college.collegeMobileNumber;
    this.collegeImage = college.collegeImage;
};

College.collegeCreate = (newCollege, result) => {
    if (newCollege.collegeName !== "" && newCollege.collegeName !== null) {
        db.query("SELECT * FROM college WHERE email=?", newCollege.email, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            } else {
                if (res.length > 0) {
                    console.log("Email already exists");
                    result("Email already exists", null);
                    return;
                } else {
                    db.query("INSERT INTO college SET ?", newCollege, (err, res) => {
                        if (err) {
                            console.log("error: ", err);
                            result(err, null);
                            return;
                        } else {
                            console.log("Added College: ", { id: res.id, ...newCollege });
                            result(null, { id: res.id, ...newCollege });
                        }
                    });
                }
            }
        });
    } else {
        result(null, { "status": "Content cannot be empty!" });
    }
};

College.getAll = async (result) => {
    let query = "SELECT * FROM college"
    db.query(query, (err, response) => {
        if (err) {
            console.log("error: ", err)
            result(null, err)
            return
        } else {
            console.log("College: ", response)
            result(null, response)
        }
    })
}



College.delete = async (clgId, result) =>{
    db.query("UPDATE college SET isActive=0, deleteStatus=1 WHERE id = ?", [clgId.id], (err, res)=>{
        if(err){
            console.error("Error deleting college: ", err)
            result(err, null)
            return
        }

        if(res.affectedRows === 0){
            result({ kind: "not_found"}, null)
            return
        }

        console.log("Delete college with id: ", {id : clgId.id})
        result(null, {id:clgId.id})
    } )
}




College.updateCollege = (id, clgUpdate, result) => {
    db.query("UPDATE college SET collegeName = ?, collegeAddress = ?, website = ?, email = ?, collegePhNo = ?, collegeImage = ?, updatedDate = CURRENT_DATE() WHERE id = ?",
        [clgUpdate.collegeName, clgUpdate.collegeAddress, clgUpdate.website, clgUpdate.email, clgUpdate.collegePhNo, clgUpdate.collegeImage, id],
        (err, res) => {
            if (err) {
                console.log("error : ", err)
                result(err, null)
                return
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null)
                return
            }

            console.log("Updated College Details : ", { id: id, ...clgUpdate })
            result(null, { id: id, ...clgUpdate })
        })
}



module.exports = College;
