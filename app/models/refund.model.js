const db = require("../models/db");
const { StudentLog, logStudent } = require("../models/studentLog.model")

const Refund = function (refund) {
    this.studId = refund.studId;
    this.reason = refund.reason;
    this.accountNo = refund.accountNo;
    this.IFSCCode = refund.IFSCCode;
    this.bankName = refund.bankName;
    this.branchName = refund.branchName;
    this.upiId = refund.upiId;
    this.refundAmnt = refund.refundAmnt;
    this.approvedAmnt = refund.approvedAmnt;
    this.admStaffId = refund.admStaffId;
    this.transactionNo = refund.transactionNo;
    this.adminRemarks = refund.adminRemarks;
};

Refund.createRefundRequest = (newRefund, result) => {
    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    // Step 1: Check for existing active refund requests
    db.query(
        "SELECT id FROM refund WHERE studId = ? AND cancelStatus = 0",
        [newRefund.studId],
        (existingRefundErr, existingRefundRes) => {
            if (existingRefundErr) {
                console.error("Error checking existing refund requests:", existingRefundErr);
                result(existingRefundErr, null);
                return;
            }

            if (existingRefundRes.length > 0) {
                console.log("Refund request already exists for student ID:", newRefund.studId);
                result("A refund request already exists for the student.", null);
                return;
            }

            // Step 2: If no active request found, check for recently cancelled requests
            db.query(
                "SELECT id FROM refund WHERE studId = ? AND cancelStatus = 1 AND cancelDate IS NOT NULL AND DATE(cancelDate) > DATE_SUB(CURDATE(), INTERVAL 1 WEEK)",
                [newRefund.studId],
                (recentCancelErr, recentCancelRes) => {
                    if (recentCancelErr) {
                        console.error("Error checking recently cancelled refund requests:", recentCancelErr);
                        result(recentCancelErr, null);
                        return;
                    }

                    if (recentCancelRes.length > 0) {
                        console.log("A refund request was recently cancelled for student ID:", newRefund.studId);
                        result("A refund request was recently cancelled. Please wait for one week before creating a new request.", null);
                        return;
                    }

                    // Retrieve payment information for the specified student ID
                    db.query(
                        "SELECT paymentdate, rpAmount FROM payment WHERE studId = ? ORDER BY paymentdate DESC LIMIT 1;",
                        [newRefund.studId],
                        (paymentErr, paymentRes) => {
                            if (paymentErr) {
                                console.error("Error retrieving payment information:", paymentErr);
                                result(paymentErr, null);
                                return;
                            }

                            if (paymentRes.length === 0) {
                                console.log("No payment history found for student ID:", newRefund.studId);
                                result(new Error("No payment history found for the student."), null);
                                return;
                            }

                            // Calculate refund amount based on payment history and remaining payment period
                            let totalPayment = 0;
                            for (const payment of paymentRes) {
                                totalPayment = totalPayment + payment.rpAmount.toFixed(1);
                            }

                            console.log("Total payment:", totalPayment);

                            // Calculate the remaining payment period in days
                            const currentDate = formatDate(new Date());
                            console.log("current date: ", currentDate)
                            const paymentStartDate = formatDate(paymentRes[0].paymentdate);
                            console.log("payment start date: ", paymentStartDate)
                            let daysSincePaymentStart = Math.floor(
                                (new Date(currentDate.split('/').reverse().join('-')) - new Date(paymentStartDate.split('/').reverse().join('-'))) / (24 * 60 * 60 * 1000)
                            );
                            // console.log("current date: ", new Date(currentDate.split('/').reverse().join('-')))
                            // console.log("payment date: ", new Date(paymentStartDate.split('/').reverse().join('-')))
                            // console.log("Initial: ", daysSincePaymentStart)
                            daysSincePaymentStart = daysSincePaymentStart - 1
                            // console.log("Final: ", daysSincePaymentStart)
                            if (daysSincePaymentStart < 0) {
                                console.error("Error calculating days since payment start:", daysSincePaymentStart);
                                result("Error calculating days since payment start.", null);
                                return;
                            } else {
                                console.log("Days since payment start:", daysSincePaymentStart);

                                // Assuming the payment plan is for one year (365 days)
                                const remainingPaymentPeriod = 365 - daysSincePaymentStart;

                                console.log("Remaining payment period:", remainingPaymentPeriod);

                                // Check if the payment date is greater than one year
                                if (remainingPaymentPeriod <= 0) {
                                    console.log("Refund request expired for student ID:", newRefund.studId);
                                    result("Refund request expired. Payment date is greater than one year.", null);
                                    return;
                                }

                                // Calculate the remaining payment amount, handling NaN case
                                const remainingPaymentAmount = (totalPayment / 365) * remainingPaymentPeriod || 0;

                                newRefund.refundAmnt = remainingPaymentAmount.toFixed(1);


                                db.query("INSERT INTO refund SET ?", newRefund, (refundErr, refundRes) => {
                                    if (refundErr) {
                                        console.error("Error creating refund:", refundErr);
                                        result(refundErr, null);
                                        return;
                                    }

                                    // Log student added
                                    logStudent(newRefund.studId, "Refund request sent")

                                    console.log("Created refund:", { id: refundRes.insertId, ...newRefund });
                                    result(null, { id: refundRes.insertId, ...newRefund, remainingPaymentPeriod });
                                });
                            }
                        }
                    );
                }
            );
        }
    );
};


