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
    this.dueDate = tasks.dueDate.split('/').reverse().join('-')
};



Tasks.taskCreate = (newTask, result) => {
    // Check if the batchId exists in the batches table
    db.query("SELECT * FROM batches WHERE id = ? AND deleteStatus = 0 AND isActive = 1 ", [newTask.batchId], (err, batchRes) => {
        if (err) {
            console.error("Error checking existing batch: ", err);
            result(err, null);
            return;
        } else if (batchRes.length === 0) {
            console.log("No such batch exists.");
            result("No such batch exists.", null);
            return;
        } else {
            // Check if the task already exists
            db.query("SELECT * FROM task WHERE taskTitle=? AND batchId=? AND deleteStatus = 0 AND isActive = 1", [newTask.taskTitle, newTask.batchId], (err, res) => {
                if (err) {
                    console.error("Error checking existing task: ", err);
                    result(err, null);
                    return;
                } else if (res.length > 0) {
                    console.log("Task already exists.");
                    result("Task Title already exists.", null);
                    return;
                } else {
                    // Insert the new task
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
            });
        }
    });

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



Tasks.updateTask = (updatedTask, result) => {
    // Check if the batch exists in the batches table
    db.query("SELECT * FROM batches WHERE id = ? AND deleteStatus = 0 AND isActive = 1",
        [updatedTask.batchId],
        (batchErr, batchRes) => {
            if (batchErr) {
                console.error("Error checking batch: ", batchErr);
                return result(batchErr, null);
            }

            if (batchRes.length === 0) {
                console.log("Batch does not exist or is inactive/deleted.");
                return result("Batch does not exist or is inactive/deleted.", null);
            }

            // Check if the task title already exists for the same batchId
            db.query("SELECT COUNT(*) as count FROM task WHERE taskTitle LIKE ? AND batchId = ? AND id != ? AND deleteStatus = 0 AND isActive = 1",
                [updatedTask.taskTitle, updatedTask.batchId, updatedTask.id],
                (titleErr, titleRes) => {
                    if (titleErr) {
                        console.error("Error checking task title: ", titleErr);
                        return result(titleErr, null);
                    }

                    if (titleRes[0].count > 0) {
                        console.log("Title already exists for the same batchId.");
                        return result("Title already exists for the same batchId.", null);
                    }

                    // Update data in the task table
                    db.query("UPDATE task SET batchId = ?, taskTitle = ?, taskDesc = ?, taskType = ?, taskFileUpload = ?, dueDate = ?, updatedDate = CURRENT_DATE(), updateStatus = 1 WHERE id = ? AND deleteStatus = 0 AND isActive = 1",
                        [
                            updatedTask.batchId,
                            updatedTask.taskTitle,
                            updatedTask.taskDesc,
                            updatedTask.taskType,
                            updatedTask.taskFileUpload,
                            updatedTask.dueDate,
                            updatedTask.id
                        ],
                        (updateErr, updateRes) => {
                            if (updateErr) {
                                console.error("Error updating task: ", updateErr);
                                return result(updateErr, null);
                            }

                            if (updateRes.affectedRows === 0) {
                                return result({ kind: "not_found" }, null);
                            }

                            console.log("Updated Task Details: ", { id: updatedTask.id, ...updatedTask });
                            result(null, { id: updatedTask.id, ...updatedTask });
                        });
                });
        });
};


Tasks.taskView = (result) => {
    db.query("SELECT b.batchName, t.* FROM task t JOIN batches b ON t.batchId=b.id WHERE t.deleteStatus=0 AND t.isActive=1", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null)
            return
        } else {
            console.log("Tasks: ", res);
            result(null, res)
        }
    })
}



Tasks.searchTasks = (searchString, result) => {
    db.query("SELECT b.batchName, t.* FROM task t JOIN batches b ON t.batchId=b.id WHERE t.deleteStatus=0 AND t.isActive=1 AND (t.taskTitle LIKE ? OR t.taskDesc LIKE ?  OR t.taskType LIKE ? OR b.batchName LIKE ?)",
        [`%${searchString}%`, `%${searchString}%`, `%${searchString}%`, `%${searchString}%`],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null)
                return
            } else {
                console.log("Tasks: ", res);
                result(null, res)
            }
        })
}


module.exports = Tasks;


