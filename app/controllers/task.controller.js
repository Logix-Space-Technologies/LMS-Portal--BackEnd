const Tasks = require("../models/task.model");
const jwt = require("jsonwebtoken");
const path = require("path")
const multer = require("multer")
const Validator = require("../config/data.validate");
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');
const fs = require('fs');
const { AdminStaffLog, logAdminStaff } = require("../models/adminStaffLog.model")
require('dotenv').config({ path: '../../.env' });
const { Student } = require("../models/student.model");
const mailContents = require('../config/mail.content');
const mail = require('../../sendEmail');

// AWS S3 Client Configuration
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

// Multer Configuration for file upload with unique filename
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // Unique filename: Current timestamp + random number + original extension
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

const upload = multer({
    storage: storage, limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        // Allow only PDF and DOCX files
        if (file.mimetype === 'application/pdf' || file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF and DOCX files are allowed!'), false);
        }
    },
});

exports.createTask = (request, response) => {
    const uploadFile = upload.single('taskFileUpload');
    uploadFile(request, response, async (error) => {
        if (error) {
            return response.status(500).json({ "status": error.message });
        }

        if (!request.file) {
            return response.status(400).json({ "status": "No file uploaded" });
        }

        // File handling
        const file = request.file;
        const fileStream = fs.createReadStream(file.path);

        const uploadParams = {
            Bucket: process.env.S3_BUCKET,
            Key: `uploads/${file.filename}`,
            Body: fileStream
        };

        try {
            const data = await s3Client.send(new PutObjectCommand(uploadParams));
            const fileUrl = `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`;

            // Remove the file from local storage
            fs.unlinkSync(file.path);

            const { batchId, taskTitle, taskDesc, taskType, totalScore, sessionId } = request.body
            const dueDate = request.body.dueDate

            const taskToken = request.headers.token
            key = request.headers.key

            jwt.verify(taskToken, key, (err, decoded) => {
                if (decoded) {

                    const validationErrors = {};

                    if (Validator.isEmpty(batchId).isValid) {
                        validationErrors.batchId = Validator.isEmpty(batchId).message;
                    }
                    if (!Validator.isValidAmount(batchId).isValid) {
                        validationErrors.batchId = Validator.isValidAmount(batchId).message; //validation for batch id
                    }

                    if (Validator.isEmpty(sessionId).isValid) {
                        validationErrors.sessionId = Validator.isEmpty(sessionId).message;
                    }

                    if (Validator.isEmpty(taskTitle).isValid) {
                        validationErrors.taskTitle = Validator.isValidName(taskTitle).message;
                    }

                    if (Validator.isEmpty(taskDesc).isValid) {
                        validationErrors.taskDesc = Validator.isValidName(taskDesc).message;
                    }
                    if (!Validator.isValidAddress(taskDesc).isValid) {
                        validationErrors.taskDesc = Validator.isValidAddress(taskDesc).message; //validation for task description.
                    }

                    if (Validator.isEmpty(taskType).isValid) {
                        validationErrors.taskType = Validator.isValidName(taskType).message;
                    }
                    if (!Validator.isValidName(taskType).isValid) {
                        validationErrors.taskType = Validator.isValidName(taskType).message; //validation for task type
                    }

                    if (Validator.isEmpty(totalScore).isValid) {
                        validationErrors.totalScore = Validator.isValidName(totalScore).message;
                    }
                    if (!Validator.isValidAmount(totalScore).isValid) {
                        validationErrors.totalScore = Validator.isValidAmount(totalScore).message; //validation for total score
                    }

                    if (!Validator.isValidDate(dueDate).isValid) {
                        validationErrors.dueDate = Validator.isValidDate(dueDate).message; //validation for date
                    }


                    if (!Validator.isDateGreaterThanToday(dueDate.split('/').reverse().join('-')).isValid) {
                        validationErrors.dueDate = Validator.isDateGreaterThanToday(dueDate.split('/').reverse().join('-')).message; //validation for date
                    }




                    // If validation fails
                    if (Object.keys(validationErrors).length > 0) {
                        return response.json({ "status": "Validation failed", "data": validationErrors });
                    }


                    const taskFileUpload = request.file ? request.file.filename : null

                    const addtask = new Tasks({
                        batchId: batchId,
                        taskTitle: taskTitle,
                        taskDesc: taskDesc,
                        taskType: taskType,
                        taskFileUpload: fileUrl,
                        totalScore: totalScore,
                        sessionId: sessionId,
                        dueDate: dueDate.split('/').reverse().join('-')
                    });

                    Tasks.taskCreate(addtask, (err, data) => {
                        if (err) {
                            return response.json({ "status": err });
                        } else {
                            if (key == "lmsapp") {
                                logAdminStaff(0, "Admin Created Task")
                            }
                            Student.searchStudentByBatch(addtask.batchId, (err, res) => {
                                if (err) {
                                    return response.json({ "status": err });
                                } else {
                                    console.log(res)
                                    res.forEach(element => {
                                        const studName = element.studName
                                        const studEmail = element.studEmail
                                        const dueDate = request.body.dueDate
                                        const newTaskHtmlContent = mailContents.newTaskHtmlContent(studName, dueDate);
                                        const newTaskTextContent = mailContents.newTaskTextContent(studName, dueDate);
                                        mail.sendEmail(studEmail, "New Task Assigned", newTaskHtmlContent, newTaskTextContent);
                                    })
                                }
                            })

                            return response.json({ "status": "success", "data": data });
                        }
                    })
                } else {
                    return response.json({ "status": "Unauthorized User!!" });
                }
            });


        } catch (err) {
            fs.unlinkSync(file.path);
            response.status(500).json({ "status": err.message });
        }
    })
};




