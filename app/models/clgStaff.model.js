const { response } = require("express")
const db = require("../models/db")
const bcrypt = require('bcrypt')
const crypto = require("crypto")
const { CollegeStaffLog, logCollegeStaff } = require("../models/collegeStaffLog.model")
const College = require("./college.model")

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

        let updateQuery;
        let updateValues;

        if (clgstaff.collegeImage) {
            updateQuery = "UPDATE college_staff SET collegeId=?, collegeStaffName=?, phNo=?, clgStaffAddress=?, profilePic=?, department=?, updatedDate = CURRENT_DATE() WHERE id=? AND deleteStatus = 0 AND isActive = 1";
            updateValues = [
                clgstaff.collegeId,
                clgstaff.collegeStaffName,
                clgstaff.phNo,
                clgstaff.clgStaffAddress,
                clgstaff.department,
                clgstaff.id,
                clgstaff.profilePic
            ];
        } else {
            updateQuery = "UPDATE college_staff SET collegeId=?, collegeStaffName=?, phNo=?, clgStaffAddress=?, department=?, updatedDate = CURRENT_DATE() WHERE id=? AND deleteStatus = 0 AND isActive = 1";
            updateValues = [
                clgstaff.collegeId,
                clgstaff.collegeStaffName,
                clgstaff.phNo,
                clgstaff.clgStaffAddress,
                clgstaff.department,
                clgstaff.id
            ];
        }

        // Update college staff details
        db.query(
            updateQuery, updateValues,
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

            logCollegeStaff(collegeStaffId.id, "College Staff Deleted");

            console.log("Delete college staff with id: ", { id: collegeStaffId.id });
            result(null, { id: collegeStaffId.id });
        }
    );
};


CollegeStaff.getAll = async (result) => {
    let query = "SELECT c.collegeName, cs.*, CASE WHEN cs.emailVerified = 1 THEN 'Verified' ELSE 'Not Verified' END AS emailVerificationStatus FROM college_staff cs JOIN college c ON cs.collegeId = c.id WHERE cs.deleteStatus = 0 AND cs.isActive = 1 ORDER BY cs.id, c.collegeName";
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
        } else if (res.length === 0) {
            result("College Staff Staff Does Not Exist", null)
            return
        } else {
            db.query("SELECT * FROM college_staff WHERE BINARY email = ? AND emailVerified = 1", email, (verifyErr, verifyRes) => {
                if (verifyErr) {
                    console.log("Error: ", verifyEmailErr)
                    return result(verifyEmailErr, null)
                } else if (verifyRes.length === 0) {
                    console.log("Email Not Verified")
                    return result("Email Not Verified", null)
                } else {
                    db.query("SELECT * FROM college_staff WHERE BINARY email = ? AND isActive = 1 AND deleteStatus = 0 AND emailVerified = 1", email, (emailErr, emailRes) => {
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


//To view batch
CollegeStaff.viewBatch = (collegeId, result) => {
    db.query(
        "SELECT b.id, b.batchName, b.regStartDate, b.regEndDate, b.batchDesc, b.batchAmount, b.addedDate, COUNT(DISTINCT CASE WHEN st.isVerified = 1 THEN st.id END) AS verifiedStudentCount, COUNT(DISTINCT CASE WHEN STR_TO_DATE(CONCAT(s.date, ' ', s.time), '%Y-%m-%d %H:%i:%s') < NOW() AND s.isActive = 1 AND s.deleteStatus = 0 AND s.cancelStatus = 0 THEN s.id ELSE NULL END) AS sessionCount FROM batches b JOIN college_staff cs ON b.collegeId = cs.collegeId JOIN college c ON b.collegeId = c.id LEFT JOIN sessiondetails s ON b.id = s.batchId LEFT JOIN student st ON st.batchId = b.id WHERE b.deleteStatus = 0 AND b.isActive = 1 AND c.deleteStatus = 0 AND c.isActive = 1 AND cs.collegeId = ? GROUP BY b.id, b.batchName, b.regStartDate, b.regEndDate, b.batchDesc, b.batchAmount, b.addedDate",
        [collegeId],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            } else {
                const formattedBatches = res.map(batches => ({ ...batches, regStartDate: batches.regStartDate.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: '2-digit', year: 'numeric' }), regEndDate: batches.regEndDate.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: '2-digit', year: 'numeric' }), addedDate: batches.addedDate ? batches.addedDate.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: '2-digit', year: 'numeric' }) : null }));
                console.log("Batch Details: ", formattedBatches);
                result(null, formattedBatches);
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
                        result(null, null);
                    }
                });
            } else {
                result("Incorrect Old Password!!", null);
            }
        } else {
            result("College staff not found", null);
        }
    });
};



