const { response } = require("express")
const db = require("../models/db")
const bcrypt = require('bcrypt')
const { CollegeStaffLog, logCollegeStaff } = require("../models/collegeStaffLog.model")

const CollegeStaff = function (collegestaff) {
    this.id = collegestaff.id
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
        // Check if college_id exists in the college table
        db.query("SELECT * FROM college WHERE id = ? AND deleteStatus=0 AND isActive=1 ", [newClgStaff.collegeId], (err, collegeResult) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            } else {
                if (collegeResult.length === 0) {
                    console.log("College ID does not exist");
                    result("College ID does not exist", null);
                    return;
                }
                // Unique aadhar checks
                db.query("SELECT * FROM college_staff WHERE aadharNo=? AND deleteStatus=0 AND isActive=1", [newClgStaff.aadharNo], (err, res) => {
                    if (err) {
                        console.log("error: ", err);
                        result(null, err);
                        return;
                    } else {
                        if (res.length > 0) {
                            console.log("Aadhar already exists");
                            result("Aadhar already exists", null);
                            return;
                        } else {
                            // College ID exists, proceed with checking email and inserting college staff
                            db.query("SELECT * FROM college_staff WHERE email=? AND deleteStatus=0 AND isActive=1 ", [newClgStaff.email], (err, res) => {
                                console.log(newClgStaff);
                                if (err) {
                                    console.log("error: ", err);
                                    result(null, err);
                                    return;
                                } else {
                                    if (res.length > 0) {
                                        console.log("Email already exists");
                                        result("Email already exists", null);
                                        return;
                                    } else {
                                        // Insert the new college staff
                                        db.query("INSERT INTO college_staff SET ?", [newClgStaff], (err, res) => {
                                            if (err) {
                                                console.log("error: ", err);
                                                result(err, null);
                                                return;
                                            } else {
                                                // Log the admin staff addition
                                                logCollegeStaff(res.insertId, "College Staff Added");


                                                console.log("Added College staff: ", { id: res.insertId, ...newClgStaff });
                                                result(null, { id: res.insertId, ...newClgStaff });
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    }
                });
            }
        });
    } else {
        result({ "status": "Cannot be empty." }, null);
    }
};


CollegeStaff.updateCollegeStaff = (clgstaff, result) => {
    // Check if the collegeId exists in the college table
    db.query("SELECT * FROM college WHERE id = ? AND deleteStatus = 0 AND isActive = 1", [clgstaff.collegeId], (err, collegeResult) => {

        if (err) {
            console.error("Error checking college existence:", err);
            return result(err, null);
        }

        if (collegeResult.length === 0) {
            // College with the provided id not found
            return result("College not found with the provided ID", null);
        }

        // Update college staff details
        db.query(
            "UPDATE college_staff SET collegeId=?, collegeStaffName=?, phNo=?, clgStaffAddress=?, profilePic=?, department=?, updatedDate = CURRENT_DATE() WHERE id=? AND deleteStatus = 0 AND isActive = 1",
            [clgstaff.collegeId, clgstaff.collegeStaffName, clgstaff.phNo, clgstaff.clgStaffAddress, clgstaff.profilePic, clgstaff.department, clgstaff.id],
            (updateErr, res) => {
                if (updateErr) {
                    console.error("Error updating college staff details:", updateErr);
                    return result(updateErr, null);
                }

                if (res.affectedRows === 0) {
                    // College staff not found with the provided ID
                    return result({ "status": "College Staff Not Found!" }, null);
                }

                // Log the admin staff profile update
                logCollegeStaff(clgstaff.id, "Profile Updated");

                console.log("Updated college staff details:", { id: clgstaff.id, ...clgstaff });
                return result(null, { id: clgstaff.id, ...clgstaff });
            }
        );
    });
};







CollegeStaff.clgStaffDelete = (collegeStaffId, result) => {
    db.query("UPDATE college_staff SET isActive=0, deleteStatus=1 WHERE id=? AND deleteStatus = 0 AND isActive = 1", [collegeStaffId.id],
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

            logCollegeStaff(collegeStaffId.id, "Admin Staff Deleted");

            console.log("Delete college staff with id: ", { id: collegeStaffId.id });
            result(null, { id: collegeStaffId.id });
        }
    );
};


CollegeStaff.getAll = async (result) => {
    let query = "SELECT c.collegeName, cs.* FROM college_staff cs JOIN college c ON cs.collegeId = c.id WHERE cs.deleteStatus = 0 AND cs.isActive = 1";
    db.query(query, (err, response) => {
        if (err) {
            console.log("error: ", err)
            result(null, err)
            return
        } else {
            console.log("College staff: ", response)
            result(null, response)
        }
    })
}


CollegeStaff.searchCollegeStaff = (search, result) => {
    const searchTerm = `%${search}%`;

    db.query(
        "SELECT c.collegeName, cs.* FROM college_staff cs JOIN college c ON cs.collegeId = c.id WHERE cs.deleteStatus = 0 AND cs.isActive = 1 AND (cs.collegeStaffName LIKE ? OR c.collegeName LIKE ? OR cs.email LIKE ? OR cs.phNo LIKE ? OR cs.department LIKE ?)",
        [searchTerm, searchTerm, searchTerm, searchTerm, searchTerm],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            } else {
                console.log("College Staff: ", res);
                result(null, res);
            }
        }
    );
};


// College Staff Login
CollegeStaff.findByClgStaffEmail = (email, result) => {
    db.query("SELECT * FROM college_staff WHERE BINARY email = ? AND deleteStatus = 0 AND isActive = 1", email, (err, res) => {
        if (err) {
            console.log("Error : ", err)
            result(err, null)
            return
        }
        if (res.length) {
            result(null, res[0])
            return
        }
        result({ kind: "not_found" }, null)
    })
    // console.log("College Staff is Inactive or does not Exist.")
    // result("College Staff is Inactive or does not Exist.", null)
}


//To view batch
CollegeStaff.viewBatch = (collegeId, result) => {
    db.query(
        "SELECT DISTINCT b.batchName, b.regStartDate, b.regEndDate, b.batchDesc, b.batchAmount, b.addedDate FROM batches b JOIN college_staff cs ON b.collegeId = cs.collegeId JOIN college c ON b.collegeId = c.id WHERE b.deleteStatus = 0 AND b.isActive = 1 AND c.deleteStatus = 0 AND c.isActive = 1 AND cs.collegeId = ?",
        [collegeId],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            } else {
                console.log("Batch Details: ", res);
                result(null, res);
            }
        }
    );
};


