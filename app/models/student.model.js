const db = require("../models/db");
const { response, request } = require("express")
const bcrypt = require("bcrypt")

const { StudentLog, logStudent } = require("../models/studentLog.model");




const Tasks = function (tasks) {
    this.id = tasks.id
    this.batchId = tasks.batchId;
    this.taskTitle = tasks.taskTitle;
    this.taskDesc = tasks.taskDesc;
    this.taskType = tasks.taskType;
    this.taskFileUpload = tasks.taskFileUpload
    this.totalScore = tasks.totalScore;
    this.dueDate = tasks.dueDate;
};

const Student = function (student) {
    this.id = student.id;
    this.collegeId = student.collegeId;
    this.batchId = student.batchId;
    this.studName = student.studName;
    this.admNo = student.admNo;
    this.rollNo = student.rollNo;
    this.studDept = student.studDept;
    this.course = student.course;
    this.studEmail = student.studEmail;
    this.studPhNo = student.studPhNo;
    this.studProfilePic = student.studProfilePic;
    this.aadharNo = student.aadharNo;
    this.password = student.password;
    this.membership_no = student.membership_no;
};

const Payment = function (payment) {
    this.id = payment.id;
    this.studId = payment.studId;
    this.rpPaymentId = payment.rpPaymentId;
    this.rpOrderId = payment.rpOrderId;
    this.rpAmount = payment.rpAmount;
};


const SubmitTask = function (submitTask) {
    this.studId = submitTask.studId;
    this.taskId = submitTask.taskId;
    this.gitLink = submitTask.gitLink;
    this.remarks = submitTask.remarks;
    this.subDate = new Date(); // Current date

};

let payStudId;