//College Staff to view Student

CollegeStaff.viewStudent = (batchId, result) => {
    db.query(
        "SELECT DISTINCT c.collegeName, b.batchName, s.studName, s.admNo, s.rollNo, s.studDept, s.course, s.studEmail, s.studPhNo, s.studProfilePic, s.aadharNo, s.membership_no FROM student s JOIN college_staff cs ON s.collegeId = cs.collegeId JOIN college c ON s.collegeId = c.id LEFT JOIN batches b ON b.id = s.batchId WHERE c.deleteStatus = 0 AND c.isActive = 1 AND s.deleteStatus = 0 AND s.isActive = 1 AND s.isVerified = 1 AND b.id = ? ORDER BY b.batchName, s.membership_no DESC",
        [batchId],
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

CollegeStaff.viewTask = (sessionId, result) => {
    db.query("SELECT DISTINCT s.sessionName, t.batchId, t.taskTitle, t.taskDesc, t.taskType, t.taskFileUpload, t.totalScore, CASE WHEN t.dueDate < CURRENT_DATE() THEN 'Past Due Date' ELSE t.dueDate END AS dueDate, t.addedDate FROM task t LEFT JOIN sessiondetails s ON s.id = t.sessionId WHERE t.deleteStatus = 0 AND t.isActive = 1 AND s.deleteStatus = 0 AND s.isActive = 1 AND s.id = ?", [sessionId], (err, res) => {
        if (err) {
            console.log("error: ", err)
            result(err, null)
            return
        } else {
            const formattedViewTasks = res.map(tasks => {
                // Convert dueDate to a Date object if it's not 'Past Due Date'
                const dueDate = tasks.dueDate === 'Past Due Date' ? 'Past Due Date' : new Date(tasks.dueDate).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: '2-digit', year: 'numeric' });
                return {
                    ...tasks,
                    dueDate: dueDate,
                    addedDate: new Date(tasks.addedDate).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })
                }
            });
            console.log("Task details", formattedViewTasks)
            result(null, formattedViewTasks)
        }
    })
}




CollegeStaff.verifyStudent = (collegeId, studentId, result) => {
    const associationQuery = "SELECT * FROM student s JOIN college_staff c ON s.collegeId = c.collegeId WHERE s.id = ? AND c.collegeId = ? AND s.deleteStatus = 0 AND s.isActive = 1 LIMIT 1";

    db.query(associationQuery, [studentId, collegeId], (assocErr, assocRes) => {
        if (assocErr) {
            console.error("Error checking CollegeStaff and Student association: ", assocErr);
            result(assocErr, null);
            return;
        }

        if (assocRes.length === 0) {
            result("CollegeStaff and Student are not associated", null);
            return;
        }

        const verificationQuery = "SELECT * FROM student WHERE id = ? AND isVerified = 1";

        db.query(verificationQuery, [studentId], (verifErr, verifRes) => {
            if (verifErr) {
                console.error("Error checking student verification status: ", verifErr);
                result(verifErr, null);
                return;
            }

            if (verifRes.length > 0) {
                result("Student is already verified", null);
                return;
            }

            const updateQuery = "UPDATE student SET isVerified = 1 WHERE id = ?";

            db.query(updateQuery, [studentId], (updateErr, updateRes) => {
                if (updateErr) {
                    console.error("Error updating student verification status: ", updateErr);
                    result(updateErr, null);
                    return;
                }

                result(null, "Student verification successful");
            });
        });
    });
};


