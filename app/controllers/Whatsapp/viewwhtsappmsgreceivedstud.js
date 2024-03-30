const db = require('../../models/db');

const whatsappmsgreceivedfromstudview = (request, response) => {
    db.query("SELECT s.studName, w.id, w.messageId, w.message, w.dateTime, w.studId, c.phone, c.country_code, c.dial_code FROM wtsappmsgreceivedfromstudent w JOIN student s ON s.id = w.studId JOIN wtsappmsgcommon c ON c.messageId = w.messageId", (err, res) => {
        if (err) {
            console.log(err)
        } else {
            const formattedMessageReceivedLog = response.map(messagereceivedlog => ({
                ...messagereceivedlog,
                dateTime: messagereceivedlog.dateTime.toLocaleString('en-IN', {
                    timeZone: 'Asia/Kolkata',
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                })
            }));
            return response.json({"status":"success", "data": formattedMessageReceivedLog})
        }
    })
};

module.exports.sendfn = whatsappmsgreceivedfromstudview