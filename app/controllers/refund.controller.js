const jwt = require("jsonwebtoken");
const Refund = require("../models/refund.model");
const { request, response } = require("express");

exports.createRefundRequest = (request, response) => {
    refundtoken = request.body.token;
    jwt.verify(refundtoken, "lmsappstud", (err, decoded) => {
        if (decoded) {
            const newRefund = new Refund({
                studId: request.body.studId, // Use studId instead of studid
                reason: request.body.reason,
            });

            Refund.createRefundRequest(newRefund, (err, data) => {
                if (err) {
                    console.log(err);
                    if (err.message === "A refund request already exists for the student.") {
                        response.json({ "status":"A refund request already exists for the student." });
                    } else if (err.message === "No payment history found for the student.") {
                        response.json({ "status": "No payment history found for the student." });
                    } else {
                        response.json({ "status": "Failed to create refund request." });
                    }
                } else {
                    console.log("Refund request successfully created");
                    response.json({ "status": "success", "data": data });
                }
            });
        } else {
            response.json({ "status": "Unauthorized User!!" });
        }
    });
};

exports.getRefundRequests = (request, response) => {
    refundtoken = request.body.token;
    key = request.body.key;
    jwt.verify(refundtoken, key, (err, decoded) => {
        if (decoded) {
            Refund.getRefundRequests((err, data) => {
                if (err) {
                    console.log(err);
                    response.json({ "status": "Failed to retrieve refund requests." });
                } else {
                    console.log("Refund requests successfully retrieved");
                    response.json({ "status": "success", "data": data });
                }
            });
        } else {
            response.json({ "status": "Unauthorized User!!" });
        }
    });
};

exports.getRefundStatus = (request, response) => {
    refundtoken = request.body.token;
    jwt.verify(refundtoken, "lmsappstud", (err, decoded) => {
        if (decoded) {
            Refund.viewRefundStatus(request.body.studId, (err, data) => {
                if (err) {
                    console.log(err);
                    response.json({ "status": "Failed to retrieve refund status." });
                } else {
                    console.log("Refund status successfully retrieved");
                    response.json({ "status": "success", "data": data });
                }
            });
        } else {
            response.json({ "status": "Unauthorized User!!" });
        }
    });
};


exports.approveRefundRequest = (request, response) => {
    const {refundAmnt, transactionNo, adminRemarks, admStaffId, refundId} = request.body;
    refundtoken = request.body.token;
    jwt.verify(refundtoken, "lmsappone", (err, decoded) => {
        if (decoded) {
            Refund.approveRefund(refundAmnt, admStaffId, transactionNo, adminRemarks, refundId, (err, data) => {
                if (err) {
                    console.log(err);
                    response.json({ "status": err });
                } else {
                    console.log("Refund request successfully approved");
                    response.json({ "status": "success", "data": data });
                }
            });
        } else {
            response.json({ "status": "Unauthorized User!!" });
        }
    });
}



//Admin Staff Reject Refund
exports.rejectRefundRequest = (request, response) => {
    const {admStaffId, adminRemarks, refundId} = request.body
    const rejectRefundToken = request.body.token
    jwt.verify(rejectRefundToken, "lmsappone", (err, decoded) => {
        if (decoded) {
            Refund.rejectRefund(admStaffId, adminRemarks, refundId, (err, data) => {
                if (err) {
                    console.log(err);
                    response.json({ "status": err })
                } else {
                    console.log("Refund Request Cancelled.");
                    response.json({ "status": "Refund Request Cancelled."});
                }
            })
        } else {
            return response.json({ "status": "Unauthorized User!!" })
        }
    })
}

exports.getSuccessfulRefunds = (request, response) => {
    refundtoken = request.body.token;
    key = request.body.key;
    jwt.verify(refundtoken, key, (err, decoded) => {
        if (decoded) {
            Refund.getSuccessfulRefunds((err, data) => {
                if (err) {
                    console.log(err);
                    response.json({ "status": "Failed to retrieve successful refunds." });
                } else {
                    console.log("Successful refunds successfully retrieved");
                    response.json({ "status": "success", "data": data });
                }
            });
        } else {
            response.json({ "status": "Unauthorized User!!" });
        }
    });
};