Student.create = (newStudent, result) => {
    const currentDate = new Date();
    const oneyrfromnow = new Date(currentDate);
    oneyrfromnow.setFullYear(currentDate.getFullYear() + 1);
    const oneAfterYear = oneyrfromnow.toDateString();

    // Convert to "YYYY-MM-DD" format
    const year = oneyrfromnow.getFullYear();
    const month = String(oneyrfromnow.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(oneyrfromnow.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    const currentYear = new Date().getFullYear();
    const currentMonth = (new Date().getMonth() + 1).toString().padStart(2, "0");
    const membershipNoPrefix = "LUC";

    db.query("SELECT * FROM student WHERE admNo = ? AND collegeId = ? AND batchId = ? AND deleteStatus = 0 AND isActive = 1",
        [newStudent.admNo, newStudent.collegeId, newStudent.batchId], (err, res) => {
            if (err) {
                console.error("Error while checking uniqueness: ", err);
                result(err, null);
                return;
            } else {
                if (res.length > 0) {
                    console.log("Admission No already exists");
                    result("Admission No already exists", null);
                    return;
                } else {
                    db.query("SELECT * FROM student WHERE rollNo = ? AND collegeId = ? AND batchId = ? AND deleteStatus = 0 AND isActive = 1",
                        [newStudent.rollNo, newStudent.collegeId, newStudent.batchId],
                        (err, res) => {
                            if (err) {
                                console.error("Error while checking uniqueness: ", err);
                                result(err, null);
                                return;
                            } else {
                                if (res.length > 0) {
                                    console.log("Roll No already exists");
                                    result("Roll No already exists", null);
                                    return;
                                } else {
                                    db.query("SELECT * FROM student WHERE aadharNo = ? AND deleteStatus = 0 AND isActive = 1",
                                        [newStudent.aadharNo], (err, res) => {
                                            if (err) {
                                                console.error("Error while checking uniqueness: ", err);
                                                result(err, null);
                                                return;
                                            } else {
                                                if (res.length > 0) {
                                                    console.log("Aadhar No already exists");
                                                    result("Aadhar No already exists", null);
                                                    return;
                                                } else {
                                                    db.query("SELECT * FROM student WHERE studEmail = ? AND deleteStatus = 0 AND isActive = 1",
                                                        [newStudent.studEmail], (err, res) => {
                                                            if (err) {
                                                                console.error("Error while checking uniqueness: ", err);
                                                                result(err, null);
                                                                return;
                                                            } else {
                                                                if (res.length > 0) {
                                                                    console.log("Email already exists");
                                                                    result("Email already exists", null);
                                                                    return;
                                                                } else {
                                                                    // Update counter and fetch currentCounter
                                                                    db.query("UPDATE counter SET Counter = Counter + 1", (err, updateRes) => {
                                                                        if (err) {
                                                                            console.error("Error while updating counter: ", err);
                                                                            result(err, null);
                                                                            return;
                                                                        }

                                                                        db.query("SELECT Counter FROM counter", (err, counterRes) => {
                                                                            if (err) {
                                                                                console.error("Error while fetching counter value: ", err);
                                                                                result(err, null);
                                                                                return;
                                                                            }

                                                                            const currentCounter = counterRes[0].Counter.toString().padStart(5, "0");
                                                                            const finalMembershipNo = `${membershipNoPrefix}${currentYear}${currentMonth}${currentCounter}`;

                                                                            newStudent.membership_no = finalMembershipNo;
                                                                            newStudent.validity = formattedDate;

                                                                            // Checking if membership_no already exists

                                                                            db.query("SELECT * FROM student WHERE membership_no = ? AND deleteStatus = 0 AND isActive = 1",
                                                                                [newStudent.membership_no], (err, res) => {
                                                                                    if (err) {
                                                                                        console.error("Error while checking uniqueness: ", err);
                                                                                        result(err, null);
                                                                                        return;
                                                                                    } else {
                                                                                        if (res.length > 0) {
                                                                                            db.query("UPDATE counter SET Counter = Counter + 1", (err, updateRes) => {
                                                                                                if (err) {
                                                                                                    console.error("Error while updating counter: ", err);
                                                                                                    result(err, null);
                                                                                                    return;
                                                                                                }

                                                                                                db.query("SELECT Counter FROM counter", (err, counterRes) => {
                                                                                                    if (err) {
                                                                                                        console.error("Error while fetching counter value: ", err);
                                                                                                        result(err, null);
                                                                                                        return;
                                                                                                    }

                                                                                                    const currentCounter = counterRes[0].Counter.toString().padStart(5, "0");
                                                                                                    const finalMembershipNo = `${membershipNoPrefix}${currentYear}${currentMonth}${currentCounter}`;

                                                                                                    newStudent.membership_no = finalMembershipNo;

                                                                                                    // Insert new student
                                                                                                    db.query("INSERT INTO student SET ?", newStudent, (err, res) => {
                                                                                                        if (err) {
                                                                                                            console.error("Error while inserting a new student: ", err);
                                                                                                            result(err, null);
                                                                                                            return;
                                                                                                        }

                                                                                                        console.log("New student added: ", { id: res.insertId, ...newStudent });
                                                                                                        payStudId = res.insertId;
                                                                                                        Payment.create = (newPayment, result) => {
                                                                                                            newPayment.studId = payStudId;
                                                                                                            db.query(
                                                                                                                "INSERT INTO payment (studId, rpPaymentId, rpOrderId, rpAmount) VALUES (?, ?, ?, ?)",
                                                                                                                [newPayment.studId, newPayment.rpPaymentId, newPayment.rpOrderId, newPayment.rpAmount],
                                                                                                                (err, paymentRes) => {
                                                                                                                    if (err) {
                                                                                                                        console.error("Error during payment: ", err);
                                                                                                                        return result(err, null);
                                                                                                                    }

                                                                                                                    console.log("Payment: ", { id: paymentRes.insertId, ...newPayment });
                                                                                                                    result(null, { id: paymentRes.insertId, ...newPayment });
                                                                                                                }
                                                                                                            );
                                                                                                        };
                                                                                                        result(null, { id: res.insertId, ...newStudent })
                                                                                                    });

                                                                                                });
                                                                                            });

                                                                                        } else {
                                                                                            db.query("INSERT INTO student SET ?", newStudent, (err, res) => {
                                                                                                if (err) {
                                                                                                    console.error("Error while inserting a new student: ", err);
                                                                                                    result(err, null);
                                                                                                    return;
                                                                                                }

                                                                                                console.log("New student added: ", { id: res.insertId, ...newStudent });
                                                                                                payStudId = res.insertId;
                                                                                                Payment.create = (newPayment, result) => {
                                                                                                    newPayment.studId = payStudId;
                                                                                                    db.query(
                                                                                                        "INSERT INTO payment (studId, rpPaymentId, rpOrderId, rpAmount) VALUES (?, ?, ?, ?)",
                                                                                                        [newPayment.studId, newPayment.rpPaymentId, newPayment.rpOrderId, newPayment.rpAmount],
                                                                                                        (err, paymentRes) => {
                                                                                                            if (err) {
                                                                                                                console.error("Error during payment: ", err);
                                                                                                                return result(err, null);
                                                                                                            }

                                                                                                            console.log("Payment: ", { id: paymentRes.insertId, ...newPayment });
                                                                                                            result(null, { id: paymentRes.insertId, ...newPayment });
                                                                                                        }
                                                                                                    );
                                                                                                };
                                                                                                result(null, { id: res.insertId, ...newStudent })
                                                                                            });

                                                                                        }

                                                                                    }
                                                                                })
                                                                        });
                                                                    });

                                                                }
                                                            }
                                                        });
                                                }

                                            }


                                        });
                                }
                            }

                        });
                }
            }
        });
};

Student.searchStudentByCollege = (searchKey, collegeId, result) => {
    const searchTerm = '%' + searchKey + '%';
    db.query(
        "SELECT c.collegeName, s.batchId, s.membership_no, s.studName, s.admNo, s.rollNo, s.studDept, s.course, s.studEmail, s.studPhNo, s.studProfilePic, s.aadharNo, s.addedDate, s.validity FROM student s JOIN college c ON s.collegeId = c.id WHERE s.deleteStatus = 0 AND s.isActive = 1 AND s.isPaid = 1 AND s.emailVerified = 1 AND s.collegeId = ? AND c.deleteStatus = 0 AND c.isActive = 1 AND c.emailVerified = 1 AND s.validity > CURRENT_DATE AND (s.studName LIKE ? OR s.rollNo LIKE ? OR s.studDept LIKE ? OR s.course LIKE ? OR s.admNo LIKE ? )",
        [collegeId, searchTerm, searchTerm, searchTerm, searchTerm, searchTerm],
        (err, res) => {
            if (err) {
                console.error("Error while searching student: ", err);
                result(err, null);
                return;
            } else {
                console.log("Student found: ", res);
                result(null, res);
                return;
            }
        }
    );
};

Student.searchStudentByBatch = (searchKey, result) => {
    db.query(
        "SELECT `id`, `collegeId`, `batchId`, `membership_no`, `studName`, `admNo`, `rollNo`, `studDept`, `course`, `studEmail`, `studPhNo`, `studProfilePic`, `aadharNo`, `password`, `addedDate`, `updatedDate`, `validity`, `isPaid`, `isVerified`, `isActive`, `emailVerified`, `pwdUpdateStatus`, `updateStatus`, `deleteStatus` FROM `student` WHERE `batchId`= ? ",
        [searchKey],
        (err, res) => {
            if (err) {
                console.error("Error while searching student: ", err);
                result(err, null);
                return;
            } else {
                // console.log("Students found: ", res);
                let data=Object.values(JSON.parse(JSON.stringify(res)))
                result(null, data);
                return;
            }
        }
    );
};


Student.findByEmail = (Email, result) => {
    db.query("SELECT * FROM student WHERE studEmail = ? AND deleteStatus = 0 AND isActive = 1", [Email],
        (verifyErr, verifyRes) => {
            if (verifyErr) {
                console.log("Error: ", verifyErr)
                return result(verifyErr, null)
            }
            if (verifyRes.length === 0) {
                console.log("Student Does Not Exist")
                return result("Student Does Not Exist", null)
            } else {
                db.query("SELECT * FROM student WHERE studEmail = ? AND isVerified = 1 AND emailVerified = 1", [Email],
                    (err, res) => {
                        if (err) {
                            console.log("Error: ", err)
                            return result(err, null)
                        } else {
                            if (res.length === 0) {
                                console.log("Account Under Verification Progress/Not Verified")
                                return result("Account Under Verification Progress/Not Verified", null)
                            } else {
                                db.query("SELECT * FROM student WHERE studEmail = ? AND validity > CURRENT_DATE OR validity = CURRENT_DATE", [Email],
                                    (validityErr, validityRes) => {
                                        if (validityErr) {
                                            console.log("Error: ", validityErr)
                                            return result(validityErr, null)
                                        }
                                        if (validityRes.length === 0) {
                                            console.log("Account expired. Please Renew Your Plan.")
                                            return result("Account expired. Please Renew Your Plan", null)
                                        }


                                        db.query("SELECT * FROM student WHERE BINARY studEmail = ? AND deleteStatus = 0 AND isActive = 1", [Email],
                                            (err, res) => {
                                                if (err) {
                                                    console.log("Error : ", err)
                                                    return result(err, null)

                                                }

                                                if (res.length > 0) {
                                                    result(null, res[0])
                                                    //Log for student login
                                                    logStudent(res[0].id, "Student logged In")
                                                    return
                                                }
                                            })
                                    })

                            }
                        }
                    })

            }

        })
}


Tasks.studentTaskView = (studId, result) => {
    db.query("SELECT s.batchId, t.* FROM task t JOIN student s ON s.batchId = t.batchId  WHERE t.deleteStatus = 0 AND t.isActive = 1 AND s.id = ? AND s.deleteStatus = 0 AND s.isActive = 1", [studId],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null)
                return
            } else {
                console.log("Tasks: ", res);
                result(null, res)
                return
            }
        })
}

