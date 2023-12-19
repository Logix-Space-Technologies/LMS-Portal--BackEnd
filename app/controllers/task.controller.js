const Task = require("../models/task.model");
const jwt = require("jsonwebtoken");
const { request, response } = require("express");
const multer =  require("multer")


const storage = multer.diskStorage({
    destination: (request, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (request, file, cb) => {
        cb(null, Date.now() + file.originalname);
    },
});

const fileFilter = function (req, file, cb) {
    // Accept only JPG and JPEG files
    const allowedExtensions = /\.(pdf|docx)$/;

    if (allowedExtensions.test(path.extname(file.originalname).toLowerCase())) {
        return cb(null, true);
    } else {
        return cb('Only pdf and docx files are allowed!', false);
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter }).single('taskFileUpload');

exports.createTask = (request, response) => {
    const task = new Task({
        batchId: request.body.batchId,
        taskTitle: request.body.taskTitle,
        taskDesc: request.body.taskDesc,
        taskType: request.body.taskType,
        totalScore: request.body.totalScore,
    });

    const taskToken = request.body.taskToken;

    if (task.taskTitle !== "" && task.taskTitle !== null) {
        Task.taskCreate(task, (err, data) => {
            if (err) {
                response.json({ "status": err });
            } else {
                jwt.verify(taskToken, "lmsapp", (decoded, err) => {
                    if (decoded) {
                        response.json({ "status": "success", "data": data });
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

exports.taskUpdate = (req, res) => {
    upload(request, response, function (err) {
        if (err) {
            console.error("Error uploading file:", err);
            return response.json({ "status": err });
        }

    const { batchId, taskTitle, taskDesc, taskType, totalScore, dueDate } = req.body;

    // validation for batchId
    if (!batchId) {
        return res.json({ "status": "Batch Id cannot be empty." })
    }

    // validation for task Title
    if (!taskTitle || taskTitle.trim() === "") {
        return res.json({ "status": "Task Tiltle Cannot be Empty." })
    }

    //validation for task description
    if (!taskDesc || taskDesc.length > 100) {
        return res.json({ "status": "Description cannot be empty and should not exceed 100 characters" })
    }
    // validation for task Type
    if (!taskType || taskType.trim() === "") {
        return res.json({ "status": "Task Type Cannot be Empty." })
    }
    //validation for total score
    if (!totalScore) {
        return res.json({"status": "Total Score Cannot be Empty"})
    }
    //validation for due date
    if (!dueDate) {
        return res.json({"status": "Due date cannot be empty Cannot be Empty"})
    }


    const taskFileUpload = req.file ? req.file.filename : null;



    const task = new Task({
        'id': req.body.id,
        batchId: batchId,
        taskTitle: taskTitle,
        taskDesc: taskDesc,
        taskType: taskType,
        taskFileUpload: taskFileUpload,
        totalScore: totalScore,
        dueDate: dueDate
    })
    Task.updateTask(task, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.json({ "status": "Task with provided Id is not found." })
            } else {
                return res.json({ "status": "Internal server error" })
            }
        }
        const token = req.body.token;
        jwt.verify(token, "lmsapp", (error, decoded) => {
            if (decoded) {
                return res.json({ "status": "success", "data": data })
            } else {
                return res.json({ "status": "Unauthorized access!!" })
            }
        })
        })
    })
}
