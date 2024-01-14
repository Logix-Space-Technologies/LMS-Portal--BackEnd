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


Attendence.markAttendence = (attendance, result) => {
    const validationQuery = "SELECT s.id AS sessionId, s.date AS sessionDate FROM sessiondetails AS s WHERE s.id = ? AND cancelStatus = 0 AND deleteStatus = 0 AND isActive = 1";

    db.query(validationQuery, [attendance.sessionId], (validationErr, validationRes) => {
        if (validationErr) {
            console.log("validation error:", validationErr);
            result(validationErr, null);
            return;
        }

        // Check if the Session is valid
        if (validationRes.length === 0) {
            console.log("Invalid Session");
            result("Invalid Session", null);
            return;
        }

        const { sessionId, sessionDate } = validationRes[0];
        console.log(sessionDate)
        const currentDate = new Date();
        // console.log(currentDate)

        // Check if the current date is within the session date
        if (currentDate < new Date(sessionDate)) {
            console.log("Cannot mark attendance before the session date");
            result("Cannot mark attendance before the session date", null);
            return;
        }

        // Check if the current date is after the session date
        if (currentDate > new Date(sessionDate)) {
            console.log("Cannot mark attendance after the session date");
            result("Cannot mark attendance after the session date", null);
            return;
        }

        // Check if the student has already marked attendance for the session
        const checkAttendanceQuery = "SELECT id FROM attendence WHERE studId = ? AND sessionId = ? AND status = 1";

        db.query(checkAttendanceQuery, [attendance.studId, sessionId], (checkErr, checkRes) => {
            if (checkErr) {
                console.log("check error:", checkErr);
                result(checkErr, null);
                return;
            }

            if (checkRes.length > 0) {
                console.log("Attendance already marked for this session");
                result("Attendance already marked for this session", null);
                return;
            }

            // If the attendance code is valid, within the session date, and not already marked, proceed with the update
            const updateQuery = "UPDATE attendence SET status = 1 WHERE studId = ? AND sessionId = ?";

            db.query(updateQuery, [attendance.studId, sessionId], (updateErr, updateRes) => {
                if (updateErr) {
                    console.log("update error:", updateErr);
                    result(updateErr, null);
                    return;
                }

                console.log("marked attendance for student:", attendance.studId);
                result(null, { id: attendance.studId, ...attendance });
            });
        });
    });
};

module.exports = Attendence;