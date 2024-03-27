const axios = require('axios');
const db = require('../../models/db')

function sendCancellationMessage(date, time,sessionType, destinationPhoneNumber,studId) {
    const url = 'https://api.gupshup.io/wa/api/v1/template/msg';
    const headers = {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/x-www-form-urlencoded',
        'apikey': process.env.WhatsAppKey
    };

    // Encoding the template parameters
    const templateParams = JSON.stringify({
        id: 'ade3ddce-8de3-44ed-9631-84ed60ec12d3', // Updated template ID
        params: [date, time, sessionType] // Updated to match the required parameters
    });

    // Formulating the data string for the POST request, including the template parameters
    const data = `channel=whatsapp&source=918301000082&destination=${encodeURIComponent(destinationPhoneNumber)}&src.name=LinkUrCodes&template=${encodeURIComponent(templateParams)}`;

    // Using axios to send the POST request
    axios.post(url, data, { headers: headers })
        .then(response => {
            console.log('Response:', response.data);
            db.query("INSERT INTO `whatsappmsgfeedback`(`studId`, `msgId`, message) VALUES (?,?,'Session cancelled.')", [studId, response.data.messageId, response.data.status],
                (err, res) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log(res)
                    }

                })
        })
        .catch(error => {
            console.error('Error sending message:', error);
        });
}

module.exports.sendfn = sendCancellationMessage