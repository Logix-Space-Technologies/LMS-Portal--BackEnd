const callbackCheck = (req, res) => {

    // Handle Requests
    let data = req.body
    //Parse Data and store to Db
    // Set Content-Type header to text/plain to indicate a plain text response
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send("📢 Automated Message: Thank you for reaching out to us! 🙏\n\nPlease note: This is a no-reply service number, and we're unable to receive replies here. 🚫\n\nFor any inquiries or further assistance, kindly send us a message directly on WhatsApp at 📲 +919526674440.\n\nWe appreciate your understanding and look forward to assisting you! 💬");
};


module.exports.sendfn = callbackCheck