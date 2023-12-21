const Tasks = require("../models/task.model");
const jwt = require("jsonwebtoken");
const multer = require("multer")
const path = require("path")




exports.createTask = (request, response) => {
    const taskToken = request.body.token;

    // Checking token validation
    jwt.verify(taskToken, "lmsapp", (tokenError, decoded) => {
        if (!decoded) {
            return response.json({ "status": "Unauthorized User!!" });
        }

        // Proceed with file upload and other logic after successful token verification
        upload(request, response, function (err) {
            if (err) {
                console.log("Error Uploading File: ", err)
                return response.json({ "status": err })
            }

            const { batchId, taskTitle, taskDesc, taskType, totalScore, dueDate } = request.body;
            const taskFileUpload = request.file ? request.file.filename : null;

            if (!batchId) {
                return response.json({ "status": "Batch Id cannot be empty." });
            }
    
            if (!taskTitle || taskTitle.trim() === "") {
                return response.json({ "status": "Task Title cannot be empty." });
            }
    
            if (!taskDesc || taskDesc.length > 100) {
                return response.json({ "status": "Task Description cannot be empty and should not exceed 100 characters." });
            }
    
            if (!taskType || taskType.trim() === "") {
                return response.json({ "status": "Task Type cannot be empty." });
            }
    
            if (!totalScore) {
                return response.json({ "status": "Total Score cannot be empty." });
            }
    
            if (!dueDate || !/^\d{2}\/\d{2}\/\d{4}$/.test(dueDate)) {
                return response.json({ "status": "Invalid Date Format. Please use DD/MM/YYYY." });
            }

            const addtask = new Tasks({
                batchId,
                taskTitle,
                taskDesc,
                taskType,
                taskFileUpload,
                totalScore,
                dueDate
            });

            Tasks.taskCreate(addtask, (err, data) => {
                if (err) {
                    return response.json({ "status": err });
                } else {
                    return response.json({ "status": "success", "data": data });
                }
            });
        });
    });
};