Student.StdChangePassword = (student, result) => {
    const studentPassword = "SELECT password, id FROM student WHERE studEmail=? AND deleteStatus = 0 AND isActive = 1 AND ispaid = 1 AND emailVerified = 1 AND validity > CURRENT_DATE AND isVerified = 1";
    db.query(studentPassword, [student.studEmail], (err, res) => {
        if (err) {
            console.log("Error:", err);
            result(err, null);
            return;
        }
        if (res.length) {
            const hashedOldPassword = res[0].password;
            const id = res[0].id;
            if (bcrypt.compareSync(student.oldPassword, hashedOldPassword)) {
                const updateStudentPasswordQuery = "UPDATE student SET password = ?, pwdUpdateStatus = 1 WHERE studEmail = ? AND deleteStatus = 0 AND isActive = 1 AND ispaid = 1 AND emailVerified = 1 AND validity > CURRENT_DATE AND isVerified = 1";
                const hashedNewPassword = bcrypt.hashSync(student.newPassword, 10);
                db.query(updateStudentPasswordQuery, [hashedNewPassword, student.studEmail], (updateErr) => {
                    if (updateErr) {
                        console.log("Error : ", updateErr);
                        result(updateErr, null);
                    } else {
                        // Assuming logStudent function takes student ID as the first parameter
                        logStudent(id, "password changed");
                        result(null, { "status": "Password Updated Successfully." });
                    }
                });
            } else {
                result(null, { status: "Incorrect Old Password!!" });
            }
        } else {
            result(null, { status: "No Student Found" });
        }
    });
};


