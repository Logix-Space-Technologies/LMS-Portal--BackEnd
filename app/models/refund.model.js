const db = require("../models/db");
const { StudentLog, logStudent } = require("../models/studentLog.model")

const Refund = function (refund) {
    this.studId = refund.studId;
    this.reason = refund.reason;
    this.refundAmnt = refund.refundAmnt;
    this.approvedAmnt = refund.approvedAmnt;
};

Refund.createRefundRequest = (newRefund, result) => {
    // Retrieve existing refund requests for the specified student ID
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
                // Handle the case where a refund request already exists for the student
                console.log("Refund request already exists for student ID:", newRefund.studId);
                result("A refund request already exists for the student.", null);
                return;
            }

            // Retrieve payment information for the specified student ID
            db.query(
                "SELECT paymentdate, rpAmount FROM payment WHERE studId = ? ORDER BY paymentdate ASC",
                [newRefund.studId],
                (paymentErr, paymentRes) => {
                    if (paymentErr) {
                        console.error("Error retrieving payment information:", paymentErr);
                        result(paymentErr, null);
                        return;
                    }

                    if (paymentRes.length === 0) {
                        // Handle the case where there is no payment history for the student
                        console.log("No payment history found for student ID:", newRefund.studId);
                        result("No payment history found for the student.", null);
                        return;
                    }

                    // Calculate refund amount based on payment history and remaining payment period
                    let totalPayment = 0;
                    for (const payment of paymentRes) {
                        totalPayment += payment.rpAmount;
                    }

                    console.log("Total payment:", totalPayment);

                    // Calculate the remaining payment period in days
                    const currentDate = new Date();
                    const paymentStartDate = new Date(paymentRes[0].paymentdate);
                    const daysSincePaymentStart = Math.floor(
                        (currentDate - paymentStartDate) / (24 * 60 * 60 * 1000)
                    );
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

                        newRefund.refundAmnt = remainingPaymentAmount.toFixed(2);


                        db.query("INSERT INTO refund SET ?", newRefund, (refundErr, refundRes) => {
                            if (refundErr) {
                                console.error("Error creating refund:", refundErr);
                                result(refundErr, null);
                                return;
                            }

                            // Log student added
                            logStudent(newRefund.studId, "Refund request sent")

                            console.log("Created refund:", { id: refundRes.insertId, ...newRefund });
                            result(null, { id: refundRes.insertId, ...newRefund });
                        });
                    }

                }

            );
        }
    );
};

Refund.getRefundRequests = (result) => {
    db.query(
        "SELECT student.studName, college.collegeName, refund.studId, refund.requestedDate, refund.reason, refund.refundAmnt, refund.approvedAmnt FROM refund JOIN student ON refund.studId = student.id JOIN college ON student.collegeId = college.id WHERE refund.cancelStatus = 0 AND student.deleteStatus = 0 AND student.isActive = 1 AND student.isVerified = 1 ORDER BY refund.requestedDate DESC",
        (err, res) => {
            if (err) {
                console.error("Error retrieving refund requests:", err);
                result(err, null);
                return;
            }
            if (res.length === 0) {
                console.log("No refund requests found");
                result(null, { "status": "No refund requests found." });
                return;
            }

            // Return all refund requests
            result(null, res);
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
                    // Return refund details with student name and college name
                    result(null, res);
                }
            }
        );
    });
};

//admin staff refund approval
Refund.approveRefund = (refundAmnt, admStaffId, transactionNo, adminRemarks, refundId, result) => {
    // Check if the refund ID exists in the refund table
    db.query("SELECT * FROM refund WHERE id = ? AND cancelStatus = 0 AND refundApprovalStatus = 0 ", [refundId], (refundErr, refundRes) => {
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
            "UPDATE refund SET refundApprovalStatus = 1, approvedAmnt = ?, transactionNo = ?, adminRemarks = ?, refundStatus = 1, refundInitiatedDate=CURRENT_DATE(), admStaffId=? WHERE id = ?",
            [refundAmnt, transactionNo, adminRemarks, admStaffId, refundId],
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

                result("Refund approved successfully.", null);
            }
        );
    });
};



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

                result("Refund cancelled successfully.", null);
            }
        );
    });
};

//Admin Staff Reject Refund
Refund.rejectRefund = (admStaffId, adminRemarks, refundId, result) => {
    db.query("UPDATE refund SET cancelStatus = 1, adminRemarks = ?, AdmStaffId = ? WHERE id = ? AND cancelStatus = 0",
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
            result("Refund Rejected.", null)
        })
}

Refund.getSuccessfulRefunds = (result) => {
    db.query(
        "SELECT s.studName, c.collegeName, r.studId, r.requestedDate, r.reason, r.refundAmnt, r.approvedAmnt, r.transactionNo FROM refund r JOIN student s ON r.studId = s.id JOIN college c ON s.collegeId = c.id WHERE r.refundApprovalStatus=1",
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

            // Return all successful refunds
            result(null, res);
        }
    );
};


module.exports = Refund;
