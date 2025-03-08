const mail = require('../../sendEmail');

exports.sendTestEmailApi = (request, response) => {
    try {
        const { studentEmail, location, latitude, longitude } = request.body;

        if (!studentEmail || !location || !latitude || !longitude) {
            return response.status(400).json({ message: 'Missing required fields' });
        }

        // Generate dynamic email content
        const subject = 'Accident Detected';
        const htmlContent = `
            <h2>Accident Alert!</h2>
            <p>An accident has been detected at the following location:</p>
            <p><strong>Location:</strong> ${location}</p>
            <p><strong>Latitude:</strong> ${latitude}</p>
            <p><strong>Longitude:</strong> ${longitude}</p>
            <p>Please take immediate action.</p>
        `;

        const textContent = `
            Accident Alert!
            An accident has been detected at the following location:
            Location: ${location}
            Latitude: ${latitude}
            Longitude: ${longitude}
            Please take immediate action.
        `;

        // Send email
        mail.sendEmail(studentEmail, subject, htmlContent, textContent);

        response.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        response.status(500).json({ message: 'Internal server error' });
    }
};
