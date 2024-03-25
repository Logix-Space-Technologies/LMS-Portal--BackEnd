function upcomingSessionOfflineHTMLContent(studName, sessionName, date, time, venueORlink) {
  // Get the current year
  const currentYear = new Date().getFullYear();
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
        border: 2px solid #a3a0a0;
        /* Added a border to content */
        padding: 20px;
      }
  
      .footer {
        text-align: center;
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
          <li>Location : ${venueORlink}</li>
        </ul>
  
        <p>It's going to be an engaging and informative session that you wouldn't want to miss. Be sure to mark your
          calendars!</p>
  
        <p>For the full session schedule and any changes, please check our online student portal or mobile app.</p>
  
        <p>If you have any questions, feel free to reach out to us !! </p>
  
        <p>We look forward to seeing you there!</p>
  
        <p>Best regards,</p>
        <p>Link Ur Codes Team</p>
        <br>
      </div>
  
      <div class="footer">
        <p id="copyright">© ${currentYear} Link Ur Codes. All rights reserved.</p>
      </div>
    </div>
  
  </body>
  
  </html>`
  return content;
}

function upcomingSessionOnlineHTMLContent(studName, sessionName, date, time, venueORlink) {
  // Get the current year
  const currentYear = new Date().getFullYear();
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
        border: 2px solid #a3a0a0;
        /* Added a border to content */
        padding: 20px;
      }
  
      .footer {
        text-align: center;
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
          <li>Meeting Link : ${venueORlink}</li>
        </ul>
  
        <p>It's going to be an engaging and informative session that you wouldn't want to miss. Be sure to mark your
          calendars!</p>
  
        <p>For the full session schedule and any changes, please check our online student portal or mobile app.</p>
  
        <p>If you have any questions, feel free to reach out to us !! </p>
  
        <p>We look forward to seeing you there!</p>
  
        <p>Best regards,</p>
        <p>Link Ur Codes Team</p>
        <br>
      </div>
  
      <div class="footer">
        <p id="copyright">© ${currentYear} Link Ur Codes. All rights reserved.</p>
      </div>
    </div>
  
  </body>
  
  </html>`
  return content;
}

function upcomingSessionRecordedHTMLContent(studName, sessionName, date, time, venueORlink) {
  // Get the current year
  const currentYear = new Date().getFullYear();
  content = `<!DOCTYPE html>
  <html>
  
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
      }
  
      .container {
        max-width: 600px;
        margin: 20px auto;
        padding: 20px;
        background-color: #ffffff;
        border: 1px solid #dddddd;
        border-radius: 8px;
      }
  
      .header {
        color: #333333;
        text-align: center;
      }
  
      .logo-header img {
        max-width: 30%;
        height: auto;
      }
  
      .content {
        color: #333333;
        line-height: 1.6;
      }
  
      .footer {
        text-align: center;
        margin-top: 20px;
        font-size: 0.8em;
        color: #666666;
      }
  
      a {
        color: #007bff;
      }
    </style>
  </head>
  
  <body>
    <div class="container">
      <div class="logo-header">
        <img src="https://www.linkurcodes.com/images/logo.png" alt="Link Ur Codes Logo">
      </div>
      <table width="100%" align="center" border="0" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center">
            <img src="https://linkurcodes.com/imgs/nextClass.jpg" alt="Next Class" width="300"
              style="width: 300px; max-width: 100%; height: auto; border: none; outline: none;">
          </td>
        </tr>
      </table>
      <div class="header">
        <h2>Upcoming Session Announcement: Dive Deeper with Our Next Recorded Lesson!</h2>
      </div>
      <div class="content">
        <p>Dear ${studName},</p>
        <p>We hope this message finds you well and eager to learn! At Link Ur Codes, we are continuously looking for
          ways to enhance your learning experience and adapt to your busy schedules. This time, we're excited to
          announce our next session in a format that offers you the flexibility to engage with the material at
          your own pace.</p>
        <p><strong>Next Session: ${sessionName}</strong><br>
          <strong>Available From:</strong> ${date}, ${time}<br>
          <strong>Where:</strong> <a href=${venueORlink}>Access the Video Here</a>
        </p>
        <p>This session is specially recorded for you! Dive deep into the Session Content.</p>
        <h3>Your Task</h3>
        <p>After watching the video, we encourage you to put your knowledge to the test by completing the tasks
          mentioned towards the end of the session. This is a fantastic opportunity to apply what you've learned
          and receive feedback on your work.</p>
  
        <p>Happy Learning,</p>
        Link Ur Codes Team</p>
      </div>
      <div class="footer">
        <p id="copyright">© ${currentYear} Link Ur Codes. All rights reserved.</p>
      </div>
    </div>
  </body>
  
  </html>`
  return content;
}

function upcomingSessionClgStaffHTMLContent(sessionName, date, time, venueORlink, type, batchName) {
  // Get the current year
  const currentYear = new Date().getFullYear();
  content = `<!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Next Session Details</title>
  <style>
      body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          margin: 0;
          padding: 0;
      }
      .container {
          max-width: 600px;
          margin: auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 5px;
          background-color: #f9f9f9;
      }
      h2 {
          color: #333;
          text-align: center;
      }
      .logo-header img {
        max-width: 30%;
        height: auto;
      }
      p {
          color: #555;
      }
      .button {
          display: inline-block;
          background-color: #007bff;
          color: #fff;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 5px;
      }
      .footer {
          text-align: center;
          font-size: 0.8em; /* Reduced font size for the footer */
      }
  </style>
  </head>
  <body>
  <div class="container">
  <div class="logo-header">
  <img src="https://www.linkurcodes.com/images/logo.png" alt="Link Ur Codes Logo">
  </div>
      <h2>Upcoming Session Details</h2>
      <p>Dear College Staff,</p>
      <p>We hope this email finds you well. We are writing to inform you about the upcoming session details for our coding platform, Link Ur Codes.</p>
      <p>The next session is scheduled for:</p>
      <ul>
          <li><strong>Batch Name :</strong> ${batchName}</li>
          <li><strong>Session Name:</strong> ${sessionName}</li>
          <li><strong>Type:</strong> ${type}</li>
          <li><strong>Date:</strong> ${date}</li>
          <li><strong>Time:</strong> ${time}</li>
          <li><strong>Link or Venue : ${venueORlink}</li>
      </ul>
      <p>We kindly request your assistance in disseminating this information to the students, ensuring maximum participation and engagement.</p>
      <p>If you have any questions or concerns, please feel free to contact us.</p>
      <p>Best regards,</p>
      <p>Link Ur Codes Team</p>
      <br>
    <div class="footer">
      <p id="copyright">© ${currentYear} Link Ur Codes. All rights reserved.</p>
    </div>
  </div>
  </body>
  </html>`
  return content;
}

