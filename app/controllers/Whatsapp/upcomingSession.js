const axios = require('axios');

// Function to send a WhatsApp message via Gupshup
function sendUpcomingSessionWhatsAppMessage(date, time, link, sessionType, destinationPhoneNumber) {
    // API endpoint
    const url = 'https://api.gupshup.io/wa/api/v1/template/msg';

    // Headers for the POST request
    const headers = {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/x-www-form-urlencoded',
        'apikey': process.env.WhatsAppKey
    };

    // Data for the POST request
    const data = `channel=whatsapp&source=918301000082&destination=${encodeURIComponent(destinationPhoneNumber)}&src.name=LinkUrCodes&template=${encodeURIComponent(JSON.stringify({
        id: 'ec9437e7-fd80-40cf-b2b6-057e325d3535',
        params: [date, time, link, sessionType]
    }))}`;

    // Making the POST request using axios
    axios.post(url, data, { headers: headers })
        .then(function (response) {
            console.log('Response:', response.data);
        })
        .catch(function (error) {
            console.error('Error sending message:', error);
        });
}

module.exports.sendfn = sendUpcomingSessionWhatsAppMessage