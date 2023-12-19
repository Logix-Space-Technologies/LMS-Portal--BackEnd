const jwt = require("jsonwebtoken");
const Batches = require("../models/batches.model");
const Validator = require("../config/data.validate")


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
                } 
                if(data.length == 0) {
                    response.json({ status: "No batches found!" });
                }
                else {
                    response.json({ status: "success", "data": data });
                }
            });
        } else {
            response.json({ "status": "Unauthorized User!!" });
        }
    });
}


exports.searchBatch = (request, response) => {
    const batchQuery = request.body.batchQuery;
    const batchToken = request.body.batchToken;

    jwt.verify(batchToken, "lmsapp", (decoded, err) => {
        if (decoded) {
            Batches.searchBatch(batchQuery, (err, data) => {
                if (err) {
                    response.json({ "status": err });
                } else {
                    if (data.length === 0) {
                        response.json({ status:"No search items found." });
                    } else {
                        response.json({ status: "success", "data": data });
                    }
                }
            });
        } else {
            response.json({ "status": "Unauthorized User!!" });
        }
    });
}

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

    const validationErrors = {};

    if (!Validator.isValidName(batchName).isValid) {
        validationErrors.batchName = Validator.isValidName(batchName).message;
    }

    if (!Validator.isDateGreaterThanToday(regStartDate).isValid) {
        validationErrors.regStartDate = Validator.isDateGreaterThanToday(regStartDate).message;
    }
    
    if (!Validator.isDateGreaterThanToday(regEndDate).isValid) {
        validationErrors.regEndDate = Validator.isDateGreaterThanToday(regEndDate).message;
    }

    if (Validator.isEmpty(batchDesc).isValid) {
        validationErrors.batchDesc = Validator.isEmpty(batchDesc).message;
    }

    if (!Validator.isValidAmount(batchAmount).isValid) {
        validationErrors.batchAmount = Validator.isValidAmount(batchAmount).message;
    }

    if (Object.keys(validationErrors).length > 0) {
        return response.json({ "status": "Validation Failed", "data": validationErrors });
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
            const batchToken = request.body.token;
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

