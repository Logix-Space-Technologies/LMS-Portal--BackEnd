const jwt = require("jsonwebtoken");
const Batches = require("../models/batches.model");
const { request, response } = require("express");

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
