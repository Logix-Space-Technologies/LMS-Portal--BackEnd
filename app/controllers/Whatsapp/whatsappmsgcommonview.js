const db = require('../../models/db');

const whatsappmsgcommonview = (request, response) => {
    db.query("SELECT * FROM `wtsappmsgcommon`", (err, res) => {
        if (err) {
            console.log(err)
        } else {
            return response.json({"status":"success", "data": res})
        }
    })
};

module.exports.sendfn = whatsappmsgcommonview