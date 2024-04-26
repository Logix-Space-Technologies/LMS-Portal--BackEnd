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



    db.query("UPDATE whatsappmsgfeedback SET queuedStatus = 1 WHERE msgId = ?", [payload.id], function (err, res) {
        if (err) {
            console.error('Error updating Queued status for msgId in whatsappmsgfeedback:', payload.id, '; Error:', err);
        } else if (res.affectedRows === 0) {
            db.query("UPDATE whatsappmsgfeedbackclgstaff SET queuedStatus = 1 WHERE msgId = ?", [payload.id], function (err, res) {
                if (err) {
                    console.error('Error updating Queued status for msgId in whatsappmsgfeedbackclgstaff:', payload.id, '; Error:', err);
                } else {
                    console.log('Queued status updated successfully for msgId in whatsappmsgfeedbackclgstaff:', payload.id);
                }
            })
        } else {
            console.log('Queued status updated successfully for msgId in whatsappmsgfeedback:', payload.id);
        }
    });
}

function handleSentMessage(payload) {
    // console.log('Handling sent message:', payload);
    // console.log('Handling sent message:', payload.gsId);

    function getCurrentTimeForGMT530() {
        // Get current UTC time in milliseconds
        const now = new Date();
        // Convert to GMT+5:30
        const offset = (5 * 60 + 30) * 60000; // 5 hours and 30 minutes in milliseconds
        const gmt530Time = new Date(now.getTime() + offset);
        // Format to MySQL datetime format
        return gmt530Time.toISOString().slice(0, 19).replace('T', ' ');
    }

    const mysqlTimestamp = getCurrentTimeForGMT530();



    db.query("UPDATE whatsappmsgfeedback SET sentStatus = 1, sentDate = ? WHERE msgId = ?", [mysqlTimestamp, payload.gsId], function (err, res) {
        if (err) {
            console.error('Error updating sent status for msgId in whatsappmsgfeedback:', payload.gsId, '; Error:', err);
        } else if (res.affectedRows === 0) {
            db.query("UPDATE whatsappmsgfeedbackclgstaff SET sentStatus = 1, sentDate = ? WHERE msgId = ?", [mysqlTimestamp, payload.gsId], function (err) {
                if (err) {
                    console.error('Error updating sent statsus for msgId in whatsappmsgfeedbackclgstaff:', payload.gsId, '; Error:', err);
                } else {
                    console.log('Sent status updated successfully for msgId in whatsappmsgfeedbackclgstaff:', payload.gsId);
                }
            });
        } else {
            console.log('Sent status updated successfully for msgId in whatsappmsgfeedback:', payload.gsId);
        }
    });

}

function handleDeliveredMessage(payload) {
    // console.log('Handling delivered message:', payload);
    //  console.log('Handling sent message:', payload.gsId);

    function getCurrentTimeForGMT530() {
        // Get current UTC time in milliseconds
        const now = new Date();
        // Convert to GMT+5:30
        const offset = (5 * 60 + 30) * 60000; // 5 hours and 30 minutes in milliseconds
        const gmt530Time = new Date(now.getTime() + offset);
        // Format to MySQL datetime format
        return gmt530Time.toISOString().slice(0, 19).replace('T', ' ');
    }

    const mysqlTimestamp = getCurrentTimeForGMT530();


    // Example: Update deliveryStatus for the message
    db.query("UPDATE whatsappmsgfeedback SET deliveryStatus = 1, deliveryDate = ? WHERE msgId = ?", [mysqlTimestamp, payload.gsId], function (err, res) {
        if (err) {
            console.error('Error updating deliveryStatus for msgId in whatsappmsgfeedback:', payload.gsId, '; Error:', err);
        } else if (res.affectedRows === 0) {
            db.query("UPDATE whatsappmsgfeedbackclgstaff SET deliveryStatus = 1, deliveryDate = ? WHERE msgId = ?", [mysqlTimestamp, payload.gsId], function (err) {
                if (err) {
                    console.error('Error updating deliveryStatus for msgId in whatsappmsgfeedbackclgstaff:', payload.gsId, '; Error:', err);
                } else {
                    console.log('Delivery status updated successfully for msgId in whatsappmsgfeedbackclgstaff:', payload.gsId);
                }
            });
        } else {
            console.log('Delivery status updated successfully for msgId in whatsappmsgfeedback:', payload.gsId);
        }
    });
}

