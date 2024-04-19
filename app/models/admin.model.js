const db = require('../models/db')
const bcrypt = require('bcrypt')
const { AdminStaffLog, logAdminStaff } = require("../models/adminStaffLog.model")

const Admin = function (admin) {
    this.userName = admin.userName
    this.Password = admin.Password
}


// Admin.create = (newAdmin, result) =>{
//     db.query("INSERT INTO admin SET ?", newAdmin,(err,res)=>{

//         if (err) {
//             console.log("Error: ", err)
//             result(err,null)
//             return

//         } else {
//             console.log("Admin : ",{id:res.id, ...newAdmin})
//             result(null, {id:res.id, ...newAdmin})

//         }
//     })
// }



Admin.findByUserName = (username, result) => {
    db.query("SELECT * FROM admin WHERE BINARY userName = ?", username, (err, res) => {

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



Admin.adminChangePassword = (ad, result) => {
    // Retrieve the hashed old password from the database
    const getPasswordQuery = "SELECT Password FROM admin WHERE userName = ?";
    db.query(getPasswordQuery, [ad.userName], (getPasswordErr, getPasswordRes) => {
        if (getPasswordErr) {
            console.log("Error: ", getPasswordErr);
            result(getPasswordErr, null);
            return;
        }

        if (getPasswordRes.length > 0) {
            const hashedOldPassword = getPasswordRes[0].Password;

            // Compare the hashed old password with the provided old password
            if (bcrypt.compareSync(ad.oldPassword, hashedOldPassword)) {
                const updatePasswordQuery = "UPDATE admin SET Password = ?, updateStatus = 1 WHERE userName = ?";
                const hashedNewPassword = bcrypt.hashSync(ad.newPassword, 10);

                db.query(updatePasswordQuery, [hashedNewPassword, ad.userName], (updateErr) => {
                    if (updateErr) {
                        console.log("Error: ", updateErr);
                        result(updateErr, null);
                        return;
                    } else {
                        result(null, null);
                    }
                });
            } else {
                result("Incorrect Old Password!!!", null);
            }
        } else {
            result("User not found!!!", null);
        }
    });
};

Admin.forgotpassword = (admin, result) => {
    const getAdminQuery = "SELECT * FROM admin WHERE BINARY userName = ?";
    db.query(getAdminQuery, [admin.userName], (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        } else if (res.length === 0) {
            result("User not found!!!", null);
        } else {
            const updatePasswordQuery = "UPDATE admin SET Password = ?, updateStatus = 1 WHERE BINARY userName = ?";
            const hashedNewPassword = bcrypt.hashSync(admin.Password, 10);

            db.query(updatePasswordQuery, [hashedNewPassword, admin.userName], (updateErr, updateRes) => {
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


Admin.adminDashBoard = (result) => {
    const query1 = "SELECT CASE WHEN COUNT(*) = 0 THEN 0 ELSE COUNT(*) END AS totalColleges FROM college WHERE deleteStatus = 0 AND isActive = 1;";
    const query2 = "SELECT CASE WHEN COUNT(*) > 0 THEN COUNT(*) ELSE 0 END AS totalCollegeStaff FROM college_staff WHERE deleteStatus = 0 AND isActive = 1 AND emailVerified = 1 AND DATE_SUB(CURDATE(), INTERVAL 1 YEAR) <= addedDate;"
    const query3 = "SELECT CASE WHEN COUNT(*) > 0 THEN COUNT(*) ELSE 0 END AS totalAdminStaff FROM admin_staff WHERE deleteStatus = 0 AND isActive = 1 AND emailVerified = 1 AND DATE_SUB(CURDATE(), INTERVAL 1 YEAR) <= addedDate;    ";
    const query4 = "SELECT CASE WHEN COUNT(*) > 0 THEN COUNT(*) ELSE 0 END AS totalBatches FROM batches WHERE deleteStatus = 0 AND isActive = 1 AND DATE_SUB(CURDATE(), INTERVAL 1 YEAR) <= addedDate;";
    const query5 = "SELECT CASE WHEN COUNT(*) > 0 THEN COUNT(*) ELSE 0 END AS totalTasks FROM task WHERE deleteStatus=0 AND isActive=1 AND DATE_SUB(CURDATE(), INTERVAL 1 YEAR) <=addedDate";
    const query6 = "SELECT CASE WHEN COUNT(*) > 0 THEN COUNT(*) ELSE 0 END AS totalStudents FROM student WHERE deleteStatus=0 AND isActive=1 AND emailVerified=1 AND isVerified=1 AND isPaid=1 AND DATE_SUB(CURDATE(), INTERVAL 1 YEAR) <=addedDate";
    const query7 = "SELECT CASE WHEN COUNT(*) > 0 THEN COUNT(*) ELSE 0 END AS totalMaterials FROM materials WHERE deleteStatus=0 AND isActive=1 AND DATE_SUB(CURDATE(), INTERVAL 1 YEAR) <=addedDate";
    const query8 = "SELECT CASE WHEN COUNT(*) > 0 THEN COUNT(*) ELSE 0 END AS totalRefunds FROM refund WHERE approvedAmnt IS NOT NULL AND cancelStatus=0 AND DATE_SUB(CURDATE(), INTERVAL 1 YEAR) <=requestedDate";
    const query9 = "SELECT CASE WHEN SUM(rpAmount) = 0 THEN 0 ELSE SUM(rpAmount) END AS totalAmountPaid FROM payment WHERE paymentDate >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR);    ";
    const query10 = "SELECT CASE WHEN SUM(approvedAmnt) IS NULL THEN 0 ELSE SUM(approvedAmnt) END AS totalAmountRefunded FROM refund WHERE approvedAmnt IS NOT NULL AND cancelStatus = 0 AND refundInitiatedDate >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR);    ";
    const query11 = "SELECT c.id, c.collegeName, COALESCE(COUNT(b.id), 0) AS numberOfBatches FROM college c LEFT JOIN batches b ON c.id = b.collegeId WHERE c.deleteStatus = 0 AND c.isActive = 1 GROUP BY c.id, c.collegeName;    ";
    const query12 = "SELECT c.id, c.collegeName, COALESCE(COUNT(s.id), 0) AS numberOfStudents FROM college c LEFT JOIN student s ON c.id = s.collegeId AND s.emailVerified = 1 AND s.isVerified = 1 AND s.isPaid = 1 WHERE c.deleteStatus = 0 AND c.isActive = 1 GROUP BY c.id, c.collegeName;    ";
    const query13 = "SELECT c.collegeName, COUNT(DISTINCT s.id) AS noofstudents, COUNT(DISTINCT t.id) AS nooftasks, CASE WHEN COUNT(DISTINCT t.id) = 0 THEN 0 ELSE ROUND(COUNT(DISTINCT st.id) * 100.0 / COUNT(DISTINCT t.id) / 100, 2) END AS percentageofcompletion FROM college c LEFT JOIN student s ON c.id = s.collegeId LEFT JOIN batches b ON s.batchId = b.id LEFT JOIN task t ON b.id = t.batchId LEFT JOIN submit_task st ON s.id = st.studId AND st.taskId = t.id GROUP BY c.collegeName;";
    const query14 = "SELECT c.collegeName, COUNT(DISTINCT s.id) AS noofstudents FROM college c LEFT JOIN student s ON c.id = s.collegeId AND DATE_SUB(CURDATE(), INTERVAL 1 YEAR) <= s.addedDate GROUP BY c.collegeName";

    db.query(query1, (err1, res1) => {
        if (err1) {
            console.log("Error: ", err1);
            result(err1, null);
            return;
        }

        db.query(query2, (err2, res2) => {
            if (err2) {
                console.log("Error: ", err2);
                result(err2, null);
                return;
            }

            db.query(query3, (err3, res3) => {
                if (err3) {
                    console.log("Error: ", err3);
                    result(err3, null);
                    return;
                }

                db.query(query4, (err4, res4) => {
                    if (err4) {
                        console.log("Error: ", err4);
                        result(err4, null);
                        return;
                    }

                    db.query(query5, (err5, res5) => {
                        if (err5) {
                            console.log("Error: ", err5);
                            result(err5, null);
                            return;
                        }

                        db.query(query6, (err6, res6) => {
                            if (err6) {
                                console.log("Error: ", err6);
                                result(err6, null);
                                return;
                            }

                            db.query(query7, (err7, res7) => {
                                if (err7) {
                                    console.log("Error: ", err7);
                                    result(err7, null);
                                    return;
                                }

                                db.query(query8, (err8, res8) => {
                                    if (err8) {
                                        console.log("Error: ", err8);
                                        result(err8, null);
                                        return;
                                    }

                                    db.query(query9, (err9, res9) => {
                                        if (err9) {
                                            console.log("Error: ", err9);
                                            result(err9, null);
                                            return;
                                        }

                                        db.query(query10, (err10, res10) => {
                                            if (err10) {
                                                console.log("Error: ", err10);
                                                result(err10, null);
                                                return;
                                            }

                                            db.query(query11, (err11, res11) => {
                                                if (err11) {
                                                    console.log("Error: ", err11);
                                                    result(err11, null);
                                                    return;
                                                }

                                                db.query(query12, (err12, res12) => {
                                                    if (err12) {
                                                        console.log("Error: ", err12);
                                                        result(err12, null);
                                                        return;
                                                    }

                                                    db.query(query13, (err13, res13) => {
                                                        if (err13) {
                                                            console.log("Error: ", err13);
                                                            result(err13, null);
                                                            return;
                                                        }

                                                        db.query(query14, (err14, res14) => {
                                                            if (err14) {
                                                                console.log("Error: ", err14);
                                                                result(err14, null);
                                                                return;
                                                            }

                                                            result(null, {
                                                                totalColleges: res1[0].totalColleges,
                                                                totalCollegeStaff: res2[0].totalCollegeStaff,
                                                                totalAdminStaff: res3[0].totalAdminStaff,
                                                                totalBatches: res4[0].totalBatches,
                                                                totalTasks: res5[0].totalTasks,
                                                                totalStudents: res6[0].totalStudents,
                                                                totalMaterials: res7[0].totalMaterials,
                                                                totalRefunds: res8[0].totalRefunds,
                                                                totalAmountPaid: res9[0].totalAmountPaid,
                                                                totalAmountRefunded: res10[0].totalAmountRefunded,
                                                                collegeBatches: res11,
                                                                collegeStudents: res12,
                                                                collegeTaskStatistics: res13,
                                                                collegeStudentStatistics: res14
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
};


Admin.getAll = async (result) => {
    let query = "SELECT * FROM adminstafflog WHERE AdmStaffId = 0 AND DateTime >= DATE_SUB(NOW(), INTERVAL 1 MONTH) ORDER BY DateTime DESC;"
    db.query(query, (err, response) => {
        if (err) {
            console.log("Error : ", err)
            result(err, null)
            return
        } else {
            const formattedLog = response.map(log => ({
                ...log,
                DateTime: log.DateTime.toLocaleString('en-IN', {
                    timeZone: 'Asia/Kolkata',
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                })
            }));

            console.log("Admin Staff Log : ", formattedLog)
            result(null, formattedLog)
        }
    })

}

Admin.forgotPassGenerateAndHashOTP = (userName, result) => {
    // Generate a 6-digit numeric OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const saltRounds = 10;
    const hashedOTP = bcrypt.hashSync(otp, saltRounds); // Hash the OTP

    db.query("SELECT * FROM admin WHERE BINARY userName = ?", [userName], (err, checkRes) => {
        if (err) {
            console.error("Error while checking username existence: ", err);
            result(err, null);
            return;
        } else if (checkRes.length === 0) {
            console.log("Admin Does Not Exist")
            return result("Admin Does Not Exist", null);
        } else {
            db.query(
                "SELECT * FROM adminstaff_otp WHERE BINARY Email = ?",
                [userName],
                (err, res) => {
                    if (err) {
                        console.error("Error while checking OTP existence: ", err);
                        result(err, null);
                        return;
                    } else {
                        if (res.length > 0) {

                            const lastOTPTime = new Date(res[0].createdAt).getTime(); // Get the time when OTP was last set
                            const currentTime = new Date().getTime(); // Get current time
                            const timeDiffInSeconds = (currentTime - lastOTPTime) / 1000; // Calculate time difference in seconds

                            if (timeDiffInSeconds < 120) {
                                console.log("Please wait for 2 minutes before sending OTP again");
                                return result("Please wait for 2 minutes before sending OTP again", null);
                            }

                            // Email exists, so update the OTP
                            const updateQuery = "UPDATE adminstaff_otp SET otp = ?, createdAt = NOW() WHERE BINARY email = ?";
                            db.query(
                                updateQuery,
                                [hashedOTP, userName],
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
                                [userName, hashedOTP],
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
    })
}

Admin.verifyOTP = (userName, otp, result) => {
    const query = "SELECT otp, createdAt FROM adminstaff_otp WHERE BINARY email = ?";
    db.query(query, [userName], (err, res) => {
        if (err) {
            return result(err, null);
        } else {
            if (res.length > 0) {
                const admotp = res[0].otp;
                const createdAt = res[0].createdAt;
                // Check if OTP is expired
                const expiryDuration = 10 * 60 * 1000; // 10 minute in milliseconds
                const otpCreatedAt = new Date(createdAt).getTime();
                const currentTime = new Date().getTime();
                if (currentTime - otpCreatedAt > expiryDuration) {
                    return result("OTP expired", null);
                }

                // If OTP not expired, proceed to compare
                const isMatch = bcrypt.compareSync(otp, admotp);
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

module.exports = Admin