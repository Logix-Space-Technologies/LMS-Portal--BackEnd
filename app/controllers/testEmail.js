const mail = require('../../sendEmail');
 
 
 
//content
 
const participantName = 'Animesh Thomas';
const participantEmail = "animeshthomas262@gmail.com";
 
 
 
const emailHtmlContent = `
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
            <p>Dear ${participantName},</p>
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
`;
 
 
 
 
 
// email sending code
mail.sendEmail(participantEmail, 'Welcome Aboard! Your Registration with Linkurcodes is Complete!', emailHtmlContent);
 