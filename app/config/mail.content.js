function upcomingSessionContent(studName, sessionName, date, time, venueORlink) {
    content = `<!DOCTYPE html>
    <html>
    <head>
        <title>Session Created</title>
        <style>
            body {
                background-color: #faf4f4;
                color: #140101;
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 20px;
            }
            .container {
                border-radius: 8px;
    
                background-color: #ece9e9;
                border-radius: 8px;
                padding: 20px;
                margin: 20px auto;
                max-width: 600px;
            }
            .logo-header img {
                max-width: 30%;
                height: auto;
            }
            .content {
                margin-top: 20px;
                border: 2px solid #a3a0a0; /* Added a border to content */
                padding: 20px; 
            }
            .footer {
                margin-top: 30px;
                font-size: smaller;
                color: grey;
            }
        </style>
    </head>
    <body>
    
    <div class="container">
        <div class="logo-header">
            <img src="https://www.linkurcodes.com/images/logo.png" alt="Link Ur Codes Logo">
        </div>
        <div class="content">
        <h2>New Session Schedule Announcement</h2>
 
        <p>Dear ${studName},</p>
        <p>We are excited to announce the schedule for the upcoming session! Please find the details below:</p>
 
        <!-- Replace the following placeholder content with actual schedule details -->
        <ul>
            <li>Session Title : ${sessionName} </li>
            <li>Date : ${date}</li>
            <li>Time : ${time}</li>
            <li>Location or Link : ${venueORlink}</li>
        </ul>
 
        <p>It's going to be an engaging and informative session that you wouldn't want to miss. Be sure to mark your calendars!</p>
 
        <p>For the full session schedule and any changes, please check our online student portal or mobile app.</p>
 
        <p>We look forward to seeing you there!</p>
 
       
    </div>
   
        <div class="footer">
            <p>If you have any questions, feel free to reach out to us !! </p>
        </div>
    </div>
    
    </body>
    </html>
    `
    return content;
}