Student.viewStudentProfile = (studId, result) => {
    db.query("SELECT c.collegeName, s.batchId, s.membership_no, s.studName, s.admNo, s.rollNo, s.studDept, s.course, s.studEmail, s.studPhNo, s.studProfilePic, s.aadharNo, s.addedDate, s.validity FROM student s LEFT JOIN college c ON s.collegeId = c.id WHERE s.deleteStatus=0 AND s.isActive=1 AND s.isVerified = 1 AND s.id = ?", [studId],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null)
                return
            } else {
                console.log("Profile: ", res);
                result(null, res)
                return
            }
        })
}


Student.updateStudentProfile = (student, result) => {

    db.query("SELECT * FROM college c JOIN student s ON s.collegeId = c.id WHERE s.id = ? AND c.deleteStatus = 0 AND c.isActive = 1",
        [student.id],
        (collegeErr, collegeRes) => {
            if (collegeErr) {
                console.error("Error checking college: ", collegeErr);
                return result(collegeErr, null);
            }
            if (collegeRes.length === 0) {
                console.log("college does not exist or is inactive/deleted.");
                return result("college does not exist or is inactive/deleted.", null);
            }

            db.query("SELECT * FROM batches b JOIN student s ON s.batchId = b.id WHERE s.id = ?  AND b.deleteStatus = 0 AND b.isActive = 1",
                [student.id],
                (batchErr, batchRes) => {
                    if (batchErr) {
                        console.error("Error checking batch: ", batchErr);
                        return result(batchErr, null);
                    }
                    if (batchRes.length === 0) {
                        console.log("Batch does not exist or is inactive/deleted.");
                        return result("Batch does not exist or is inactive/deleted.", null);
                    }

                    db.query("UPDATE student SET studName = ?, admNo = ?, rollNo = ?, studDept = ?, course = ?, studPhNo = ?, studProfilePic = ?, aadharNo = ?, updatedDate = CURRENT_DATE(), updateStatus = 1 WHERE id = ? AND deleteStatus = 0 AND isActive = 1",
                        [
                            student.studName,
                            student.admNo,
                            student.rollNo,
                            student.studDept,
                            student.course,
                            student.studPhNo,
                            student.studProfilePic,
                            student.aadharNo,
                            student.id
                        ],
                        (updateErr, updateRes) => {
                            if (updateErr) {
                                console.error("Error updating student: ", updateErr);
                                return result(updateErr, null);
                            }

                            if (updateRes.affectedRows === 0) {
                                return result({ kind: "not_found" }, null);
                            }

                            // Log the student profile update
                            logStudent(student.id, "Profile Updated");

                            console.log("Updated Student Details: ", { id: student.id, ...student });
                            result(null, { id: student.id, ...student });
                        });
                });
        });
}

