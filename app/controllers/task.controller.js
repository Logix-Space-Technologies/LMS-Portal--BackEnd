const Tasks = require("../models/task.model");
const jwt = require("jsonwebtoken");
const path = require("path")
const { request, response } = require("express");
const multer = require("multer")
const Validator = require("../config/data.validate");
const { log } = require("console");



// multer setup for file uploads
const storage = multer.diskStorage({
    destination: (request, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (request, file, cb) => {
        cb(null, Date.now() + file.originalname.replace(/[^\w\-.]/g, ''));
    },
});

const upload = multer({ storage: storage }).single('taskFileUpload');

exports.createTask = (request, response) => {
    const taskCreateToken = request.body.token;
    console.log(taskCreateToken)

    jwt.verify(taskCreateToken, "lmsapp", (err, decoded) => {
        if (decoded) {
            // File upload
            upload(request, response, function (uploadErr) {
                if (uploadErr) {
                    console.log("Error Uploading File: ", uploadErr);
                    return response.json({ "status": uploadErr });
                }
          
                const validationErrors = {};
                const { batchId, taskTitle, taskDesc, taskType, totalScore, dueDate } = request.body;
       
                if (Validator.isEmpty(batchId).isValid) {
                    validationErrors.batchId = Validator.isEmpty(batchId).message;
                }
    
                if (Validator.isEmpty(taskTitle).isValid) {
                    validationErrors.taskTitle = "Task Title cannot be empty.";
                }
    
                if (Validator.isEmpty(taskDesc).isValid) {
                    validationErrors.taskDesc = "Task Description cannot be empty and should not exceed 100 characters.";
                }
    
                if (Validator.isEmpty(taskType).isValid) {
                    validationErrors.taskType = "Task Type cannot be empty.";
                }
    
                if (Validator.isEmpty(totalScore).isValid) {
                    validationErrors.totalScore = "Total Score cannot be empty.";
                }
    
                if (Validator.isEmpty(dueDate).isValid) {
                    validationErrors.dueDate = "Invalid Date Format. Please use DD/MM/YYYY.";
                }

                if (Object.keys(validationErrors).length > 0) {
                    return response.json({ "status": "Validation failed", "data": validationErrors });
                }

                const taskFileUpload = request.file ? request.file.filename : null;

                // Creating a new task
                const addtask = new Tasks({
                    batchId,
                    taskTitle,
                    taskDesc,
                    taskType,
                    taskFileUpload,
                    totalScore,
                    dueDate
                });

                // Saving the task
                Tasks.taskCreate(addtask, (err, data) => {
                    if (err) {
                        return response.json({ "status": err });
                    } else {
                        return response.json({ "status": "success", "data": data });
                    }
                });
            });
        } else {
            return response.json({ "status": "Unauthorized User!!" });
        }
    });
};




exports.taskDelete = (request, response) => {
    const deleteToken = request.body.token
    const task = new Tasks({
        'id': request.body.id
    });

    // Verify JWT token
    jwt.verify(deleteToken, "lmsapp", (err, decoded) => {
        if (!decoded) {
            return response.json({ "status": "Unauthorized User!!" });
        }

        // Task deletion
        Tasks.taskDelete(task, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    console.log("Task is not found");
                    return response.json({ status: "Task is not found" });
                } else {
                    return response.json({ status: "Error deleting task" });
                }
            } else {
                return response.json({ "status": "Task Deleted." });
            }
        });
    });
};



exports.taskUpdate = (request, response) => {
    upload(request, response, function (err) {
        if (err) {
            console.error("Error uploading file:", err);
            return response.json({ "status": err });
        }

        const { batchId, taskTitle, taskDesc, taskType, totalScore, dueDate } = request.body;

        const updateTasktoken = request.body.token;
        console.log(updateTasktoken)

        jwt.verify(updateTasktoken, "lmsapp", (error, decoded) => {
            if (decoded) {

                const validationErrors = {};

                if (Validator.isEmpty(batchId).isValid) {
                    validationErrors.value = Validator.isEmpty(batchId).message;
                }
                if (!Validator.isValidAmount(batchId).isValid) {
                    validationErrors.amount = Validator.isValidAmount(batchId).message; //validation for batch id
                }
                if (!Validator.isValidName(taskTitle).isValid) {
                    validationErrors.name = Validator.isValidName(taskTitle).message;
                }

                if (!Validator.isValidAddress(taskDesc).isValid) {
                    validationErrors.address = Validator.isValidAddress(taskDesc).message; //validation for task description.
                }

                if (!Validator.isValidName(taskType).isValid) {
                    validationErrors.name = Validator.isValidName(taskType).message; //validation for task type
                }

                if (!Validator.isValidAmount(totalScore).isValid) {
                    validationErrors.amount = Validator.isValidAmount(totalScore).message; //validation for total score
                }

                if (!Validator.isValidDate(dueDate).isValid) {
                    validationErrors.date = Validator.isValidDate(dueDate).message; //validation for date
                }


                if (!Validator.isDateGreaterThanToday(dueDate).isValid) {
                    validationErrors.date = Validator.isDateGreaterThanToday(dueDate).message; //validation for date
                }


                if (request.file && !Validator.isValidFile(request.file).isValid) {
                    validationErrors.image = Validator.isValidFile(request.file).message;
                }

                // If validation fails
                if (Object.keys(validationErrors).length > 0) {
                    return response.json({ "status": "Validation failed", "data": validationErrors });
                }



                const taskFileUpload = request.file ? request.file.filename : null;

                const task = new Tasks({
                    'id': request.body.id,
                    batchId: batchId,
                    taskTitle: taskTitle,
                    taskDesc: taskDesc,
                    taskType: taskType,
                    taskFileUpload: taskFileUpload,
                    totalScore: totalScore,
                    dueDate: dueDate
                });

                Tasks.updateTask(task, (err, data) => {
                    if (err) {
                        if (err.kind === "not_found") {
                            return response.json({ "status": "Task with provided Id is not found." });
                        } else {
                            return response.json({ "status": err });
                        }
                    } else {
                        return response.json({ "status": "success", "data": data });
                    }
                });
            } else {
                return response.json({ "status": "Unauthorized access!!" });
            }
        });
    });
};

exports.taskView = (request, response) => {
    const taskToken = request.body.token
    jwt.verify(taskToken, "lmsapp", (err, decoded) => {
        if (decoded) {
            Tasks.taskView((err, data) => {
                if (err) {
                    response.json({ "status": err });
                }
                if (data.length == 0) {
                    response.json({ status: "No tasks found!" });
                }
                else {
                    response.json({ status: "success", "data": data });
                }
            });
        } else {
            response.json({ "status": "Unauthorized User!!" });
        }
    })
}

exports.searchTask = (request, response) => {
    const taskQuery = request.body.taskQuery;
    const taskSearchToken = request.body.token;
    jwt.verify(taskSearchToken, "lmsapp", (err, decoded) => {
        if(!taskQuery){
            return response.json({"status":"Provide a search query"})
        }
        if (decoded) {
            Tasks.searchTasks(taskQuery, (err, data) => {
                if (err) {
                    response.json({ "status": err });
                } else {
                    if (data.length === 0) {
                        response.json({ status: "No Search Items Found" });
                    } else {
                        response.json({ status: "success", "data": data });
                    }
                }
            });
        } else {
            response.json({ "status": "Unauthorized User!!" });
        }
    });
};
