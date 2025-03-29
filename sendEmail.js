require('dotenv').config({ path: '../../.env' });
const { SendMailClient } = require('zeptomail');

// Initialize ZeptoMail client
const zeptoClient = new SendMailClient({
  url: 'https://api.zeptomail.in/v1.1/email',
  token: `Zoho-enczapikey ${process.env.ZEPTO_API_TOKEN}`,
});

async function sendEmail(to, subject, htmlContent, textContent) {
  const emailData = {
    from: {
      address: 'team@linkurcodes.com',
      name: 'Link Ur Codes Team',
    },
    to: [
      {
        email_address: {
          address: to,
          name: '', // Optionally add recipient's name here
        },
      },
    ],
    subject: subject,
    htmlbody: htmlContent,
    textbody: textContent,
  };

  try {
    const response = await zeptoClient.sendMail(emailData);
    console.log('Email sent successfully:', response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

module.exports = {
  sendEmail,
};
