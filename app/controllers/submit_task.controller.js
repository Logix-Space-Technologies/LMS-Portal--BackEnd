const jwt = require("jsonwebtoken")
const SubmitTask = require("../models/submit_task.model")
const firebasetokens = require("../models/firebaseTokens.model");

exports.evaluateTask = (request, response) => {
    evaluateToken=request.headers.token
    key=request.headers.key
    jwt.verify(evaluateToken, key, (error, decoded) => {
        if (decoded) {
            const { id, adminstaffId, evaluatorRemarks, score } = request.body;
            const validationErrors = {};

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
            console.log(submitTask)

            SubmitTask.evaluateTask(submitTask, (error, data) => {
                if (error) {
                    return response.json({ "status": error });
                } else {
                    const studentId=data.student_id;
                    const sessionName=data.sessionName;
                    const taskTitle=data.taskTitle;
                    firebasetokens.sendNotificationByStudId(studentId, { notification: { title: `${taskTitle} has been evaluated`, body: `Your task submitted for session ${sessionName} has been evaluated.` } }, (err, data) => {
                        if (err) {
                            return response.json({ "status": err });
                        }
                    });
                    return response.json({ "status": "Task evaluated successfully" });
                }
            });
        } else {
            return response.json({ "status": "Unauthorized access!!" });
        }
    });
};
  

exports.updateTaskScore = (request, response) => {
    const evaluateToken = request.headers.token;
    const key = request.headers.key;

    jwt.verify(evaluateToken, key, (error, decoded) => {
        if (decoded) {
            const id = request.body.id
            const adminstaffId = request.body.adminstaffId
            const newScore = request.body.score;
            const evaluatorRemarks = request.body.evaluatorRemarks
            const validationErrors = {};

            if (!newScore) {
                validationErrors.score = "Score cannot be empty";
            } else if (newScore < 0) {
                validationErrors.score = "Score cannot be less than 0";
            }

            if (Object.keys(validationErrors).length > 0) {
                return response.json({ "status": "Validation failed", "data": validationErrors });
            }

            const updateScore = new SubmitTask({
                id: id,
                adminstaffId: adminstaffId,
                score: newScore,
                evaluatorRemarks : evaluatorRemarks
            });

            SubmitTask.updateTaskScore(updateScore, (error, data) => {
                if (error) {
                    return response.json({ "status": error });
                } else {
                    const studentId = data.student_id;
                    const sessionName = data.sessionName;
                    const taskTitle = data.taskTitle;

                    return response.json({ "status": "Task score updated successfully" });
                }
            });
        } else {
            return response.json({ "status": "Unauthorized access!!" });
        }
    });
};