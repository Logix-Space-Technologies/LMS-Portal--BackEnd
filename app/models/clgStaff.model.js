const { response } = require("express")
const db = require("../models/db")
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
            return result({ "status": "College not found with the provided ID" }, null);
        }

        // Update college staff details
        db.query(
            "UPDATE college_staff SET collegeId=?, collegeStaffName=?, phNo=?, clgStaffAddress=?, profilePic=?, department=?, updatedDate = CURRENT_DATE() WHERE id=?",
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
    db.query("UPDATE college_staff SET isActive=0, deleteStatus=1 WHERE id=?", [collegeStaffId.id],
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





module.exports = CollegeStaff