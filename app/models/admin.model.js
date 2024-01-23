const db = require('../models/db')
const bcrypt=require('bcrypt')
const { AdminStaffLog, logAdminStaff } = require("../models/adminStaffLog.model")

const Admin = function(admin){
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



Admin.findByUserName = (username,result)=>{
    db.query("SELECT * FROM admin WHERE BINARY userName = ?", username, (err,res)=>{

        if (err) {
            console.log("Error : ", err)
            result(err, null)
            return
        }

        if (res.length) {
            logAdminStaff(0,"Admin logged in")
            result(null, res[0])
            return
        }

        result({kind : "not_found"}, null)

    })
}



Admin.changePassword = (ad, result) => {
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
                        logAdminStaff(0, "Password updated")
                        result(null, { status: "Password Updated Successfully!!!" });
                    }
                });
            } else {
                result(null, { status: "Incorrect Old Password!!!" });
            }
        } else {
            result(null, { status: "User not found!!!" });
        }
    });
};


Admin.adminDashBoard = (result) => {
    const query1 = "SELECT COUNT(*) AS totalColleges FROM college WHERE deleteStatus=0 AND isActive=1";
    const query2 = "SELECT COUNT(*) AS totalCollegeStaff FROM college_staff WHERE deleteStatus=0 AND isActive=1 AND emailVerified=1 AND DATE_SUB(CURDATE(), INTERVAL 1 YEAR) <=addedDate";
    const query3 = "SELECT COUNT(*) AS totalAdminStaff FROM admin_staff WHERE deleteStatus=0 AND isActive=1 AND emailVerified=1 AND DATE_SUB(CURDATE(), INTERVAL 1 YEAR) <=addedDate";
    const query4 = "SELECT COUNT(*) AS totalBatches FROM batches WHERE deleteStatus=0 AND isActive=1 AND DATE_SUB(CURDATE(), INTERVAL 1 YEAR) <=addedDate";
    const query5 = "SELECT COUNT(*) AS totalTasks FROM task WHERE deleteStatus=0 AND isActive=1 AND DATE_SUB(CURDATE(), INTERVAL 1 YEAR) <=addedDate";
    const query6 = "SELECT COUNT(*) AS totalStudents FROM student WHERE deleteStatus=0 AND isActive=1 AND emailVerified=1 AND isVerified=1 AND isPaid=1 AND DATE_SUB(CURDATE(), INTERVAL 1 YEAR) <=addedDate";
    const query7 = "SELECT COUNT(*) AS totalMaterials FROM materials WHERE deleteStatus=0 AND isActive=1 AND DATE_SUB(CURDATE(), INTERVAL 1 YEAR) <=addedDate";
    const query8 = "SELECT COUNT(*) AS totalRefunds FROM refund WHERE approvedAmnt IS NOT NULL AND cancelStatus=0 AND DATE_SUB(CURDATE(), INTERVAL 1 YEAR) <=requestedDate";
    const query9 = "SELECT SUM(rpAmount) AS totalAmountPaid FROM payment WHERE DATE_SUB(CURDATE(), INTERVAL 1 YEAR) <=paymentDate";
    const query10 = "SELECT SUM(approvedAmnt) AS totalAmountRefunded FROM refund WHERE approvedAmnt IS NOT NULL AND cancelStatus=0 AND DATE_SUB(CURDATE(), INTERVAL 1 YEAR) <=refundInitiatedDate";
    const query11 = "SELECT c.id, c.collegeName, COUNT(b.id) AS numberOfBatches FROM college c LEFT JOIN batches b ON c.id = b.collegeId WHERE c.deleteStatus = 0 AND c.isActive = 1 GROUP BY c.id, c.collegeName";
    const query12 = "SELECT c.id, c.collegeName, COUNT(s.id) AS numberOfStudents FROM college c LEFT JOIN student s ON c.id = s.collegeId WHERE c.deleteStatus = 0 AND c.isActive = 1 AND s.emailVerified = 1 AND s.isVerified = 1 AND s.isPaid = 1 GROUP BY c.id, c.collegeName";
    const query13 = "SELECT c.collegeName, COUNT(DISTINCT s.id) AS noofstudents, COUNT(DISTINCT t.id) AS nooftasks, COUNT(DISTINCT st.id) * 100.0 / COUNT(DISTINCT t.id) AS percentageofcompletion FROM college c JOIN student s ON c.id = s.collegeId LEFT JOIN batches b ON s.batchId = b.id LEFT JOIN submit_task st ON s.id = st.studId LEFT JOIN task t ON b.id = t.batchId GROUP BY c.collegeName";
    const query14 = "SELECT c.collegeName, COUNT(DISTINCT s.id) AS noofstudents FROM college c LEFT JOIN student s ON c.id = s.collegeId WHERE DATE_SUB(CURDATE(), INTERVAL 1 YEAR) <=s.addedDate GROUP BY c.collegeName";

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


Admin.getAll = async(result) => {
    let query = "SELECT * FROM adminstafflog WHERE AdmStaffId=0"
    db.query(query, (err, response) => {
        if (err) {
            console.log("Error : ",err)
            result(err, null)
            return           
        } else {
            console.log("Admin Staff Log : ", response)
            result(null, response)
        }
    })

}

module.exports = Admin