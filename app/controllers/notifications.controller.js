const Notifications = require("../models/notifications.model");
const jwt = require("jsonwebtoken");
const path = require("path")
const Validator = require("../config/data.validate");


exports.createNotifications = (request, response) => {
    const notificationToken = request.headers.token;
    //add the appropriate key
    key=request.headers.key;
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
            if (!Validator.isValidName(request.body.title).isValid) {
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

                return response.json({ "status": "Success", "message": "Notification created successfully" });
            });
        } else {
            return response.json({ "status": "Error", "message": "Invalid token" });
        }
    });

}
