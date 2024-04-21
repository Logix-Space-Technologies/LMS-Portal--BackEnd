const axios = require('axios');
const db = require('../../models/db')
require('dotenv').config({ path: '../../.env' });

async function clgStaffUpcomingSession(name, batch, date, time, sessionType, venue, destinationPhoneNumber, clgstaffId) {
    const apiKey = process.env.WhatsAppKey;
    const templateId = '09d7700f-cd5c-4681-b6f6-7e09e17bd7f9';
    const srcName = 'LinkUrCodes';

    const templateParams = [name, batch, date, time, venue, sessionType];

    const requestBody = {
        channel: 'whatsapp',
        source: '918301000082',
        destination: destinationPhoneNumber,
        'src.name': srcName,
        template: JSON.stringify({
            id: templateId,
            params: templateParams
        })
    };

    try {
        const response = await axios.post('https://api.gupshup.io/wa/api/v1/template/msg',
            requestBody,
            {
                headers: {
                    'apikey': apiKey,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Cache-Control': 'no-cache'
                }
            }
        );
        console.log('WhatsApp message sent successfully:', response.data);
        db.query("INSERT INTO `wtsappmsgreceivedfromclgstaff`(`clgstaffId`, `msgId`, `message`) VALUES (?,?,'Session Created')", [clgstaffId, response.data.messageId],
            (err, res) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(res)
                }

            })
    } catch (error) {
        console.error('Error sending WhatsApp message:', error);
    }
}

module.exports.sendfn = clgStaffUpcomingSession