exports.taskDelete = (request, response) => {
    const deleteToken = request.headers.token
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
                    console.log("Task not found");
                    return response.json({ "status": "Task not found" });
                } else {
                    return response.json({ "status": err });
                }
            } else {
                logAdminStaff(0, "Admin Deleted Task")
                return response.json({ "status": "Task Deleted." });
            }
        });
    });
};



exports.taskUpdate = (request, response) => {
    const uploadFile = upload.single('taskFileUpload');
    uploadFile(request, response, async (error) => {
        if (error) {
            return response.status(500).json({ "status": error.message });
        }

        // File handling
        const file = request.file;
        let taskFileUpload = null;

        if (file) {
            const fileStream = fs.createReadStream(file.path);

            const uploadParams = {
                Bucket: process.env.S3_BUCKET,
                Key: `uploads/${file.filename}`,
                Body: fileStream
            };

            try {
                await s3Client.send(new PutObjectCommand(uploadParams));
                taskFileUpload = `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`;

                // Remove the file from local storage
                fs.unlinkSync(file.path);
            } catch (err) {
                fs.unlinkSync(file.path);
                return response.status(500).json({ "status": err.message });
            }
        }

        const { batchId, taskTitle, taskDesc, taskType, totalScore, dueDate } = request.body;

        const updateTasktoken = request.headers.token;
        const key = request.headers.key;

        jwt.verify(updateTasktoken, key, (error, decoded) => {
            if (decoded) {
                const validationErrors = {};

                if (Validator.isEmpty(batchId).isValid) {
                    validationErrors.value = Validator.isEmpty(batchId).message;
                }
                if (Validator.isEmpty(taskTitle).isValid) {
                    validationErrors.name = Validator.isEmpty(taskTitle).message;
                }
                if (Validator.isEmpty(taskDesc).isValid) {
                    validationErrors.desc = Validator.isEmpty(taskDesc).message;
                }
                if (!Validator.isValidAddress(taskDesc).isValid) {
                    validationErrors.desc = Validator.isValidAddress(taskDesc).message; //validation for task description.
                }

                if (Validator.isEmpty(taskType).isValid) {
                    validationErrors.type = Validator.isEmpty(taskType).message; //validation for task type
                }

                if (!Validator.isValidAmount(totalScore).isValid) {
                    validationErrors.score = Validator.isValidAmount(totalScore).message; //validation for total score
                }
                if (Validator.isEmpty(totalScore).isValid) {
                    validationErrors.score = Validator.isEmpty(totalScore).message; //validation for task type
                }

                if (!Validator.isValidDate(dueDate).isValid) {
                    validationErrors.date = Validator.isValidDate(dueDate).message; //validation for date
                }


                if (!Validator.isDateGreaterThanToday(dueDate.split('/').reverse().join('-')).isValid) {
                    validationErrors.date = Validator.isDateGreaterThanToday(dueDate.split('/').reverse().join('-')).message; //validation for date
                }

                // If validation fails
                if (Object.keys(validationErrors).length > 0) {
                    return response.json({ "status": "Validation failed", "data": validationErrors });
                }

                const task = new Tasks({
                    'id': request.body.id,
                    batchId: batchId,
                    taskTitle: taskTitle,
                    taskDesc: taskDesc,
                    taskType: taskType,
                    taskFileUpload: taskFileUpload,
                    totalScore: totalScore,
                    dueDate: dueDate.split('/').reverse().join('-')
                });

                Tasks.updateTask(task, (err, data) => {
                    if (err) {
                        if (err.kind === "not_found") {
                            return response.json({ "status": "Task with provided Id is not found." });
                        } else {
                            return response.status(422).json({ "status": err });
                        }
                    } else {
                        if (key === "lmsapp") {
                            logAdminStaff(0, "Admin Updated Task")
                        }
                        return response.status(200).json({ "status": "success", "data": data });
                    }
                });
            } else {
                return response.status(403).json({ "status": "Unauthorized access!!" });
            }
        });

    });
};


