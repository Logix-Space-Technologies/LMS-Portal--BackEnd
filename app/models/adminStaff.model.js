const { response } = require("express")
const db = require("../models/db")
const bcrypt = require("bcrypt")
const crypto = require("crypto")
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
    let query = "SELECT id, AdStaffName, PhNo, Address, AadharNo, Email, addedDate, updatedDate FROM admin_staff WHERE deleteStatus = 0 AND isActive = 1;";
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

AdminStaff.findByEmail = (email, result) => {
    db.query("SELECT * FROM admin_staff WHERE BINARY Email = ? AND isActive = 1 AND deleteStatus = 0", email, (err, res) => {
        if (err) {
            console.log("Error : ", err)
            result(err, null)
            return
        } else if (res.length === 0) {
            result("Admin Staff Does Not Exist", null)
            return
        } else {
            db.query("SELECT * FROM admin_staff WHERE BINARY Email = ? AND emailVerified = 1", email, (verifyErr, verifyRes) => {
                if (verifyErr) {
                    console.log("Error: ", verifyEmailErr)
                    return result(verifyEmailErr, null)
                } else if (verifyRes.length === 0) {
                    console.log("Email Not Verified")
                    return result("Email Not Verified", null)
                } else {
                    db.query("SELECT * FROM admin_staff WHERE BINARY Email = ? AND isActive = 1 AND deleteStatus = 0 AND emailVerified = 1", email, (emailErr, emailRes) => {
                        if (emailErr) {
                            console.log("Error : ", emailErr);
                            return result(emailErr, null);
                        } else if (emailRes.length > 0) {
                            result(null, emailRes[0])
                        }
                    })
                }
            })
        }
    })
}


// Admin-Staff Change Password
AdminStaff.asChangePassword = (adsf, result) => {
    // Query to retrieve the hashed old password from the database
    const getAstaffPasswordQuery = "SELECT Password FROM admin_staff WHERE BINARY Email = ? AND deleteStatus = 0 AND isActive = 1";

    db.query(getAstaffPasswordQuery, [adsf.Email], (getAstaffPasswordErr, getAstaffPasswordRes) => {
        if (getAstaffPasswordErr) {
            console.error("Error retrieving old password:", getAstaffPasswordErr);
            result("Error retrieving old password", null);
            return;
        }

        if (getAstaffPasswordRes.length > 0) {
            const hashedOldPassword = getAstaffPasswordRes[0].Password;

            // Compare the hashed old password with the provided old password
            if (bcrypt.compareSync(adsf.oldAdSfPassword, hashedOldPassword)) {
                // Hash the new password
                const hashedNewPassword = bcrypt.hashSync(adsf.newAdSfPassword, 10);

                // Query to update the password
                const updateAstaffPasswordQuery = "UPDATE admin_staff SET Password = ?, updateStatus = 1, pwdUpdateStatus = 1, updatedDate = CURRENT_DATE() WHERE Email = ? AND deleteStatus = 0 AND isActive = 1 AND emailVerified = 1";

                db.query(updateAstaffPasswordQuery, [hashedNewPassword, adsf.Email], (updateErr) => {
                    if (updateErr) {
                        console.error("Error updating password:", updateErr);
                        result("Error updating password", null);
                        return;
                    }
                    result(null, null);
                });
            } else {
                result("Incorrect old password", null);
            }
        } else {
            result("Admin staff not found", null);
        }
    });
};