function admStaffAddHTMLContent(AdStaffName, password, adminStaffEmail) {
  // Get the current year
  const currentYear = new Date().getFullYear();
  content = `<!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to LinkUrCodes</title>
    <style>
      body {
        font-family: 'Arial', sans-serif;
        background-color: #f9f9f9;
        margin: 0;
        padding: 0;
      }
  
      .email-container {
        max-width: 600px;
        margin: auto;
        border: 1px solid #ccc;
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
        <p>We're excited to have you on board. Your registration with LinkUrCodes has been successfully completed by our
          administrator.</p>
        <p>As a new member of our community, you now have access to a wide range of resources. Here are a few things to
          get you started:</p>
        <ul>
          <li>Your Login Credentials are as follows:
            <ul>
              <li>Email: ${adminStaffEmail}</li>
              <li>Password: ${password}</li>
            </ul>
          </li>
          <li>Explore our <a href="https://linkurcodes.com">website</a> to learn more about what we offer.</li>
          <li>Join our community forums to discuss topics that interest you with fellow members.</li>
        </ul>
        <p>We look forward to your active participation and hope you find your experience with us rewarding.</p>
        <p>Best Regards,</p>
        <p>The LinkUrCodes Team</p>
      </div>
      <div class="email-footer">
        <p id="copyright">© ${currentYear} Link Ur Codes. All rights reserved.</p>
      </div>
    </div>
  </body>
  
  </html>`
  return content
}


function admStaffAddTextContent(AdStaffName, password, adminStaffEmail) {
  // Get the current year
  const currentYear = new Date().getFullYear();
  content = `Dear ${AdStaffName},

  We're excited to have you on board. Your registration with LinkUrCodes has been successfully completed by our administrator.
  
  As a new member of our community, you now have access to a wide range of resources. Here are a few things to get you started:
  
  - Your Login Credentials are as follows:
    * Email: ${adminStaffEmail}
    * Password: ${password}
  
  - Explore our website (https://linkurcodes.com) to learn more about what we offer.
  
  - Join our community forums to discuss topics that interest you with fellow members.
  
  We look forward to your active participation and hope you find your experience with us rewarding.
  
  Best Regards,
  
  The LinkUrCodes Team
  
  © ${currentYear} Link Ur Codes. All rights reserved.`

  return content
}


function upcomingSessionOfflineTextContent(studName, sessionName, date, time, venueORlink) {
  // Get the current year
  const currentYear = new Date().getFullYear();
  textContent = `
  Dear ${studName},
  We are excited to announce the schedule for the upcoming session! Please find the details below:
  Session Title: ${sessionName}
  Date: ${date}
  Time: ${time}
  Location: ${venueORlink}
  It's going to be an engaging and informative session that you wouldn't want to miss. Be sure to mark your calendars!
  For the full session schedule and any changes, please check our online student portal or mobile app.
  We look forward to seeing you there!
  If you have any questions or need further information, please do not hesitate to contact us at admin@linkurcodes.com.
  
  © ${currentYear} LinkUrCodes. All rights reserved.`

  return textContent

}

function upcomingSessionClgStaffTextContent(sessionName, date, time, venueORlink, type, batchName) {
  // Get the current year
  const currentYear = new Date().getFullYear();
  textContent = `
  Dear College Staff,
  
  We hope this email finds you well. We are writing to inform you about the upcoming session details for our coding platform, Link Ur Codes.
  
  The next session is scheduled for:
  
  Batch Name: ${batchName}
  Session Name: ${sessionName}
  Type: ${type}
  Date: ${date}
  Time: ${time}
  Link or Venue: ${venueORlink}

  We kindly request your assistance in disseminating this information to the students, ensuring maximum participation and engagement.
  
  If you have any questions or concerns, please feel free to contact us.
  
  Best regards,
  
  Link Ur Codes Team
  
  © ${currentYear} Link Ur Codes. All rights reserved.`

  return textContent

}

function upcomingSessionOnlineTextContent(studName, sessionName, date, time, venueORlink) {
  // Get the current year
  const currentYear = new Date().getFullYear();
  textContent = `
  Dear ${studName},
  We are excited to announce the schedule for the upcoming session! Please find the details below:
  Session Title: ${sessionName}
  Date: ${date}
  Time: ${time}
  Meeting Link: ${venueORlink}
  It's going to be an engaging and informative session that you wouldn't want to miss. Be sure to mark your calendars!
  For the full session schedule and any changes, please check our online student portal or mobile app.
  We look forward to seeing you there!
  If you have any questions or need further information, please do not hesitate to contact us at admin@linkurcodes.com.

  © ${currentYear} Link Ur Codes. All rights reserved.`

  return textContent

}

function upcomingSessionRecordedTextContent(studName, sessionName, date, time, venueORlink) {
  // Get the current year
  const currentYear = new Date().getFullYear();
  textContent = `
  Dear ${studName},

  We hope this message finds you well and eager to learn! At Link Ur Codes, we are continuously looking for ways to enhance your learning experience and adapt to your busy schedules. This time, we’re excited to announce our next session in a format that offers you the flexibility to engage with the material at your own pace.
  
  Next Session: ${sessionName}
  Available From: ${date}
  Where: ${venueORlink}
  
  This session is specially recorded for you! Dive deep into the Session Content.
  
  Your Task
  
  After watching the video, we encourage you to put your knowledge to the test by completing the tasks mentioned towards the end of the session. This is a fantastic opportunity to apply what you’ve learned and receive feedback on your work.
  
  Happy Learning,
  
  Link Ur Codes Team
  
  © ${currentYear} Link Ur Codes. All rights reserved.`

  return textContent

}

function collegeStaffTextContent(collegeStaffName, collegeName, collegeStaffEmail, password) {
  // Get the current year
  const currentYear = new Date().getFullYear();
  content = `Dear ${collegeStaffName},

  We hope this email finds you well. We are pleased to inform you that your registration with the Link Ur Codes portal has been successfully completed. As the batch-in-charge for ${collegeName}, you are now the official point of contact and can fully access the resources available on our platform.
  
  The Link Ur Codes portal is designed to provide a comprehensive and interactive learning experience for students and educators in the field of coding and programming.
  
  To get started, please log in with the following credentials at the Link Ur Codes Portal:
  
  Email: ${collegeStaffEmail}
  Password: ${password}

  We highly recommend updating your profile and exploring the various sections of the portal to familiarize yourself with its functionalities.
  
  We are excited to have ${collegeName} on board and look forward to your active participation in our community. Together, we can inspire and nurture the next generation of coding experts.
  
  If you need assistance, please contact our support team at admin@linkurcodes.com.
  
  Best Regards,
  
  Link Ur Codes Team
  
  © ${currentYear} Link Ur Codes. All rights reserved.`
  return content;

}

