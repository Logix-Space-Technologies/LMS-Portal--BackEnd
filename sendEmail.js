require('dotenv').config({path:'../../.env'});
const nodemailer = require('nodemailer');
 
async function sendEmail(to, subject, htmlContent) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.zoho.in',
    port: 465,
    secure: true,
    auth: {
      user: process.env.ZOHO_USER,
      pass: process.env.ZOHO_PASSWORD,
    },
  });
 
  let mailOptions = {
    from: `"LINK UR CODES TEAM" <${process.env.ZOHO_USER}>`,
    to: to,
    subject: subject,
    html: htmlContent, // HTML content
  };
 
 
 
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });
}
 
 
 
module.exports = {
    sendEmail
};