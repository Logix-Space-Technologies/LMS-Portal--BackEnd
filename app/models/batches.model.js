const db = require('../models/db')
const { response } = require('express')

const Batches = function (batches) {
    this.id = batches.id;
    this.collegeId = batches.collegeId;
    this.batchName = batches.batchName;
    this.regStartDate = batches.regStartDate;
    this.regEndDate = batches.regEndDate;
    this.batchDesc = batches.batchDesc;
    this.batchAmount = batches.batchAmount;
}

Batches.batchCreate = (newBatch, result) => {
    // Check if the collegeId exists in the college table
    db.query("SELECT id FROM college WHERE id = ? AND deleteStatus = 0 AND isActive = 1", [newBatch.collegeId], (collegeErr, collegeRes) => {
        if (collegeErr) {
            console.log("error checking college: ", collegeErr);
            result(collegeErr, null);
            return;
        }
        if (collegeRes.length === 0) {
            console.log("College does not exist.");
            result("College does not exist.", null);
            return;
        }

        
            // Check if the batchName already exists for the same collegeId
            db.query("SELECT COUNT(*) as count FROM batches WHERE batchName LIKE ? AND collegeId = ?", [`batch%`, newBatch.collegeId], (err, res) => {
                if (err) {
                    console.log("error checking batchName: ", err);
                    result(err, null);
                    return;
                } else {
                    if (res[0].count > 0) {
                        console.log("Batch already exists for the same collegeId.");
                        result("Batch Name already exists for the same collegeId.", null);
                        return;
                    } else {
                        // Insert data into batches table
                        db.query("INSERT INTO batches SET ?", newBatch, (insertErr, insertRes) => {
                            if (insertErr) {
                                console.log("error inserting data: ", insertErr);
                                result(insertErr, null);
                                return;
                            } else {
                                console.log("Added Batches: ", { id: insertRes.insertId, ...newBatch });
                                result(null, { id: insertRes.insertId, ...newBatch });
                            }
                        });
                    }
                }
            });
        
    }
    );
};





Batches.batchDelete = (batchId, result) => {
    db.query("UPDATE batches SET isActive = 0, deleteStatus = 1 WHERE id = ?", [batchId.id], (err, res) => {
        if (err) {
            console.log("error : ", err)
            result(err, null)
            return
        }
        if (res.affectedRows === 0) {
            result({ kind: "not_found" }, null)
            return
        }

        console.log("Delete Batch with id : ", { id: batchId.id })
        result(null, { id: batchId.id })
    })
}

Batches.batchView = (result) => {
    db.query("SELECT c.collegeName, b.* FROM batches b JOIN college c ON b.collegeId = c.id  ", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null)
            return
        } else {
            console.log("Batches: ", res);
            result(null, res)
        }
    })
}

module.exports = Batches;