function handleReadMessage(payload) {
    // console.log('Handling read message:', payload);
    // console.log('Handling sent message:', payload.gsId);

    // Example: Update readStatus for the message

    function getCurrentTimeForGMT530() {
        // Get current UTC time in milliseconds
        const now = new Date();
        // Convert to GMT+5:30
        const offset = (5 * 60 + 30) * 60000; // 5 hours and 30 minutes in milliseconds
        const gmt530Time = new Date(now.getTime() + offset);
        // Format to MySQL datetime format
        return gmt530Time.toISOString().slice(0, 19).replace('T', ' ');
    }

    const mysqlTimestamp = getCurrentTimeForGMT530();


    db.query("UPDATE whatsappmsgfeedback SET readStatus = 1, readDateTime = ? WHERE msgId = ?", [mysqlTimestamp, payload.gsId], function (err, res) {
        if (err) {
            console.error('Error updating read Status for msgId in whatsappmsgfeedback:', payload.gsId, '; Error:', err);
        } else if (res.affectedRows === 0) {
            db.query("UPDATE whatsappmsgfeedbackclgstaff SET readStatus = 1, readDateTime = ? WHERE msgId = ?", [mysqlTimestamp, payload.gsId], function (err) {
                if (err) {
                    console.error('Error updating read Status for msgId in whatsappmsgfeedbackclgstaff:', payload.gsId, '; Error:', err);
                } else {
                    console.log('Read status updated successfully for msgId in whatsappmsgfeedbackclgstaff:', payload.gsId);
                }
            });
        } else {
            console.log('Read status updated successfully for msgId in whatsappmsgfeedback:', payload.gsId);
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
    // console.log('iNSIDE  tIME STAMP ');

    // console.log("Original timestamp: ", timestamp);

    // Create a Date object from the timestamp
    const date = new Date(timestamp);

    // Calculate the timezone offset for GMT+5:30 (5 hours and 30 minutes)
    const offset = (5 * 60 + 30) * 60000; // Convert offset to milliseconds

    // Adjust the date for the timezone offset
    const adjustedDate = new Date(date.getTime() + offset - date.getTimezoneOffset() * 60000);

    // Format the date to MySQL TIMESTAMP format: YYYY-MM-DD HH:MM:SS
    const formatted = adjustedDate.toISOString().slice(0, 19).replace('T', ' ');
    console.log("Formatted for GMT+5:30 => ", formatted);

    return formatted;
}




function handleMessageReceived(data) {
    //console.log('tEST tIME STAMP ');

    //console.log('Handling message received event:', data.timestamp);
    // console.log("Before calling convertToMySQLTimestamp");

    // Convert timestamp to MySQL TIMESTAMP format
    const mysqlTimestamp = convertToMySQLTimestamp(data.timestamp);

    // console.log("formatted timestamp => ", mysqlTimestamp)
    // console.log(mysqlTimestamp)


    let studentPhno = data.payload.sender.phone.replace(/^\+91\s?|^\91\s?/, '');
    db.query("SELECT * FROM `student` WHERE `studPhNo` = ?", [studentPhno], (err, res) => {
        if (err) {
            console.error('Error updating readStatus:', err);
        } else if (res.length === 0) {
            let phNo = data.payload.sender.phone.replace(/^\+91\s?|^\91\s?/, '');
            db.query("SELECT * FROM `college_staff` WHERE `phNo` = ?", [phNo], (err, clgstaffres) => {
                if (err) {
                    console.error('Error updating readStatus:', err);
                } else {
                    let clgstaffId = clgstaffres[0].id;
                    // Use the converted timestamp
                    db.query("INSERT INTO `wtsappmsgreceivedfromclgstaff`(`messageId`, `clgstaffId`, `message`, `dateTime`) VALUES (?,?,?,?)", [data.payload.id, clgstaffId, data.payload.payload.text, mysqlTimestamp], (err) => {
                        if (err) console.error('Error updating readStatus:', err);
                    });
                    // Use the converted timestamp
                    db.query("INSERT INTO `wtsappmsgcommon`(`messageId`, `dateTime`, `name`, `phone`, `country_code`, `dial_code`, `text`) VALUES (?,?,?,?,?,?,?)", [data.payload.id, mysqlTimestamp, data.payload.sender.name, data.payload.sender.phone, data.payload.sender.country_code, data.payload.sender.dial_code, data.payload.payload.text], (err) => {
                        if (err) console.error('Error updating readStatus:', err);
                    });
                }
            });
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