function collegeStaffHtmlContent(collegeStaffName, collegeName, collegeStaffEmail, password) {
  // Get the current year
  const currentYear = new Date().getFullYear();
  content = `<!DOCTYPE html>
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
        background-color: #ece9e9;
        border-radius: 8px;
        padding: 20px;
        margin: 20px auto;
        max-width: 600px;
      }
  
      h2 {
        text-align: center;
      }
  
      .logo-header img {
        max-width: 30%;
        height: auto;
      }
  
      .content {
        margin-top: 20px;
        border: 2px solid #a3a0a0;
        padding: 20px;
      }
  
      .footer {
        text-align: center;
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
        <h2>Batch-In-Charge Registration Successful !!!</h2>
        <p>Dear ${collegeStaffName},</p>
        <p>We hope this email finds you well. We are pleased to inform you that your registration with the Link Ur Codes
          portal has been successfully completed. As the batch-in-charge for ${collegeName}, you are now the official
          point of contact and can fully access the resources available on our platform.</p>
        <p>The Link Ur Codes portal is designed to provide a comprehensive and interactive learning experience for
          students and educators in the field of coding and programming.
        <p>
          <b>To get started, please log in with following credentials at Link Ur Codes Portal:</b>
        <ul>
          <li><b>Email:</b> ${collegeStaffEmail}</li>
          <li><b>Password:</b> ${password}</li>
        </ul>
        <p>We highly recommend updating your profile and exploring the various sections of the portal to familiarize
          yourself with its functionalities.</p>
        <p>We are excited to have ${collegeName} on board and look forward to your active participation in our community.
          Together, we can inspire and nurture the next generation of coding experts.</p>
        <p>If you need assistance, please contact our support team: admin@linkurcodes.com</p>
        <p>Best Regards,</p>
        <p>Link Ur Codes Team</p>
      </div>
      <div class="footer">
        <p>© ${currentYear} Link Ur Codes. All rights reserved.</p>
      </div>
    </div>
  </body>
  
  </html>`
  return content;
}



function collegeHtmlContent(collegeName) {
  // Get the current year
  const currentYear = new Date().getFullYear();
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
        border: 1px solid #ccc;
        background-color: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        border-radius: 5px;
      }
  
      h1 {
        text-align: center;
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
  
      .footer {
        text-align: center;
        margin-top: 30px;
        font-size: smaller;
        color: grey;
      }
    </style>
  </head>
  
  <body>
    <div class="container">
      <p><img height="50px" width="150px" src="https://www.linkurcodes.com/images/logo.png" alt=""> </p>
  
      <h1>Welcome to LinkUrCodes!</h1>
      <p>Dear ${collegeName} Administration,</p>
      <p>Congratulations on joining LinkUrCodes! We are thrilled to welcome ${collegeName} to our platform, where we
        empower students and faculty to explore, learn, and excel in the world of technology.</p>
      <p>LinkUrCodes provides a unique learning experience, and we are excited to collaborate with ${collegeName} to
        enhance the technological journey of your students. Here are some key features and benefits you can expect:</p>
      <ul>
        <li>Live coding projects for students</li>
        <li>Mentorship and guidance from industry experts</li>
        <li>Access to a vast library of coding resources</li>
        <li>Opportunities for participation in coding events and competitions</li>
      </ul>
  
      <p>Batch-in-Charge can now log in and will have access to all data related to ${collegeName} and can verify the
        students enrolled in coding batches.</p>
      <p>We are here to support you throughout the onboarding process. If you have any questions or need assistance,
        please feel free to reach out to our dedicated support team.</p>
      <p>Thank you for choosing LinkUrCodes. We look forward to a successful partnership in fostering technological
        excellence at ${collegeName}.</p>
      <p>Best Regards,</p>
      <p>The LinkUrCodes Team</p>
      <div class="footer">
        <p>© ${currentYear} Link Ur Codes. All rights reserved.</p>
      </div>
    </div>
  </body>
  
  </html>`
  return content;
}

function collegeTextContent(collegeName) {
  // Get the current year
  const currentYear = new Date().getFullYear();
  content = `Dear ${collegeName} Administration,

  Congratulations on joining LinkUrCodes! We are thrilled to welcome ${collegeName} to our platform, where we empower
  students and faculty to explore, learn, and excel in the world of technology.
  
  LinkUrCodes provides a unique learning experience, and we are excited to collaborate with ${collegeName} to enhance the
  technological journey of your students. Here are some key features and benefits you can expect:
  - Live coding projects for students
  - Mentorship and guidance from industry experts
  - Access to a vast library of coding resources
  - Opportunities for participation in coding events and competitions
  
  Batch-in-Charge can now log in and will have access to all data related to ${collegeName} and can verify the students
  enrolled in coding batches.
  
  We are here to support you throughout the onboarding process. If you have any questions or need assistance, please feel
  free to reach out to our dedicated support team.
  
  Thank you for choosing LinkUrCodes. We look forward to a successful partnership in fostering technological excellence at
  ${collegeName}.
  
  Best Regards,
  
  The LinkUrCodes Team
  
  © ${currentYear} Link Ur Codes. All rights reserved.`
  return content;
}


function cancelSessionContent(participantName, date, time) {
  // Get the current year
  const currentYear = new Date().getFullYear();
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
  
      h2 {
        text-align: center;
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
        text-align: center;
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
        <p>We regret to inform you that the session scheduled on ${date} at ${time} has been cancelled. We apologize for
          any inconvenience this may cause.</p>
        <p>A new date for the session will be announced soon. We will keep you updated with the new schedule.</p>
        <p>Thank you for your understanding.</p>
        <p>Best Regards,</p>
        <p>The LinkUrCodes Team</p>
      </div>
      <div class="footer">
        <p>© ${currentYear} Link Ur Codes. All rights reserved.</p>
      </div>
    </div>
  
  </body>
  
  </html>`
  return content;

}

function cancelSessionTextContent(participantName, date, time) {
  // Get the current year
  const currentYear = new Date().getFullYear();
  content = `Dear ${participantName},

    We regret to inform you that the session scheduled on ${date} at ${time} has been cancelled. We apologize for any inconvenience this may cause.
    
    A new date for the session will be announced soon. We will keep you updated with the new schedule.
    
    Thank you for your understanding.
    
    Best Regards,

    The LinkUrCodes Team
    
    © ${currentYear} Link Ur Codes. All rights reserved.`
  return content;
}

