const Tasks = require("../models/task.model");
const jwt = require("jsonwebtoken");
const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: (request, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (request, file, cb) => {
        // Remove whitespaces and replace with underscores
        const sanitizedFileName = Date.now() + file.originalname.replace(/\s/g, '_');
        cb(null, sanitizedFileName);
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

        if (!dueDate || !/^\d{2}\/\d{2}\/\d{4}$/.test(dueDate)) {
            return response.json({ "status": "Invalid Date Format. Please use DD/MM/YYYY." });
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
                jwt.verify(taskToken, "lmsapp", (err, decoded) => {
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
