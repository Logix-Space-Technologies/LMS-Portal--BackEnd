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

Task.taskDelete = (taskId, result) => {
    db.query("UPDATE task SET isActive=0 , deleteStatus = 1 WHERE id = ? ", [taskId.id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return
        }
        if (res.affectedRows === 0) {
            result({ kind: "not_found" }, null)
            return

        }
        console.log("Delete task with id: ", { id: taskId.id })
        result(null, { id: taskId.id })
    });
};

module.exports = Task;
