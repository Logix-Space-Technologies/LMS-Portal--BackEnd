const db = require('../models/db')
const { response } = require('express')

const Batches = function (batches) {
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

Batches.searchBatch = (search, result) => {
    const searchTerm = '%' + search + '%';
    db.query(
        "SELECT c.collegeName, b.* FROM batches b JOIN college c ON b.collegeId = c.id WHERE b.batchName LIKE ? OR c.collegeName LIKE ? OR b.batchDesc LIKE ?",
        [searchTerm, searchTerm, searchTerm], (err, res) => {
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