const { response } = require("express")
const db = require("../models/db")
const bcrypt = require("bcrypt")
const { AdminStaffLog, logAdminStaff } = require("../models/adminStaffLog.model")

const AdminStaff = function (adminStaff) {
    this.id = adminStaff.id
    this.AdStaffName = adminStaff.AdStaffName
    this.PhNo = adminStaff.PhNo
    this.Address = adminStaff.Address
    this.AadharNo = adminStaff.AadharNo
    this.Email = adminStaff.Email
    this.Password = adminStaff.Password

}



AdminStaff.create = (newAdminStaff, result) => {

    db.query("SELECT * FROM admin_staff WHERE  Email=? AND deleteStatus = 0 AND isActive = 1", newAdminStaff.Email, (err, res) => {

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
                // checking Aadhar number
                db.query("SELECT * FROM admin_staff WHERE AadharNo=? AND deleteStatus = 0 AND isActive = 1", newAdminStaff.AadharNo, (err, res) => {
                    if (err) {
                        console.log("error: ", err);
                        result(err, null);
                        return;
                    } else {
                        if (res.length > 0) {
                            console.log("Aadhar Number already exists");
                            result("Aadhar Number already exists", null);
                            return;
                        } else {
                            // Code for database insertion
                            db.query("INSERT INTO admin_staff SET ?", newAdminStaff, (err, res) => {
                                console.log(newAdminStaff);
                                if (err) {
                                    console.log("error: ", err);
                                    result(err, null);
                                    return;
                                } else {
                                    // Log the admin staff addition
                                    logAdminStaff(res.insertId, "Admin Staff Added");

                                    console.log("Added Admin Staff: ", { id: res.insertId, ...newAdminStaff });
                                    result(null, { id: res.insertId, ...newAdminStaff });
                                }
                            });
                        }
                    }
                });
            }
        }
    });
};




AdminStaff.getAlladmstaff = async (result) => {
    let query = "SELECT id, AdStaffName, PhNo, Address, AadharNo, Email, emailVerified, addedDate, updatedDate, deleteStatus, isActive, pwdUpdateStatus FROM admin_staff WHERE deleteStatus = 0 AND isActive = 1;";
    db.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        } else {
            console.log("Adminstaffs: ", res);
            result(null, res);

        }
    });
}


AdminStaff.updateAdminStaff = (adminStaff, result) => {
    // Check if the new Aadhar number already exists in the database
    db.query(
        "SELECT * FROM admin_staff WHERE AadharNo = ? AND id != ? AND deleteStatus = 0 AND isActive = 1",
        [adminStaff.AadharNo, adminStaff.id],
        (checkErr, checkRes) => {
            if (checkErr) {
                console.log("error: ", checkErr);
                result(checkErr, null);
                return;
            }

            if (checkRes.length > 0) {
                // Duplicate Aadhar number found
                result("Aadhar Number already exists", null);
                return;
            }

            // Update AdminStaff details in the database
            db.query(
                "UPDATE admin_staff SET AdStaffName = ?, PhNo = ?, Address = ?, AadharNo = ?, updatedDate = CURRENT_DATE(),updateStatus = 1 WHERE id = ? AND deleteStatus = 0 AND isActive = 1",
                [adminStaff.AdStaffName, adminStaff.PhNo, adminStaff.Address, adminStaff.AadharNo, adminStaff.id],
                (updateErr, updateRes) => {
                    if (updateErr) {
                        console.log("error: ", updateErr);
                        result(updateErr, null);
                        return;
                    }

                    if (updateRes.affectedRows == 0) {
                        result({ kind: "not_found" }, null);
                        return;
                    }

                    // Log the admin staff profile update
                    logAdminStaff(adminStaff.id, "Profile Updated");

                    console.log("Updated Admin Staff details: ", { id: adminStaff.id, ...adminStaff });
                    result(null, { id: adminStaff.id, ...adminStaff });
                }
            );
        }
    );
};




AdminStaff.admStaffDelete = async (admStaffId, result) => {
    db.query("SELECT * FROM admin_staff WHERE deleteStatus=0 AND isActive=1", [admStaffId.id], (admStfErr, admStfres) => {
        if (admStfErr) {
            console.error("Error Checking admin staff", admStfErr)
            return result(admStfErr, null)

        }
        console.log(admStfres.length)
        if (admStfres.length === 0) {
            console.log("Admin staff does not exist or inactive/deleted")
            return result("Admin staff does not exist or is inactive/deleted", null)
        }


        db.query("UPDATE admin_staff SET isActive=0, deleteStatus=1 WHERE id=? AND isActive = 1 AND deleteStatus = 0", [admStaffId.id], (err, res) => {
            if (err) {
                console.error("error: ", err);
                result(err, null);
                return;
            }
            if (res.affectedRows === 0) {
                result({ kind: "not_found" }, null)
                return
            }

            console.log("Delete admin staff with id: ", { id: admStaffId.id })
            result(null, { id: admStaffId.id })
        });
    })

};

AdminStaff.adminStaffSearch = (search, result) => {
    const searchString = '%' + search + '%'
    db.query("SELECT id, AdStaffName, PhNo, Address, AadharNo, Email, emailVerified, addedDate, updatedDate, pwdUpdateStatus, updateStatus FROM admin_staff WHERE deleteStatus = 0 AND isActive = 1 AND (AdStaffName LIKE ? OR PhNo LIKE ? OR Address LIKE ? OR AadharNo LIKE ? OR Email LIKE ?)",
        [searchString, searchString, searchString, searchString, searchString],
        (err, res) => {
            if (err) {
                console.log("Error: ", err)
                result(err, null)
                result
            } else {
                console.log("Admin staff  Details: ", res)
                result(null, res)
            }
        });
};

AdminStaff.findByEmail = (email , result)=>{
    db.query("SELECT * FROM admin_staff WHERE BINARY Email = ? AND isActive=1 AND deleteStatus=0 ",email, (err,res)=>{

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
}


// Admin-Staff Change Password
AdminStaff.asChangePassword = (adsf, result) => {
    // Retrieve the hashed old password from the database
    const getAstaffPasswordQuery = "SELECT Password FROM admin_staff WHERE Email = ? AND deleteStatus = 0 AND isActive = 1"
    db.query(getAstaffPasswordQuery, [adsf.Email], (getAstaffPasswordErr, getAstaffPasswordRes) => {
        if (getAstaffPasswordErr) {
            console.log("Error : ", getAstaffPasswordErr)
            result(getAstaffPasswordErr, null)
            return;
        }
        if (getAstaffPasswordRes.length > 0) {
            const hashedOldPassword = getAstaffPasswordRes[0].Password;

            // Compare the hashed old password with the provided old password
            if (bcrypt.compareSync(adsf.oldAdSfPassword, hashedOldPassword)) {
                const updateAstaffPasswordQuery = "UPDATE admin_staff SET Password = ?, updateStatus = 1 WHERE Email = ? AND deleteStatus = 0 AND isActive = 1"
                const hashedNewPassword = bcrypt.hashSync(adsf.newAdSfPassword, 10)

                db.query(updateAstaffPasswordQuery, [hashedNewPassword, adsf.Email], (updateErr) => {
                    if (updateErr) {
                        console.log("Error : ", updateErr)
                        result(updateErr, null)
                        return;
                    } else {
                        result(null, { "status": "Password Updated Successfully." })
                    }
                })
            } else {
                result(null, { "status": "Incorrect Old Password!!!" })
            }
        } else {
            result(null, { "status": "User Not Found!!!" })
        }
    })
}



module.exports = AdminStaff