Refund.getRefundRequests = (result) => {
    db.query(
        "SELECT r.id AS refundId, s.studName, c.collegeName, r.studId, r.requestedDate, r.reason, r.refundAmnt, CASE WHEN r.refundApprovalStatus = 1 THEN 'Amount Approved' ELSE 'Under Progress' END AS refundApprovalStatus, CASE WHEN r.AmountReceivedStatus = 1 THEN 'Amount Received' ELSE 'Not Yet Received' END AS AmountReceivedStatus, CASE WHEN r.AdmStaffId = 0 THEN 'Admin' ELSE a.AdStaffName END AS AdmStaffName, r.approvedAmnt, r.accountNo, r.IFSCCode, r.bankName, r.branchName, r.upiId, CASE WHEN r.refundStatus = 1 THEN 'Amount Refunded' ELSE 'Not Refunded' END AS refundStatus FROM refund r JOIN student s ON r.studId = s.id JOIN college c ON s.collegeId = c.id LEFT JOIN admin_staff a ON r.AdmStaffId = a.id WHERE r.cancelStatus = 0 AND s.deleteStatus = 0 AND s.isActive = 1 AND s.isVerified = 1 ORDER BY r.requestedDate ASC",
        (err, res) => {
            if (err) {
                console.error("Error retrieving refund requests:", err);
                result(err, null);
                return;
            }
            if (res.length === 0) {
                console.log("No refund requests found");
                result("No refund requests found.", null);
                return;
            }
            // Format the date for each session
            const formattedRefunds = res.map(refunds => ({ ...refunds, requestedDate: refunds.requestedDate ? refunds.requestedDate.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: '2-digit', year: 'numeric' }) : null })); // Formats the date as 'YYYY-MM-DD'
            // Return all refund requests
            console.log(formattedRefunds)
            result(null, formattedRefunds);
        }
    );
};


Refund.viewRefundStatus = (studId, result) => {
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

        // Continue to fetch refund status if student ID exists
        db.query(
            "SELECT r.id AS refundId, s.id AS studId, s.studName, r.requestedDate, r.reason, r.approvedAmnt, r.refundInitiatedDate, CASE WHEN r.refundApprovalStatus = 0 THEN 'Not Approved' WHEN r.refundApprovalStatus = 1 THEN 'Approved' ELSE 'Unknown' END AS approvalStatus, CASE WHEN r.refundStatus = 0 THEN 'Pending' WHEN r.refundStatus = 1 THEN 'Processed' ELSE 'Unknown' END AS refundStatus, r.transactionNo, CASE WHEN r.AmountReceivedStatus = 1 THEN 'Received' WHEN r.AmountReceivedStatus = 0 THEN 'Not Received' ELSE 'Unknown' END AS AmountReceivedStatus, COALESCE(r.adminRemarks, 'Nil') AS adminRemarks FROM refund r JOIN student s ON r.studId = s.id WHERE r.cancelStatus = 0 AND r.studId = ?",
            [studId],
            (err, res) => {
                if (err) {
                    console.error("Error retrieving refund status:", err);
                    result(err, null);
                    return;
                }

                if (res.length === 0) {
                    console.log("No refund requests found");
                    result("No refund requests found.", null);
                    return;
                }

                // Check refund approval status
                if (res[0].refundApprovalStatus === 0) {
                    result("Your application is under process.", null);
                } else {
                    // Format the date for each refund request
                    const formattedRefund = res.map(refund => ({ ...refund, requestedDate: refund.requestedDate.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: '2-digit', year: 'numeric' }), refundInitiatedDate: refund.refundInitiatedDate ? refund.refundInitiatedDate.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: '2-digit', year: 'numeric' }) : null })); // Formats the date as 'YYYY-MM-DD'
                    // Return refund details with student name and college name
                    result(null, formattedRefund);
                }
            }
        );
    });
};

