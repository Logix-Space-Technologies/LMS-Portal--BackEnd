const db = require('../models/db');

const Notifications = function (notifications) {
    this.batchId = notifications.batchId;
    this.message = notifications.message;
    this.sendby = notifications.sendby;
    this.title = notifications.title;
}

Notifications.create = (newNotifications, result) => {
    // Check if the batchId exists in the batch table
    db.query("SELECT * FROM batches WHERE id = ? and deleteStatus=0 and isActive=1", newNotifications.batchId, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        // If the batchId exists, insert the notification
        if (res.length > 0) {
            db.query("INSERT INTO notifications SET ?", newNotifications, (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }

                // Return the result with the inserted notification data
                result(null, { id: res.insertId, ...newNotifications });
            });
        } else {
            // If batchId doesn't exist, return an error
            result({ message: "BatchId not found in the batch table." }, null);
        }
    });
};

module.exports = Notifications;
