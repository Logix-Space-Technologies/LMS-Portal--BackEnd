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
