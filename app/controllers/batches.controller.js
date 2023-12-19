const jwt = require("jsonwebtoken");
const Batches = require("../models/batches.model");
const Validator = require("../config/data.validate")


exports.batchCreate = (request, response) => {

    const batchToken = request.body.batchToken;

    //checking validations
    const validationErrors = {};

    if (Validator.isEmpty(request.body.collegeId).isValid) {
        validationErrors.name = Validator.isEmpty(request.body.batchName).message;
    }

    if (Validator.isEmpty(request.body.batchName).isValid) {
        validationErrors.name = Validator.isEmpty(request.body.batchName).message;
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
    if (!Validator.isValidDate(request.body.regEndDate).isValid) {
        validationErrors.regenddate = Validator.isValidDate(request.body.regEndDate).message
    }

    if (Validator.isEmpty(request.body.batchDesc).isValid) {
        validationErrors.description = Validator.isEmpty(request.body.batchDesc).message
    }

    if (Validator.isEmpty(request.body.batchAmount).isValid) {
        validationErrors.amount = Validator.isEmpty(request.body.batchAmount).message
    }


    if (Object.keys(validationErrors).length > 0) {
        return response.json({ "status": "Validation failed", "data": validationErrors })
    }



    const batches = new Batches({
        collegeId: request.body.collegeId,
        batchName: request.body.batchName,
        regStartDate: request.body.regStartDate,
        regEndDate: request.body.regEndDate,
        batchDesc: request.body.batchDesc,
        batchAmount: request.body.batchAmount
    });


    Batches.batchCreate(batches, (err, data) => {
        if (err) {
            response.json({ "status": err });
        }
        jwt.verify(batchToken, "lmsapp", (decoded, err) => {
            if (decoded) {
                response.json({ status: "success", "data": data });
            } else {
                response.json({ "status": "Unauthorized User!!" });
            }
        });
    });

}



exports.batchDelete = (request, response) => {
    const deleteToken = request.body.token
    const batch = new Batches({
        'id': request.body.id
    })
    Batches.batchDelete(batch, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                console.log({ "status": "Batch Not Found." })
            } else {
                response.json({ "message": "Error Deleting Batch." })
            }
        } else {
            jwt.verify(deleteToken, "lmsapp", (err, decoded) => {
                if (decoded) {
                    response.json({ "status": "Batch Deleted." })
                } else {
                    response.json({ "status": "Unauthorized User!!" })
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