//admin staff refund approval
Refund.initiateRefund = (approvedAmnt, admStaffId, transactionNo, adminRemarks, refundId, result) => {
    // Check if the refund ID exists in the refund table
    db.query("SELECT * FROM refund WHERE id = ? AND cancelStatus = 0 AND refundApprovalStatus = 1", [refundId], (refundErr, refundRes) => {
        if (refundErr) {
            console.error("Error checking refund existence:", refundErr);
            result(refundErr, null);
            return;
        }

        if (refundRes.length === 0) {
            console.log("Refund with ID not found.");
            result("Refund with the specified ID not found.", null);
            return;
        }

        // Continue to initiate refund if refund ID exists
        db.query(
            "UPDATE refund SET approvedAmnt = ?, transactionNo = ?, adminRemarks = ?, refundStatus = 1, refundInitiatedDate=CURRENT_DATE(), admStaffId=? WHERE id = ?",
            [approvedAmnt, transactionNo, adminRemarks, admStaffId, refundId],
            (err, res) => {
                if (err) {
                    console.error("Error initiating refund:", err);
                    result(err, null);
                    return;
                }

                if (res.affectedRows === 0) {
                    // Refund with the specified ID not found
                    result("Refund with the specified ID not found.", null);
                    return;
                }

                result(null, null);
            }
        );
    });
};



Refund.approveRefund = (approvedAmnt, admStaffId, refundId, result) => {
    // Check if the refund ID exists in the refund table
    db.query("SELECT * FROM refund WHERE id = ? AND cancelStatus = 0 AND refundApprovalStatus = 0", [refundId], (refundErr, refundRes) => {
        if (refundErr) {
            console.error("Error checking refund existence:", refundErr);
            result(refundErr, null);
            return;
        }

        if (refundRes.length === 0) {
            console.log("Refund with ID not found.");
            result("Refund with the specified ID not found.", null);
            return;
        }

        // Continue to approve refund if refund ID exists
        db.query(
            "UPDATE refund SET refundApprovalStatus = 1, approvedAmnt = ?, admStaffId=? WHERE id = ?",
            [approvedAmnt, admStaffId, refundId],
            (err, res) => {
                if (err) {
                    console.error("Error approving refund:", err);
                    result(err, null);
                    return;
                }

                if (res.affectedRows === 0) {
                    // Refund with the specified ID not found
                    result("Refund with the specified ID not found.", null);
                    return;
                }

                result(null, null);
            }
        );
    });
}



Refund.cancelRefundRequest = (refundId, result) => {
    // Check if the refund ID exists in the refund table
    db.query("SELECT * FROM refund WHERE id = ? AND cancelStatus = 0", [refundId], (refundErr, refundRes) => {
        if (refundErr) {
            console.error("Error checking refund existence:", refundErr);
            result(refundErr, null);
            return;
        }

        if (refundRes.length === 0) {
            console.log("Refund with ID not found.");
            result("Refund with the specified ID not found.", null);
            return;
        }

        // Continue to cancel refund if refund ID exists
        db.query(
            "UPDATE refund SET cancelStatus = 1 WHERE id = ?",
            [refundId],
            (err, res) => {
                if (err) {
                    console.error("Error cancelling refund:", err);
                    result(err, null);
                    return;
                }

                if (res.affectedRows === 0) {
                    // Refund with the specified ID not found
                    result("Refund with the specified ID not found.", null);
                    return;
                }

                result(null, null);
            }
        );
    });
};

//Admin Staff Reject Refund
Refund.rejectRefund = (admStaffId, adminRemarks, refundId, result) => {
    db.query("UPDATE refund SET cancelStatus = 1, cancelDate = CURRENT_DATE, adminRemarks = ?, AdmStaffId = ? WHERE id = ? AND cancelStatus = 0",
        [adminRemarks, admStaffId, refundId],
        (err, res) => {
            if (err) {
                console.log("Error Rejecting Refund : ", err)
                result(err, null)
                return
            }

            if (res.affectedRows === 0) {
                result("Refund Request Not Found.", null)
                return
            }
            result(null, null)
        })
}

