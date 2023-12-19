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

Batches.batchCreate = (newBatch, result) =>{
    if (newBatch.batchName !=="" && newBatch.batchName !== null) {
        db.query("SELECT * FROM batches WHERE batchName=? AND collegeId=?", [newBatch.batchName, newBatch.collegeId], (err, res) => {
            if(err) {
                console.log("error: ", err);
                result(err, null);
                return;
            } else {
                if (res.length > 0) {
                    console.log("Batch already exists.");
                    result("Batch Name already exists.", null)
                    return
                } else {
                    db.query("INSERT INTO batches SET ?", newBatch, (err, res)=>{
                        if (err) {
                            console.log("error: ", err);
                            result(null, err);
                            return;
                        } else {
                            console.log("Added Batches: ", { id: res.id, ...newBatch})
                            result(null, { id: res.id, ...newBatch})
                        }
                    })
                }
            }
        })
    } else {
        result(null, {"status": "Content cannot be empty"})
    }
}


Batches.batchDelete = (batchId, result) => {
    db.query("UPDATE batches SET isActive = 0, deleteStatus = 1 WHERE id = ?", [batchId.id], (err,res) => {
        if (err) {
            console.log("error : ", err)
            result(err, null)
            return
        }
        if(res.affectedRows === 0){
            result({ kind: "not_found"}, null)
            return
        }

        console.log("Delete Batch with id : ", {id : batchId.id})
        result(null, {id : batchId.id})
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

