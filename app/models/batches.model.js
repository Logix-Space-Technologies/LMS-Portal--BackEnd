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
                    result("Batch Name already exists", null)
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

module.exports = Batches;