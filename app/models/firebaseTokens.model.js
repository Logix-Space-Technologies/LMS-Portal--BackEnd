const db = require('../models/db')

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

module.exports = firebasetokens;