const db = require('../models/db');
const { response } = require('express')




const Tasks = function (tasks) {
    this.id = tasks.id
    this.batchId = tasks.batchId;
    this.sessionId = tasks.sessionId;
    this.taskTitle = tasks.taskTitle;
    this.taskDesc = tasks.taskDesc;
    this.taskType = tasks.taskType;
    this.taskFileUpload = tasks.taskFileUpload
    this.totalScore = tasks.totalScore;
    this.dueDate = tasks.dueDate;
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
    db.query(
        "SELECT * FROM task WHERE deleteStatus = 0 AND isActive = 1",
        [taskId.id],
        (taskErr, taskRes) => {
            if (taskErr) {
                console.error("Error checking task: ", taskErr);
                return result(taskErr, null);
            }
            console.log(taskRes.length);
            if (taskRes.length === 0) {
                console.log("Task does not exist or is inactive/deleted.");
                return result("Task does not exist or is inactive/deleted.", null);
            }

            db.query(
                "UPDATE task SET isActive=0, deleteStatus=1 WHERE id = ? AND isActive = 1 AND deleteStatus = 0",
                [taskId.id],
                (err, res) => {
                    if (err) {
                        console.error("Error deleting task: ", err);
                        result(err, null);
                        return;
                    }

                    if (res.affectedRows === 0) {
                        result({ kind: "not_found" }, null);
                        return;
                    }

                    console.log("Delete task with id: ", { id: taskId.id });
                    result(null, { id: taskId.id });
                }
            );

        }
    );
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


Tasks.taskView = (sessionId, result) => {
    db.query("SELECT b.batchName, t.* FROM task t JOIN sessiondetails s ON t.sessionId = s.id LEFT JOIN batches b ON t.batchId = b.id AND s.batchId = b.id WHERE t.deleteStatus=0 AND t.isActive=1 AND s.deleteStatus = 0 AND s.isActive = 1 AND s.cancelStatus = 0 AND t.sessionId = ?",
    [sessionId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null)
            return
        } else {
            const formattedTasks = res.map(Tasks => ({ ...Tasks, addedDate: Tasks.addedDate.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' }), dueDate: Tasks.dueDate ? Tasks.dueDate.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' }) : null})); // Formats the date as 'YYYY-MM-DD'
            console.log("Tasks: ", formattedTasks);
            result(null, formattedTasks)
        }
    })
}



Tasks.searchTasks = (searchString, result) => {
    db.query("SELECT b.batchName, s.sessionName, t.id, t.taskTitle, t.batchId, t.sessionId, t.taskDesc, t.taskType, t.dueDate, t.totalScore, t.taskFileUpload FROM task t JOIN batches b ON t.batchId=b.id LEFT JOIN sessiondetails s ON t.sessionId = s.id WHERE t.deleteStatus=0 AND t.isActive=1 AND (t.taskTitle LIKE ? OR t.taskDesc LIKE ? OR t.taskType LIKE ? OR b.batchName LIKE ? OR s.sessionName LIKE ?)",
        [`%${searchString}%`, `%${searchString}%`, `%${searchString}%`, `%${searchString}%`, `%${searchString}%`],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null)
                return
            } else {
                const formattedSearchTasks = res.map(tasks => ({ ...tasks, dueDate: tasks.dueDate.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })}));
                console.log("Tasks: ", formattedSearchTasks);
                result(null, formattedSearchTasks)
            }
        })
}

Tasks.collegeStaffSearchTasks = (searchKey, collegeId, result) => {
    const searchString = '%'+ searchKey + '%' 
    db.query("SELECT DISTINCT c.collegeName, b.batchName, t.taskTitle, t.taskDesc, t.taskType, t.taskFileUpload, t.totalScore, t.dueDate, t.addedDate FROM task t JOIN batches b ON t.batchId= b.id JOIN college_staff cs ON b.collegeId = cs.collegeId JOIN college c ON b.collegeId = c.id WHERE t.deleteStatus = 0 AND t.isActive = 1 AND b.deleteStatus = 0 AND b.isActive = 1 AND cs.deleteStatus = 0 AND cs.isActive = 1 AND cs.collegeId = ? AND (t.taskTitle LIKE ? OR t.taskDesc LIKE ? OR t.taskType LIKE ? OR b.batchName LIKE ?)",
        [collegeId, searchString, searchString, searchString, searchString],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null)
                return
            } else {
                const formattedViewTask = res.map(tasks => ({ ...tasks, addedDate: tasks.addedDate.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: '2-digit', year: 'numeric' }), dueDate: tasks.dueDate.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: '2-digit', year: 'numeric' }) }))
                console.log("Tasks: ", formattedViewTask);
                result(null, formattedViewTask)
            }
        })
}


Tasks.findById = (id, result) => {
    db.query("SELECT batchId,taskTitle,dueDate,taskType,totalScore,taskDesc,taskFileUpload FROM task WHERE id =?  AND deleteStatus = 0 AND isActive = 1", [id], (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, res[0]);
        } else {
            result({ kind: "not_found" }, null);
        }
    });
};





module.exports = Tasks;