Student.viewUnverifiedStudents = (collegeId, result) => {
    db.query("SELECT * FROM student WHERE deleteStatus = 0 AND isVerified = 0 AND isActive=1 AND emailVerified = 1 AND collegeId = ?",
        [collegeId],

        (err, res) => {
            if (err) {
                console.error("Error while fetching unverified students: ", err);
                return result(err, null);
            }
            if (res.length === 0) {
                console.log("No unverified students found.");
                return result("No unverified students found.", null);
            }

            console.log("Unverified students: ", res);
            result(null, res);
        });
}

// View All Students By Admin
Student.viewAllStudentByAdmin = (result) => {
    db.query("SELECT c.collegeName, b.batchName, s.membership_no, s.studName, s.admNo, s.rollNo, s.studDept, s.course, s.studEmail, s.studPhNo, s.studProfilePic, s.aadharNo, s.validity FROM student s JOIN college c ON s.collegeId = c.id JOIN batches b ON s.batchId = b.id WHERE s.validity > CURRENT_DATE AND s.isPaid = 1 AND s.isVerified = 1 AND s.emailVerified = 1 AND s.isActive = 1 AND s.deleteStatus = 0 AND c.deleteStatus = 0 AND c.isActive = 1 AND c.emailVerified = 1 AND b.deleteStatus = 0 AND b.isActive = 1",
        (err, response) => {
            if (err) {
                console.log("Error : ", err)
                result(err, null)
                return
            }
            if (response.length === 0) {
                console.log("Data Not Found")
                return result("Data Not Found", null)
            }
            console.log("College : ", response)
            result(null, response)

        })
}

Student.taskSubmissionByStudent = (submissionData, result) => {
    const { studId, taskId, gitLink, remarks } = submissionData;
    const currentDate = new Date()

    // Check if student is valid
    db.query("SELECT * FROM student WHERE id = ? AND isActive = 1 AND deleteStatus = 0 AND emailVerified = 1 AND isPaid = 1 AND isVerified = 1", [studId], (studentErr, studentRes) => {
        if (studentErr) {
            console.error("Error checking student validity: ", studentErr);
            result(studentErr, null);
            return;
        }

        if (studentRes.length === 0) {
            result("Invalid student details!", null);
            return;
        }

        // Check if the task exists and is active
        db.query("SELECT * FROM task WHERE id = ? AND deleteStatus = 0 AND isActive = 1", [taskId], (taskErr, taskRes) => {
            if (taskErr) {
                console.error("Error checking task: ", taskErr);
                result(taskErr, null);
                return;
            }

            if (taskRes.length === 0) {
                result("Task not found or inactive.", null);
                return;
            }

            const task = taskRes[0];

            // Check if the student has already submitted for this task
            db.query("SELECT * FROM submit_task WHERE studId = ? AND taskId = ?", [studId, taskId], (previousSubmissionErr, previousSubmissionRes) => {
                if (previousSubmissionErr) {
                    console.error("Error checking previous submission: ", previousSubmissionErr);
                    result(previousSubmissionErr, null);
                    return;
                }

                if (previousSubmissionRes.length > 0) {
                    result("Task already submitted by the student.", null);
                    return;
                }

                // Save submission in submit_task table
                const submission = {
                    studId,
                    taskId,
                    gitLink,
                    remarks,
                    subDate: currentDate
                };

                // Check if submission date is greater than due date
                if (currentDate > task.dueDate) {
                    submission.lateSubDate = currentDate;
                }

                db.query("INSERT INTO submit_task SET ?", submission, (submissionErr, submissionRes) => {
                    if (submissionErr) {
                        console.error("Error saving submission: ", submissionErr);
                        result(submissionErr, null);
                        return;
                    }

                    // Update lateSubDate in task table if submission date is greater than due date
                    if (currentDate > task.dueDate) {
                        db.query("UPDATE submit_task SET lateSubDate = ? WHERE id = ?", [currentDate, taskId], (updateErr, updateRes) => {
                            if (updateErr) {
                                console.error("Error updating lateSubDate: ", updateErr);
                                result(updateErr, null);
                                return;
                            }

                            result("Submission saved successfully.", null);
                        });
                    } else {
                        result("Submission saved successfully.", null);
                    }
                });
            });
        });
    });
};