CollegeStaff.collegeStaffChangePassword = (college_staff, result) => {
    const collegeStaffPassword = "SELECT password FROM college_staff WHERE email=? AND deleteStatus = 0 AND isActive = 1 ";
    db.query(collegeStaffPassword, [college_staff.email], (err, res) => {
        if (err) {
            console.log("Error:", err);
            result(err, null);
            return;
        }
        if (res.length) {
            const hashedOldPassword = res[0].password;
            if (bcrypt.compareSync(college_staff.oldPassword, hashedOldPassword)) {
                const updateCollegeStaffPasswordQuery = "UPDATE college_Staff SET password = ?, pwdUpdateStatus = 1 WHERE email = ? AND deleteStatus = 0 AND isActive = 1 ";
                const hashedNewPassword = bcrypt.hashSync(college_staff.newPassword, 10);
                db.query(updateCollegeStaffPasswordQuery, [hashedNewPassword, college_staff.email], (updateErr) => {
                    if (updateErr) {
                        console.log("Error : ", updateErr);
                        result(updateErr, null);
                    } else {
                        result(null, { "status": "Password Updated Successfully." });
                    }
                });
            } else {
                result(null, { status: "Incorrect Old Password!!" });
            }
        } else {
            result(null, { status: "College staff not found" });
        }
    });
};



//College Staff to view Student

CollegeStaff.viewStudent = (collegeId, result) => {
    db.query(
        "SELECT DISTINCT c.collegeName, s.batchId, s.studName, s.admNo, s.rollNo, s.studDept, s.course, s.studEmail, s.studPhNo, s.studProfilepic, s.aadharNo, s.membership_no FROM student s JOIN college_staff cs ON s.collegeId = cs.collegeId JOIN college c ON s.collegeId = c.id WHERE c.deleteStatus = 0 AND c.isActive = 1 AND s.deleteStatus = 0 AND s.isActive = 1 AND cs.collegeId = ?",
        [collegeId],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            } else {
                console.log("Student Details: ", res);
                result(null, res);
            }
        }
    );
};








module.exports = CollegeStaff