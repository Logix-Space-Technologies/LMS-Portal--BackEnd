const db = require('../models/db');
const { response } = require('express')



const Tasks = function (tasks) {
    this.id = tasks.id
    this.batchId = tasks.batchId;
    this.taskTitle = tasks.taskTitle;
    this.taskDesc = tasks.taskDesc;
    this.taskType = tasks.taskType;
    this.taskFileUpload = tasks.taskFileUpload
    this.totalScore = tasks.totalScore;
    this.dueDate = tasks.dueDate

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

Tasks.taskDelete = (taskId, result) => {
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


Task.updateTask = (taskUpdate, result) =>{
    db.query("UPDATE task SET batchId=?,taskTitle=?,taskDesc=?,taskType=?,taskFileUpload=?,totalScore=?,dueDate=?,updatedDate= CURRENT_DATE() WHERE id =?", 
    [taskUpdate.batchId, taskUpdate.taskTitle, taskUpdate.taskDesc, taskUpdate.taskType, taskUpdate.taskFileUpload, taskUpdate.totalScore, taskUpdate.dueDate, taskUpdate.id],
    (err, res)=>{
        if (err) {
            console.log("error: ", err)
            result(err, null)
            return
        }

        if (res.affectedRows === 0) {
            result({ kind: "not_found" }, null)
            return
        }
        console.log("Updated Task Details: ", {id : taskUpdate.id, ...taskUpdate})
        result(null, {id: taskUpdate.id, ...taskUpdate})
    })
}

module.exports = Task;
