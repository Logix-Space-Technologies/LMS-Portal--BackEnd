

// mail.content.js
const emailHtmlContent = {
    college: `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                .container {
                    font-family: Arial, sans-serif;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    background-color: #f9f9f9;
                }
                .header {
                    font-size: 24px;
                    color: #333;
                }
                .content {
                    font-size: 16px;
                    color: #555;
                }
                .footer {
                    font-size: 14px;
                    color: #999;
                    margin-top: 20px;
                    text-align: center;
                }
                .button {
                    display: inline-block;
                    padding: 10px 20px;
                    margin-top: 20px;
                    background-color: #007bff;
                    color: white;
                    text-decoration: none;
                    border-radius: 5px;
                    font-weight: bold;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    Registration Successful!
                </div>
                <div class="content">
                <p>Dear \${collegeName},</p>
                    <p>Thank you for joining Linkurcodes. We are excited to have you on board! Your training will commence shortly, and we are looking forward to helping you enhance your skills.</p>
                    <p>For more details about the upcoming sessions, please use our mobile app or contact your college directly. Stay tuned for more updates and prepare to embark on a rewarding learning journey with us.</p>
                </div>
                <div class="footer">
                    Best regards,<br>
                    The Linkurcodes Team
                </div>
            </div>
        </body>
        </html>
    `,
    student: `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                .container {
                    font-family: Arial, sans-serif;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    background-color: #f9f9f9;
                }
                .header {
                    font-size: 24px;
                    color: #333;
                }
                .content {
                    font-size: 16px;
                    color: #555;
                }
                .footer {
                    font-size: 14px;
                    color: #999;
                    margin-top: 20px;
                    text-align: center;
                }
                .button {
                    display: inline-block;
                    padding: 10px 20px;
                    margin-top: 20px;
                    background-color: #007bff;
                    color: white;
                    text-decoration: none;
                    border-radius: 5px;
                    font-weight: bold;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    Registration Successful!
                </div>
                <div class="content">
                    <p>Dear \${participantName},</p>
                    <p>Thank you for joining Linkurcodes. We are excited to have you on board! Your training will commence shortly, and we are looking forward to helping you enhance your skills.</p>
                    <p>For more details about the upcoming sessions, please use our mobile app or contact your college directly. Stay tuned for more updates and prepare to embark on a rewarding learning journey with us.</p>
                </div>
                <div class="footer">
                    Best regards,<br>
                    The Linkurcodes Team
                </div>
            </div>
        </body>
        </html>
    `,
    collegeStaff: `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                .container {
                    font-family: Arial, sans-serif;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    background-color: #f9f9f9;
                }
                .header {
                    font-size: 24px;
                    color: #333;
                }
                .content {
                    font-size: 16px;
                    color: #555;
                }
                .footer {
                    font-size: 14px;
                    color: #999;
                    margin-top: 20px;
                    text-align: center;
                }
                .button {
                    display: inline-block;
                    padding: 10px 20px;
                    margin-top: 20px;
                    background-color: #007bff;
                    color: white;
                    text-decoration: none;
                    border-radius: 5px;
                    font-weight: bold;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    Registration Successful!
                </div>
                <div class="content">
                    <p>Dear \${collegeStaffName},</p>
                    <p>Thank you for joining Linkurcodes. We are excited to have you on board! Your training will commence shortly, and we are looking forward to helping you enhance your skills.</p>
                    <p>For more details about the upcoming sessions, please use our mobile app or contact your college directly. Stay tuned for more updates and prepare to embark on a rewarding learning journey with us.</p>
                </div>
                <div class="footer">
                    Best regards,<br>
                    The Linkurcodes Team
                </div>
            </div>
        </body>
        </html>
    `,
    adminStaff:
        `<!DOCTYPE html>
        <html>
        <head>
            <style>
                .container {
                    font-family: Arial, sans-serif;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    background-color: #f9f9f9;
                }
                .header {
                    font-size: 24px;
                    color: #333;
                }
                .content {
                    font-size: 16px;
                    color: #555;
                }
                .footer {
                    font-size: 14px;
                    color: #999;
                    margin-top: 20px;
                    text-align: center;
                }
                .button {
                    display: inline-block;
                    padding: 10px 20px;
                    margin-top: 20px;
                    background-color: #007bff;
                    color: white;
                    text-decoration: none;
                    border-radius: 5px;
                    font-weight: bold;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    Registration Successful!
                </div>
                <div class="content">
                    <p>Dear \${AdStaffName},</p>
                    <p>Thank you for joining Linkurcodes. We are excited to have you on board! Your training will commence shortly, and we are looking forward to helping you enhance your skills.</p>
                    <p>For more details about the upcoming sessions, please use our mobile app or contact your college directly. Stay tuned for more updates and prepare to embark on a rewarding learning journey with us.</p>
                </div>
                <div class="footer">
                    Best regards,<br>
                    The Linkurcodes Team
                </div>
            </div>
        </body>
        </html>`
    
    // Add more email contents as needed
};
function studentEmailContent(studName, sessionName, date, time,venueORlink) {
    console.log(studName)
    console.log(sessionName, date, time, venueORlink)
    content= `
    <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    color: #333333;
                }
                .container {
                    width: 80%;
                    margin: 0 auto;
                    background-color: #f7f7f7;
                    padding: 20px;
                    text-align: center;
                }
                .header {
                    background-color: #4CAF50;
                    color: white;
                    padding: 10px;
                }
                .content {
                    margin-top: 20px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>New Session Announcement</h1>
                </div>
                <div class="content">
                    <p>Dear ${studName},</p>
                    <p>We are excited to announce a new upcoming session!</p>
                    <p><b>Session Name:</b> ${sessionName}</p>
                    <p><b>Date:</b> ${date}</p>
                    <p><b>Time:</b> ${time}</p>
                    <p><b>Venue or Link:</b> ${venueORlink}</p>
                    <p>Looking forward to your participation.</p>
                    <p>Best regards,</p>
                    <p>Link Ur Codes Team</p>
                </div>
            </div>
        </body>
        </html>`
        console.log(content)
    return content; 
}
module.exports = {
    emailHtmlContent,
    studentEmailContent
};
