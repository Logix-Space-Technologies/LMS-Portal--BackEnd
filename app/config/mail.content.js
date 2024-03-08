
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
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to LinkUrCodes</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                background-color: #f2f2f2;
                margin: 0;
                padding: 0;
            }
            .email-container {
                max-width: 600px;
                margin: auto;
                background-color: #ffffff;
                padding: 20px;
            }
            .email-header {
                background-color: #004aad;
                color: #ffffff;
                padding: 10px;
                text-align: center;
            }
            .email-content {
                padding: 20px;
                text-align: left;
                line-height: 1.5;
            }
            .email-footer {
                background-color: #004aad;
                color: #ffffff;
                text-align: center;
                padding: 10px;
                font-size: 12px;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <p><img height="50px" width="150px" src="https://www.linkurcodes.com/images/logo.png" alt=""> </p>
    
            <div class="email-header">
                <h1>Welcome to LinkUrCodes!</h1>
            </div>
            <div class="email-content">
                <p>Dear ${AdStaffName},</p>
                <p>We're excited to have you on board. Your registration with LinkUrCodes has been successfully completed by our administrator.</p>
                <p>As a new member of our community, you now have access to a wide range of resources. Here are a few things to get you started:</p>
                <ul>
                    <li>Explore our <a href="https://linkurcodes.com">website</a> to learn more about what we offer.</li>
                    <li>Join our community forums to discuss topics that interest you with fellow members.</li>
                </ul>
                <p>We look forward to your active participation and hope you find your experience with us rewarding.</p>
                <p>Best Regards,</p>
                <p>The LinkUrCodes Team</p>
            </div>
            <div class="email-footer">
                &copy; 2024 LinkUrCodes. All rights reserved.
            </div>
        </div>
    </body>
    </html>`
    return content
}


function admStaffAddTextContent(AdStaffName) {
    content = `Welcome to LinkUrCodes!

    Dear ${AdStaffName},
    
    We're excited to have you on board. Your registration with LinkUrCodes has been successfully completed by our administrator.
    
    As a new member of our community, you now have access to a wide range of resources. Here are a few things to get you started:
    
    Explore our website (https://linkurcodes.com) to learn more about what we offer.
    Join our community forums to discuss topics that interest you with fellow members.
    We look forward to your active participation and hope you find your experience with us rewarding.
    
    Best Regards,
    
    The LinkUrCodes Team
    
    © 2024 LinkUrCodes. All rights reserved.`

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
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to LinkUrCodes</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          background-color: #f5f5f5;
          color: #333;
          margin: 0;
          padding: 0;
        }
    
        .container {
          max-width: 600px;
          margin: 20px auto;
          padding: 20px;
          background-color: #fff;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          border-radius: 5px;
        }
    
        h1 {
          color: #007bff;
        }
    
        p {
          line-height: 1.6;
        }
    
        .button {
          display: inline-block;
          padding: 10px 20px;
          font-size: 16px;
          text-align: center;
          text-decoration: none;
          background-color: #007bff;
          color: #fff;
          border-radius: 5px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <p><img height="50px" width="150px" src="https://www.linkurcodes.com/images/logo.png" alt=""> </p>
    
        <h1>Welcome to LinkUrCodes!</h1>
        <p>Dear ${collegeName} Administration,</p>
        <p>Congratulations on joining LinkUrCodes! We are thrilled to welcome ${collegeName} to our platform, where we empower students and faculty to explore, learn, and excel in the world of technology.</p>
        <p>LinkUrCodes provides a unique learning experience, and we are excited to collaborate with ${collegeName} to enhance the technological journey of your students. Here are some key features and benefits you can expect:</p>
        <ul>
          <li>Live coding projects for students</li>
          <li>Mentorship and guidance from industry experts</li>
          <li>Access to a vast library of coding resources</li>
          <li>Opportunities for participation in coding events and competitions</li>
        </ul>
       
        <p>Batch-in-Charge, can now log in and  will have access to all data related to ${collegeName} and can verify the students enrolled in coding batches.</p>
        <p>We are here to support you throughout the onboarding process. If you have any questions or need assistance, please feel free to reach out to our dedicated support team.</p>
        <p>Thank you for choosing LinkUrCodes. We look forward to a successful partnership in fostering technological excellence at ${collegeName}.</p>
        <p>Best Regards,</p>
        <p>The LinkUrCodes Team</p>
      </div>
    </body>
    </html>`
    return content;
}

function collegeTextContent(collegeName) {
    content = `Welcome to LinkUrCodes!

    Dear ${collegeName} Administration,
    
    Congratulations on joining LinkUrCodes! We are thrilled to welcome ${collegeName} to our platform, where we empower students and faculty to explore, learn, and excel in the world of technology.
    
    LinkUrCodes provides a unique learning experience, and we are excited to collaborate with ${collegeName} to enhance the technological journey of your students. Here are some key features and benefits you can expect:
    - Live coding projects for students
    - Mentorship and guidance from industry experts
    - Access to a vast library of coding resources
    - Opportunities for participation in coding events and competitions
    
    Batch-in-Charge can now log in and will have access to all data related to ${collegeName} and can verify the students enrolled in coding batches.
    
    We are here to support you throughout the onboarding process. If you have any questions or need assistance, please feel free to reach out to our dedicated support team.
    
    Thank you for choosing LinkUrCodes. We look forward to a successful partnership in fostering technological excellence at ${collegeName}.
    
    Best Regards,
    
    The LinkUrCodes Team`
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
        <title>Password Reset Request</title>
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
            <h2>Password Reset Request</h2>
    
            <p>Dear ${clgStaffName},</p>
            <p>You have requested to reset your password. Please use the verification code below to proceed with setting a new password:</p>
            <p><strong>Verification Code: ${otp}</strong></p>
            <p>This code is valid for 10 minutes and for one-time use only.</p>
        </div>
        <div class="footer">
            <p>If you did not initiate this request, please contact our support team :  admin@linkurcodes.com </p>
        </div>
    </div>
    
    </body>
    </html>
    `
    return content;
}

function ClgStaffOTPVerificationTextContent(clgStaffName, otp) {
    content = `Dear ${clgStaffName},

    You have requested to reset your password. Please use the verification code below to proceed with setting a new password:
    
    Verification Code: ${otp}
    
    This code is valid for 10 minutes and for one-time use only.
    
    If you did not initiate this request, please contact our support team immediately.
    
    Best Regards,
    Link Ur Codes Team`

    return content;
}



function AdminStaffOTPVerificationHTMLContent(adminstaffName, admstaffotp) {
    content = `<!DOCTYPE html>
    <html>
    <head>
        <title>Password Reset Request</title>
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
            <h2>Password Reset Request</h2>
    
            <p>Dear ${adminstaffName},</p>
            <p>You have requested to reset your password. Please use the verification code below to proceed with setting a new password:</p>
            <p><strong>Verification Code: ${admstaffotp}</strong></p>
            <p>This code is valid for 10 minutes and for one-time use only.</p>
        </div>
        <div class="footer">
            <p>If you did not initiate this request, please contact our support team :  admin@linkurcodes.com </p>
        </div>
    </div>
    
    </body>
    </html>
    `
    return content;
}

function AdminStaffOTPVerificationTextContent(adminstaffName, admstaffotp) {
    content = `Dear ${adminstaffName},

    You have requested to reset your password. Please use the verification code below to proceed with setting a new password:
    
    Verification Code: ${admstaffotp}
    
    This code is valid for 10 minutes and for one-time use only.
    
    If you did not initiate this request, please contact our support team immediately.
    
    Best Regards,
    Link Ur Codes Team`

    return content;
}

function StudentOTPVerificationHTMLContent(studName, otp) {
    content = `<!DOCTYPE html>
    <html>
    <head>
        <title>Password Reset Request</title>
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
            <h2>Password Reset Request</h2>
    
            <p>Dear ${studName},</p>
            <p>You have requested to reset your password. Please use the verification code below to proceed with setting a new password:</p>
            <p><strong>Verification Code: ${otp}</strong></p>
            <p>This code is valid for 10 minutes and for one-time use only.</p>
        </div>
        <div class="footer">
            <p>If you did not initiate this request, please contact our support team :  admin@linkurcodes.com </p>
        </div>
    </div>
    
    </body>
    </html>
    `
    return content;
}

function StudentOTPVerificationTextContent(studName, otp) {
    content = `Dear ${studName},

    You have requested to reset your password. Please use the verification code below to proceed with setting a new password:
    
    Verification Code: ${otp}
    
    This code is valid for 10 minutes and for one-time use only.
    
    If you did not initiate this request, please contact our support team immediately.
    
    Best Regards,
    Link Ur Codes Team`

    return content;
}

function StudentRegistrationSuccessfulMailHTMLContent(membershipNo) {
    content = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to LinkUrCodes</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          background-color: #f5f5f5;
          color: #333;
          margin: 0;
          padding: 0;
        }
    
        .container {
          max-width: 600px;
          margin: 20px auto;
          padding: 20px;
          background-color: #fff;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          border-radius: 5px;
        }
    
        h1 {
          color: #007bff;
        }
    
        p {
          line-height: 1.6;
        }
    
        .button {
          display: inline-block;
          padding: 10px 20px;
          font-size: 16px;
          text-align: center;
          text-decoration: none;
          background-color: #007bff;
          color: #fff;
          border-radius: 5px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Welcome to LinkUrCodes!</h1>
        <p>Congratulations on successfully registering with us. We are excited to have you on board as a member of our community.</p>
        <p>Your Membership Number: <strong>${membershipNo}</strong></p>
        <p>At LinkUrCodes, we provide a unique platform for college students to build their IT careers right from their college campus. As a part of our community, you'll have the opportunity to work on live projects, receive mentorship, and gain valuable experience that mirrors the professional IT world.</p>
        <p>Your journey with us starts now! Get ready for a rewarding experience as you embark on live projects and gain insights that will shape your IT career.</p>
        <p>Here are the next steps:</p>
        <ol>
         
          <li>Once approved by the batch-in-charge of your college, log on to <a href="https://lms.linkurcodes.com/studentLogin" target="_blank">Student Portal</a>.</li>
          <li>If you face any issues logging in, or if it takes some time for approval, please contact your batch-in-charge for assistance.</li>
          <li>Download our mobile app from the Play Store to stay connected on the go: <a href="https://play.google.com/store/apps/details?id=com.linkurcodes.logixspace" target="_blank">LinkUrCodes Mobile App</a></li>
        </ol>
        <p>We're excited to have you with us. If you have any questions or need assistance, feel free to reach out.</p>
        <p>Once again, welcome to LinkUrCodes!</p>
        <p>Best Regards,</p>
        <p><img height="50px" width="150px" src="https://www.linkurcodes.com/images/logo.png" alt=""> </p>
    
        <a class="button" href="https://www.linkurcodes.com/" style="color: white;">Visit Link Ur Codes website</a>
      </div>
    </body>
    </html>`

    return content
}

function StudentRegistrationSuccessfulMailTextContent(membershipNo) {
    content = `Welcome to LinkUrCodes!

    Congratulations on successfully registering with us. We are excited to have you on board as a member of our community.
    
    Your Membership Number: ${membershipNo}
    
    At LinkUrCodes, we provide a unique platform for college students to build their IT careers right from their college campus. As a part of our community, you'll have the opportunity to work on live projects, receive mentorship, and gain valuable experience that mirrors the professional IT world.
    
    Your journey with us starts now! Get ready for a rewarding experience as you embark on live projects and gain insights that will shape your IT career.
    
    Here are the next steps:
    
    1. Once approved by the batch-in-charge of your college, log on to the Student Portal: https://lms.linkurcodes.com/studentLogin
    2. If you face any issues logging in, or if it takes some time for approval, please contact your batch-in-charge for assistance.
    3. Download our mobile app from the Play Store to stay connected on the go: https://play.google.com/store/apps/details?id=com.linkurcodes.logixspace
    
    We're excited to have you with us. If you have any questions or need assistance, feel free to reach out.
    
    Once again, welcome to LinkUrCodes!
    
    Best Regards,
    
    Link Ur Codes Team
    
    Visit Link Ur Codes website: https://www.linkurcodes.com/`

    return content
}

function paymentRenewalSuccessfulHTMLContent(validityDate, renewalAmount, transactionNo, paymentId) {
    content = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>LinkUrCodes Subscription Renewal Confirmation</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          background-color: #f5f5f5;
          color: #333;
          margin: 0;
          padding: 0;
        }
    
        .container {
          max-width: 600px;
          margin: 20px auto;
          padding: 20px;
          background-color: #fff;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          border-radius: 5px;
        }
    
        h1 {
          color: #007bff;
        }
    
        p {
          line-height: 1.6;
        }
    
        .button {
          display: inline-block;
          padding: 10px 20px;
          font-size: 16px;
          text-align: center;
          text-decoration: none;
          background-color: #007bff;
          color: #fff;
          border-radius: 5px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <p><img height="50px" width="150px" src="https://www.linkurcodes.com/images/logo.png" alt=""> </p>
    
        <h1>LinkUrCodes Subscription Renewal Confirmation</h1>
        <p>Dear LinkUrCodes Member,</p>
        <p>Thank you for renewing your LinkUrCodes subscription! We appreciate your continued support and trust in our platform.</p>
        <p>Your subscription is now active, and you have full access to all the features and resources available on LinkUrCodes. If you have any questions, need assistance, or want to explore new features, feel free to reach out to our support team.</p>
        <p>Details of your renewed subscription:</p>
        <ul>
          <li><strong>Validity:</strong> ${validityDate}</li>
          <li><strong>Renewal Amount:</strong> ${renewalAmount}</li>
          <li><strong> Payment Id :</strong> ${paymentId}</li>
          <li><strong> Transaction Number :</strong> ${transactionNo}</li>
        </ul>
        <p>Thank you for being a valued member of LinkUrCodes! We look forward to providing you with an excellent learning experience.</p>
        <p>Best Regards,</p>
        <p>LinkUrCodes Team</p>
      </div>
    </body>
    </html>`

    return content
}

function paymentRenewalSuccessfulTextContent(validityDate, renewalAmount, transactionNo, paymentId) {
    content = `LinkUrCodes Subscription Renewal Confirmation

   Dear LinkUrCodes Member,
   
   Thank you for renewing your LinkUrCodes subscription! We appreciate your continued support and trust in our platform.
   
   Your subscription is now active, and you have full access to all the features and resources available on LinkUrCodes. If you have any questions, need assistance, or want to explore new features, feel free to reach out to our support team.
   
   Details of your renewed subscription:
   
   Validity: ${validityDate}
   Renewal Amount: ${renewalAmount}
   Payment Id: ${paymentId}
   Transaction Number: ${transactionNo}
   Thank you for being a valued member of LinkUrCodes! We look forward to providing you with an excellent learning experience.
   
   Best Regards,
   
   LinkUrCodes Team`

    return content
}

function emailverificationAdmStaffHTMLContent(adminstaffName, admstaffotp) {
    content = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Admin Staff Account Verification OTP - LinkUrCodes</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          background-color: #f5f5f5;
          color: #333;
          margin: 0;
          padding: 0;
        }
    
        .container {
          max-width: 600px;
          margin: 20px auto;
          padding: 20px;
          background-color: #fff;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          border-radius: 5px;
        }
    
        h1 {
          color: #007bff;
        }
    
        p {
          line-height: 1.6;
        }
    
        .otp {
          background-color: #e114cc;
          color: #fff;
          padding: 10px 20px;
          border-radius: 5px;
          font-size: 18px;
          display: inline-block;
        }
    
        .button {
          display: inline-block;
          padding: 10px 20px;
          font-size: 16px;
          text-align: center;
          text-decoration: none;
          background-color: #ff6600;
          color: #fff;
          border-radius: 5px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <p><img height="50px" width="150px" src="https://www.linkurcodes.com/images/logo.png" alt=""> </p>
    
        <h1>Account Verification OTP</h1>
        <p>Dear ${adminstaffName},</p>
        <p>To complete the verification of your account at LinkUrCodes, please use the following OTP:</p>
        <p class="otp">${admstaffotp}</p>
        <p>If you have any questions or need further assistance, please feel free to reach out.</p>
        <p>Thank you for your cooperation.</p>
        <p>Best Regards,</p>
        <p>LinkUrCodes Team</p>
      </div>
    </body>
    </html>`

    return content
}

function emailverificationAdmStaffTextContent(adminstaffName, admstaffotp) {
    content = `Admin Staff Account Verification OTP - LinkUrCodes

    Dear ${adminstaffName},
    
    To complete the verification of your account at LinkUrCodes, please use the following OTP: ${admstaffotp}
    
    If you have any questions or need further assistance, please feel free to reach out.
    
    Thank you for your cooperation.
    
    Best Regards,
    
    LinkUrCodes Team`

    return content
}

function clgstaffEmailVerificationOTPHTMLContent(clgstaffName, clgstaffotp) {
    content = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Batch-in-Charge Account Verification OTP - LinkUrCodes</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          background-color: #f5f5f5;
          color: #333;
          margin: 0;
          padding: 0;
        }
    
        .container {
          max-width: 600px;
          margin: 20px auto;
          padding: 20px;
          background-color: #fff;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          border-radius: 5px;
        }
    
        h1 {
          color: #007bff;
        }
    
        p {
          line-height: 1.6;
        }
    
        .otp {
          background-color: #007bff;
          color: #fff;
          padding: 10px 20px;
          border-radius: 5px;
          font-size: 18px;
          display: inline-block;
        }
    
        .button {
          display: inline-block;
          padding: 10px 20px;
          font-size: 16px;
          text-align: center;
          text-decoration: none;
          background-color: #007bff;
          color: #fff;
          border-radius: 5px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <p><img height="50px" width="150px" src="https://www.linkurcodes.com/images/logo.png" alt=""> </p>
    
        <h1>Account Verification OTP</h1>
        <p>Dear ${clgstaffName},</p>
        <p>To complete the verification of your batch-in-charge account at LinkUrCodes, please use the following OTP:</p>
        <p class="otp">${clgstaffotp}</p>
        <p>If you have any questions or need further assistance, please feel free to reach out.</p>
        <p>Thank you for your cooperation.</p>
        <p>Best Regards,</p>
        <br>
        <p>LinkUrCodes Team</p>
      </div>
    </body>
    </html>`

    return content
}

function clgstaffEmailVerificationOTPTextContent(clgstaffName, clgstaffotp) {
    content = `Account Verification OTP - LinkUrCodes

    Dear ${clgstaffName},
    
    To complete the verification of your batch-in-charge account at LinkUrCodes, please use the following OTP: ${clgstaffotp}
    
    If you have any questions or need further assistance, please feel free to reach out.
    
    Thank you for your cooperation.
    
    Best Regards,
    
    LinkUrCodes Team`

    return content
}

function reschedulingSessionHTMLContent(originaldate, sessionDate, sessionTime, type, venueORlink) {
    content = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>LinkUrCodes Session Rescheduling</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          background-color: #f5f5f5;
          color: #333;
          margin: 0;
          padding: 0;
        }
    
        .container {
          max-width: 600px;
          margin: 20px auto;
          padding: 20px;
          background-color: #fff;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          border-radius: 5px;
        }
    
        h1 {
          color: #007bff;
        }
    
        p {
          line-height: 1.6;
        }
    
        .button {
          display: inline-block;
          padding: 10px 20px;
          font-size: 16px;
          text-align: center;
          text-decoration: none;
          background-color: #007bff;
          color: #fff;
          border-radius: 5px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <p><img height="50px" width="150px" src="https://www.linkurcodes.com/images/logo.png" alt=""> </p>
    
        <h1>LinkUrCodes Session Rescheduling</h1>
        <p>Dear LinkUrCodes Member,</p>
        <p>We hope this message finds you well. Due to unforeseen circumstances, we need to reschedule the upcoming session originally scheduled for ${originaldate} to the new date ${sessionDate}. We apologize for any inconvenience this may cause and appreciate your understanding.</p>
        <p>Details of the rescheduled session:</p>
        <ul>
          <li><strong>Original Date:</strong> ${originaldate} </li>
          <li><strong>New Date:</strong> ${sessionDate} </li>
          <li><strong>Time:</strong> ${sessionTime} </li>
          <li><strong>Session Type:</strong> ${type} </li>
          <li><strong>Meeting Link/Venue:</strong> ${venueORlink} </li>
    
        </ul>
       
        <p>Best Regards,</p>
        <p> <br>LinkUrCodes Team</p>
        <a class="button" href="https://www.linkurcodes.com" style="color: white;">Visit LinkUrCodes</a>
      </div>
    </body>
    </html>`
    return content;
}

function reschedulingSessionTextContent(originaldate, sessionDate, sessionTime, type, venueORlink) {
    content = `Dear LinkUrCodes Member,

    We hope this message finds you well. Due to unforeseen circumstances, we need to reschedule the upcoming session originally scheduled for ${originaldate} to the new date ${sessionDate}. We apologize for any inconvenience this may cause and appreciate your understanding.
    
    Details of the rescheduled session:
    
    Original Date: ${originaldate}
    New Date: ${sessionDate}
    Time: ${sessionTime}
    Session Type: ${type}
    Meeting Link/Venue: ${venueORlink}

    Best Regards,
    
    LinkUrCodes Team
    
    Visit LinkUrCodes: https://www.linkurcodes.com`

    return content
}


function renewalReminderHtmlContent(studName, validity, rpAmount) {
    const content = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LinkUrCodes Subscription Renewal Reminder</title>
    <style>
      body {
        font-family: 'Arial', sans-serif;
        background-color: #f5f5f5;
        color: #333;
        margin: 0;
        padding: 0;
      }
  
      .container {
        max-width: 600px;
        margin: 20px auto;
        padding: 20px;
        background-color: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        border-radius: 5px;
      }
  
      h1 {
        color: #007bff;
      }
  
      p {
        line-height: 1.6;
      }
  
      .button {
        display: inline-block;
        padding: 10px 20px;
        font-size: 16px;
        text-align: center;
        text-decoration: none;
        background-color: #007bff;
        color: #fff;
        border-radius: 5px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <p><img height="50px" width="150px" src="https://www.linkurcodes.com/images/logo.png" alt="LinkUrCodes Logo"></p>
  
      <h1>LinkUrCodes Subscription Renewal Reminder</h1>
      <p>Dear ${studName},</p>
      <p>We hope this message finds you well. We want to remind you that your LinkUrCodes subscription is set to expire on ${validity}. To ensure uninterrupted access to all our features and resources, we encourage you to renew your subscription before the expiration date.</p>
      <p>Details for Renewal:</p>
      <ul>
        <li><strong>Renewal Date:</strong> ${validity}</li>
        <li><strong>Renewal Amount:</strong> Rs. ${rpAmount}</li>
      </ul>
      <p>Renew your subscription now to continue enjoying the benefits of LinkUrCodes. Click the button below to proceed with the renewal process:</p>
      <a class="button" href="https://lms.linkurcodes.com/studentLogin" style="color: white;">Renew Subscription</a>
      <p>If you have already renewed your subscription, please ignore this message.</p>
      <p>Thank you for being a valued member of LinkUrCodes!</p>
      <p>Best Regards,</p>
      <p><br>LinkUrCodes Team</p>
    </div>
  </body>
  </html>`;
    
    return content;
  }
  
  
  function renewalReminderTextContent(studName, validity, rpAmount) {
    content = `Dear ${studName},

    We hope this message finds you well. We want to remind you that your LinkUrCodes subscription is set to expire on ${validity}. To ensure uninterrupted access to all our features and resources, we encourage you to renew your subscription before the expiration date.
    
    Details for Renewal:
    
    Renewal Date: ${validity}
    Renewal Amount: Rs. ${rpAmount}
    Renew your subscription now to continue enjoying the benefits of LinkUrCodes. You can proceed with the renewal process by visiting our website: https://lms.linkurcodes.com/studentLogin
    
    If you have already renewed your subscription, please ignore this message.
    
    Thank you for being a valued member of LinkUrCodes!
    
    Best Regards,
    
    The LinkUrCodes Team`

    return content
  }


  function emailverifyStudentOTPHtmlContent(studName, otp) {
    content = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Student Account Verification OTP - LinkUrCodes</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          background-color: #f5f5f5;
          color: #333;
          margin: 0;
          padding: 0;
        }
    
        .container {
          max-width: 600px;
          margin: 20px auto;
          padding: 20px;
          background-color: #fff;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          border-radius: 5px;
        }
    
        h1 {
          color: #007bff;
        }
    
        p {
          line-height: 1.6;
        }
    
        .otp {
          background-color: #007bff;
          color: #fff;
          padding: 10px 20px;
          border-radius: 5px;
          font-size: 18px;
          display: inline-block;
        }
    
        .button {
          display: inline-block;
          padding: 10px 20px;
          font-size: 16px;
          text-align: center;
          text-decoration: none;
          background-color: #007bff;
          color: #fff;
          border-radius: 5px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <p><img height="50px" width="150px" src="https://www.linkurcodes.com/images/logo.png" alt=""> </p>
    
        <h1>Account Verification OTP</h1>
        <p>Dear ${studName},</p>
        <p>To complete the verification of your student account at LinkUrCodes, please use the following OTP:</p>
        <p class="otp">${otp}</p>
        <p>If you have any questions or need further assistance, please feel free to reach out.</p>
        <p>Thank you for your cooperation.</p>
        <p>Best Regards,</p>
        <br>
        <p>LinkUrCodes Team</p>
      </div>
    </body>
    </html>`

    return content
  }

  function emailverifyStudentOTPTextContent(studName, otp) {
    content = `Dear ${studName},

    To complete the verification of your student account at LinkUrCodes, please use the following OTP: ${otp}
    
    If you have any questions or need further assistance, please feel free to reach out.
    
    Thank you for your cooperation.
    
    Best Regards,
    
    LinkUrCodes Team`

    return content
  }



module.exports = {
    admStaffAddHTMLContent,
    admStaffAddTextContent,
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
    StudentOTPVerificationTextContent,
    StudentRegistrationSuccessfulMailHTMLContent,
    StudentRegistrationSuccessfulMailTextContent,
    paymentRenewalSuccessfulHTMLContent,
    paymentRenewalSuccessfulTextContent,
    renewalReminderHtmlContent,
    renewalReminderTextContent,
    emailverificationAdmStaffHTMLContent,
    emailverificationAdmStaffTextContent,
    clgstaffEmailVerificationOTPHTMLContent,
    clgstaffEmailVerificationOTPTextContent,
    reschedulingSessionHTMLContent,
    reschedulingSessionTextContent,
    emailverifyStudentOTPHtmlContent,
    emailverifyStudentOTPTextContent
};