//College Staff Search Batches
CollegeStaff.collegeStaffSearchBatch = (searchTerm, collegeId, result) => {
    const clgStaffSearchBatchQuery = '%' + searchTerm + '%'
    db.query("SELECT DISTINCT c.collegeName, b.batchName, b.regStartDate, b.regEndDate, b.batchDesc, b.batchAmount, b.addedDate FROM batches b JOIN college c ON b.collegeId = c.id JOIN college_staff cs ON c.id = cs.collegeId WHERE b.deleteStatus = 0 AND b.isActive = 1 AND c.deleteStatus = 0 AND c.isActive = 1 AND c.emailVerified = 1 AND cs.deleteStatus = 0 AND cs.isActive = 1 AND cs.emailVerified = 1 AND cs.collegeId = ? AND (b.batchName LIKE ? OR b.batchDesc LIKE ?)",
        [collegeId, clgStaffSearchBatchQuery, clgStaffSearchBatchQuery, clgStaffSearchBatchQuery],
        (err, res) => {
            if (err) {
                console.log("Error : ", err)
                result(err, null)
                return
            } else {
                const formattedBatches = res.map(batches => ({ ...batches, regStartDate: batches.regStartDate.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: '2-digit', year: 'numeric' }), regEndDate: batches.regEndDate.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: '2-digit', year: 'numeric' }), addedDate: batches.addedDate ? batches.addedDate.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: '2-digit', year: 'numeric' }) : null }));
                console.log("Batches : ", formattedBatches)
                result(null, formattedBatches)
            }
        })
}


CollegeStaff.viewCollegeStaffProfile = (id, result) => {
    if (!id) {
        return result("Invalid college staff ID");
    }

    const query = `
        SELECT cs.collegeId, cs.collegeStaffName, c.collegeName, cs.profilePic, cs.department, cs.email, cs.phNo, cs.aadharNo, cs.clgStaffAddress 
        FROM college_staff cs 
        JOIN college c ON cs.collegeId = c.id 
        WHERE cs.deleteStatus = 0 AND cs.isActive = 1 AND cs.emailVerified = 1 AND c.emailVerified = 1 AND c.isActive = 1 AND c.deleteStatus = 0 AND cs.id = ?`;

    db.query(query, [id], (err, res) => {
        if (err) {
            console.error("Error while fetching profile:", err);
            return result("Internal Server Error");
        }

        result(res.length ? null : "College staff profile not found", res[0]);
    });
};

CollegeStaff.viewCollegeStaffOfStudent = (studentId, result) => {
    if (!studentId) {
        return result("Invalid student ID");
    }

    const query = `
        SELECT cs.collegeStaffName, cs.email, cs.phNo, cs.aadharNo, cs.clgStaffAddress, cs.profilePic, cs.department,
               c.collegeName
        FROM student s
        INNER JOIN college_staff cs ON s.collegeId = cs.collegeId
        INNER JOIN college c ON s.collegeId = c.id
        WHERE s.id = ?;
    `;

    db.query(query, [studentId], (err, res) => {
        if (err) {
            console.error("Error while fetching profile:", err);
            return result("Internal Server Error");
        }

        result(res.length ? null : "College staff profile not found", res[0]);
    });
}


CollegeStaff.viewOneClgStaff = (id, result) => {
    db.query("SELECT * FROM college_staff WHERE isActive = 1 AND deleteStatus = 0 AND id = ? ", id,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("ClgStaffs: ", res);
            result(null, res);
        })
}

CollegeStaff.viewSession = (batchId, result) => {
    db.query("SELECT DISTINCT b. id AS batchId, s.id,s.sessionName, s.date, s.time, s.type, s.remarks, s.venueORlink, CASE WHEN s.cancelStatus = 0 THEN 'ACTIVE' WHEN s.cancelStatus = 1 THEN 'CANCELLED' ELSE 'unknown' END AS cancelStatus FROM sessiondetails s JOIN batches b ON b.id = s.batchId LEFT JOIN college_staff cs ON cs.collegeId = b.collegeId   WHERE s.deleteStatus = 0 AND s.isActive = 1 AND b.deleteStatus = 0 AND b.isActive = 1 AND cs.deleteStatus = 0 AND cs.isActive = 1 AND s.batchId = ? ORDER BY s.date DESC;", batchId,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            } else {
                const formattedViewSession = res.map(viewsession => ({ ...viewsession, date: viewsession.date.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: '2-digit', year: 'numeric' }) }))
                console.log("Sessions: ", formattedViewSession)
                result(null, formattedViewSession)
            }
        })
}

CollegeStaff.viewCollegeDetails = (collegeStaffId, result) => {
    db.query("SELECT c.id, c.collegeName,c.collegeCode, c.collegeAddress, c.website, c.email, c.collegePhNo, c.collegeMobileNumber, c.collegeImage, c.addedDate, c.updatedDate, c.emailVerified, c.updatedStatus FROM college c JOIN college_staff cs ON c.id = cs.collegeId WHERE cs.id = ? AND c.deleteStatus = 0 AND c.isActive = 1 AND cs.deleteStatus = 0 AND cs.isActive = 1", collegeStaffId, (err, res) => {
        if (err) {
            console.log("Error : ", err);
            result(err, null);
            return;
        } else {
            console.log("College Details : ", res);
            result(null, res);
        }
    });
}