AdminStaff.forgotpassword = (admstaff, result) => {
    const getAdminStaffQuery = "SELECT * FROM admin_staff WHERE BINARY Email = ? AND deleteStatus = 0 AND isActive = 1";
    db.query(getAdminStaffQuery, [admstaff.Email], (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        } else if (res.length === 0) {
            result("Admin Staff not found!!!", null);
        } else {
            const updatePasswordQuery = "UPDATE admin_staff SET Password = ?, updateStatus = 1, pwdUpdateStatus = 1, updatedDate = CURRENT_DATE() WHERE BINARY Email = ? AND deleteStatus = 0 AND isActive = 1";
            const hashedNewPassword = bcrypt.hashSync(admstaff.Password, 10);

            db.query(updatePasswordQuery, [hashedNewPassword, admstaff.Email], (updateErr, updateRes) => {
                if (updateErr) {
                    console.log("Error: ", updateErr);
                    result(updateErr, null);
                    return;
                } else {
                    result(null, null);
                }
            });
        }
    });
}


AdminStaff.searchCollegesByAdminStaff = (search, result) => {
    const searchString = '%' + search + '%';
    db.query("SELECT id, collegeName, collegeAddress, collegePhNo, email, addedDate, updatedDate, deleteStatus, isActive FROM college WHERE deleteStatus = 0 AND isActive = 1 AND (id  LIKE ? OR collegeName LIKE ? OR collegeAddress LIKE ? OR collegePhNo LIKE ? OR collegeMobileNumber LIKE ? OR email LIKE ?)",
        [searchString, searchString, searchString, searchString, searchString, searchString],
        (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(err, null);
            } else {
                console.log("Colleges Details: ", res);
                result(null, res);
            }
        });
};


AdminStaff.viewAdminStaffProfile = (id, result) => {
    if (!id) {
        return result("Invalid college staff ID");
    }

    const query = `
        SELECT a.id, a.AdStaffName, a.PhNo, a.Address, a.AadharNo, a.Email
        FROM admin_staff a
        WHERE a.deleteStatus = 0 AND a.isActive = 1 AND a.emailVerified = 1 AND a.id = ?`;

    db.query(query, [id], (err, res) => {
        if (err) {
            console.error("Error while fetching profile:", err);
            return result("Internal Server Error");
        }

        result(res.length ? null : "Admin staff profile not found", res[0]);
    });
};


// View Submitted Tasks By AdminStaff
AdminStaff.viewSubmittedTask = (result) => {
    db.query("SELECT c.collegeName, b.batchName, s.membership_no, s.studName, t.id, t.taskTitle, t.totalScore, t.dueDate, st.id AS 'submitTaskId', st.gitLink, st.remarks, st.subDate, st.evalDate, st.lateSubDate, st.evaluatorRemarks, st.score FROM submit_task st JOIN task t ON st.taskId = t.id JOIN student s ON st.studId = s.id JOIN college c ON s.collegeId = c.id JOIN batches b ON s.batchId = b.id WHERE t.deleteStatus = 0 AND t.isActive = 1 AND s.validity > CURRENT_DATE() AND s.isVerified = 1 AND s.isActive = 1 AND s.emailVerified = 1 AND s.deleteStatus = 0 AND c.deleteStatus = 0 AND c.isActive = 1 AND st.isEvaluated = 0 ORDER BY t.dueDate DESC",
        (err, res) => {
            if (err) {
                console.log("Error Viewing Submitted Tasks : ", err)
                result(err, null)
                return
            }

            if (res.length === 0) {
                console.log("No Submitted Tasks Found.")
                result("No Submitted Tasks Found.", null)
                return
            }
            const formattedSubTasks = res.map(subtasks => ({ ...subtasks, dueDate: subtasks.dueDate.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: '2-digit', year: 'numeric' }), subDate: subtasks.subDate.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: '2-digit', year: 'numeric' }), evalDate: subtasks.evalDate ? subtasks.evalDate.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: '2-digit', year: 'numeric' }) : null, lateSubDate: subtasks.lateSubDate ? subtasks.lateSubDate.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: '2-digit', year: 'numeric' }) : null }));
            result(null, formattedSubTasks)
        })
}


AdminStaff.viewOneAdminStaff = (id, result) => {
    db.query("SELECT id, AdStaffName, Address, AadharNo, PhNo FROM admin_staff WHERE id = ? AND  isActive = 1 AND deleteStatus = 0", id,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("Trainer: ", res);
            result(null, res);
        })
}

