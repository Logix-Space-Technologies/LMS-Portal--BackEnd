const db = require('../models/db');

const Submit_task = function (submit_task) {
    this.id = submit_task.id;
    this.adminstaffId = submit_task.adminstaffId;
    this.evaluatorRemarks = submit_task.evaluatorRemarks;
    this.score = submit_task.score;
};

Submit_task.evaluateTask = (submit_task, result) => {

    db.query("SELECT st.*,t.taskTitle,sd.sessionName FROM submit_task st JOIN task t ON t.id=st.taskId JOIN sessiondetails sd ON sd.id=t.sessionId  WHERE st.id = ? and isEvaluated = 0", [submit_task.id], (submitTaskErr, submitTaskRes) => {
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
        const student_id = submitTaskRes[0].studId;
        const sessionName= submitTaskRes[0].sessionName;
        const taskTitle= submitTaskRes[0].taskTitle;

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
                result(null, { student_id,sessionName,taskTitle });
            });
        });
    });

};

Submit_task.updateTaskScore = (update_score, result) => {

    db.query("SELECT st.*,t.taskTitle,sd.sessionName FROM submit_task st JOIN task t ON t.id=st.taskId JOIN sessiondetails sd ON sd.id=t.sessionId  WHERE st.id = ? and isEvaluated = 1", [update_score.id], (submitTaskErr, submitTaskRes) => {
        if (submitTaskErr) {
            console.log("Error checking submit_task: ", submitTaskErr);
            result(submitTaskErr, null);
            return;
        }

        if (submitTaskRes.length === 0) {
            console.log("Evaluated task with given ID not found.");
            result("Evaluated task with given ID not found.", null);
            return;
        }

        // Fetch task_id using foreign key relationship
        const task_id = submitTaskRes[0].taskId;
        const student_id = submitTaskRes[0].studId;
        const sessionName = submitTaskRes[0].sessionName;
        const taskTitle = submitTaskRes[0].taskTitle;

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
            if (update_score.score > taskTotalMarks) {
                console.log("Given score is greater than total marks for the task.");
                result("Given score is greater than total marks for the task.", null);
                return;
            }
            // Update the score of the evaluated task
            db.query("UPDATE submit_task SET score=?, admStaffId=?, evaluatorRemarks=?, evalDate= CURRENT_DATE() WHERE id=? AND isEvaluated = 1", [update_score.score, update_score.adminstaffId, update_score.evaluatorRemarks, update_score.id], (updateErr, updateRes) => {
                if (updateErr) {
                    console.log("Error updating submit_task score: ", updateErr);
                    result(updateErr, null);
                    return;
                }

                console.log("Score updated successfully.");
                return result(null, { student_id, sessionName, taskTitle });
            });
        });
    });

};

module.exports = Submit_task;