function newTaskHtmlContent(participantName, dueDate) {
  // Get the current year
  const currentYear = new Date().getFullYear();
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
  
      h2 {
        text-align: center;
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
        text-align: center;
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
        <h2>A New Task for You</h2>
        <p>Dear ${participantName},</p>
        <p>A new task has been added to your portal that requires your attention. Please complete this task before the due
          date to stay on track with your progress.</p>
        <p><strong>Task Deadline: ${dueDate}</strong></p>
        <p>For more details and to complete the task, log on to the web or mobile app.</p>
        <p>If you need assistance, please contact our support team : admin@linkurcodes.com </p>
        <p>Regards,</p>
        <p>The LinkUrCodes Team</p>
      </div>
      <div class="footer">
        <p>© ${currentYear} Link Ur Codes. All rights reserved.</p>
      </div>
    </div>
  
  </body>
  
  </html>`
  return content;
}

function newTaskTextContent(participantName, dueDate) {
  // Get the current year
  const currentYear = new Date().getFullYear();
  content = `Dear ${participantName},

    We are excited to inform you that a new task has been added to your portal on Link Ur Codes.
    
    Please complete this task before the due date: ${dueDate}.
    
    For more details, log on to the web or mobile app.
    
    Best Regards,
    Link Ur Codes Team
    
    © ${currentYear} Link Ur Codes. All rights reserved.`
  return content;
}

function studRegOTPVerificationHTMLContent(otp) {
  // Get the current year
  const currentYear = new Date().getFullYear();
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
  
      h2 {
        text-align: center;
      }
  
      .logo-header img {
        max-width: 30%;
        height: auto;
      }
  
      .content {
        margin-top: 20px;
        border: 2px solid #a3a0a0;
        /* Corrected: Removed stray '/' */
        padding: 20px;
      }
  
      .otp {
        background-color: #007bff;
        color: #fff;
        padding: 10px 20px;
        border-radius: 5px;
        font-size: 18px;
        display: inline-block;
      }
  
      .footer {
        text-align: center;
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
        <h2>Welcome to Link Ur Codes !!</h2>
  
        <p>Dear Student,</p>
        <p>You are one step away from completing your registration with Link Ur Codes.</p>
        <p>Please use the following One-Time Password to complete your registration:</p>
        <p class="otp">${otp}</p>
        <p>This OTP is valid for the next 10 minutes. Enter this OTP in the required field on the web app to continue.</p>
        <p>If you need assistance, please contact our support team : admin@linkurcodes.com </p>
      </div>
      <div class="footer">
        <p>© ${currentYear} Link Ur Codes. All rights reserved.</p>
      </div>
    </div>
  
  </body>
  
  </html>`
  return content;
}

function studRegOTPVerificationTextContent(otp) {
  // Get the current year
  const currentYear = new Date().getFullYear();
  content = `Dear Student,

    You are one step away from completing your registration with Link Ur Codes.
    
    Please use the following One-Time Password to complete your registration:
    
    ${otp}
    
    This OTP is valid for the next 10 minutes. Enter this OTP in the required field on the web or mobile app to continue.
    
    If you did not initiate this request, please ignore this email or contact support team: admin@linkurcodes.com.
    
    © ${currentYear} Link Ur Codes. All rights reserved.`

  return content;
}

function ClgStaffOTPVerificationHTMLContent(clgStaffName, otp) {
  // Get the current year
  const currentYear = new Date().getFullYear();
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
  
      h2 {
        text-align: center;
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
  
      .otp {
        background-color: #007bff;
        color: #fff;
        padding: 10px 20px;
        border-radius: 5px;
        font-size: 18px;
        display: inline-block;
      }
  
      .footer {
        text-align: center;
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
        <p>You have requested to reset your password. Please use the verification code below to proceed with setting a new
          password:</p>
        <p class="otp">${otp}</p>
        <p>This code is valid for 10 minutes and for one-time use only.</p>
        <p>If you did not initiate this request, please contact our support team : admin@linkurcodes.com </p>
      </div>
      <div class="footer">
        <p>© ${currentYear} Link Ur Codes. All rights reserved.</p>
      </div>
    </div>
  
  </body>
  
  </html>`
  return content;
}

function ClgStaffOTPVerificationTextContent(clgStaffName, otp) {
  // Get the current year
  const currentYear = new Date().getFullYear();
  content = `Dear ${clgStaffName},

    You have requested to reset your password. Please use the verification code below to proceed with setting a new password:
    
    Verification Code: ${otp}
    
    This code is valid for 10 minutes and for one-time use only.
    
    If you did not initiate this request, please contact our support team : admin@linkurcodes.com .
    
    Best Regards,
    Link Ur Codes Team
    
    © ${currentYear} Link Ur Codes. All rights reserved.`

  return content;
}



function AdminStaffOTPVerificationHTMLContent(adminstaffName, admstaffotp) {
  // Get the current year
  const currentYear = new Date().getFullYear();
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
  
      h2 {
        text-align: center;
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
  
      .otp {
        background-color: #007bff;
        color: #fff;
        padding: 10px 20px;
        border-radius: 5px;
        font-size: 18px;
        display: inline-block;
      }
  
      .footer {
        text-align: center;
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
        <p>You have requested to reset your password. Please use the verification code below to proceed with setting a new
          password:</p>
        <p class="otp">${admstaffotp}</p>
        <p>This code is valid for 10 minutes and for one-time use only.</p>
        <p>If you did not initiate this request, please contact our support team : admin@linkurcodes.com </p>
      </div>
      <div class="footer">
        <p>© ${currentYear} Link Ur Codes. All rights reserved.</p>
      </div>
    </div>
  
  </body>
  
  </html>`
  return content;
}

function AdminStaffOTPVerificationTextContent(adminstaffName, admstaffotp) {
  // Get the current year
  const currentYear = new Date().getFullYear();
  content = `Dear ${adminstaffName},

    You have requested to reset your password. Please use the verification code below to proceed with setting a new password:
    
    Verification Code: ${admstaffotp}
    
    This code is valid for 10 minutes and for one-time use only.
    
    If you did not initiate this request, please contact our support team immediately.
    
    Best Regards,
    Link Ur Codes Team
    
    © ${currentYear} Link Ur Codes. All rights reserved.`

  return content;
}

function StudentOTPVerificationHTMLContent(studName, otp) {
  // Get the current year
  const currentYear = new Date().getFullYear();
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
  
      h2 {
        text-align: center;
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
  
      .otp {
        background-color: #007bff;
        color: #fff;
        padding: 10px 20px;
        border-radius: 5px;
        font-size: 18px;
        display: inline-block;
      }
  
      .footer {
        text-align: center;
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
        <p>You have requested to reset your password. Please use the verification code below to proceed with setting a new
          password:</p>
        <p class="otp">${otp}</p>
        <p>This code is valid for 10 minutes and for one-time use only.</p>
        <p>If you did not initiate this request, please contact our support team : admin@linkurcodes.com </p>
      </div>
      <div class="footer">
        <p>© ${currentYear} Link Ur Codes. All rights reserved.</p>
      </div>
    </div>
  
  </body>
  
  </html>`
  return content;
}

function StudentOTPVerificationTextContent(studName, otp) {
  // Get the current year
  const currentYear = new Date().getFullYear();
  content = `Dear ${studName},

    You have requested to reset your password. Please use the verification code below to proceed with setting a new password:
    
    Verification Code: ${otp}
    
    This code is valid for 10 minutes and for one-time use only.
    
    If you did not initiate this request, please contact our support team immediately.
    
    Best Regards,
    Link Ur Codes Team
    
    © ${currentYear} Link Ur Codes. All rights reserved.`

  return content;
}

function StudentRegistrationSuccessfulMailHTMLContent(membershipNo) {
  // Get the current year
  const currentYear = new Date().getFullYear();
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
        border: 1px solid #ccc;
        background-color: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        border-radius: 5px;
      }
  
      h2 {
        text-align: center;
        color: #007bff;
      }
  
      .logo-header img {
        max-width: 30%;
        height: auto;
      }
  
      p {
        line-height: 1.6;
      }
  
      .footer {
        text-align: center;
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
      <h2>Welcome to LinkUrCodes!</h2>
      <p>Congratulations on successfully registering with us. We are excited to have you on board as a member of our
        community.</p>
      <p>Your Membership Number: <strong>${membershipNo}</strong></p>
      <p>At LinkUrCodes, we provide a unique platform for college students to build their IT careers right from their
        college campus. As a part of our community, you'll have the opportunity to work on live projects, receive
        mentorship, and gain valuable experience that mirrors the professional IT world.</p>
      <p>Your journey with us starts now! Get ready for a rewarding experience as you embark on live projects and gain
        insights that will shape your IT career.</p>
      <p>Here are the next steps:</p>
      <ol>
  
        <li>Once approved by the batch-in-charge of your college, log on to <a
            href="https://lms.linkurcodes.com/studentLogin" target="_blank">Student Portal</a>.</li><br>
        <li>If you face any issues logging in, or if it takes some time for approval, please contact your batch-in-charge
          for assistance.</li><br>
        <li>Download our mobile app from the Play Store to stay connected on the go: <a
            href="https://play.google.com/store/apps/details?id=com.linkurcodes.logixspace"
            target="_blank">LinkUrCodes</a></li><br>
        <li>Visit Link Ur Codes website <a href="https://www.linkurcodes.com/" target="_blank">Click Here</a></li>
      </ol>
      <p>We're excited to have you with us. If you have any questions or need assistance, feel free to reach out.</p>
      <p>Once again, Welcome to LinkUrCodes!</p>
      <p>Best Regards,</p>
      <p>LinkUrCodes Team</p>
      <div class="footer">
        <p>© ${currentYear} Link Ur Codes. All rights reserved.</p>
      </div>
    </div>
  </body>
  
  </html>`

  return content
}

function StudentRegistrationSuccessfulMailTextContent(membershipNo) {
  // Get the current year
  const currentYear = new Date().getFullYear();
  content = `Welcome to LinkUrCodes!

    Congratulations on successfully registering with us. We are excited to have you on board as a member of our community.
    
    Your Membership Number: ${membershipNo}
    
    At LinkUrCodes, we provide a unique platform for college students to build their IT careers right from their college campus. As a part of our community, you'll have the opportunity to work on live projects, receive mentorship, and gain valuable experience that mirrors the professional IT world.
    
    Your journey with us starts now! Get ready for a rewarding experience as you embark on live projects and gain insights that will shape your IT career.
    
    Here are the next steps:
    
    1. Once approved by the batch-in-charge of your college, log on to the Student Portal: https://lms.linkurcodes.com/studentLogin
    2. If you face any issues logging in, or if it takes some time for approval, please contact your batch-in-charge for assistance.
    3. Download our mobile app from the Play Store to stay connected on the go: https://play.google.com/store/apps/details?id=com.linkurcodes.logixspace
    4. Visit Link Ur Codes website: https://www.linkurcodes.com/
    
    We're excited to have you with us. If you have any questions or need assistance, feel free to reach out.
    
    Once again, welcome to LinkUrCodes!
    
    Best Regards,
    
    Link Ur Codes Team
    
    © ${currentYear} Link Ur Codes. All rights reserved.`

  return content
}

function paymentRenewalSuccessfulHTMLContent(validityDate, renewalAmount, transactionNo, paymentId) {
  // Get the current year
  const currentYear = new Date().getFullYear();
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
        border: 1px solid #ccc;
        background-color: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        border-radius: 5px;
      }
  
      h2 {
        text-align: center;
        color: #007bff;
      }
  
      p {
        line-height: 1.6;
      }
  
      .footer {
        text-align: center;
        margin-top: 30px;
        font-size: smaller;
        color: grey;
      }
    </style>
  </head>
  
  <body>
    <div class="container">
      <p><img height="50px" width="150px" src="https://www.linkurcodes.com/images/logo.png" alt=""> </p>
  
      <h2>LinkUrCodes Subscription Renewal Confirmation</h2>
      <p>Dear LinkUrCodes Member,</p>
      <p>Thank you for renewing your LinkUrCodes subscription! We appreciate your continued support and trust in our
        platform.</p>
      <p>Your subscription is now active, and you have full access to all the features and resources available on
        LinkUrCodes. If you have any questions, need assistance, or want to explore new features, feel free to reach out
        to our support team.</p>
      <p>Details of your renewed subscription:</p>
      <ul>
        <li><strong>Validity:</strong> ${validityDate}</li>
        <li><strong>Renewal Amount:</strong> ${renewalAmount}</li>
        <li><strong> Payment Id :</strong> ${paymentId}</li>
        <li><strong> Transaction Number :</strong> ${transactionNo}</li>
      </ul>
      <p>Thank you for being a valued member of LinkUrCodes! We look forward to provide you with an excellent learning
        experience.</p>
      <p>To visit LinkUrCodes website, <a href="https://www.linkurcodes.com/" target="_blank">Click Here</a>.</p>
      <p>Best Regards,</p>
      <p>LinkUrCodes Team</p>
      <div class="footer">
        <p>© ${currentYear} Link Ur Codes. All rights reserved.</p>
      </div>
    </div>
  </body>
  
  </html>`

  return content
}

function paymentRenewalSuccessfulTextContent(validityDate, renewalAmount, transactionNo, paymentId) {
  // Get the current year
  const currentYear = new Date().getFullYear();
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
   
   LinkUrCodes Team
   
   © ${currentYear} Link Ur Codes. All rights reserved.`

  return content
}

function emailverificationAdmStaffHTMLContent(adminstaffName, admstaffotp) {
  // Get the current year
  const currentYear = new Date().getFullYear();
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
        border: 1px solid #ccc;
        background-color: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        border-radius: 5px;
      }
  
      h2 {
        text-align: center;
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
  
      .footer {
        text-align: center;
        margin-top: 30px;
        font-size: smaller;
        color: grey;
      }
    </style>
  </head>
  
  <body>
    <div class="container">
      <p><img height="50px" width="150px" src="https://www.linkurcodes.com/images/logo.png" alt=""> </p>
  
      <h2>Account Verification OTP</h2>
      <p>Dear ${adminstaffName},</p>
      <p>To complete the verification of your account at LinkUrCodes, please use the following OTP:</p>
      <p class="otp">${admstaffotp}</p>
      <p>If you have any questions or need further assistance, please feel free to reach out.</p>
      <p>Thank you for your cooperation.</p>
      <p>Best Regards,</p>
      <p>LinkUrCodes Team</p>
      <div class="footer">
        <p>© ${currentYear} Link Ur Codes. All rights reserved.</p>
      </div>
    </div>
  </body>
  
  </html>`

  return content
}

function emailverificationAdmStaffTextContent(adminstaffName, admstaffotp) {
  // Get the current year
  const currentYear = new Date().getFullYear();
  content = `
    Dear ${adminstaffName},
    
    To complete the verification of your account at LinkUrCodes, please use the following OTP: ${admstaffotp}
    
    If you have any questions or need further assistance, please feel free to reach out.
    
    Thank you for your cooperation.
    
    Best Regards,
    
    LinkUrCodes Team
    
    © ${currentYear} Link Ur Codes. All rights reserved.`

  return content
}

function clgstaffEmailVerificationOTPHTMLContent(clgstaffName, clgstaffotp) {
  // Get the current year
  const currentYear = new Date().getFullYear();
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
        border: 1px solid #ccc;
        background-color: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        border-radius: 5px;
      }
  
      h2 {
        text-align: center;
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
  
      .footer {
        text-align: center;
        margin-top: 30px;
        font-size: smaller;
        color: grey;
      }
    </style>
  </head>
  
  <body>
    <div class="container">
      <p><img height="50px" width="150px" src="https://www.linkurcodes.com/images/logo.png" alt=""> </p>
  
      <h2>Account Verification OTP</h2>
      <p>Dear ${clgstaffName},</p>
      <p>To complete the verification of your batch-in-charge account at LinkUrCodes, please use the following OTP:</p>
      <p class="otp">${clgstaffotp}</p>
      <p>If you have any questions or need further assistance, please feel free to reach out.</p>
      <p>Thank you for your cooperation.</p>
      <p>Best Regards,</p>
      <p>LinkUrCodes Team</p>
      <div class="footer">
        <p>© ${currentYear} Link Ur Codes. All rights reserved.</p>
      </div>
    </div>
  </body>
  
  </html>`

  return content
}

function clgstaffEmailVerificationOTPTextContent(clgstaffName, clgstaffotp) {
  // Get the current year
  const currentYear = new Date().getFullYear();
  content = `
    Dear ${clgstaffName},
    
    To complete the verification of your batch-in-charge account at LinkUrCodes, please use the following OTP: ${clgstaffotp}
    
    If you have any questions or need further assistance, please feel free to reach out.
    
    Thank you for your cooperation.
    
    Best Regards,
    
    LinkUrCodes Team
    
    © ${currentYear} Link Ur Codes. All rights reserved.`

  return content
}

function reschedulingSessionOfflineHTMLContent(originaldate, sessionDate, sessionTime, type, venueORlink) {
  // Get the current year
  const currentYear = new Date().getFullYear();
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
        border: 1px solid #ccc;
        background-color: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        border-radius: 5px;
      }
  
      h2 {
        text-align: center;
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
  
      .footer {
        text-align: center;
        margin-top: 30px;
        font-size: smaller;
        color: grey;
      }
    </style>
  </head>
  
  <body>
    <div class="container">
      <p><img height="50px" width="150px" src="https://www.linkurcodes.com/images/logo.png" alt=""> </p>
  
      <h2>Session Reschedule Announcement</h2>
      <p>Dear LinkUrCodes Member,</p>
      <p>We hope this message finds you well. Due to unforeseen circumstances, we need to reschedule the upcoming session
        originally scheduled for ${originaldate} to the new date ${sessionDate}. We apologize for any inconvenience this
        may cause and appreciate your understanding.</p>
      <p>Details of the rescheduled session:</p>
      <ul>
        <li><strong>Original Date:</strong> ${originaldate} </li>
        <li><strong>New Date:</strong> ${sessionDate} </li>
        <li><strong>Time:</strong> ${sessionTime} </li>
        <li><strong>Session Type:</strong> ${type} </li>
        <li><strong>Venue:</strong> ${venueORlink} </li>
  
      </ul>
  
      <p>Best Regards,</p>
      <p>LinkUrCodes Team</p>
      <a class="button" href="https://www.linkurcodes.com" style="color: white;" target="_blank">Visit LinkUrCodes
        Website</a>
      <div class="footer">
        <p>© ${currentYear} Link Ur Codes. All rights reserved.</p>
      </div>
    </div>
  </body>
  
  </html>`
  return content;
}

function reschedulingSessionOnlineHTMLContent(originaldate, sessionDate, sessionTime, type, venueORlink) {
  // Get the current year
  const currentYear = new Date().getFullYear();
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
        border: 1px solid #ccc;
        background-color: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        border-radius: 5px;
      }
  
      h2 {
        text-align: center;
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
  
      .footer {
        text-align: center;
        margin-top: 30px;
        font-size: smaller;
        color: grey;
      }
    </style>
  </head>
  
  <body>
    <div class="container">
      <p><img height="50px" width="150px" src="https://www.linkurcodes.com/images/logo.png" alt=""> </p>
  
      <h2>Session Reschedule Announcement</h2>
      <p>Dear LinkUrCodes Member,</p>
      <p>We hope this message finds you well. Due to unforeseen circumstances, we need to reschedule the upcoming session
        originally scheduled for ${originaldate} to the new date ${sessionDate}. We apologize for any inconvenience this
        may cause and appreciate your understanding.</p>
      <p>Details of the rescheduled session:</p>
      <ul>
        <li><strong>Original Date:</strong> ${originaldate} </li>
        <li><strong>New Date:</strong> ${sessionDate} </li>
        <li><strong>Time:</strong> ${sessionTime} </li>
        <li><strong>Session Type:</strong> ${type} </li>
        <li><strong>Meeting Link:</strong> ${venueORlink} </li>
  
      </ul>
  
      <p>Best Regards,</p>
      <p>LinkUrCodes Team</p>
      <a class="button" href="https://www.linkurcodes.com" style="color: white;" target="_blank">Visit LinkUrCodes
        Website</a>
      <div class="footer">
        <p>© ${currentYear} Link Ur Codes. All rights reserved.</p>
      </div>
    </div>
  </body>
  
  </html>`
  return content;
}

function reschedulingSessionRecordedHTMLContent(originaldate, sessionDate, sessionTime, type, venueORlink) {
  // Get the current year
  const currentYear = new Date().getFullYear();
  content = `<!DOCTYPE html>
  <html>
  
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
      }
  
      .container {
        max-width: 600px;
        margin: 20px auto;
        padding: 20px;
        background-color: #ffffff;
        border: 1px solid #dddddd;
        border-radius: 8px;
      }
  
      .header {
        color: #007bff;
        text-align: center;
      }
  
      .logo-header img {
        max-width: 30%;
        height: auto;
      }
  
      .content {
        color: #333333;
        line-height: 1.6;
      }
  
      .footer {
        text-align: center;
        margin-top: 20px;
        font-size: 0.8em;
        color: #666666;
      }
  
      a {
        color: #007bff;
      }
    </style>
  </head>
  
  <body>
    <div class="container">
      <div class="logo-header">
        <img src="https://www.linkurcodes.com/images/logo.png" alt="Link Ur Codes Logo">
      </div>
      <div class="header">
        <h2>Session Reschedule Announcement</h2>
      </div>
      <div class="content">
        <p>Dear LinkUrCodes Member,</p>
        <p>We hope this message finds you well. Due to unforeseen circumstances, we need to reschedule the upcoming
          session originally scheduled for ${originaldate} to the new date ${sessionDate}. We apologize for any
          inconvenience this may cause and appreciate your understanding.</p>
        <p>Details of the rescheduled session:</p>
        <ul>
          <li><strong>Original Date:</strong> ${originaldate}</li>
          <li><strong>New Date:</strong> ${sessionDate}</li>
          <li><strong>Time:</strong> ${sessionTime}</li>
          <li><strong>Session Type:</strong> ${type}</li>
          <li><strong>Where:</strong> <a href=${venueORlink} target="_blank">Access the Recorded Video Here</a></li>
        </ul>
        <p>Best Regards,</p>
        <p>Link Ur Codes Team</p>
      </div>
      <div class="footer">
        <p id="copyright">© ${currentYear} Link Ur Codes. All rights reserved.</p>
      </div>
    </div>
  </body>
  
  </html>`
  return content;
}

function reschedulingSessionClgStaffHTMLContent(originaldate, sessionDate, sessionTime, type, venueORlink, batchName) {
  // Get the current year
  const currentYear = new Date().getFullYear();
  content = `<!DOCTYPE html>
  <html>
  
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
      }
  
      .container {
        max-width: 600px;
        margin: 20px auto;
        padding: 20px;
        background-color: #ffffff;
        border: 1px solid #dddddd;
        border-radius: 8px;
      }
  
      .header {
        color: #007bff;
        text-align: center;
      }
  
      .logo-header img {
        max-width: 30%;
        height: auto;
      }
  
      .content {
        color: #333333;
        line-height: 1.6;
      }
  
      .footer {
        text-align: center;
        margin-top: 20px;
        font-size: 0.8em;
        color: #666666;
      }
  
      a {
        color: #007bff;
      }
    </style>
  </head>
  
  <body>
    <div class="container">
      <div class="logo-header">
        <img src="https://www.linkurcodes.com/images/logo.png" alt="Link Ur Codes Logo">
      </div>
      <div class="header">
        <h2>Session Reschedule Announcement</h2>
      </div>
      <div class="content">
        <p>Dear College Staff,</p>
        <p>We hope this message finds you well. Due to unforeseen circumstances, we need to reschedule the upcoming
          session originally scheduled for ${originaldate} to the new date ${sessionDate}. We apologize for any
          inconvenience this may cause and appreciate your understanding.</p>
        <p>Details of the rescheduled session:</p>
        <ul>
          <li><strong>Original Date:</strong> ${originaldate}</li>
          <li><strong>New Date:</strong> ${sessionDate}</li>
          <li><strong>Batch Name:</strong> ${batchName}</li>
          <li><strong>Time:</strong> ${sessionTime}</li>
          <li><strong>Session Type:</strong> ${type}</li>
          <li><strong>Meeting Link/Venue:</strong> <a href=${venueORlink} target="_blank">${venueORlink}</a></li></li>
        </ul>
        <p>Best Regards,</p>
        <p>Link Ur Codes Team</p>
      </div>
      <div class="footer">
        <p id="copyright">© ${currentYear} Link Ur Codes. All rights reserved.</p>
      </div>
    </div>
  </body>
  
  </html>`
  return content;
}

function reschedulingSessionOfflineTextContent(originaldate, sessionDate, sessionTime, type, venueORlink) {
  // Get the current year
  const currentYear = new Date().getFullYear();
  content = `Dear LinkUrCodes Member,

    We hope this message finds you well. Due to unforeseen circumstances, we need to reschedule the upcoming session originally scheduled for ${originaldate} to the new date ${sessionDate}. We apologize for any inconvenience this may cause and appreciate your understanding.
    
    Details of the rescheduled session:
    
    Original Date: ${originaldate}
    New Date: ${sessionDate}
    Time: ${sessionTime}
    Session Type: ${type}
    Venue: ${venueORlink}

    Best Regards,
    
    LinkUrCodes Team
    
    Visit LinkUrCodes: https://www.linkurcodes.com
    
    © ${currentYear} Link Ur Codes. All rights reserved.`

  return content
}

function reschedulingSessionOnlineTextContent(originaldate, sessionDate, sessionTime, type, venueORlink) {
  // Get the current year
  const currentYear = new Date().getFullYear();
  content = `Dear LinkUrCodes Member,

    We hope this message finds you well. Due to unforeseen circumstances, we need to reschedule the upcoming session originally scheduled for ${originaldate} to the new date ${sessionDate}. We apologize for any inconvenience this may cause and appreciate your understanding.
    
    Details of the rescheduled session:
    
    Original Date: ${originaldate}
    New Date: ${sessionDate}
    Time: ${sessionTime}
    Session Type: ${type}
    Meeting Link: ${venueORlink}

    Best Regards,
    
    LinkUrCodes Team
    
    Visit LinkUrCodes: https://www.linkurcodes.com
    
    © ${currentYear} Link Ur Codes. All rights reserved.`

  return content
}

function reschedulingSessionRecordedTextContent(originaldate, sessionDate, sessionTime, type, venueORlink) {
  // Get the current year
  const currentYear = new Date().getFullYear();
  content = `Dear LinkUrCodes Member,

    We hope this message finds you well. Due to unforeseen circumstances, we need to reschedule the upcoming session originally scheduled for ${originaldate} to the new date ${sessionDate}. We apologize for any inconvenience this may cause and appreciate your understanding.
    
    Details of the rescheduled session:
    
    Original Date: ${originaldate}
    New Date: ${sessionDate}
    Time: ${sessionTime}
    Session Type: ${type}
    Where: ${venueORlink}

    Best Regards,
    
    LinkUrCodes Team
    
    Visit LinkUrCodes: https://www.linkurcodes.com
    
    © ${currentYear} Link Ur Codes. All rights reserved.`

  return content
}

function reschedulingSessionClgStaffTextContent(originaldate, sessionDate, sessionTime, type, venueORlink, batchName) {
  // Get the current year
  const currentYear = new Date().getFullYear();
  content = `Dear College Staff,

    We hope this message finds you well. Due to unforeseen circumstances, we need to reschedule the upcoming session originally scheduled for ${originaldate} to the new date ${sessionDate}. We apologize for any inconvenience this may cause and appreciate your understanding.
    
    Details of the rescheduled session:
    
    Original Date: ${originaldate}
    New Date: ${sessionDate}
    Batch Name: ${batchName}
    Time: ${sessionTime}
    Session Type: ${type}
    Meeting Link/Venue: ${venueORlink}

    Best Regards,
    
    LinkUrCodes Team
    
    Visit LinkUrCodes: https://www.linkurcodes.com
    
    © ${currentYear} Link Ur Codes. All rights reserved.`

  return content
}


function renewalReminderHtmlContent(studName, validity, rpAmount) {
  // Get the current year
  const currentYear = new Date().getFullYear();
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
        border: 1px solid #dddddd;
        background-color: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        border-radius: 5px;
      }
  
      h2 {
        text-align: center;
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
  
      .footer {
        text-align: center;
        margin-top: 20px;
        font-size: 0.8em;
        color: #666666;
      }
    </style>
  </head>
  
  <body>
    <div class="container">
      <p><img height="50px" width="150px" src="https://www.linkurcodes.com/images/logo.png" alt="LinkUrCodes Logo"></p>
  
      <h2>LinkUrCodes Subscription Renewal Reminder</h2>
      <p>Dear ${studName},</p>
      <p>We hope this message finds you well. We want to remind you that your LinkUrCodes subscription is set to expire on
        ${validity}. To ensure uninterrupted access to all our features and resources, we encourage you to renew your
        subscription before the expiration date.</p>
      <p>Details for Renewal:</p>
      <ul>
        <li><strong>Renewal Date:</strong> ${validity}</li>
        <li><strong>Renewal Amount:</strong> Rs. ${rpAmount}</li>
      </ul>
      <p>Renew your subscription now to continue enjoying the benefits of LinkUrCodes. Click the button below to proceed
        with the renewal process:</p>
      <a class="button" href="https://lms.linkurcodes.com/studentLogin" style="color: white;" target="_blank">Renew
        Subscription</a>
      <p>If you have already renewed your subscription, please ignore this message.</p>
      <p>Thank you for being a valued member of LinkUrCodes!</p>
      <p>Best Regards,</p>
      <p>LinkUrCodes Team</p>
      <div class="footer">
        <p id="copyright">© ${currentYear} Link Ur Codes. All rights reserved.</p>
      </div>
    </div>
  </body>
  
  </html>`;

  return content;
}


function renewalReminderTextContent(studName, validity, rpAmount) {
  // Get the current year
  const currentYear = new Date().getFullYear();
  content = `Dear ${studName},

    We hope this message finds you well. We want to remind you that your LinkUrCodes subscription is set to expire on ${validity}. To ensure uninterrupted access to all our features and resources, we encourage you to renew your subscription before the expiration date.
    
    Details for Renewal:
    
    Renewal Date: ${validity}
    Renewal Amount: Rs. ${rpAmount}
    Renew your subscription now to continue enjoying the benefits of LinkUrCodes. You can proceed with the renewal process by visiting our website: https://lms.linkurcodes.com/studentLogin
    
    If you have already renewed your subscription, please ignore this message.
    
    Thank you for being a valued member of LinkUrCodes!
    
    Best Regards,
    
    The LinkUrCodes Team
    
    © ${currentYear} Link Ur Codes. All rights reserved.`

  return content
}


function emailverifyStudentOTPHtmlContent(studName, otp) {
  // Get the current year
  const currentYear = new Date().getFullYear();
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
        border: 1px solid #dddddd;
        background-color: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        border-radius: 5px;
      }
  
      h2 {
        text-align: center;
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
  
      .footer {
        text-align: center;
        margin-top: 20px;
        font-size: 0.8em;
        color: #666666;
      }
    </style>
  </head>
  
  <body>
    <div class="container">
      <p><img height="50px" width="150px" src="https://www.linkurcodes.com/images/logo.png" alt=""> </p>
  
      <h2>Account Verification OTP</h2>
      <p>Dear ${studName},</p>
      <p>To complete the verification of your student account at LinkUrCodes, please use the following OTP:</p>
      <p class="otp">${otp}</p>
      <p>If you have any questions or need further assistance, please feel free to reach out.</p>
      <p>Thank you for your cooperation.</p>
      <p>Best Regards,</p>
      <p>LinkUrCodes Team</p>
      <div class="footer">
        <p id="copyright">© ${currentYear} Link Ur Codes. All rights reserved.</p>
      </div>
    </div>
  </body>
  
  </html>`

  return content
}

function emailverifyStudentOTPTextContent(studName, otp) {
  // Get the current year
  const currentYear = new Date().getFullYear();
  content = `Dear ${studName},

    To complete the verification of your student account at LinkUrCodes, please use the following OTP: ${otp}
    
    If you have any questions or need further assistance, please feel free to reach out.
    
    Thank you for your cooperation.
    
    Best Regards,
    
    LinkUrCodes Team
    
    © ${currentYear} Link Ur Codes. All rights reserved.`

  return content
}



module.exports = {
  admStaffAddHTMLContent,
  admStaffAddTextContent,
  upcomingSessionOfflineHTMLContent,
  upcomingSessionOnlineHTMLContent,
  upcomingSessionRecordedHTMLContent,
  upcomingSessionClgStaffHTMLContent,
  upcomingSessionOfflineTextContent,
  upcomingSessionOnlineTextContent,
  upcomingSessionRecordedTextContent,
  upcomingSessionClgStaffTextContent,
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
  reschedulingSessionOfflineHTMLContent,
  reschedulingSessionOnlineHTMLContent,
  reschedulingSessionRecordedHTMLContent,
  reschedulingSessionClgStaffHTMLContent,
  reschedulingSessionOfflineTextContent,
  reschedulingSessionOnlineTextContent,
  reschedulingSessionRecordedTextContent,
  reschedulingSessionClgStaffTextContent,
  emailverifyStudentOTPHtmlContent,
  emailverifyStudentOTPTextContent
};

