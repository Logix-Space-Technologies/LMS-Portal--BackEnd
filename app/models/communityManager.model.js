const { response } = require("express")
const db = require("../models/db")
const bcrypt = require("bcrypt")

const CommunityManager = function (communityManager) {
    this.id = communityManager.id
    this.batchId = communityManager.batchId
    this.studentId = communityManager.studentId
}

CommunityManager.create = (newCommunityManager, result) => {
    db.query("SELECT * FROM communitymanagers WHERE batchId=? LIMIT 1", newCommunityManager.batchId, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        } else {
            if (res.length > 0) {
                console.log("Community Manager already exists for batchId: ", newCommunityManager.batchId);
                result("Community Manager already exists for the batch", null);
                return;
            } else {
                db.query("INSERT INTO communitymanagers SET ?", newCommunityManager, (err, res) => {
                    if (err) {
                        console.log("error inserting community manager: ", err);
                        result(err, null);
                        return;
                    }

                    console.log("Added Community Manager: ", { id: res.insertId, ...newCommunityManager });
                    result(null, { id: res.insertId, ...newCommunityManager });
                });
            }
        }
    });
};

module.exports = CommunityManager;
