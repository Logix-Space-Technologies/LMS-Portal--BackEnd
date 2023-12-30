const db = require('../models/db');

const Submit_task = function (submit_task) {
    this.id = submit_task.id;
    this.task_id = submit_task.task_id;
    this.adminstaffId = submit_task.adminstaffId;
    this.evaluatorRemarks = submit_task.evaluatorRemarks;
    this.score = submit_task.score;
};

Submit_task.evaluateTask = (submit_task, result) => {
    // Check if adminstaffId exists in admin_staff table
    db.query("SELECT * FROM admin_staff WHERE id = ? AND deleteStatus = 0 AND isActive = 1", [submit_task.adminstaffId], (adminStaffErr, adminStaffRes) => {
        if (adminStaffErr) {
            console.log("error checking admin_staff: ", adminStaffErr);
            result(adminStaffErr, null);
            return;
        }

        if (adminStaffRes.length === 0) {
            console.log("Admin staff with ID not found.");
            result("Admin staff with ID not found.", null);
            return;
        }

        // Check if task_id exists in submit_task table
        db.query("SELECT * FROM submit_task WHERE id = ? and isEvaluated = 0", [submit_task.id], (submitTaskErr, submitTaskRes) => {
            if (submitTaskErr) {
                console.log("error checking submit_task: ", submitTaskErr);
                result(submitTaskErr, null);
                return;
            }

            if (submitTaskRes.length === 0) {
                console.log("Submit task with ID not found.");
                result("Submit task with ID not found.", null);
                return;
            }

            // Fetch task_id using foreign key relationship
            const task_id = submitTaskRes[0].taskId;

            // Retrieve total marks for the task from the task table
            db.query("SELECT totalScore FROM task WHERE id = ?", [task_id], (taskErr, taskRes) => {
                if (taskErr) {
                    console.log("error retrieving total marks from task table: ", taskErr);
                    result(taskErr, null);
                    return;
                }

                if (taskRes.length === 0) {
                    console.log("Task with ID not found in the task table.");
                    result("Task with ID not found in the task table.", null);
                    return;
                }

                const taskTotalMarks = taskRes[0].totalScore;
                // Check if given score is greater than total marks in task table
                if (submit_task.score > taskTotalMarks) {
                    console.log("Given score is greater than total marks for the task.");
                    result("Given score is greater than total marks for the task.", null);
                    return;
                }

                // If all checks pass, update the submit_task
                db.query("UPDATE submit_task SET evaluatorRemarks=?, score=?, admStaffId=?, isEvaluated = 1,evalDate= CURRENT_DATE() WHERE id=? AND isEvaluated = 0", [submit_task.evaluatorRemarks, submit_task.score, submit_task.adminstaffId, submit_task.id], (updateErr, updateRes) => {
                    if (updateErr) {
                        console.log("error updating submit_task: ", updateErr);
                        result(updateErr, null);
                        return;
                    }

                    console.log("Updated successfully.");
                    result(null, updateRes);
                });
            });
        });
    });
};



module.exports = Submit_task;