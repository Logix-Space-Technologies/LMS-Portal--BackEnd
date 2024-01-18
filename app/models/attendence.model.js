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
    // Check if the student has already marked attendance for the session
    const checkAttendanceQuery = "SELECT id FROM attendence WHERE studId = ? AND sessionId = ? AND status = 1";

    db.query(checkAttendanceQuery, [attendance.studId, attendance.sessionId], (checkErr, checkRes) => {
        if (checkErr) {
            console.log("check error:", checkErr);
            result(checkErr, null);
            return;
        }

        // if (checkRes.length === 0) {
        //     console.log("Invalid Student ID");
        //     result("Invalid Student ID", null);
        //     return;
        // }

        if (checkRes.length > 0) {
            console.log("Attendance already marked for this session");
            result("Attendance already marked for this session", null);
            return;
        } else {
            // If the attendance code is valid, within the session date, and not already marked, proceed with the update
            const updateQuery = "UPDATE attendence SET status = 1 WHERE studId = ? AND sessionId = ?";

            db.query(updateQuery, [attendance.studId, attendance.sessionId], (updateErr, updateRes) => {
                if (updateErr) {
                    console.log("update error:", updateErr);
                    result(updateErr, null);
                    return;
                }
                console.log("marked attendance for student:", attendance.studId);
                result(null, { studId: attendance.studId, sessionId: attendance.sessionId });
            });
        }
    });

};

Attendence.collegeStaffViewAttendance = (collegeId, result) => {
    db.query("SELECT sd.sessionName, sd.date, s.membership_no, s.studName, CASE WHEN a.status = 0 THEN 'Absent' WHEN a.status = 1 THEN 'Present' ELSE 'Unknown' END AS attendence_status FROM attendence a JOIN sessiondetails sd ON a.sessionId = sd.id JOIN student s ON s.id = a.studId JOIN college c ON c.id = s.collegeId WHERE sd.cancelStatus = 0 AND c.id = ?", [collegeId], (err, res) => {
        if (err) {
            console.log("error:", err);
            result(err, null);
            return;
        }
        console.log("attendance:", res);
        result(null, res);
    });
};

Attendence.studentViewAttendance = (studentId, result) => {
    db.query("SELECT sd.sessionName, sd.date, CASE WHEN a.status = 0 THEN 'Absent' WHEN a.status = 1 THEN 'Present' ELSE 'Unknown' END AS attendence_status FROM attendence a JOIN sessiondetails sd ON a.sessionId = sd.id JOIN student s ON s.id = a.studId WHERE sd.cancelStatus = 0 AND s.id = ? AND sd.date<CURRENT_DATE()", [studentId], (err, res) => {
        if (err) {
            console.log("error:", err);
            result(err, null);
            return;
        }
        console.log("attendance:", res);
        result(null, res);
    });
};


module.exports = Attendence;