function admStaffAddHTMLContent(AdStaffName) {
    content = `<!DOCTYPE html>
    <html>
    <head>
        <title>Registration Successful</title>
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
                <p>Dear ${AdStaffName},</p>
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
    return content
}

function upcomingSessionTextContent(studName, sessionName, date, time, venueORlink) {
    textContent = `
        Dear ${studName},
        We are excited to announce the schedule for the upcoming session! Please find the details below:
        Session Title: ${sessionName}
        Date: ${date}
        Time: ${time}
        Location or Link: ${venueORlink}
        It's going to be an engaging and informative session that you wouldn't want to miss. Be sure to mark your calendars!
        For the full session schedule and any changes, please check our online student portal or mobile app.
        We look forward to seeing you there!
        If you have any questions or need further information, please do not hesitate to contact us at admin@linkurcodes.com.`

}


function collegeStaffTextContent(collegeStaffName, clgName) {
    content = `
    Dear ${collegeStaffName},
 
    We hope this email finds you well. We are pleased to inform you that your registration with the Link Ur Codes portal has been successfully completed. As the batch-in-charge for ${clgName}, you are now the official point of contact and can fully access the resources available on our platform.
     
    The Link Ur Codes portal is designed to provide a comprehensive and interactive learning experience for students and educators in the field of coding and programming.
    To get started, please log in with your registered email and password at Link Ur Codes Portal. We highly recommend updating your profile and exploring the various sections of the portal to familiarize yourself with its functionalities.
     
    If you encounter any issues or have questions, please do not hesitate to reach out to our support team at team@linkurcodes.com . We are here to assist you in making the most out of the Link Ur Codes experience.
     
    We are excited to have ${clgName} on board and look forward to your active participation in our community. Together, we can inspire and nurture the next generation of coding experts.
     
     
    Regards
    Link Ur Codes Team`
    return content;

}

function collegeStaffHtmlContent(collegeStaffName, collegeName) {
    content = ` 
    <!DOCTYPE html>
    <html>
    
    <head>
        <title>Registration Successful</title>
        <style>
            body {
                background-color: #faf4f4;
                color: #140101;
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 20px;
            }
    
            .container {
                border-radius: 8px;
    
                background-color: #ece9e9;
                border-radius: 8px;
                padding: 20px;
                margin: 20px auto;
                max-width: 600px;
            }
    
            .logo-header img {
                max-width: 30%;
                height: auto;
            }
    
            .content {
                margin-top: 20px;
                border: 2px solid #a3a0a0;
                /* Added a border to content */
                padding: 20px;
            }
    
            .footer {
                margin-top: 30px;
                font-size: smaller;
                color: grey;
            }
        </style>
    </head>
    
    <body>
    
        <div class="container">
            <div class="logo-header">
                <img src="https://www.linkurcodes.com/images/logo.png" alt="Link Ur Codes Logo">
            </div>
            <div class="content">
                <h1>Registration Successful</h1>
                <p>Dear ${collegeStaffName},</p>
                <p>We hope this email finds you well. We are pleased to inform you that your registration with the Link Ur
                    Codes portal has been successfully completed. As the batch-in-charge for ${collegeName}, you are now the
                    official point of contact and can fully access the resources available on our platform.</p>
                <p>The Link Ur Codes portal is designed to provide a comprehensive and interactive learning experience for
                    students and educators in the field of coding and programming.</p>
                <p>To get started, please log in with your registered email and password at Link Ur Codes Portal. We highly
                    recommend updating your profile and exploring the various sections of the portal to familiarize yourself
                    with its functionalities.</p>
                <p>If you encounter any issues or have questions, please do not hesitate to reach out to our support team at
                    team@linkurcodes.com . We are here to assist you in making the most out of the Link Ur Codes experience.
                </p>
                <p>We are excited to have ${collegeName} on board and look forward to your active participation in our
                    community. Together, we can inspire and nurture the next generation of coding experts.</p>
                <p>Regards</p>
                <p>Link Ur Codes Team</p>
    
            </div>
            <div class="footer">
                <p>If you need assistance, please contact our support team : admin@linkurcodes.com </p>
            </div>
        </div>
    
    </body>
    
    </html>`
    return content;
}



function collegeHtmlContent(collegeName) {
    content = `<!DOCTYPE html>
<html>
<head>
    <title>College Registration Succesful</title>
    <style>
        body {
            background-color: #faf4f4;
            color: #140101;
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
        }
        .container {
            border-radius: 8px;

            background-color: #ece9e9;
            border-radius: 8px;
            padding: 20px;
            margin: 20px auto;
            max-width: 600px;
        }
        .logo-header img {
            max-width: 30%;
            height: auto;
        }
        .content {
            margin-top: 20px;
            border: 2px solid #a3a0a0; /* Added a border to content */
            padding: 20px;
        }
        .footer {
            margin-top: 30px;
            font-size: smaller;
            color: grey;
        }
    </style>
</head>
<body>

<div class="container">
    <div class="logo-header">
        <img src="https://www.linkurcodes.com/images/logo.png" alt="Link Ur Codes Logo">
    </div>
    <div class="content">
        <p>Dear ${collegeName},</p>
        <p>Thank you for joining Link Ur Codes. We are excited to have you on board! Your training will commence shortly, and we are looking forward to helping you enhance your skills.</p>
        <p>For more details about the upcoming sessions, please use our mobile app or contact your college directly. Stay tuned for more updates and prepare to embark on a rewarding learning journey with us.</p>
        <p>Stay tuned for an exciting learning experience!</p>
    </div>
    <div class="footer">
        <p>If you have any questions, feel free to reach out to us.</p>
    </div>
</div>

</body>
</html>`
    return content;
}

function collegeTextContent(collegeName) {
    content = `Dear ${collegeName},

    We are thrilled to have you join us at Link Ur Codes. Your journey to connect and learn starts here!
    
    Our sessions will commence shortly, and we will update you with the details of the next session soon.
    
    Stay tuned for an exciting learning experience!
    
    If you have any questions, feel free to reach out to us.
    
    Best Regards,
    Link Ur Codes Team`
    return content;
}


function cancelSessionContent(participantName, date, time) {
    content = `<!DOCTYPE html>
    <html>
    <head>
        <title>Session Cancellation</title>
        <style>
            body {
                background-color: #faf4f4;
                color: #140101;
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 20px;
            }
            .container {
                border-radius: 8px;
    
                background-color: #ece9e9;
                border-radius: 8px;
                padding: 20px;
                margin: 20px auto;
                max-width: 600px;
            }
            .logo-header img {
                max-width: 30%;
                height: auto;
            }
            .content {
                margin-top: 20px;
                border: 2px solid #a3a0a0; /* Added a border to content */
                padding: 20px; 
            }
            .footer {
                margin-top: 30px;
                font-size: smaller;
                color: grey;
            }
        </style>
    </head>
    <body>
    
    <div class="container">
        <div class="logo-header">
            <img src="https://www.linkurcodes.com/images/logo.png" alt="Link Ur Codes Logo">
        </div>
        <div class="content">
            <h2>Session Cancellation</h2>
    
            <p>Dear ${participantName},</p>
            <p>We regret to inform you that the session scheduled on ${date} at ${time} has been cancelled. We apologize for any inconvenience this may cause.</p>
            <p>A new date for the session will be announced soon. We will keep you updated with the new schedule.</p>
            <p>Thank you for your understanding.</p>
        </div>
        <div class="footer">
            <p>If you have any questions, feel free to reach out to us !! </p>
        </div>
    </div>
    
    </body>
    </html>`
    return content;

}

function cancelSessionTextContent(participantName, date, time) {
    content = `Dear ${participantName},

    We regret to inform you that the session scheduled on ${date} at ${time} has been cancelled. We apologize for any inconvenience this may cause.
    
    A new date for the session will be announced soon. We will keep you updated with the new schedule.
    
    Thank you for your understanding.
    
    Best Regards,
    Your Team
    `
    return content;
}

function newTaskHtmlContent(participantName, dueDate) {
    content = `<!DOCTYPE html>
    <html>
    <head>
        <title>New Task Available</title>
        <style>
            body {
                background-color: #faf4f4;
                color: #140101;
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 20px;
            }
            .container {
                border-radius: 8px;
    
                background-color: #ece9e9;
                border-radius: 8px;
                padding: 20px;
                margin: 20px auto;
                max-width: 600px;
            }
            .logo-header img {
                max-width: 30%;
                height: auto;
            }
            .content {
                margin-top: 20px;
                border: 2px solid #a3a0a0; /* Added a border to content */
                padding: 20px; 
            }
            .footer {
                margin-top: 30px;
                font-size: smaller;
                color: grey;
            }
        </style>
    </head>
    <body>
    
    <div class="container">
        <div class="logo-header">
            <img src="https://www.linkurcodes.com/images/logo.png" alt="Link Ur Codes Logo">
        </div>
        <div class="content">
            <h1>A New Task for You</h1>
            <p>Dear ${participantName},</p>
            <p>A new task has been added to your portal that requires your attention. Please complete this task before the due date to stay on track with your progress.</p>
            <p><strong>Task Deadline: ${dueDate}</strong></p>
            <p>For more details and to complete the task, log on to the web or mobile app.</p>
           
        </div>
        <div class="footer">
            <p>If you need assistance, please contact our support team :  admin@linkurcodes.com </p>
        </div>
    </div>
    
    </body>
    </html>`
    return content;
}

function newTaskTextContent(participantName, dueDate) {
    content = `Dear ${participantName},

    We are excited to inform you that a new task has been added to your portal on Link Ur Codes.
    
    Please complete this task before the due date: ${dueDate}.
    
    For more details, log on to the web or mobile app.
    
    Best Regards,
    Link Ur Codes Team`
    return content;
}

function studRegOTPVerificationHTMLContent(otp) {
    content = `<!DOCTYPE html>
    <html>
    <head>
        <title>OTP Verification</title>
        <style>
            body {
                background-color: #faf4f4;
                color: #140101;
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 20px;
            }
            .container {
                background-color: #ece9e9;
                border-radius: 8px;
                padding: 20px;
                margin: 20px auto;
                max-width: 600px;
            }
            .logo-header img {
                max-width: 30%;
                height: auto;
            }
            .content {
                margin-top: 20px;
                border: 2px solid #a3a0a0; /* Corrected: Removed stray '/' */
                padding: 20px;
            }
            .footer {
                margin-top: 30px;
                font-size: smaller;
                color: grey;
            }
        </style>
    </head>
    <body>
    
    <div class="container">
        <div class="logo-header">
            <img src="https://www.linkurcodes.com/images/logo.png" alt="Link Ur Codes Logo">
        </div>
        <div class="content">
            <h2>Welcome to Link Ur Codes</h2>
    
            <p>Dear Student,</p>
            <p>You are one step away from completing your registration with Link Ur Codes.</p>
            <p>Please use the following One-Time Password to complete your registration:</p>
            <p><strong>${otp}</strong></p>
            <p>This OTP is valid for the next 10 minutes. Enter this OTP in the required field on the web app to continue.</p>
        </div>
        <div class="footer">
        <p>If you need assistance, please contact our support team :  admin@linkurcodes.com </p>
        </div>
    </div>
    
    </body>
    </html>
    `
    return content;
}

function studRegOTPVerificationTextContent(otp) {
    content = `Dear Student,

    You are one step away from completing your registration with Link Ur Codes.
    
    Please use the following One-Time Password to complete your registration:
    
    ${otp}
    
    This OTP is valid for the next 10 minutes. Enter this OTP in the required field on the web or mobile app to continue.
    
    If you did not initiate this request, please ignore this email or contact support.
    
    © Link Ur Codes`

    return content;
}

function ClgStaffOTPVerificationHTMLContent(clgStaffName, otp) {
    content = `<!DOCTYPE html>
    <html>
    <head>
        <title>OTP Verification</title>
        <style>
            body {
                background-color: #faf4f4;
                color: #140101;
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 20px;
            }
            .container {
                background-color: #ece9e9;
                border-radius: 8px;
                padding: 20px;
                margin: 20px auto;
                max-width: 600px;
            }
            .logo-header img {
                max-width: 30%;
                height: auto;
            }
            .content {
                margin-top: 20px;
                border: 2px solid #a3a0a0; /* Corrected: Removed stray '/' */
                padding: 20px;
            }
            .footer {
                margin-top: 30px;
                font-size: smaller;
                color: grey;
            }
        </style>
    </head>
    <body>
    
    <div class="container">
        <div class="logo-header">
            <img src="https://www.linkurcodes.com/images/logo.png" alt="Link Ur Codes Logo">
        </div>
        <div class="content">
            <h2>Welcome to Link Ur Codes</h2>
    
            <p>Dear ${clgStaffName},</p>
            <p>You are one step away from completing your registration with Link Ur Codes.</p>
            <p>Please use the following One-Time Password to complete your registration:</p>
            <p><strong>${otp}</strong></p>
            <p>This OTP is valid for the next 10 minutes. Enter this OTP in the required field on the web app to continue.</p>
        </div>
        <div class="footer">
        <p>If you need assistance, please contact our support team :  admin@linkurcodes.com </p>
        </div>
    </div>
    
    </body>
    </html>
    `
    return content;
}

function ClgStaffOTPVerificationTextContent(clgStaffName, otp) {
    content = `Dear ${clgStaffName},

    You are one step away from completing your registration with Link Ur Codes.
    
    Please use the following One-Time Password to complete your registration:
    
    ${otp}
    
    This OTP is valid for the next 10 minutes. Enter this OTP in the required field on the web or mobile app to continue.
    
    If you did not initiate this request, please ignore this email or contact support.
    
    © Link Ur Codes`

    return content;
}



function AdminStaffOTPVerificationHTMLContent(adminstaffName, admstaffotp) {
    content = `<!DOCTYPE html>
    <html>
    <head>
        <title>OTP Verification</title>
        <style>
            body {
                background-color: #faf4f4;
                color: #140101;
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 20px;
            }
            .container {
                background-color: #ece9e9;
                border-radius: 8px;
                padding: 20px;
                margin: 20px auto;
                max-width: 600px;
            }
            .logo-header img {
                max-width: 30%;
                height: auto;
            }
            .content {
                margin-top: 20px;
                border: 2px solid #a3a0a0; /* Corrected: Removed stray '/' */
                padding: 20px;
            }
            .footer {
                margin-top: 30px;
                font-size: smaller;
                color: grey;
            }
        </style>
    </head>
    <body>
    
    <div class="container">
        <div class="logo-header">
            <img src="https://www.linkurcodes.com/images/logo.png" alt="Link Ur Codes Logo">
        </div>
        <div class="content">
            <h2>Welcome to Link Ur Codes</h2>
    
            <p>Dear ${adminstaffName},</p>
            <p>You are one step away from completing your registration with Link Ur Codes.</p>
            <p>Please use the following One-Time Password to complete your registration:</p>
            <p><strong>${admstaffotp}</strong></p>
            <p>This OTP is valid for the next 10 minutes. Enter this OTP in the required field on the web app to continue.</p>
        </div>
        <div class="footer">
        <p>If you need assistance, please contact our support team :  admin@linkurcodes.com </p>
        </div>
    </div>
    
    </body>
    </html>
    `
    return content;
}

function AdminStaffOTPVerificationTextContent(adminstaffName, admstaffotp) {
    content = `Dear ${adminstaffName},

    You are one step away from completing your registration with Link Ur Codes.
    
    Please use the following One-Time Password to complete your registration:
    
    ${admstaffotp}
    
    This OTP is valid for the next 10 minutes. Enter this OTP in the required field on the web or mobile app to continue.
    
    If you did not initiate this request, please ignore this email or contact support.
    
    © Link Ur Codes`

    return content;
}

function StudentOTPVerificationHTMLContent(studName, otp) {
    content = `<!DOCTYPE html>
    <html>
    <head>
        <title>OTP Verification</title>
        <style>
            body {
                background-color: #faf4f4;
                color: #140101;
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 20px;
            }
            .container {
                background-color: #ece9e9;
                border-radius: 8px;
                padding: 20px;
                margin: 20px auto;
                max-width: 600px;
            }
            .logo-header img {
                max-width: 30%;
                height: auto;
            }
            .content {
                margin-top: 20px;
                border: 2px solid #a3a0a0; /* Corrected: Removed stray '/' */
                padding: 20px;
            }
            .footer {
                margin-top: 30px;
                font-size: smaller;
                color: grey;
            }
        </style>
    </head>
    <body>
    
    <div class="container">
        <div class="logo-header">
            <img src="https://www.linkurcodes.com/images/logo.png" alt="Link Ur Codes Logo">
        </div>
        <div class="content">
            <h2>Welcome to Link Ur Codes</h2>
    
            <p>Dear ${studName},</p>
            <p>You are one step away from completing your registration with Link Ur Codes.</p>
            <p>Please use the following One-Time Password to complete your registration:</p>
            <p><strong>${otp}</strong></p>
            <p>This OTP is valid for the next 10 minutes. Enter this OTP in the required field on the web app to continue.</p>
        </div>
        <div class="footer">
        <p>If you need assistance, please contact our support team :  admin@linkurcodes.com </p>
        </div>
    </div>
    
    </body>
    </html>
    `
    return content;
}

function StudentOTPVerificationTextContent(studName, otp) {
    content = `Dear ${studName},

    You are one step away from completing your registration with Link Ur Codes.
    
    Please use the following One-Time Password to complete your registration:
    
    ${otp}
    
    This OTP is valid for the next 10 minutes. Enter this OTP in the required field on the web or mobile app to continue.
    
    If you did not initiate this request, please ignore this email or contact support.
    
    © Link Ur Codes`

    return content;
}



module.exports = {
    admStaffAddHTMLContent,
    upcomingSessionContent,
    upcomingSessionTextContent,
    collegeStaffTextContent,
    collegeStaffHtmlContent,
    collegeHtmlContent,
    collegeTextContent,
    cancelSessionContent,
    cancelSessionTextContent,
    newTaskHtmlContent,
    newTaskTextContent,
    studRegOTPVerificationHTMLContent,
    studRegOTPVerificationTextContent,
    ClgStaffOTPVerificationHTMLContent,
    ClgStaffOTPVerificationTextContent,
    AdminStaffOTPVerificationHTMLContent,
    AdminStaffOTPVerificationTextContent,
    StudentOTPVerificationHTMLContent,
    StudentOTPVerificationTextContent
};

