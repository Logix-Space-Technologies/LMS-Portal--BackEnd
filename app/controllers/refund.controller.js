const jwt = require("jsonwebtoken");
const Refund = require("../models/refund.model");

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