AdminStaff.AdmViewAllMaterial = async (result) => {
    let query = "SELECT c.collegeName, b.batchName, m.* FROM materials m JOIN batches b ON m.batchId = b.id JOIN college c ON c.id = b.collegeId WHERE m.deleteStatus = 0 AND m.isActive = 1 AND c.deleteStatus = 0 AND c.isActive = 1 AND b.deleteStatus = 0 AND b.isActive = 1 ORDER BY m.addedDate DESC, c.collegeName, b.batchName, m.id";
    db.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        } else {
            const formattedMaterials = res.map(materials => ({ ...materials, addedDate: materials.addedDate.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' }) })); // Formats the date as 'YYYY-MM-DD'
            console.log("Materials: ", formattedMaterials);
            result(null, formattedMaterials);

        }
    });
}

AdminStaff.viewOneMaterial = (materialId, result) => {
    db.query("SELECT c.id AS collegeId, c.collegeName, m.fileName, m.batchId, m.materialDesc, m.uploadFile, m.remarks, m.addedDate, m.materialType FROM materials m JOIN batches b ON m.batchId = b.id JOIN college c ON b.collegeId = c.id WHERE m.deleteStatus = 0 AND m.isActive = 1 AND m.id = ?", materialId,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("Material: ", res);
            result(null, res);
        })
}

AdminStaff.searchSubmittedTask = (searchSubTask, result) => {
    const searchString = '%' + searchSubTask + '%';
    db.query("SELECT c.collegeName, b.batchName, s.membership_no, s.studName, t.id, t.taskTitle, t.dueDate, t.totalScore, st.id AS 'submitTaskId', st.gitLink, st.remarks, st.subDate, st.evalDate, st.lateSubDate, st.evaluatorRemarks, st.score FROM submit_task st JOIN task t ON st.taskId = t.id JOIN student s ON st.studId = s.id JOIN college c ON s.collegeId = c.id JOIN batches b ON s.batchId = b.id WHERE t.deleteStatus = 0 AND t.isActive = 1 AND s.validity > CURRENT_DATE() AND s.isVerified = 1 AND s.isActive = 1 AND s.emailVerified = 1 AND s.deleteStatus = 0 AND c.deleteStatus = 0 AND c.isActive = 1 AND (c.collegeName LIKE ? OR b.batchName LIKE ? OR t.taskTitle LIKE ?) ORDER BY t.dueDate DESC",
        [searchString, searchString, searchString],
        (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(err, null);
            } else {
                const formattedSubmittedTask = res.map(subtasks => ({ ...subtasks, dueDate: subtasks.dueDate.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: '2-digit', year: 'numeric' }), subDate: subtasks.subDate.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: '2-digit', year: 'numeric' }), lateSubDate: subtasks.lateSubDate ? subtasks.lateSubDate.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: '2-digit', year: 'numeric' }) : null, evalDate: subtasks.evalDate ? subtasks.evalDate.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: '2-digit', year: 'numeric' }) : null }));
                console.log("Submitted Task Details: ", formattedSubmittedTask);
                result(null, formattedSubmittedTask);
            }
        })
}

