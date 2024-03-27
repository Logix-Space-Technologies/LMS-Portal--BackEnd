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
        // Add more cases for different event types as needed
        default:
            console.log('Unhandled event type:', data.type);
    }

    // Respond to the request indicating successful processing
    // Set Content-Type header to text/plain to indicate a plain text response
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send("📢 Automated Message: Thank you for reaching out to us! 🙏\n\nPlease note: This is a no-reply service number, and we're unable to receive replies here. 🚫\n\nFor any inquiries or further assistance, kindly send us a message directly on WhatsApp at 📲 +919526674440.\n\nWe appreciate your understanding and look forward to assisting you! 💬");
};

// Function to handle message-event types
function handleMessageEvent(data) {
    console.log('Handling message event:', data.payload);

    // Assuming 'type' is directly under 'payload.type' based on provided JSON structure
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
    // Implement your logic for enqueued messages here
}

function handleSentMessage(payload) {
    console.log('Handling sent message:', payload);
    // Implement your logic for sent messages here
}

function handleDeliveredMessage(payload) {
    console.log('Handling delivered message:', payload);
    // Implement your logic for delivered messages here
}

function handleReadMessage(payload) {
    console.log('Handling read message:', payload);
    // Implement your logic for read messages here
}

// Function to handle billing-event types
function handleBillingEvent(data) {
    console.log('Handling billing event:', data.payload);
    // Implement your logic for billing events here
}


module.exports.sendfn = callbackCheck