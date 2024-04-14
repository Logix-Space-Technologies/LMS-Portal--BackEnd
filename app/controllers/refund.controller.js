const jwt = require("jsonwebtoken");
const Refund = require("../models/refund.model");
const { AdminStaffLog, logAdminStaff } = require("../models/adminStaffLog.model")
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
                            let collegeId = result[0].collegeId;
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
                            db.query('SELECT AdStaffName, Email FROM admin_staff WHERE deleteStatus = 0 AND isActive = 1', (err, admstaffres) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    admstaffres.forEach(element => {
                                        let admstaffEmail = element.Email;
                                        const AdmStaffNotificationHtmlContent = mailContents.refundRequestConfirmationAdminAdmStaffHTMLContent(studName, membershipNo, admNo, rollNo, studentEmail, collegeName, batchName, requestedDate, data.reason);
                                        const AdmStaffNotificationTextContent = mailContents.refundRequestConfirmationAdminAdmStaffTextContent(studName, membershipNo, admNo, rollNo, studentEmail, collegeName, batchName, requestedDate, data.reason);
                                        mail.sendEmail(admstaffEmail, `System Alert: Student Withdrawal Request - "Link Your Codes" Program ${requestedDate}`, AdmStaffNotificationHtmlContent, AdmStaffNotificationTextContent)
                                    })
                                }
                            })
                            db.query('SELECT `collegeStaffName`, `email` FROM `college_staff` WHERE `collegeId` = ?', [collegeId], (err, clgstaffres) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    clgstaffres.forEach(element => {
                                        let clgstaffEmail = element.email;
                                        let clgstaffName = element.collegeStaffName;
                                        const clgstaffNotificationHTMLContent = mailContents.refundRequestConfirmationClgStaffHTMLContent(studName, membershipNo, admNo, rollNo, studentEmail, collegeName, batchName, requestedDate, data.reason, clgstaffName)
                                        const clgstaffNotificationTextContent = mailContents.refundRequestConfirmationClgStaffTextContent(studName, membershipNo, admNo, rollNo, studentEmail, collegeName, batchName, requestedDate, data.reason, clgstaffName)
                                        mail.sendEmail(clgstaffEmail, `System Alert: Student Withdrawal Request - "Link Your Codes" Program ${requestedDate}`, clgstaffNotificationHTMLContent, clgstaffNotificationTextContent)
                                    })
                                }
                            })
                        }
                    });

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
            let approvalamnt = approvedAmnt
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
                    db.query("SELECT * FROM `refund` WHERE `id` = ?", [refundstudId], (err, res) => {
                        if (err) {
                            console.log(err)
                        } else {
                            let studRefundId = res[0].studId;
                            let approveddate = new Date().toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: '2-digit', year: 'numeric' });
                            db.query("SELECT r.id AS refundId, s.* FROM student s JOIN refund r ON r.studId = s.id WHERE s.id = ? AND s.deleteStatus = 0 AND s.isActive = 1 AND r.cancelStatus = 0", [studRefundId], (approveErr, approveRes) => {
                                if (approveErr) {
                                    console.log(approveErr)
                                } else {
                                    const studName = approveRes[0].studName;
                                    const studEmail = approveRes[0].studEmail;
                                    logAdminStaff(admadmstaffId, `Approved Refund For Student : ${studName}`)
                                    const refundRequestApprovalNotificationHTMLContent = mailContents.refundRequestApprovalNotificationHTMLContent(studName, approvalamnt)
                                    const refundRequestApprovalNotificationTextContent = mailContents.refundRequestApprovalNotificationTextContent(studName, approvalamnt)
                                    mail.sendEmail(studEmail, `Refund Request Approval Notification - "Link Your Codes" Program ${approveddate}`, refundRequestApprovalNotificationHTMLContent, refundRequestApprovalNotificationTextContent)
                                }
                            })
                        }
                    })
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
            let initiatedRefundId = refundId
            let initiatedTransactionNo = transactionNo
            let initiatedRefundAmnt = approvedAmnt
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
                    db.query("SELECT * FROM `refund` WHERE `id` = ?", [initiatedRefundId], (err, res) => {
                        if (err) {
                            console.log(err)
                        } else {
                            let initiatedStudId = res[0].studId;
                            let initiatedDate = new Date().toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: '2-digit', year: 'numeric' });
                            db.query("SELECT r.id AS refundId, s.* FROM student s JOIN refund r ON r.studId = s.id WHERE s.id = ? AND s.deleteStatus = 0 AND s.isActive = 1 AND r.cancelStatus = 0", [initiatedStudId], (initiateErr, initiateRes) => {
                                if (initiateErr) {
                                    console.log(initiateErr)
                                } else {
                                    const studName = initiateRes[0].studName;
                                    const studEmail = initiateRes[0].studEmail;
                                    const refundInitiatedNotificationHTMLContent = mailContents.refundRequestInitiatedHTMLContent(studName, initiatedRefundAmnt, initiatedTransactionNo)
                                    const refundInitiatedNotificationTextContent = mailContents.refundRequestInitiatedTextContent(studName, initiatedRefundAmnt, initiatedTransactionNo)
                                    mail.sendEmail(studEmail, `Refund Initiation Notification - "Link Your Codes" Program ${initiatedDate}`, refundInitiatedNotificationHTMLContent, refundInitiatedNotificationTextContent)
                                }
                            })
                        }
                    })
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
            let refundrejectionId = refundId
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
                    db.query("SELECT * FROM `refund` WHERE `id` = ? AND cancelStatus = 1", [refundrejectionId], (err, res) => {
                        if (err) {
                            console.log(err)
                        } else {
                            let rejectedStudId = res[0].studId;
                            let rejectedDate = new Date().toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: '2-digit', year: 'numeric' });
                            db.query("SELECT r.id AS refundId, s.* FROM student s JOIN refund r ON r.studId = s.id WHERE s.id = ? AND s.deleteStatus = 0 AND s.isActive = 1 AND r.cancelStatus = 1", [rejectedStudId], (rejectErr, rejectRes) => {
                                if (rejectErr) {
                                    console.log(rejectErr)
                                } else {
                                    const studName = rejectRes[0].studName;
                                    const studEmail = rejectRes[0].studEmail;
                                    const refundRejectedNotificationHTMLContent = mailContents.refundRejectionNotificationHTMLContent(studName)
                                    const refundRejectedNotificationTextContent = mailContents.refundRejectionNotificationTextContent(studName)
                                    mail.sendEmail(studEmail, `Refund Rejection Notification - "Link Your Codes" Program ${rejectedDate}`, refundRejectedNotificationHTMLContent, refundRejectedNotificationTextContent)
                                }
                            })
                        }
                    })
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

exports.searchRefundRequests = (request, response) => {
    const refundToken = request.headers.token
    const key = request.headers.key
    const searchTerm = request.body.searchTerm

    jwt.verify(refundToken, key, (err, decoded) => {
        if (err) {
            console.log(err)
            return response.json({ "status": "Unauthorized User !!!" })
        } else {
            Refund.searchRefundRequests(searchTerm, (refErr, data) => {
                if (refErr) {
                    console.log(refErr)
                    return response.json({ "status": refErr })
                } else {
                    return response.json({"status": "success", "data": data})
                }
            })
        }
    })

}