exports.taskView = (request, response) => {
    const taskToken = request.headers.token
    key = request.headers.key
    jwt.verify(taskToken, key, (err, decoded) => {
        if (decoded) {
            const sessionId = request.body.sessionId
            Tasks.taskView(sessionId, (err, data) => {
                if (err) {
                    return response.json({ "status": err });
                }
                if (data.length == 0) {
                    return response.json({ "status": "No tasks found!" });
                }
                else {
                    return response.json({ "status": "success", "data": data });
                }
            });
        } else {
            return response.json({ "status": "Unauthorized User!!" });
        }
    })
}

exports.searchTask = (request, response) => {
    const taskQuery = request.body.taskQuery;
    const taskSearchToken = request.headers.token;
    key = request.headers.key
    jwt.verify(taskSearchToken, key, (err, decoded) => {
        if (!taskQuery) {
            return response.json({ "status": "Provide a search query" })
        }
        if (decoded) {
            Tasks.searchTasks(taskQuery, (err, data) => {
                if (err) {
                    response.json({ "status": err });
                } else {
                    if (data.length === 0) {
                        response.json({ "status": "No Search Items Found" });
                    } else {
                        response.json({ "status": "success", "data": data });
                    }
                }
            });
        } else {
            response.json({ "status": "Unauthorized User!!" });
        }
    });
};

exports.collegeStaffSearchTasks = (request, response) => {
    const taskQuery = request.body.taskQuery;
    const AdStafftaskSearchToken = request.headers.token;
    const collegeId = request.body.collegeId;
    jwt.verify(AdStafftaskSearchToken, "lmsappclgstaff", (err, decoded) => {
        if (!taskQuery) {
            return response.json({ "status": "Provide a search query" })
        }
        if (decoded) {
            Tasks.collegeStaffSearchTasks(taskQuery, collegeId, (err, data) => {
                if (err) {
                    response.json({ "status": err });
                } else {
                    if (data.length === 0) {
                        response.json({ "status": "No Search Items Found" });
                    } else {
                        response.json({ "status": "success", "data": data });
                    }
                }
            });
        } else {
            return response.json({ "status": "Unauthorized User!!" });
        }
    });
};




exports.viewOneTask = (request, response) => {
    const token = request.headers.token;
    const key = request.headers.key;
    const id = request.body.id;

    jwt.verify(token, key, (err, decoded) => {
        if (err || !decoded) {
            return response.status(401).json({ "status": "Unauthorized: Invalid or missing token" });
        }

        Tasks.findById(id, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    response.status(404).json({ "status": "Task not found" });
                } else {
                    response.status(500).json({ "status": "Error retrieving task" });
                }
            } else {
                response.json({ "status": "success", "data": data });
            }
        });
    });
};
