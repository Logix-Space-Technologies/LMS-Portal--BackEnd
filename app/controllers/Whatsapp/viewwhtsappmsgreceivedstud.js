const db = require('../../models/db');

const whatsappmsgreceivedfromstudview = (request, response) => {
    db.query("SELECT s.studName, w.id, w.messageId, w.message, w.dateTime, w.studId FROM wtsappmsgreceivedfromstudent w JOIN student s ON s.id = w.studId", (err, res) => {
        if (err) {
            console.log(err)
        } else {
            return response.json({"status":"success", "data": res})
        }
    })
};

module.exports.sendfn = whatsappmsgreceivedfromstudview