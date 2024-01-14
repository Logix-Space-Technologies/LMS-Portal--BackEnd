const jwt = require("jsonwebtoken");
const Batches = require("../models/batches.model");
const Validator = require("../config/data.validate")
const { AdminStaffLog, logAdminStaff } = require("../models/adminStaffLog.model")

exports.batchCreate = (request, response) => {

    const batchToken = request.headers.token;
    key = request.headers.key

    jwt.verify(batchToken, key, (err, decoded) => {
        if (decoded) {
            //checking validations
            const validationErrors = {};

            if (Validator.isEmpty(request.body.collegeId).isValid) {
                validationErrors.value = Validator.isEmpty(request.body.collegeId).message;
            }
            if (!Validator.isValidAmount(request.body.collegeId).isValid) {
                validationErrors.collegeid = Validator.isValidAmount(request.body.collegeId).message; //validation for college id
            }
            if (!Validator.isValidName(request.body.batchName).isValid) {
                validationErrors.name = Validator.isValidName(request.body.batchName).message
            }

            if (Validator.isEmpty(request.body.regStartDate).isValid) {
                validationErrors.regstartdate = Validator.isEmpty(request.body.regStartDate).message;
            }
            if (!Validator.isValidDate(request.body.regStartDate).isValid) {
                validationErrors.regstartdate = Validator.isValidDate(request.body.regStartDate).message
            }

            if (Validator.isEmpty(request.body.regEndDate).isValid) {
                validationErrors.regenddate = Validator.isEmpty(request.body.regEndDate).message
            }
            if (!Validator.isDate1GreaterThanDate2(request.body.regStartDate, request.body.regEndDate).isValid) {
                validationErrors.regenddate = Validator.isDate1GreaterThanDate2(request.body.regStartDate, request.body.regEndDate).message
            }
            if (!Validator.isValidDate(request.body.regEndDate).isValid) {
                validationErrors.regenddate = Validator.isValidDate(request.body.regEndDate).message
            }

            if (Validator.isEmpty(request.body.batchDesc).isValid) {
                validationErrors.description = Validator.isEmpty(request.body.batchDesc).message
            }

            if (!Validator.isValidAmount(request.body.batchAmount).isValid) {
                validationErrors.amount = Validator.isValidAmount(request.body.batchAmount).message
            }


            if (Object.keys(validationErrors).length > 0) {
                return response.json({ "status": "Validation failed", "data": validationErrors })
            }



            const batches = new Batches({
                collegeId: request.body.collegeId,
                batchName: request.body.batchName,
                regStartDate: request.body.regStartDate.split('/').reverse().join('-'),
                regEndDate: request.body.regEndDate.split('/').reverse().join('-'),
                batchDesc: request.body.batchDesc,
                batchAmount: request.body.batchAmount
            });


            Batches.batchCreate(batches, (err, data) => {
                if (err) {
                    return response.json({ "status": err });
                } else {
                    if (key == "lmsapp") {
                        logAdminStaff(0, "Admin Created Batch")
                    }
                    return response.json({ "status": "success", "data": data });
                }
            });
        } else {
            return response.json({ "status": "Unauthorized User!!" });
        }
    });
}


exports.batchDelete = (request, response) => {
    const deleteToken = request.headers.token
    jwt.verify(deleteToken, "lmsapp", (err, decoded) => {
        if (decoded) {
            const batch = new Batches({
                'id': request.body.id
            })
            Batches.batchDelete(batch, (err, data) => {
                if (err) {
                    if (err.kind === "not_found") {
                        console.log({ "status": "Batch Not Found." })
                        response.json({ "status": "Batch Not Found." })
                    } else {
                        response.json({ "status": "Error Deleting Batch." })
                    }
                } else {
                    logAdminStaff(0, "Admin Deleted Batch")
                    response.json({ "status": "Batch Deleted." })
                }
            })
        } else {
            response.json({ "status": "Unauthorized User!!" })
        }
    })
}



exports.batchView = (request, response) => {
    const batchToken = request.headers.token;
    key = request.headers.key // key for respective tokens
    jwt.verify(batchToken, key, (err, decoded) => {
        if (decoded) {
            Batches.batchView((err, data) => {
                if (err) {
                    response.json({ "status": err });
                }
                if (data.length == 0) {
                    response.json({ "status": "No batches found!" });
                }
                else {
                    response.json({ "status": "success", "data": data });
                }
            });
        } else {
            response.json({ "status": "Unauthorized User!!" });
        }
    });
}


exports.searchBatch = (request, response) => {
    const batchQuery = request.headers.batchQuery;
    const batchToken = request.headers.token;
    //key for respective token
    key = request.headers.key;

    jwt.verify(batchToken, key, (err, decoded) => {
        if (!batchQuery) {
            return response.json({ "status": "Search query cannot be empty" })
        }
        if (decoded) {
            Batches.searchBatch(batchQuery, (err, data) => {
                if (err) {
                    response.json({ "status": err });
                } else {
                    if (data.length === 0) {
                        response.json({ "status": "No search items found." });
                    } else {
                        response.json({ "status": "success", "data": data });
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

    const batchUpdateToken = request.headers.token;
    console.log(batchUpdateToken)
    key = request.headers.key
    jwt.verify(batchUpdateToken, key, (err, decoded) => {
        if (decoded) {

            const validationErrors = {};


            if (!Validator.isValidName(batchName).isValid) {
                validationErrors.batchName = Validator.isValidName(batchName).message;
            }

            if (!Validator.isDateGreaterThanToday(regStartDate).isValid) {
                validationErrors.regStartDate = Validator.isDateGreaterThanToday(regStartDate).message;
            }
            if (!Validator.isDate1GreaterThanDate2(regStartDate, regEndDate).isValid) {
                validationErrors.regenddate = Validator.isDate1GreaterThanDate2(regStartDate, regEndDate).message
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
                regStartDate: regStartDate.split('/').reverse().join('-'),
                regEndDate: regEndDate.split('/').reverse().join('-'),
                batchDesc: batchDesc,
                batchAmount: batchAmount
            });

            Batches.updateBatch(updatedBatch, (err, data) => {
                if (err) {
                    if (err.kind === "not_found") {
                        return response.json({ "status": "Batch with provided Id is not found." });
                    } else {
                        return response.json({ "status": err });
                    }

                } else {
                    if (key == "lmsapp") {
                        logAdminStaff(0, "Admin Updated Batch")
                    }
                    response.json({ "status": "Updated Batch Details", "data": data });
                }
            });
        } else {
            response.json({ "status": "Unauthorized User!!" });
        }
    });
};