CollegeStaff.forgotPassGenerateAndHashOTP = (email, result) => {
    // Generate a 6-digit numeric OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const saltRounds = 10;
    const hashedOTP = bcrypt.hashSync(otp, saltRounds); // Hash the OTP

    db.query(
        "SELECT * FROM collegestaff_otp WHERE email = ?",
        [email],
        (err, res) => {
            if (err) {
                console.error("Error while checking OTP existence: ", err);
                result(err, null);
                return;
            } else {
                if (res.length > 0) {
                    // Email exists, so update the OTP
                    const updateQuery = "UPDATE collegestaff_otp SET otp = ?, createdAt = NOW() WHERE email = ?";
                    db.query(
                        updateQuery,
                        [hashedOTP, email],
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
                    const insertQuery = "INSERT INTO collegestaff_otp (email, otp, createdAt) VALUES (?, ?, NOW())";
                    db.query(
                        insertQuery,
                        [email, hashedOTP],
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


CollegeStaff.verifyOTP = (email, otp, result) => {
    const query = "SELECT otp, createdAt FROM collegestaff_otp WHERE email = ?";
    db.query(query, [email], (err, res) => {
        if (err) {
            return result(err, null);
        } else {
            if (res.length > 0) {
                const clgstaffotp = res[0].otp;
                const createdAt = res[0].createdAt;
                // Check if OTP is expired
                const expiryDuration = 10 * 60 * 1000; // 10 minute in milliseconds
                const otpCreatedAt = new Date(createdAt).getTime();
                const currentTime = new Date().getTime();
                if (currentTime - otpCreatedAt > expiryDuration) {
                    return result("OTP expired", null);
                }

                // If OTP not expired, proceed to compare
                const isMatch = bcrypt.compareSync(otp, clgstaffotp);
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

CollegeStaff.searchcollegestaffbyemail = (searchKey, result) => {
    db.query(
        "SELECT collegeStaffName FROM college_staff WHERE email= ?",
        [searchKey],
        (err, res) => {
            if (err) {
                console.error("Error while searching student: ", err);
                result(err, null);
                return;
            } else {
                if (res.length > 0) {
                    // Directly access the collegeStaffName of the first result
                    let name = res[0].collegeStaffName;
                    result(null, name);
                } else {
                    // Handle case where no results are found
                    console.log("No college staff found with the given email.");
                    result(null, []);
                }
                return;
            }
        }
    );
}


CollegeStaff.emailVerificationClgStaffOtpVerify = (email, otp, result) => {
    const query = "SELECT otp, createdAt FROM collegestaff_otp WHERE email = ?";
    db.query(query, [email], (err, res) => {
        if (err) {
            return result(err, null);
        } else {
            if (res.length > 0) {
                const clgstaffotp = res[0].otp;
                const createdAt = res[0].createdAt;
                // Check if OTP is expired
                const expiryDuration = 10 * 60 * 1000; // 10 minute in milliseconds
                const otpCreatedAt = new Date(createdAt).getTime();
                const currentTime = new Date().getTime();
                if (currentTime - otpCreatedAt > expiryDuration) {
                    return result("OTP expired", null);
                }

                // If OTP not expired, proceed to compare
                const isMatch = bcrypt.compareSync(otp, clgstaffotp);
                if (isMatch) {
                    db.query("UPDATE college_staff SET emailVerified = 1 WHERE email = ?", [email], (verifyErr, verifyRes) => {
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

CollegeStaff.searchClgStaffByCollege = (searchKey, result) => {
    db.query(
        "SELECT c.collegeStaffName, c.email, b.batchName FROM college_staff c JOIN batches b ON b.collegeId = c.collegeId WHERE b.id = ?",
        [searchKey],
        (err, res) => {
            if (err) {
                console.error("Error while searching college staff: ", err);
                result(err, null);
                return;
            } else {
                // console.log("Students found: ", res);
                let data = Object.values(JSON.parse(JSON.stringify(res)))
                result(null, data);
                return;
            }
        }
    );
}

module.exports = CollegeStaff