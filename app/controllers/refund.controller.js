const jwt = require("jsonwebtoken");
const Refund = require("../models/refund.model");
const { AdminStaffLog, logAdminStaff } = require("../models/adminStaffLog.model")
const { StudentLog, logStudent } = require("../models/studentLog.model");
const Validator = require("../config/data.validate");
const mailContents = require('../config/mail.content');
const mail = require('../../sendEmail');
const db = require('../models/db');

exports.createRefundRequest = (request, response) => {
    refundtoken = request.headers.token;
    jwt.verify(refundtoken, "lmsappstud", (err, decoded) => {
        if (decoded) {
            const newRefund = new Refund({
                studId: request.body.studId, //student id
                reason: request.body.reason,
                accountNo: request.body.accountNo,
                IFSCCode: request.body.IFSCCode,
                bankName: request.body.bankName,
                branchName: request.body.branchName,
                upiId: request.body.upiId
            });

            Refund.createRefundRequest(newRefund, (err, data) => {
                if (err) {
                    console.log(err);
                    if (err === "A refund request already exists for the student.") {
                        return response.json({ "status": "A refund request already exists for the student." });
                    } else if (err === "No payment history found for the student.") {
                        return response.json({ "status": "No payment history found for the student." });
                    } else if (err === "A refund request was recently cancelled. Please wait for one week before creating a new request.") {
                        return response.json({ "status": "A refund request was recently cancelled. Please wait for one week before creating a new request." });
                    } else {
                        return response.json({ "status": "Failed to create refund request." });
                    }
                } else {
                    db.query('SELECT s.*, b.batchName, c.collegeName FROM student s JOIN batches b ON s.batchId = b.id JOIN college c ON b.collegeId = c.id WHERE s.id = ?', [request.body.studId], (err, result) => {
                        if (err) {
                            console.log(err);
                        } else {
                            let studentEmail = result[0].studEmail;
                            let studName = result[0].studName;
                            let membershipNo = result[0].membership_no;
                            let rollNo = result[0].rollNo;
                            let admNo = result[0].admNo;
                            let collegeName = result[0].collegeName;
                            let batchName = result[0].batchName;
                            let addedDate = result[0].addedDate.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: '2-digit', year: 'numeric' });
                            let requestedDate = new Date().toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' });
                            const refundRequestConfirmationHtmlContent = mailContents.refundRequestConfirmationHtmlContent(studName, requestedDate, addedDate, data.remainingPaymentPeriod);
                            const refundRequestConfirmationTextContent = mailContents.refundRequestConfirmationTextContent(studName, requestedDate, addedDate, data.remainingPaymentPeriod)
                            mail.sendEmail(studentEmail, `Refund Request Confirmation ${requestedDate}`, refundRequestConfirmationHtmlContent, refundRequestConfirmationTextContent);
                            db.query('SELECT `userName` FROM `admin` WHERE `id` = 1', (err, res) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    let adminEmail = res[0].userName;
                                    const refundRequestAdmAdmStaffNotificationHtmlContent = mailContents.refundRequestConfirmationAdminAdmStaffHTMLContent(studName, membershipNo, admNo, rollNo, studentEmail, collegeName, batchName, requestedDate, data.reason);
                                    const refundRequestAdmAdmStaffNotificationTextContent = mailContents.refundRequestConfirmationAdminAdmStaffTextContent(studName, membershipNo, admNo, rollNo, studentEmail, collegeName, batchName, requestedDate, data.reason);
                                    mail.sendEmail(adminEmail, `System Alert: Student Withdrawal Request - "Link Your Codes" Program ${requestedDate}`, refundRequestAdmAdmStaffNotificationHtmlContent, refundRequestAdmAdmStaffNotificationTextContent);
                                }
                            })
                            db.query('SELECT AdStaffName, Email FROM admin_staff WHERE deleteStatus = 0 AND isActive = 1', (err, res) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    res.forEach(element =>{
                                        let admstaffEmail = element.Email;
                                        const AdmStaffNotificationHtmlContent = mailContents.refundRequestConfirmationAdminAdmStaffHTMLContent(studName, membershipNo, admNo, rollNo, studentEmail, collegeName, batchName, requestedDate, data.reason);
                                        const AdmStaffNotificationTextContent = mailContents.refundRequestConfirmationAdminAdmStaffTextContent(studName, membershipNo, admNo, rollNo, studentEmail, collegeName, batchName, requestedDate, data.reason);
                                        mail.sendEmail(admstaffEmail, `System Alert: Student Withdrawal Request - "Link Your Codes" Program ${requestedDate}`, AdmStaffNotificationHtmlContent, AdmStaffNotificationTextContent)
                                    })
                                }
                            })
                            db.query('')
                        }
                    });
                    logStudent(request.body.studId, "Student Sent Refund Request");
                    console.log("Refund request successfully created");
                    return response.json({ "status": "success", "data": data });
                }
            });
        } else {
            return response.json({ "status": "Unauthorized User!!" });
        }
    });
};

exports.getRefundRequests = (request, response) => {
    refundtoken = request.headers.token;
    key = request.headers.key;
    jwt.verify(refundtoken, key, (err, decoded) => {
        if (decoded) {
            Refund.getRefundRequests((err, data) => {
                if (err) {
                    console.log(err);
                    return response.json({ "status": "Failed to retrieve refund requests." });
                } else {
                    console.log("Refund requests successfully retrieved");
                    return response.json({ "status": "success", "data": data });
                }
            });
        } else {
            return response.json({ "status": "Unauthorized User!!" });
        }
    });
};

