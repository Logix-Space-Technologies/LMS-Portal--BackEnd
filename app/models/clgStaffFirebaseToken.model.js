const db = require('../models/db')
const firebaseAdmin = require('firebase-admin')
const clgstafffirebasetokens= function (clgstafffirebasetokens) {
    this.clgStaffId = clgstafffirebasetokens.clgStaffId;
    this.firebaseToken = clgstafffirebasetokens.firebaseToken;

};

clgstafffirebasetokens.create = (newToken, result) => {
    db.query("SELECT * FROM clgstafffirebasetokens WHERE clgStaffId = ?", [newToken.clgStaffId], (err, res) => {
        if (err) {
            console.error("Error checking existing token: ", err);
            result(err, null);
            return;
        }
        if (res.length > 0) {
            console.log("Token already exists.");
            db.query("UPDATE clgstafffirebasetokens SET firebaseToken = ? WHERE clgStaffId = ?", [newToken.firebaseToken, newToken.clgStaffId], (err, res) => {
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
            db.query("INSERT INTO clgstafffirebasetokens SET ?", newToken, (err, res) => {
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


clgstafffirebasetokens.sendNotificationclgStaffId = (clgStaffId, payload, result) => {
    db.query("SELECT firebaseToken FROM clgstafffirebasetokens WHERE clgStaffId = ?", [clgStaffId], (err, res) => {
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

clgstafffirebasetokens.viewTokens = (result) => {
    db.query("SELECT * FROM clgstafffirebasetokens", (err, res) => {
        if (err) {
            console.error("Error fetching tokens: ", err);
            result(err, null);
            return;
        }
        console.log("Tokens fetched: ", res);
        result(null, res);
        return;
    })
}


module.exports = clgstafffirebasetokens;