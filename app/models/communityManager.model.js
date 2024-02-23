const { response } = require("express")
const db = require("../models/db")
const bcrypt = require("bcrypt")

const CommunityManager = function (communityManager) {
    this.id = communityManager.id
    this.batchId = communityManager.batchId
    this.studentId = communityManager.studentId
}

CommunityManager.create = (newCommunityManager, result) => {
    // First, check if the record exists
    db.query("SELECT * FROM communitymanagers WHERE studentId = ? AND batchId = ?", [newCommunityManager.studentId, newCommunityManager.batchId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length > 0) {
            // If exists, update the deleteStatus and isActive
            const id = res[0].id; // Assuming 'id' is the primary key
            db.query("UPDATE communitymanagers SET deleteStatus = 0, isActive = 1 WHERE id = ?", [id], (updateErr, updateRes) => {
                if (updateErr) {
                    console.log("error updating community manager: ", updateErr);
                    result(updateErr, null);
                    return;
                }

                console.log("Updated Community Manager: ", { id: id, ...newCommunityManager });
                result(null, { id: id, ...newCommunityManager });
            });
        } else {
            // If not exists, insert the new record
            db.query("INSERT INTO communitymanagers SET ?", newCommunityManager, (insertErr, insertRes) => {
                if (insertErr) {
                    console.log("error inserting community manager: ", insertErr);
                    result(insertErr, null);
                    return;
                }

                console.log("Added Community Manager: ", { id: insertRes.insertId, ...newCommunityManager });
                result(null, { id: insertRes.insertId, ...newCommunityManager });
            });
        }
    });
};

CommunityManager.delete = (id, result) => {
    db.query(
        "UPDATE communitymanagers SET deleteStatus = 1, isActive = 0 WHERE id = ? AND deleteStatus = 0 AND isActive = 1 ",
        [id],
        (err, res) => {
            console.log(id)
            if (err) {
                console.log("error deleting community manager: ", err);
                result(err, null);
                return;
            }
            console.log("Deleted Community Manager with id: ", id);
            result(null, null);
        }
    );
};



module.exports = CommunityManager;
