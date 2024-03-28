const db = require('../../models/db');

const whatsappmsgfeedbackview = (request, response) => {
    db.query("SELECT * FROM `whatsappmsgfeedback`", (err, res) => {
        if (err) {
            console.log(err)
        } else {
            return response.json(res)
        }
    })
};

module.exports.sendfn = whatsappmsgfeedbackview