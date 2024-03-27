const axios = require('axios');
const db = require('../../models/db')
require('dotenv').config({ path: '../../.env' });

const sendMessageSignUpSuccess = async (destinationPhoneNumber, Name, studId) => {
    try {
        const response = await axios.post('https://api.gupshup.io/wa/api/v1/template/msg',
            `channel=whatsapp&source=918301000082&destination=${destinationPhoneNumber}&src.name=LinkUrCodes&template=%7B%22id%22:%22f0e30169-5bcb-4ca2-a291-f2a43fbe93bf%22,%22params%22:%5B%22${Name}%22%5D%7D`, {
            headers: {
                'apikey': process.env.WhatsAppKey,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cache-Control': 'no-cache'
            }
        });
        console.log('Message sent successfully:', response.data);
        db.query("INSERT INTO `whatsappmsgfeedback`(`studId`, `msgId`, message) VALUES (?,?,'Student Registered')", [studId, response.data.messageId, response.data.status],
            (err, res) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(res)
                }

            })
    } catch (error) {
        console.error('Error sending message:', error.response.data);
    }
};

module.exports.sendfn = sendMessageSignUpSuccess




