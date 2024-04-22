const db = require('../../models/db');
const jwt = require("jsonwebtoken");

const whatsappmsgreceivedfromstudview = (request, response) => {
    const token = request.headers.token;
    const key = request.headers.key;

    jwt.verify(token, key, (error, decoded) => {
        if (decoded) {
            db.query("SELECT ce.collegeName, b.batchName, s.membership_no, s.studName, w.id, w.messageId, w.message, w.dateTime, w.studId, c.phone, c.country_code, c.dial_code FROM wtsappmsgreceivedfromstudent w JOIN student s ON s.id = w.studId JOIN wtsappmsgcommon c ON c.messageId = w.messageId JOIN college ce ON ce.id = s.collegeId JOIN batches b ON b.id = s.batchId WHERE w.dateTime >= DATE_SUB(NOW(), INTERVAL 1 MONTH) ORDER BY w.dateTime ASC", (err, res) => {
                if (err) {
                    console.log(err)
                } else {
                    const formattedMessageReceivedLog = res.map(messagereceivedlog => ({
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
                    return response.json({ "status": "success", "data": formattedMessageReceivedLog })
                }
            })
        } else {
            return response.json({ "status": "Unauthorized User!!" })
        }
    })

};

module.exports.sendfn = whatsappmsgreceivedfromstudview