Refund.getSuccessfulRefunds = (result) => {
    db.query(
        "SELECT s.studName, s.membership_no, c.collegeName, r.studId, r.requestedDate, r.reason, r.refundAmnt, r.refundInitiatedDate, r.approvedAmnt, r.transactionNo FROM refund r JOIN student s ON r.studId = s.id JOIN college c ON s.collegeId = c.id WHERE r.refundApprovalStatus = 1 AND r.refundStatus = 1 AND r.AmountReceivedStatus = 1 AND r.cancelStatus = 0 ORDER BY r.refundInitiatedDate DESC",
        (err, res) => {
            if (err) {
                console.error("Error retrieving successful refunds:", err);
                result(err, null);
                return;
            }
            if (res.length === 0) {
                console.log("No successful refunds found");
                result("No successful refunds found.", null);
                return;
            }
            const formattedRefunds = res.map(refunds => ({ ...refunds, requestedDate: refunds.requestedDate.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: '2-digit', year: 'numeric' }), refundInitiatedDate: refunds.refundInitiatedDate ? refunds.refundInitiatedDate.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: '2-digit', year: 'numeric' }) : null }));
            // Return all successful refunds
            console.log(formattedRefunds)
            result(null, formattedRefunds);
        }
    );
};

Refund.searchRefundRequests = (searchterm, result) => {
    const searchTerm = '%' + searchterm + '%'
    db.query("SELECT r.id AS refundId, s.studName, c.collegeName, r.studId, r.requestedDate, r.reason, r.refundAmnt, r.refundStatus, CASE WHEN r.refundApprovalStatus = 1 THEN 'Amount Approved' ELSE 'Under Progress' END AS refundApprovalStatus, CASE WHEN r.AmountReceivedStatus = 1 THEN 'Amount Received' ELSE 'Not Yet Received' END AS AmountReceivedStatus, CASE WHEN r.AdmStaffId = 0 THEN 'Admin' ELSE a.AdStaffName END AS AdmStaffName, r.approvedAmnt, r.accountNo, r.IFSCCode, r.bankName, r.branchName, r.upiId, CASE WHEN r.refundStatus = 1 THEN 'Amount Refunded' ELSE 'Not Refunded' END AS refundStatus FROM refund r JOIN student s ON r.studId = s.id JOIN college c ON s.collegeId = c.id LEFT JOIN admin_staff a ON r.AdmStaffId = a.id WHERE r.cancelStatus = 0 AND r.refundStatus = 0 AND s.deleteStatus = 0 AND s.isActive = 1 AND s.isVerified = 1 AND (s.studName LIKE ? OR c.collegeName LIKE ?) ORDER BY r.requestedDate ASC", [searchTerm, searchTerm], (err, res) => {
        if (err) {
            console.log("Error : ", err)
            result(err, null)
            return
        } else {
            // Format the date for each session
            const formattedRefunds = res.map(refunds => ({ ...refunds, requestedDate: refunds.requestedDate ? refunds.requestedDate.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: '2-digit', year: 'numeric' }) : null }));
            console.log(formattedRefunds)
            result(null, formattedRefunds);
        }
    })
}

Refund.searchSuccessfulRefunds = (refundsearchterm, result) => {
    const searchTerm = '%' + refundsearchterm + '%'
    db.query("SELECT s.studName, s.membership_no, c.collegeName, r.studId, r.requestedDate, r.reason, r.refundAmnt, r.refundInitiatedDate, r.approvedAmnt, r.transactionNo FROM refund r JOIN student s ON r.studId = s.id JOIN college c ON s.collegeId = c.id WHERE r.refundApprovalStatus = 1 AND r.refundStatus = 1 AND r.AmountReceivedStatus = 1 AND r.cancelStatus = 0 AND (s.studName LIKE ? OR c.collegeName LIKE ? OR s.membership_no = ?) ORDER BY r.refundInitiatedDate DESC;", [searchTerm, searchTerm, 'refundsearchterm'], (err, res) => {
        if (err) {
            console.log("Error : ", err)
            result(err, null)
            return
        } else {
            const formattedRefunds = res.map(refunds => ({ ...refunds, requestedDate: refunds.requestedDate.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: '2-digit', year: 'numeric' }), refundInitiatedDate: refunds.refundInitiatedDate ? refunds.refundInitiatedDate.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: '2-digit', year: 'numeric' }) : null }));
            // Return all successful refunds
            console.log(formattedRefunds)
            result(null, formattedRefunds);
        }
    })
}


module.exports = Refund;
