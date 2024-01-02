const jwt = require("jsonwebtoken")
const SubmitTask = require("../models/submit_task.model")
const { request, response } = require("express");

exports.evaluateTask = (request, response) => {
    evaluateToken=request.body.token
    jwt.verify(evaluateToken, "lmsappone", (error, decoded) => {
        if (decoded) {
            const { id, adminstaffId, evaluatorRemarks, score } = request.body;
            const validationErrors = {};

            if (!id) {
                validationErrors.id = "Task ID cannot be empty";
            }

            if (!adminstaffId) {
                validationErrors.adminstaffId = "Admin Staff ID cannot be empty";
            }

            if (!score) {
                validationErrors.score = "Score cannot be empty";
            } else if (score < 0) {
                validationErrors.score = "Score cannot be less than 0";
            }

            if (Object.keys(validationErrors).length > 0) {
                return response.json({ "status": "Validation failed", "data": validationErrors });
            }

            const submitTask = new SubmitTask({
                id: id,
                adminstaffId: adminstaffId,
                evaluatorRemarks: evaluatorRemarks,
                score: score
            });

            SubmitTask.evaluateTask(submitTask, (error, data) => {
                if (error) {
                    return response.json({ "status": "Failed", message: error });
                } else {
                    return response.json({ "status": "Success", message: "Task evaluated successfully" });
                }
            });
        } else {
            return response.json({ "status": "Unauthorized access!!" });
        }
    });
};
  