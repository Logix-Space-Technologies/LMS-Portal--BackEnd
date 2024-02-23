const { response } = require("express")
const db = require("../models/db")
const bcrypt = require("bcrypt")

const CommunityManager = function (communityManager) {
    this.id = communityManager.id
    this.batchId = communityManager.batchId
    this.studentId = communityManager.studentId
}

CommunityManager.create = (newCommunityManager, result) => {
    db.query("SELECT COUNT(*) AS managerCount FROM communitymanagers WHERE batchId=?", newCommunityManager.batchId, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
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
