const db = require('../models/db');
const { response } = require('express')

const Task = function (task) {
    this.id = task.id;
    this.batchId = task.batchId;
    this.taskTitle = task.taskTitle;
    this.taskDesc = task.taskDesc;
    this.taskType = task.taskType;
    this.totalScore = task.totalScore;
};

Task.taskCreate = (newTask, result) => {
    if (newTask.taskTitle !== "" && newTask.taskTitle !== null) {
        db.query("SELECT * FROM task WHERE taskTitle=? AND batchId=?", [newTask.taskTitle, newTask.batchId], (err, res) => {
            if (err) {
                console.error("Error checking existing task: ", err);
                result(err, null);
                return;
            } else {
                if (res.length > 0) {
                    console.log("Task already exists.");
                    result("Task Title already exists.", null)
                    return;
                } else {
                    db.query("INSERT INTO task SET ?", newTask, (err, res) => {
                        if (err) {
                            console.error("Error inserting task: ", err);
                            result(err, null);
                            return;
                        } else {
                            console.log("Task inserted: ", { id: res.id, ...newTask });
                            result(null, { id: res.id, ...newTask });
                        }
                    });
                }
            }
        });
    } else {
        result(null, { "status": "Task Title cannot be empty" });
    }
};


Task.updateTask = (updatedTask, result) =>{
    db.query("SELECT * FROM task WHERE id = ? AND deleteStatus=0 AND isActive=1" [updatedTask, result], 
    (taskErr, taskRes) =>{
        if (taskErr) {
            console.log("error checking task: ", taskErr)
            result(taskErr, null)
            return
        }

        if (taskRes.length === 0) {
            result("College not found", null)
            return
        }

        db.query("UPDATE task SET batchId = ?, taskTitle = ?, taskDesc = ?, taskType = ?, ")
    })
}

module.exports = Task;
