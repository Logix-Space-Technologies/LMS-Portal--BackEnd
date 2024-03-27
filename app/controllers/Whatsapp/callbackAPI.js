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
    res.status(200).send("Message received. Thank you!");
};

// Function to handle message-event types
function handleMessageEvent(data) {
    console.log('Handling message event:', data.payload);

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
    db.query("UPDATE whatsappmsgfeedback SET queuedStatus = 1 WHERE msgId = ?", [payload.payload.whatsappMessageId], (err) => {
        if (err) console.error('Error updating queuedStatus:', err);
    });
}

function handleSentMessage(payload) {
    console.log('Handling sent message:', payload);
    // Example: Update sentStatus for the message
    db.query("UPDATE whatsappmsgfeedback SET sentStatus = 1, sentDate = NOW() WHERE msgId = ?", [payload.id], (err) => {
        if (err) console.error('Error updating sentStatus:', err);
    });
}

function handleDeliveredMessage(payload) {
    console.log('Handling delivered message:', payload);
    // Example: Update deliveryStatus for the message
    db.query("UPDATE whatsappmsgfeedback SET deliveryStatus = 1, deliveryDate = NOW() WHERE msgId = ?", [payload.id], (err) => {
        if (err) console.error('Error updating deliveryStatus:', err);
    });
}

function handleReadMessage(payload) {
    console.log('Handling read message:', payload);
    // Example: Update readStatus for the message
    db.query("UPDATE whatsappmsgfeedback SET readStatus = 1, readDateTime = NOW() WHERE msgId = ?", [payload.id], (err) => {
        if (err) console.error('Error updating readStatus:', err);
    });
}

function handleBillingEvent(data) {
    console.log('Handling billing event:', data.payload);
    // Implement your logic for billing events here
}

function convertToMySQLTimestamp(timestamp) {
    // Create a Date object from the timestamp (assumed to be in milliseconds)
    const date = new Date(timestamp);
    // Format the date to MySQL TIMESTAMP format: YYYY-MM-DD HH:MM:SS
    const formatted = date.toISOString().slice(0, 19).replace('T', ' ');
    return formatted;
}

function handleMessageReceived(data) {
    console.log('Handling message received event:', data.payload);
    // Convert timestamp to MySQL TIMESTAMP format
    const mysqlTimestamp = convertToMySQLTimestamp(data.timestamp);

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