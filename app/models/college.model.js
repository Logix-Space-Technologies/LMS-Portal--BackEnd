const db = require('../models/db')
const { response } = require('express')




const College = function (college) {
    this.id = college.id
    this.collegeName = college.collegeName;
    this.collegeAddress = college.collegeAddress;
    this.website = college.website;
    this.email = college.email;
    this.collegePhNo = college.collegePhNo;
    this.collegeMobileNumber = college.collegeMobileNumber;
    this.collegeImage = college.collegeImage;
};

College.collegeCreate = (newCollege, result) => {
    if (newCollege.collegeName !== "" && newCollege.collegeName !== null) {
        // Check if email already exists
        db.query("SELECT * FROM college WHERE email=? AND deleteStatus=0 AND isActive=1", newCollege.email, (err, res) => {
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
                    // Check if website already exists only if it is provided
                    if (newCollege.website !== "") {
                        db.query("SELECT * FROM college WHERE website=? AND deleteStatus=0 AND isActive=1", newCollege.website, (err, res) => {
                            if (err) {
                                console.log("error: ", err);
                                result(err, null);
                                return;
                            } else {
                                if (res.length > 0) {
                                    console.log("Website already exists");
                                    result("Website already exists", null);
                                    return;
                                } else {
                                    // Insert new college if email and website do not exist
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
                        // Insert new college if email exists and website is not provided
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
            }
        });
    } else {
        result(null, { "status": "Content cannot be empty!" });
    }
};



College.collegeViewAll = async (result) => {
    let query = "SELECT * FROM college WHERE deleteStatus= 0 AND isActive= 1"
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



College.delete = async (clgId, result) => {
    db.query("UPDATE college SET isActive=0, deleteStatus=1 WHERE id = ?", [clgId.id], (err, res) => {
        if (err) {
            console.error("Error deleting college: ", err)
            result(err, null)
            return
        }

        if (res.affectedRows === 0) {
            result({ kind: "not_found" }, null)
            return
        }

        console.log("Delete college with id: ", { id: clgId.id })
        result(null, { id: clgId.id })
    })
}




College.updateCollege = (clgUpdate, result) => {
    // Check if College exists
    db.query("SELECT * FROM college WHERE id = ? AND deleteStatus = 0 AND isActive = 1", [clgUpdate.id], (clgErr, clgRes) => {
        if (clgErr) {
            console.log("Error Checking College : ", clgErr)
            result(clgErr, null)
            return
        } else {
            if (clgRes.length === 0) {
                console.log("College Not Found")
                result("College Not Found", null)
                return
            } else {
                // Check if the new email is different and already in use by another college
                db.query("SELECT * FROM college WHERE email = ? AND id != ? AND deleteStatus = 0 AND isActive = 1", [clgUpdate.email, clgUpdate.id], (err, emailCheck) => {
                    if (err) {
                        console.log("error : ", err)
                        result(err, null)
                        return
                    } else {
                        if (emailCheck.length > 0) {
                            console.log("Email Already Exists.")
                            result("Email Already Exists", null)
                            return
                        } else {
                            // Check if the new website is already in use by another college
                            db.query("SELECT * FROM college WHERE website = ? AND id != ? AND deleteStatus = 0 AND isActive = 1", [clgUpdate.website, clgUpdate.id], (err, websiteCheck) => {
                                if (err) {
                                    console.log("error : ", err)
                                    result(err, null)
                                    return
                                } else {
                                    if (websiteCheck.length > 0) {
                                        console.log("Website Already Exists.")
                                        result("Website Already Exists.", null)
                                        return
                                    } else {
                                        db.query("UPDATE college SET collegeName = ?, collegeAddress = ?, website = ?, email = ?, collegePhNo = ?, collegeMobileNumber = ?, collegeImage = ?, updatedDate = CURRENT_DATE() WHERE id = ?",
                                            [clgUpdate.collegeName, clgUpdate.collegeAddress, clgUpdate.website, clgUpdate.email, clgUpdate.collegePhNo, clgUpdate.collegeMobileNumber, clgUpdate.collegeImage, clgUpdate.id],
                                            (err, res) => {
                                                if (err) {
                                                    console.log("error : ", err)
                                                    result(err, null)
                                                    return
                                                }
                                                console.log("Updated College Details : ", { id: clgUpdate.id, ...clgUpdate })
                                                result(null, { id: clgUpdate.id, ...clgUpdate })
                                            })
                                    }
                                }
                            })
                        }
                    }
                })
            }
        }
    })
}





module.exports = College;
