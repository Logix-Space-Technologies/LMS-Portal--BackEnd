const axios = require('axios');
require('dotenv').config({ path: '../../.env' });
const db = require('../../models/db')

async function sendMessage(name, phoneNumber, otp, studId) {
    const apiUrl = 'https://api.gupshup.io/wa/api/v1/template/msg';
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'apikey': process.env.WhatsAppKey 
    };

    const requestBody = {
        channel: 'whatsapp',
        source: '918301000082',
        destination: phoneNumber,
        'src.name': 'LinkUrCodes',
        template: JSON.stringify({
            id: '0ae3871a-c1bd-4be7-9d76-807664932671',
            params: [name, otp]
        })
    };

    try {
        const response = await axios.post(apiUrl, requestBody, { headers });
        console.log('Message sent successfully:', response.data);
        db.query("INSERT INTO `whatsappmsgfeedback`(`studId`, `msgId`, message) VALUES (?,?,'Student Password Change OTP Sent')", [studId, response.data.messageId],
            (err, res) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(res)
                }

            })
        return true;
    } catch (error) {
        console.error('Error sending message:', error.response.data);
        return false;
    }
}

module.exports.sendfn = sendMessage