exports.getRefundStatus = (request, response) => {
    refundtoken = request.headers.token;
    jwt.verify(refundtoken, "lmsappstud", (err, decoded) => {
        if (decoded) {
            Refund.viewRefundStatus(request.body.studId, (err, data) => {
                if (err) {
                    console.log(err);
                    return response.json({ "status": err });
                } else {
                    console.log("Refund status successfully retrieved");
                    return response.json({ "status": "success", "data": data });
                }
            });
        } else {
            return response.json({ "status": "Unauthorized User!!" });
        }
    });
};

exports.approveRefund = (request, response) => {
    const { approvedAmnt, admStaffId, refundId } = request.body;
    const approverefundToken = request.headers.token;
    const key = request.headers.key;

    jwt.verify(approverefundToken, key, (err, decoded) => {
        if (decoded) {
            let admadmstaffId = admStaffId
            let refundstudId = refundId
            const validationErrors = {};

            if (Validator.isEmpty(approvedAmnt).isValid) {
                validationErrors.approvedAmnt = Validator.isEmpty(approvedAmnt).message;
            }
            if (!Validator.isValidAmount(approvedAmnt).isValid) {
                validationErrors.approvedAmnt = Validator.isValidAmount(approvedAmnt).message;
            }
            // If validation fails
            if (Object.keys(validationErrors).length > 0) {
                return response.json({ "status": "Validation failed", "data": validationErrors });
            }

            Refund.approveRefund(approvedAmnt, admStaffId, refundId, (err, data) => {
                if (err) {
                    console.log(err);
                    return response.json({ "status": err });
                } else {
                    logAdminStaff(admadmstaffId, `Approved Refund For Student With Refund ID: ${refundstudId}`)
                    console.log("Refund request successfully approved");
                    return response.json({ "status": "success", "data": data });
                }
            });

        } else {
            return response.json({ "status": "Unauthorized User!!" });
        }
    })
}


exports.initiateRefundRequest = (request, response) => {
    const { approvedAmnt, transactionNo, adminRemarks, admStaffId, refundId } = request.body;
    const refundtoken = request.headers.token;
    const key = request.headers.key;

    jwt.verify(refundtoken, key, (err, decoded) => {
        if (decoded) {
            const validationErrors = {};
            if (Validator.isEmpty(adminRemarks).isValid) {
                validationErrors.adminRemarks = Validator.isEmpty(adminRemarks).message;
            }
            if (Validator.isEmpty(transactionNo).isValid) {
                validationErrors.transactionNo = Validator.isEmpty(transactionNo).message;
            }
            if (Validator.isEmpty(approvedAmnt).isValid) {
                validationErrors.approvedAmnt = Validator.isEmpty(approvedAmnt).message;
            }
            if (!Validator.isValidAmount(approvedAmnt).isValid) {
                validationErrors.approvedAmnt = Validator.isValidAmount(approvedAmnt).message;
            }
            // If validation fails
            if (Object.keys(validationErrors).length > 0) {
                return response.json({ "status": "Validation failed", "data": validationErrors });
            }
            Refund.initiateRefund(approvedAmnt, admStaffId, transactionNo, adminRemarks, refundId, (err, data) => {
                if (err) {
                    console.log(err);
                    return response.json({ "status": err });
                } else {
                    console.log("Refund request successfully initiated");
                    return response.json({ "status": "success", "data": data });
                }
            });
        } else {
            return response.json({ "status": "Unauthorized User!!" });
        }
    });
}

//Admin Staff Reject Refund
exports.rejectRefundRequest = (request, response) => {
    const { admStaffId, adminRemarks, refundId } = request.body
    const rejectRefundToken = request.headers.token
    const key = request.headers.key;
    jwt.verify(rejectRefundToken, key, (err, decoded) => {
        if (decoded) {
            const validationErrors = {};
            if (Validator.isEmpty(adminRemarks).isValid) {
                validationErrors.adminRemarks = Validator.isEmpty(adminRemarks).message;
            }
            // If validation fails
            if (Object.keys(validationErrors).length > 0) {
                return response.json({ "status": "Validation failed", "data": validationErrors });
            }
            Refund.rejectRefund(admStaffId, adminRemarks, refundId, (err, data) => {
                if (err) {
                    console.log(err);
                    return response.json({ "status": err })
                } else {
                    console.log("Refund Request Cancelled.");
                    return response.json({ "status": "Refund Request Cancelled." });
                }
            })
        } else {
            return response.json({ "status": "Unauthorized User!!" })
        }
    })
}

exports.getSuccessfulRefunds = (request, response) => {
    refundtoken = request.headers.token;
    key = request.headers.key;
    jwt.verify(refundtoken, key, (err, decoded) => {
        if (decoded) {
            Refund.getSuccessfulRefunds((err, data) => {
                if (err) {
                    console.log(err);
                    return response.json({ "status": err });
                } else {
                    console.log("Successful refunds successfully retrieved");
                    return response.json({ "status": "success", "data": data });
                }
            });
        } else {
            return response.json({ "status": "Unauthorized User!!" });
        }
    });
};

//cancel refund request
exports.cancelRefundRequest = (request, response) => {
    const { refundId } = request.body;
    refundtoken = request.headers.token;
    jwt.verify(refundtoken, "lmsappstud", (err, decoded) => {
        if (decoded) {
            Refund.cancelRefundRequest(refundId, (err, data) => {
                if (err) {
                    console.log(err);
                    return response.json({ "status": err });
                } else {
                    console.log("Refund request successfully cancelled");
                    return response.json({ "status": "success" });
                }
            });
        } else {
            return response.json({ "status": "Unauthorized User!!" });
        }
    });
}