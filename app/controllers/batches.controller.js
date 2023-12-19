const jwt = require("jsonwebtoken");
const Batches = require("../models/batches.model");


exports.batchCreate = (request, response) => {
    const batches = new Batches({
        collegeId: request.body.collegeId,
        batchName: request.body.batchName,
        regStartDate: request.body.regStartDate,
        regEndDate: request.body.regEndDate,
        batchDesc: request.body.batchDesc,
        batchAmount: request.body.batchAmount
    });

    const batchToken = request.body.batchToken;

    if (batches.batchName !== "" && batches.batchName !== null) {
        Batches.batchCreate(batches, (err,data) => {
            if (err) {
                response.json({ "status": err });
            } else {
                jwt.verify(batchToken, "lmsapp", (decoded, err) => {
                    if (decoded) {
                        response.json({ status: "success", "data": data });
                    } else {
                        response.json({ "status": "Unauthorized User!!" });
                    }
                });
            }
        });
    } else {
        response.json({ "status": "Content cannot be empty." });
    }
};


exports.batchDelete = (request, response) => {
    const deleteToken = request.body.token
    const batch = new Batches({
        'id' : request.body.id
    })
    Batches.batchDelete(batch, (err, data)=>{
        if (err) {
            if (err.kind === "not_found") {
                console.log({"status" : "Batch Not Found." })
            } else {
                response.json({"message" : "Error Deleting Batch."})
            }
        } else {
            jwt.verify(deleteToken, "lmsapp", (err, decoded)=>{
                if (decoded) {
                    response.json({"status" : "Batch Deleted."})
                } else {
                    response.json({"status" : "Unauthorized User!!"})
                }
            })
        }
    })
}

exports.batchView = (request, response) => {
    const batchToken = request.body.batchToken;
    jwt.verify(batchToken, "lmsapp", (decoded, err) => {
        if (decoded) {
            Batches.batchView((err, data) => {
                if (err) {
                    response.json({ "status": err });
                } else {
                    response.json({ status: "success", "data": data });
                }
            });
        } else {
            response.json({ "status": "Unauthorized User!!" });
        }
    });
}

// batch.controller.js

exports.batchUpdate = (request, response) => {
    const {
        id,
        collegeId,
        batchName,
        regStartDate,
        regEndDate,
        batchDesc,
        batchAmount,
        
    } = request.body;

    // Validation for batchName
    if (!batchName || batchName.trim() === "") {
        return response.json({ "status": "BatchName cannot be empty" });
    }

    // Validation for batchDesc
    if (!batchDesc || batchDesc.trim() === "") {
        return response.json({ "status": "BatchDesc cannot be empty" });
    }

    // Validation for batchAmount
    if (!batchAmount || isNaN(batchAmount) || batchAmount <= 0) {
        return response.json({ "status": "Invalid BatchAmount" });
    }

    const updatedBatch = new Batches({
        id: id,
        collegeId: collegeId,
        batchName: batchName,
        regStartDate: regStartDate,
        regEndDate: regEndDate,
        batchDesc: batchDesc,
        batchAmount: batchAmount
    });

    Batches.updateBatch(updatedBatch, (err, data) => {
        if (err) {
            response.json({ "status": err });
        } else {
            const batchToken =  request.body.token;
            jwt.verify(batchToken, "lmsapp", (decoded, err) => {
                if (decoded) {
                    response.json({ status: "Updated Batch Details", "data": data });
                } else {
                    response.json({ "status": "Unauthorized User!!" });
                }
            });
        }
    });
};

