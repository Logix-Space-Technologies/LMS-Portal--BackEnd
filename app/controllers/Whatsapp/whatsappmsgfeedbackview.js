const db = require('../../models/db');

const whatsappmsgfeedbackview = (request, response) => {
    db.query("SELECT s.studName,w.* FROM whatsappmsgfeedback w JOIN student s ON s.id = w.studId", (err, res) => {
        if (err) {
            console.log(err)
        } else {
            return response.json({"status":"success", "data": res})
        }
    })
};

module.exports.sendfn = whatsappmsgfeedbackview