const Notifications = require("../models/notifications.model");
const jwt = require("jsonwebtoken");
const path = require("path")
const Validator = require("../config/data.validate");
const { AdminStaffLog, logAdminStaff } = require("../models/adminStaffLog.model")
const firebasetokens = require("../models/firebaseTokens.model");
const { Student } = require("../models/student.model");


exports.createNotifications = (request, response) => {
    const notificationToken = request.headers.token;
    //add the appropriate key
    key = request.headers.key;
    jwt.verify(notificationToken, key, (err, decoded) => {
        if (decoded) {
            const validationErrors = {};

            if (Validator.isEmpty(request.body.batchId).isValid) {
                validationErrors.batchId = "Please enter the batchId";
            }
            if (Validator.isEmpty(request.body.message).isValid) {
                validationErrors.message = "Please enter the message";
            }
            if (Validator.isEmpty(request.body.sendby).isValid) {
                validationErrors.sendby = "Please enter the sender";
            }
            if (Validator.isEmpty(request.body.title).isValid) {
                validationErrors.title = "Please enter the title";
            }
            if (!Validator.isValidTitle(request.body.title).isValid) {
                validationErrors.title = "Please enter a valid title";
            }
            // If validation fails
            if (Object.keys(validationErrors).length > 0) {
                return response.json({ "status": "Validation failed", "data": validationErrors });
            }

            const addNotifications = new Notifications({
                batchId: request.body.batchId,
                message: request.body.message,
                sendby: request.body.sendby,
                title: request.body.title
            });

            Notifications.create(addNotifications, (err, data) => {
                if (err) {
                    return response.json({ "status": "Error", "message": err.message });
                }
                if (key === "lmsapp") {
                    logAdminStaff(0, "Admin Sent Notification")
                }
                if (key !== "lmsapp") {
                    logAdminStaff(request.body.sendby, "Admin Staff Sent Notification")
                }
                Student.searchStudentByBatch(request.body.batchId, (err, data) => {
                    if (err) {
                        return response.json({ "status": "Error", "message": err.message });
                    }
                    const payload = {
                        notification: {
                            title: request.body.title,
                            body: request.body.message
                        }
                    };
                    data.forEach((student) => {
                        firebasetokens.sendNotificationByStudId(student.id, payload, (err, data) => {
                            if (err) {
                                return response.json({ "status": "Error", "message": err.message });
                            }
                        });
                    });
                });
                return response.json({ "status": "Success", "message": "Notification created successfully" });
            });
        } else {
            return response.json({ "status": "Error", "message": "Invalid token" });
        }
    });

}
