const axios = require('axios');
const db = require('../../models/db')
require('dotenv').config({ path: '../../.env' });

async function sendWhatsAppMessage(destinationPhoneNumber, name, batchName, originalDate, originalTime, rescheduledDate, rescheduledTime, venueLink, sessionType, clgstaffId) {
    try {
        const payload = {
            channel: 'whatsapp',
            source: '918301000082',
            destination: destinationPhoneNumber,
            'src.name': 'LinkUrCodes',
            template: JSON.stringify({
                id: "ad4d9470-7802-4411-886a-33fc0e3a0e57",
                params: [name, batchName, originalDate, originalTime, rescheduledDate, rescheduledTime, venueLink, sessionType]
            })
        };

        const headers = {
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/x-www-form-urlencoded',
            'apikey': process.env.WhatsAppKey,
            'cache-control': 'no-cache'
        };

        const response = await axios.post('https://api.gupshup.io/wa/api/v1/template/msg', new URLSearchParams(payload), { headers });
        db.query("INSERT INTO `whatsappmsgfeedbackclgstaff`(`clgstaffId`, `msgId`, `message`) VALUES (?,?,'Session Rescheduled')", [clgstaffId, response.data.messageId],
            (err, res) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(res)
                }

            })

        console.log('Message sent successfully');
    } catch (error) {
        console.error('Failed to send message:', error.response.data);
    }
}

module.exports.sendfn = sendWhatsAppMessage