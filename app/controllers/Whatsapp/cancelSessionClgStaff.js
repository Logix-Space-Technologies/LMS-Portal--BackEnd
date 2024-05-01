const axios = require('axios');
const db = require('../../models/db')
require('dotenv').config({ path: '../../.env' });

async function sendMessage(destinationPhoneNumber, name, batchName, date, time, clgstaffId) {
    try {
        const payload = {
            channel: 'whatsapp',
            source: '918301000082',
            destination: destinationPhoneNumber,
            'src.name': 'LinkUrCodes',
            template: JSON.stringify({
                id: "0534860e-ad36-45a5-a8a7-d586fd660214",
                params: [name, batchName, date, time]
            })
        };

        const headers = {
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/x-www-form-urlencoded',
            'apikey': process.env.WhatsAppKey,
            'cache-control': 'no-cache'
        };

        const response = await axios.post('https://api.gupshup.io/wa/api/v1/template/msg', new URLSearchParams(payload), { headers });
        db.query("INSERT INTO `whatsappmsgfeedbackclgstaff`(`clgstaffId`, `msgId`, `message`) VALUES (?,?,'Session Cancelled')", [clgstaffId, response.data.messageId],
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

module.exports.sendfn = sendMessage