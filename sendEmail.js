require('dotenv').config({ path: '../../.env' });
const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');
//npm install @sendgrid/mail
// Set your SendGrid API Key
sgMail.setApiKey(process.env.SendGridKey);

async function sendEmail(to, subject, htmlContent, textContent) {
  // let transporter = nodemailer.createTransport({
  //   host: 'smtp.zoho.in',
  //   port: 465,
  //   secure: true,
  //   auth: {
  //     user: process.env.ZOHO_USER,
  //     pass: process.env.ZOHO_PASSWORD,
  //   },
  // });

  // let mailOptions = {
  //   from: `"LINK UR CODES TEAM" <${process.env.ZOHO_USER}>`,
  //   to: to,
  //   subject: subject,
  //   html: htmlContent, // HTML content
  // };
  const msg = {
    to: to, // Recipient's email
    from: 'Link Ur Codes Team <team@linkurcodes.com>', // Sender's email
    subject: subject,
    text: textContent,
    html: htmlContent,
  };
  // Send the email
  sgMail.send(msg)
    .then(() => {
      console.log('Email has sent');
    })
    .catch((error) => {
      console.error(error);
    });

  // transporter.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     return console.log(error);
  //   }
  //   console.log('Message sent: %s', info.messageId);
  // });
}



module.exports = {
  sendEmail
};