SubmitTask.viewEvaluatedTasks = (studId, result) => {
    // Check if the student ID exists in the student table
    db.query("SELECT * FROM student WHERE id = ? AND deleteStatus=0 AND isActive=1 AND isPaid = 1 AND emailVerified = 1 AND isVerified=1", [studId], (studentErr, studentRes) => {
        if (studentErr) {
            console.error("Error checking student existence:", studentErr);
            result(studentErr, null);
            return;
        }

        if (studentRes.length === 0) {
            console.log("Student with ID not found.");
            result("Student with the specified ID not found.", null);
            return;
        }

        // Continue to fetch evaluated tasks if student ID exists
        db.query(
            "SELECT t.taskTitle,s.gitLink, t.totalScore, s.score, s.evaluatorRemarks,s.evalDate,a.AdStaffName as 'evaluator name' FROM submit_task s JOIN task t ON s.taskId = t.id JOIN admin_staff a ON s.admStaffId=a.id WHERE s.studId = ? AND s.isEvaluated = 1;",
            [studId],
            (err, res) => {
                if (err) {
                    console.error("Error retrieving evaluated tasks:", err);
                    result(err, null);
                    return;
                }

                if (res.length === 0) {
                    console.log("No evaluated tasks found");
                    result("No evaluated tasks found.", null);
                    return;
                }

                // Return evaluated tasks
                result(null, res);
            }
        );
    });
}



Student.refundAmountReceivedStatus = (studId, token, result) => {
    const checkRefundQuery = 'SELECT * FROM refund WHERE studId = ? AND refundApprovalStatus = 1 AND cancelStatus = 0';

    db.query(checkRefundQuery, [studId], (err, res) => {
        if (err) {
            console.error('Error checking refund status:', err);
            result(err, null);
            return;
        }

        if (res.length === 0) {
            result({ status: 'No eligible refund request found.' }, null);
            return;
        }

        const refundId = res[0].id;

        const updateQuery = 'UPDATE refund SET AmountReceivedStatus = 1 WHERE id = ?';

        db.query(updateQuery, [refundId], (updateErr, updateRes) => {
            if (updateErr) {
                console.error('Error updating refund status:', updateErr);
                result(updateErr, null);
                return;
            }

            result(null, { status: 'Successfully updated refund amount received status' });
        });
    });
};



Student.searchStudentsByAdmAndAdmstf = (search, result) => {
    const searchString = '%' + search + '%';
    db.query(
        `
        SELECT 
            s.studName, 
            s.id, 
            s.studProfilePic, 
            c.collegeName, 
            s.collegeId, 
            s.batchId, 
            s.admNo, 
            s.rollNo, 
            s.studDept, 
            s.course, 
            s.studEmail, 
            s.studPhNo, 
            s.aadharNo, 
            s.membership_no 
        FROM 
            student s 
            LEFT JOIN college c ON s.collegeId = c.id 
        WHERE 
            s.deleteStatus = 0 
            AND s.isActive = 1 
            AND s.emailVerified = 1 
            AND s.isPaid = 1 
            AND s.isVerified = 1 
            AND (
                s.id LIKE ? 
                OR s.collegeId LIKE ? 
                OR s.batchId LIKE ? 
                OR s.studName LIKE ? 
                OR s.admNo LIKE ? 
                OR s.rollNo LIKE ? 
                OR s.studDept LIKE ? 
                OR s.course LIKE ? 
                OR s.studEmail LIKE ? 
                OR s.studPhNo LIKE ? 
                OR s.aadharNo LIKE ? 
                OR s.membership_no LIKE ?
            )
        `,
        [searchString, searchString, searchString, searchString, searchString, searchString, searchString, searchString, searchString, searchString, searchString, searchString],
        (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(err, null);
            } else {
                console.log("Student Details: ", res);
                result(null, res);
            }
        }
    );
};

