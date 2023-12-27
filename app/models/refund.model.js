const db = require("../models/db");

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
                result(null, { "status": "A refund request already exists for the student." });
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
                        result(null, { message: "No payment history found for the student." });
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
                        result(null, { status: "error", message: "Error calculating days since payment start." });
                        return;
                    }else{
                        console.log("Days since payment start:", daysSincePaymentStart);

                    // Assuming the payment plan is for one year (365 days)
                    const remainingPaymentPeriod = 365 - daysSincePaymentStart;

                    console.log("Remaining payment period:", remainingPaymentPeriod);

                    // Check if the payment date is greater than one year
                    if (remainingPaymentPeriod <= 0) {
                        console.log("Refund request expired for student ID:", newRefund.studId);
                        result(null, { status: "error", message: "Refund request expired. Payment date is greater than one year." });
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

                        console.log("Created refund:", { id: refundRes.insertId, ...newRefund });
                        result(null, { id: refundRes.insertId, ...newRefund });
                    });
                    }
                    
                }

            );
        }
    );
};


module.exports = Refund;
