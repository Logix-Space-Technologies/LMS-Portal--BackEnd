const Tasks = require("../models/task.model");
const jwt = require("jsonwebtoken");
const path = require("path")
const { request, response } = require("express");
const multer =  require("multer")
const Validator = require("../config/data.validate")

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
    upload(request, response, function (err) {
        if (err) {
            console.log("Error Uploading Image: ", err)
            return response.json({ "status": err })
        }

        const { batchId, taskTitle, taskDesc, taskType, totalScore, dueDate } = request.body
        const taskToken = request.body.token
        const taskFileUpload = request.file ? request.file.filename : null

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

        if (!dueDate || !/^\d{4}-\d{2}-\d{2}$/.test(dueDate)) {
            return response.json({ "status": "Invalid Date Format." });
        }

        const addtask = new Tasks({
            batchId: batchId,
            taskTitle: taskTitle,
            taskDesc: taskDesc,
            taskType: taskType,
            taskFileUpload: taskFileUpload,
            totalScore: totalScore,
            dueDate: dueDate
        });

        Tasks.taskCreate(addtask, (err, data) => {
            if (err) {
                return response.json({ "status": err });
            } else {
                console.log(taskToken)
                jwt.verify(taskToken, "lmsapp", (err,decoded) => {
                    if (decoded) {
                        return response.json({ "status": "success", "data": data });
                    } else {
                        return response.json({ "status": "Unauthorized User!!" });
                    }
                });
            }
        })
    })

};



exports.taskDelete = (request , response) => {
    const deleteToken = request.body.token
    const task = new Tasks({
        'id': request.body.id
    });

    Tasks.taskDelete(task,(err, data)=>{
        if (err) {
            if (err.kind === "not_found") {
                console.log("Task is not found")
                response.json({status:"Task is not found"})
                
            } else {
                response.json({status:"Error deleting task"})
                
            }
            
        } else {
            jwt.verify(deleteToken,"lmsapp",(err , decoded) =>{

                if (decoded) {
                    response.json({"status":"Task Deleted."})
                } else {

                    response.json({"status":"Unauthorized User!!"})
                    
                }
            })
            
        }
    })
}

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
                            return response.json({ "status": err});
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

