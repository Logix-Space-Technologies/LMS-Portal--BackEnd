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

function handleMessageReceived(data) {
    console.log('Handling billing event:', data.payload);
    // Implement your logic for billing events here
}

module.exports = { callbackCheck };