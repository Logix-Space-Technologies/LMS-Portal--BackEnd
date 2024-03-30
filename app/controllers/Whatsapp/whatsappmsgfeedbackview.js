const db = require('../../models/db');

const whatsappmsgfeedbackview = (request, response) => {
    db.query("SELECT s.studName, w.id, w.studId, w.msgId, w.message, CASE WHEN w.queuedStatus = 1 THEN 'Queued' ELSE 'Not queued' END AS queuedStatus, CASE WHEN w.sentStatus = 1 THEN 'Sent' ELSE 'Not sent' END AS sentStatus, CASE WHEN w.deliveryStatus = 1 THEN 'Delivered' ELSE 'Yet to be delivered' END AS deliveryStatus, CASE WHEN w.readStatus = 1 THEN 'Read' ELSE 'Not read' END AS readStatus, w.sentDate, w.deliveryDate, w.readDateTime FROM whatsappmsgfeedback w JOIN student s ON s.id = w.studId", (err, res) => {
        if (err) {
            console.log(err)
        } else {
            return response.json({"status":"success", "data": res})
        }
    })
};

module.exports.sendfn = whatsappmsgfeedbackview