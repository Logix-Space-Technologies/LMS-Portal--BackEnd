const db = require('../models/db')


const Attendence = function (attendence) {
    this.studId = attendence.studId;
    this.sessionId = attendence.sessionId;
}

Attendence.create = (newAttendence, result) => {
    db.query("INSERT INTO attendence SET ?", newAttendence, (err, res) => {
        if (err) {
            console.log("error:", err);
            result(err, null);
            return;
        }
        console.log("created attendence:", { id: res.insertId, ...newAttendence });
        result(null, { id: res.insertId, ...newAttendence });
    });
};

Attendence.markAttendence = (attendence, result) => {
    const validationQuery = "SELECT s.id AS sessionId, s.date AS sessionDate FROM sessiondetails AS s WHERE s.id = ? AND cancelStatus = 0 AND deleteStatus = 0 AND isActive = 1";

    db.query(validationQuery, (validationErr, validationRes) => {
        if (validationErr) {
            console.log("validation error:", validationErr);
            result(validationErr, null);
            return;
        }

        // Check if the Session is valid
        if (validationRes.length === 0) {
            const invalidCodeError = new Error("Invalid Session");
            console.log("error:", invalidCodeError);
            result(invalidCodeError, null);
            return;
        }

        const { sessionId, sessionDate } = validationRes[0];

        // Check if the current date is within the session date
        const currentDate = new Date();
        if (currentDate < new Date(sessionDate)) {
            const beforeSessionError = new Error("Cannot mark attendance before the session date");
            console.log("error:", beforeSessionError);
            result(beforeSessionError, null);
            return;
        }

        // Check if the current date is after the session date
        if (currentDate > new Date(sessionDate)) {
            const afterSessionError = new Error("Cannot mark attendance after the session date");
            console.log("error:", afterSessionError);
            result(afterSessionError, null);
            return;
        }

        // Check if the student has already marked attendance for the session
        const checkAttendanceQuery = "SELECT id FROM attendence WHERE studId = ? AND sessionId = ? AND status = 1";

        db.query(checkAttendanceQuery, [attendence.studId, sessionId], (checkErr, checkRes) => {
            if (checkErr) {
                console.log("check error:", checkErr);
                result(checkErr, null);
                return;
            }

            if (checkRes.length > 0) {
                const alreadyMarkedError = new Error("Attendance already marked for this session");
                console.log("error:", alreadyMarkedError);
                result(alreadyMarkedError, null);
                return;
            }

            // If the attendance code is valid, within the session date, and not already marked, proceed with the update
            const updateQuery = "UPDATE attendence AS a JOIN sessiondetails AS s ON a.sessionId = s.id SET a.status = 1 WHERE a.studId = ?";

            db.query(updateQuery, [attendence.studId], (updateErr, updateRes) => {
                if (updateErr) {
                    console.log("update error:", updateErr);
                    result(updateErr, null);
                    return;
                }

                console.log("created attendance:", { id: updateRes.insertId, ...attendence });
                result(null, { id: updateRes.insertId, ...attendence });
            });
        });
    });
};

module.exports = Attendence;