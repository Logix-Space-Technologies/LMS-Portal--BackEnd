const db = require('../models/db')
const firebaseAdmin = require('firebase-admin')
const firebasetokens= function (firebasetokens) {
    this.studId = firebasetokens.studId;
    this.firebaseToken = firebasetokens.firebaseToken;

};

firebasetokens.create = (newToken, result) => {
    db.query("SELECT * FROM firebaseTokens WHERE studId = ?", [newToken.studId], (err, res) => {
        if (err) {
            console.error("Error checking existing token: ", err);
            result(err, null);
            return;
        }
        if (res.length > 0) {
            console.log("Token already exists.");
            db.query("UPDATE firebaseTokens SET firebaseToken = ? WHERE studId = ?", [newToken.firebaseToken, newToken.studId], (err, res) => {
                if (err) {
                    console.error("Error updating token: ", err);
                    result(err, null);
                    return;
                } else {
                    console.log("Token updated: ", { ...newToken });
                    result(null, { ...newToken });
                    return;

                }
            })
        } else {
            //Insert new token
            db.query("INSERT INTO firebaseTokens SET ?", newToken, (err, res) => {
                if (err) {
                    console.error("Error inserting token: ", err);
                    result(err, null);
                    return;
                } else {
                    console.log("Token inserted: ", { ...newToken });
                    result(null, { ...newToken });
                    return;

                }
            })

        }
    })
}


firebasetokens.sendNotificationByStudId = (studId, payload, result) => {
    db.query("SELECT firebaseToken FROM firebaseTokens WHERE studId = ?", [studId], (err, res) => {
        if (err) {
            console.error("Error fetching token: ", err);
            result(err, null);
            return;
        }
        if (res.length > 0) {
            const token = res[0].firebaseToken;
            console.log("Token fetched: ", token);
            firebaseAdmin.messaging().sendToDevice(token, payload)
                .then((sendResponse) => {
                    console.log('Notification sent successfully:', sendResponse);
                    result(null, { status: "success", data: 'Notification sent successfully' });
                    return;
                })
                .catch((error) => {
                    console.error('Error sending notification:', error);
                    result(null, { status: "failed", data: 'Failed to send notification', error: error });
                    return;
                });
        } else {
            console.log("Token not found.");
            result(null, { status: "failed", data: 'Token not found' });
            return;
        }
    })
}


module.exports = firebasetokens;