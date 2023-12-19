const Task = require("../models/task.model");
const jwt = require("jsonwebtoken");

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


exports.taskDelete = (request , response) => {
    const deleteToken = request.body.token
    const task = new Task({
        'id': request.body.id
    });

    Task.taskDelete(task,(err, data)=>{
        if (err) {
            if (err.kind === "not_found") {
                console.log(({status:"Task is not found"}))
                
            } else {
                response.send({messege:"Error deleting task"})
                
            }
            
        } else {
            jwt.verify(deleteToken,"lmsapp",(err , decoded) =>{

                if (decoded) {
                    response.json({"status":"Unauthorized user"})
                } else {
                    
                }
            })
            
        }
    })
}