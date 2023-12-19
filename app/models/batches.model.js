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
    db.query("SELECT * FROM college WHERE id = ? AND deleteStatus = 0 AND isActive = 1", [newBatch.collegeId], (collegeErr, collegeRes) => {
            if (collegeErr) {
                console.log("error checking college: ", collegeErr);
                result(collegeErr, null);
                return;
            } else if (collegeRes.length === 0) {
                console.log("College does not exist.");
                result("College does not exist.", null);
                return;
            }

            // Check if all records in college satisfy the conditions deleteStatus = 0 and isActive = 1
            const isValidCollege = collegeRes.every(record => record.deleteStatus === 0 && record.isActive === 1);

            if (isValidCollege) {
                // Check if the batchName already exists for the same collegeId
                db.query("SELECT COUNT(*) as count FROM batches WHERE batchName LIKE ? AND collegeId = ?",[newBatch.batchName,newBatch.collegeId],
                    (err, res) => {
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
                    }
                );
            } else {
                console.log("Cannot insert data. College is inactive or deleted.");
                result("Cannot insert data. College is inactive or deleted.", null);
                return;
            }
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
    db.query("SELECT c.collegeName, b.* FROM batches b JOIN college c ON b.collegeId = c.id WHERE b.deleteStatus=0 AND b.isActive= 1;", (err, res) => {
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


Batches.searchBatch = (search, result) => {
    const searchTerm = '%' + search + '%';
    db.query(
        "SELECT c.collegeName, b.* FROM batches b JOIN college c ON b.collegeId = c.id WHERE b.deleteStatus = 0 AND b.isActive = 1 AND (b.batchName LIKE ? OR c.collegeName LIKE ? OR b.batchDesc LIKE ?)",
        [searchTerm, searchTerm, searchTerm],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            } else {
                console.log("Batches: ", res);
                result(null, res);
            }
        }
    );
};

Batches.updateBatch = (updatedBatch, result) => {
    db.query(
        "SELECT * FROM college WHERE id = ? AND deleteStatus=0 AND isActive=1",
        [updatedBatch.collegeId],
        (collegeErr, collegeRes) => {
            if (collegeErr) {
                console.log("error checking college: ", collegeErr);
                result(collegeErr, null);
                return;
            }
            
            if (collegeRes.length === 0) {
                result("College not found", null);
                return;
            }

            
            db.query(
                "UPDATE batches SET collegeId = ?, batchName = ?, regStartDate = ?, regEndDate = ?, batchDesc = ?, batchAmount = ?, updatedDate = CURRENT_DATE() WHERE id = ?",
                [
                    updatedBatch.collegeId,
                    updatedBatch.batchName,
                    updatedBatch.regStartDate,
                    updatedBatch.regEndDate,
                    updatedBatch.batchDesc,
                    updatedBatch.batchAmount,
                    updatedBatch.id
                ],
                (err, res) => {
                    if (err) {
                        console.log("error: ", err);
                        result(err, null);
                        return;
                    }
                    if (res.affectedRows == 0) {
                        result({ kind: "not_found" }, null);
                        return;
                    }
                    console.log("Updated Batch details: ", { id: updatedBatch.id, ...updatedBatch });
                    result(null, { id: updatedBatch.id, ...updatedBatch });
                }
            );
        }
    );
};


module.exports = Batches;

