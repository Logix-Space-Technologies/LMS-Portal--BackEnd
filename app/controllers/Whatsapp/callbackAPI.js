const db = require('../../models/db');

// Function to handle incoming message events
const callbackCheck = (req, res) => {
    const data = req.body;
    console.log('Received event:', data.type);

    switch (data.type) {
        case 'message-event':
            handleMessageEvent(data);
            break;
        case 'billing-event':
            handleBillingEvent(data);
            break;
        case 'message':
            handleMessageReceived(data);
        // Add more cases for different event types as needed
        default:
            console.log('Unhandled event type:', data.type);
    }

    // Respond to the request indicating successful processing
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send("📢 Automated Message: Thank you for reaching out to us! 🙏\n\nPlease note: This is a no-reply service number, and we're unable to receive replies here. 🚫\n\nFor any inquiries or further assistance, kindly send us a message directly on WhatsApp at 📲 +919526674440.\n\nWe appreciate your understanding and look forward to assisting you! 💬");
};

// Function to handle message-event types
function handleMessageEvent(data) {
   // console.log('Handling message event:', data.payload);

    const messageType = data.payload.type;

    switch (messageType) {
        case 'enqueued':
            handleEnqueuedMessage(data.payload);
            break;
        case 'sent':
            handleSentMessage(data.payload);
            break;
        case 'delivered':
            handleDeliveredMessage(data.payload);
            break;
        case 'read':
            handleReadMessage(data.payload);
            break;
        default:
            console.log('Unhandled message type:', messageType);
    }
}

function handleEnqueuedMessage(payload) {
    console.log('Handling enqueued message:', payload);
    // Example: Update queuedStatus for the message in whatsappmsgfeedback
   


    db.query("UPDATE whatsappmsgfeedback SET queuedStatus = 1 WHERE msgId = ?", [payload.id], function(err) {
        if (err) {
            console.error('Error updating Queued status for msgId:', payload.id, '; Error:', err);
        } else {
            console.log('Queued status updated successfully for msgId:', payload.id);
        }
    });
}

function handleSentMessage(payload) {
    // console.log('Handling sent message:', payload);
   // console.log('Handling sent message:', payload.gsId);


    db.query("UPDATE whatsappmsgfeedback SET sentStatus = 1, sentDate = NOW() WHERE msgId = ?", [payload.gsId], function(err) {
        if (err) {
            console.error('Error updating sent statsus for msgId:', payload.gsId, '; Error:', err);
        } else {
            console.log('Sent status updated successfully for msgId:', payload.gsId);
        }
    });
   
}

function handleDeliveredMessage(payload) {
   // console.log('Handling delivered message:', payload);
  //  console.log('Handling sent message:', payload.gsId);

    // Example: Update deliveryStatus for the message
    db.query("UPDATE whatsappmsgfeedback SET deliveryStatus = 1, deliveryDate = NOW() WHERE msgId = ?", [payload.gsId], function(err) {
        if (err) {
            console.error('Error updating deliveryStatus for msgId:', payload.gsId, '; Error:', err);
        } else {
            console.log('Delivery status updated successfully for msgId:', payload.gsId);
        }
    });
}

function handleReadMessage(payload) {
   // console.log('Handling read message:', payload);
   // console.log('Handling sent message:', payload.gsId);

    // Example: Update readStatus for the message
 

    db.query("UPDATE whatsappmsgfeedback SET readStatus = 1, readDateTime = NOW() WHERE msgId = ?", [payload.gsId], function(err) {
        if (err) {
            console.error('Error updating read Status for msgId:', payload.gsId, '; Error:', err);
        } else {
            console.log('Read status updated successfully for msgId:', payload.gsId);
        }
    });


}

function handleBillingEvent(data) {
    console.log('Handling billing event:', data.payload);
    // Implement your logic for billing events here
}

// function convertToMySQLTimestamp(timestamp) {
//     // Create a Date object from the timestamp (assumed to be in milliseconds)
//     const date = new Date(timestamp);
//     // Format the date to MySQL TIMESTAMP format: YYYY-MM-DD HH:MM:SS
//     const formatted = date.toISOString().slice(0, 19).replace('T', ' ');
//     return formatted;
// }
function convertToMySQLTimestamp(timestamp) {
    console.log("Original timestamp: " + timestamp);

    // Create a Date object from the timestamp
    const date = new Date(timestamp);

    // Calculate the timezone offset for GMT+5:30 (5 hours and 30 minutes)
    const offset = (5 * 60 + 30) * 60000; // Convert offset to milliseconds

    // Adjust the date for the timezone offset
    const adjustedDate = new Date(date.getTime() + offset - date.getTimezoneOffset() * 60000);

    // Format the date to MySQL TIMESTAMP format: YYYY-MM-DD HH:MM:SS
    const formatted = adjustedDate.toISOString().slice(0, 19).replace('T', ' ');
    console.log("Formatted for GMT+5:30 => " + formatted);

    return formatted;
}




function handleMessageReceived(data) {
    console.log('Handling message received event:', data.payload);
    // Convert timestamp to MySQL TIMESTAMP format
    const mysqlTimestamp = convertToMySQLTimestamp(data.timestamp);

    console.log("formatted timestamp => "+ mysqlTimestamp)
    console.log(mysqlTimestamp)


    let studentPhno = data.payload.sender.phone.replace(/^\+91\s?|^\91\s?/, '');
    db.query("SELECT * FROM `student` WHERE `studPhNo` = ?", [studentPhno], (err, res) => {
        if (err) {
            console.error('Error updating readStatus:', err);
        } else {
            let studId = res[0].id;
            // Use the converted timestamp
            db.query("INSERT INTO `wtsappmsgreceivedfromstudent`(`messageId`, `studId`, `message`, `dateTime`) VALUES (?,?,?,?)", [data.payload.id, studId, data.payload.payload.text, mysqlTimestamp], (err) => {
                if (err) console.error('Error updating readStatus:', err);
            });
            // Use the converted timestamp
            db.query("INSERT INTO `wtsappmsgcommon`(`messageId`, `dateTime`, `name`, `phone`, `country_code`, `dial_code`, `text`) VALUES (?,?,?,?,?,?,?)", [data.payload.id, mysqlTimestamp, data.payload.sender.name, data.payload.sender.phone, data.payload.sender.country_code, data.payload.sender.dial_code, data.payload.payload.text], (err) => {
                if (err) console.error('Error updating readStatus:', err);
            });
        }
    });
}




module.exports.sendfn = callbackCheck;