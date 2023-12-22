const { response } = require("express")
const db = require("../models/db")

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

    db.query("SELECT * FROM admin_staff WHERE Email=?", newAdminStaff.Email, (err, res) => {
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
                //checking aadhar number
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
                                console.log(newAdminStaff)
                                if (err) {
                                    console.log("error: ", err)
                                    result(err, null)
                                    return
                                } else {
                                    console.log("Added Admin Staff: ", { id: res.id, ...newAdminStaff })
                                    result(null, { id: res.id, ...newAdminStaff })
                                }
                            })

                        }


                    }
                })



            }
        }
    })
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
    db.query("UPDATE admin_staff SET AdStaffName = ? , PhNo = ? , Address = ? , AadharNo =? , Email =? , updatedDate = CURRENT_DATE() WHERE id = ?",
        [adminStaff.AdStaffName, adminStaff.PhNo, adminStaff.Address, adminStaff.AadharNo, adminStaff.Email, adminStaff.id],
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
            console.log("Updated Admin Staff details: ", { id: adminStaff.id, ...adminStaff });
            result(null, { id: adminStaff.id, ...adminStaff });
        });
}



AdminStaff.admStaffDelete = (admStaffId, result) => {
    db.query("UPDATE admin_staff SET isActive=0, deleteStatus=1 WHERE id=?", [admStaffId.id], (err, res) => {
        if (err) {
            console.log("error: ", err);
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
};









module.exports = AdminStaff