Student.viewBatch = (collegeId, result) => {
    db.query(
        "SELECT DISTINCT  b.batchName, b.regStartDate, b.id, b.regEndDate, b.batchDesc, b.batchAmount, b.addedDate FROM batches b JOIN college c ON b.collegeId = c.id WHERE b.deleteStatus = 0 AND b.isActive = 1 AND c.deleteStatus = 0 AND c.isActive = 1 AND c.id = ?",
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


Student.collegeViewAll = async (result) => {
    let query = "SELECT * FROM college WHERE deleteStatus= 0 AND isActive= 1"
    db.query(query, (err, response) => {
        if (err) {
            console.log("error: ", err)
            result(err, null)
            return
        } else {
            console.log("College: ", response)
            result(null, response)
        }
    })
}


Student.generateAllBatchWiseList = async (result) => {
    let query = `
        SELECT b.batchName, s.studName, c.collegeName, s.admNo, s.studDept, s.course, 
               s.studEmail, s.studPhNo, s.studProfilePic, s.aadharNo, s.validity,s.membership_no 
        FROM batches b 
        JOIN student s ON b.id = s.batchId 
        JOIN college c ON s.collegeId = c.id 
        WHERE s.isActive = 1 AND b.isActive = 1 AND s.emailVerified = 1 
              AND s.isVerified = 1 AND s.isPaid = 1 AND s.deleteStatus = 0 AND b.deleteStatus = 0 
              AND DATE_SUB(CURDATE(), INTERVAL 1 YEAR) <= s.addedDate
        ORDER BY c.collegeName, b.id, s.id;
    `;

    db.query(query, (err, response) => {
        if (err) {
            console.log("Error executing the query:", err);
            result(err, null);
        } else {
            console.log("Query results:", response);
            result(null, response);
        }
    });
};




Student.studentNotificationView = (studId, result) => {
    db.query("SELECT * FROM student WHERE id = ? AND deleteStatus = 0 AND isActive = 1 AND emailVerified = 1 AND isVerified = 1 AND isPaid = 1", [studId], (err, studentRes) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        } else {
            if (studentRes.length === 0) {
                console.log("Student not found or not verified");
                result(null, { status: "Student not found or not verified" });
                return;
            }
            const batchId = studentRes[0].batchId;
            db.query("SELECT * FROM batches WHERE id = ? AND deleteStatus = 0 AND isActive = 1", [batchId], (err, batchRes) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                } else {
                    if (batchRes.length === 0) {
                        console.log("Batch not found");
                        result(null, { status: "Batch not found" });
                        return;
                    }
                    db.query("SELECT message, sendBy, title, addedDate,sendDateTime FROM notifications WHERE batchId = ? ORDER BY sendDateTime DESC", [batchId], (err, notificationsRes) => {
                        if (err) {
                            console.log("error: ", err);
                            result(err, null);
                            return;
                        } else {
                            console.log("Notifications: ", notificationsRes);
                            result(null, notificationsRes);
                            return;
                        }
                    });
                }
            });
        }
    });
};
  




Student.viewSession = (batchId, result) => {
    db.query(
        "SELECT DISTINCT s.sessionName, s.date, s.time, s.type, s.remarks, s.venueORlink, s.attendenceCode FROM sessiondetails s JOIN student st ON s.batchId = st.batchId WHERE s.deleteStatus = 0 AND s.isActive = 1 AND st.deleteStatus = 0 AND st.isActive = 1 AND s.batchId = ?",
        [batchId],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            } else {
                console.log("Session Details: ", res);
                result(null, res);
            }
        }
    );
};


Student.viewBatchAmount = (collegeId, batchId, result) => {
    db.query(
        "SELECT b.batchAmount FROM batches b JOIN college c ON b.collegeId = c.id WHERE b.deleteStatus = 0 AND b.isActive = 1 AND c.deleteStatus = 0 AND c.isActive = 1 AND c.id = ? AND b.id = ?",
        [collegeId, batchId],
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

module.exports = { Student, Payment, Tasks, SubmitTask };