AdminStaff.forgotPassGenerateAndHashOTP = (Email, result) => {
    // Generate a 6-digit numeric OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const saltRounds = 10;
    const hashedOTP = bcrypt.hashSync(otp, saltRounds); // Hash the OTP

    db.query(
        "SELECT * FROM adminstaff_otp WHERE Email = ?",
        [Email],
        (err, res) => {
            if (err) {
                console.error("Error while checking OTP existence: ", err);
                result(err, null);
                return;
            } else {
                if (res.length > 0) {
                    // Email exists, so update the OTP
                    const updateQuery = "UPDATE adminstaff_otp SET otp = ?, createdAt = NOW() WHERE email = ?";
                    db.query(
                        updateQuery,
                        [hashedOTP, Email],
                        (err, res) => {
                            if (err) {
                                console.error("Error while updating OTP: ", err);
                                result(err, null);
                            } else {
                                console.log("OTP updated successfully");
                                result(null, otp); // Return the plain OTP for email sending
                            }
                        }
                    );
                } else {
                    // Email does not exist, insert new OTP
                    const insertQuery = "INSERT INTO adminstaff_otp (email, otp, createdAt) VALUES (?, ?, NOW())";
                    db.query(
                        insertQuery,
                        [Email, hashedOTP],
                        (err, res) => {
                            if (err) {
                                console.error("Error while inserting OTP: ", err);
                                result(err, null);
                            } else {
                                console.log("OTP inserted successfully");
                                result(null, otp); // Return the plain OTP for email sending
                            }
                        }
                    );
                }
            }
        }
    );
}


AdminStaff.searchadminstaffbyemail = (searchKey, result) => {
    db.query(
        "SELECT `AdStaffName` FROM `admin_staff` WHERE `Email` = ?",
        [searchKey],
        (err, res) => {
            if (err) {
                console.error("Error while searching student: ", err);
                result(err, null);
                return;
            } else {
                if (res.length > 0) {
                    // Directly access the AdminStaffName of the first result
                    let name = res[0].AdStaffName;
                    result(null, name);
                } else {
                    // Handle case where no results are found
                    console.log("No admin staff found with the given email.");
                    result(null, []);
                }
                return;
            }
        }
    );
}


AdminStaff.verifyOTP = (Email, otp, result) => {
    const query = "SELECT otp, createdAt FROM adminstaff_otp WHERE email = ?";
    db.query(query, [Email], (err, res) => {
        if (err) {
            return result(err, null);
        } else {
            if (res.length > 0) {
                const admstaffotp = res[0].otp;
                const createdAt = res[0].createdAt;
                // Check if OTP is expired
                const expiryDuration = 10 * 60 * 1000; // 10 minute in milliseconds
                const otpCreatedAt = new Date(createdAt).getTime();
                const currentTime = new Date().getTime();
                if (currentTime - otpCreatedAt > expiryDuration) {
                    return result("OTP expired", null);
                }

                // If OTP not expired, proceed to compare
                const isMatch = bcrypt.compareSync(otp, admstaffotp);
                if (isMatch) {
                    return result(null, true);
                } else {
                    return result(null, false);
                }
            } else {
                return result("OTP not found or expired", null);
            }
        }
    });
}

AdminStaff.emailVerificationOtpSendVerify = (Email, otp, result) => {
    const query = "SELECT otp, createdAt FROM adminstaff_otp WHERE email = ?";
    db.query(query, [Email], (err, res) => {
        if (err) {
            return result(err, null);
        } else {
            if (res.length > 0) {
                const admstaffotp = res[0].otp;
                const createdAt = res[0].createdAt;
                // Check if OTP is expired
                const expiryDuration = 10 * 60 * 1000; // 10 minute in milliseconds
                const otpCreatedAt = new Date(createdAt).getTime();
                const currentTime = new Date().getTime();
                if (currentTime - otpCreatedAt > expiryDuration) {
                    return result("OTP expired", null);
                }

                // If OTP not expired, proceed to compare
                const isMatch = bcrypt.compareSync(otp, admstaffotp);
                if (isMatch) {
                    db.query("UPDATE admin_staff SET emailVerified = 1 WHERE Email = ?", [Email], (verifyErr, verifyRes) => {
                        if (verifyErr) {
                            return result(err, null);
                        } else {
                            return result(null, true);
                        }
                    })
                } else {
                    return result(null, false);
                }
            } else {
                return result("OTP not found or expired", null);
            }
        }
    });
}




module.exports = AdminStaff