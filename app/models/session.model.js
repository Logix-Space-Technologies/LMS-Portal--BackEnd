const db = require('../models/db')


const Session = function (session) {
    this.id = session.id;
    this.batchId = session.batchId;
    this.sessionName = session.sessionName;
    this.date = session.date;
    this.time = session.time;
    this.type = session.type;
    this.remarks = session.remarks;
    this.venueORlink = session.venueORlink;
    this.trainerId = session.trainerId;
    this.attendenceCode = session.attendenceCode;
};

Session.createSession = (newSession, result) => {
    const randomNumber = Math.floor(Math.random() * 900000) + 100000;
    const attendanceCodePrefix = "LUC";
    db.query("SELECT * FROM sessiondetails WHERE sessionName = ? AND deleteStatus = 0 AND isActive = 1",
        [newSession.sessionName],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            } else {
                if (res.length > 0) {
                    console.log("Session Name already exists");
                    result("Session Name already exists", null);
                    return;
                } else {
                    // Check if the batchId exists in the batches table
                    db.query(
                        "SELECT * FROM batches WHERE id = ? AND deleteStatus = 0 AND isActive = 1",
                        [newSession.batchId],
                        (batchErr, batchRes) => {
                            if (batchErr) {
                                console.error("Error checking batch:", batchErr);
                                return result(batchErr, null);
                            }

                            if (batchRes.length === 0 || !batchRes.every(record => record.deleteStatus === 0 && record.isActive === 1)) {
                                console.log("Batch does not exist or is inactive/deleted.");
                                return result("Batch does not exist or is inactive/deleted.", null);
                            }

                            // Check if the trainerId exists in the trainersinfo table
                            db.query(
                                "SELECT * FROM trainersinfo WHERE id = ? AND deleteStatus = 0 AND isActive = 1",
                                [newSession.trainerId],
                                (trainerErr, trainerRes) => {
                                    if (trainerErr) {
                                        console.error("Error checking trainer:", trainerErr);
                                        return result(trainerErr, null);
                                    }

                                    if (trainerRes.length === 0 || !trainerRes.every(record => record.deleteStatus === 0 && record.isActive === 1)) {
                                        console.log("Trainer does not exist or is inactive/deleted.");
                                        return result("Trainer does not exist or is inactive/deleted.", null);
                                    } else {
                                        db.query("SELECT DISTINCT c.collegeCode FROM batches b JOIN college c ON b.collegeId = c.id WHERE b.deleteStatus = 0 AND b.isActive = 1 AND c.deleteStatus = 0 AND c.isActive = 1 AND b.id = ?",
                                            [newSession.batchId],
                                            (err, codeRes) => {
                                                console.log(newSession.batchId)
                                                if (err) {
                                                    console.error("Error while fetching College Code: ", err);
                                                    result(err, null);
                                                    return;
                                                }
                                                console.log(codeRes)
                                                const currentCollegeCode = codeRes[0].collegeCode;
                                                const finalAttendanceCode = `${attendanceCodePrefix}${currentCollegeCode}${randomNumber}`;

                                                newSession.attendenceCode = finalAttendanceCode;

                                                // Checking if attendenceCode already exists
                                                db.query("SELECT * FROM sessiondetails WHERE attendenceCode = ? AND deleteStatus = 0 AND isActive = 1",
                                                    [newSession.attendenceCode],
                                                    (err, res) => {
                                                        if (err) {
                                                            console.error("Error while checking uniqueness: ", err);
                                                            result(err, null);
                                                            return;
                                                        } else {
                                                            if (res.length > 0) {
                                                                db.query("SELECT DISTINCT c.collegeCode FROM batches b JOIN college c ON b.collegeId = c.id WHERE b.deleteStatus = 0 AND b.isActive = 1 AND c.deleteStatus = 0 AND c.isActive = 1 AND b.collegeId = ?",
                                                                    [newSession.batchId],
                                                                    (err, codeRes) => {
                                                                        if (err) {
                                                                            console.error("Error while fetching College Code: ", err);
                                                                            result(err, null);
                                                                            return;
                                                                        }
                                                                        const currentCollegeCode = codeRes[0].collegeCode;
                                                                        const finalAttendanceCode = `${attendanceCodePrefix}${currentCollegeCode}${randomNumber}`;

                                                                        newSession.attendenceCode = finalAttendanceCode;
                                                                        // Insert data into sessiondetails table
                                                                        db.query("INSERT INTO sessiondetails SET ?", newSession, (insertErr, insertRes) => {
                                                                            if (insertErr) {
                                                                                console.error("Error inserting data:", insertErr);
                                                                                return result(insertErr, null);
                                                                            }
                                                                            db.query("SELECT `id` FROM `sessiondetails` ORDER BY id DESC LIMIT 1", (err, res) => {
                                                                                if (err) {
                                                                                    console.log("Error while fetching the last inserted id: ", err);
                                                                                    return result(err, null);
                                                                                }
                                                                                const sessionId = res[0].id;
                                                                                console.log("Session Id" + sessionId)
                                                                                result(null, { id: sessionId, ...newSession });

                                                                            })
                                                                            // console.log("Added Session:", { id: insertRes.id, ...newSession });

                                                                        });
                                                                    })
                                                            } else {
                                                                // Insert data into sessiondetails table
                                                                db.query("INSERT INTO sessiondetails SET ?", newSession, (insertErr, insertRes) => {
                                                                    if (insertErr) {
                                                                        console.error("Error inserting data:", insertErr);
                                                                        return result(insertErr, null);
                                                                    }
                                                                    db.query("SELECT `id` FROM `sessiondetails` ORDER BY id DESC LIMIT 1", (err, res) => {
                                                                        if (err) {
                                                                            console.log("Error while fetching the last inserted id: ", err);
                                                                            return result(err, null);
                                                                        }
                                                                        newSession.id = res[0].id;

                                                                        result(null, { id: newSession.id, ...newSession });
                                                                    })
                                                                    // console.log("Added Session:", { id: insertRes.id, ...newSession });
                                                                });
                                                            }
                                                        }

                                                    })

                                            })
                                    }


                                }
                            );
                        }
                    );
                }

            }
        })


};

Session.updateSession = (sessionUpdate, result) => {
    //Check If Session Exists
    db.query("SELECT * FROM sessiondetails WHERE id = ? AND deleteStatus = 0 AND isActive = 1",
        [sessionUpdate.id],
        (sessionErr, sessionRes) => {
            if (sessionErr) {
                console.log("Error Checking Session Details : ", sessionErr)
                result(sessionErr, null)
                return
            } else {
                if (sessionRes.length === 0) {
                    console.log("Session Details Not Found")
                    result("Session Details Not Found", null)
                    return
                } else {
                    db.query("UPDATE sessiondetails SET sessionName = ?, date = ?, time = ?, type = ?, remarks = ?, venueORlink = ?, trainerId = ?, updatedDate = CURRENT_DATE() WHERE id = ? AND deleteStatus = 0 AND isActive = 1",
                        [sessionUpdate.sessionName, sessionUpdate.date, sessionUpdate.time, sessionUpdate.type, sessionUpdate.remarks, sessionUpdate.venueORlink, sessionUpdate.trainerId, sessionUpdate.id],
                        (err, res) => {
                            if (err) {
                                console.log("Error : ", err)
                                result(err, null)
                                return
                            }
                            console.log("Updated Session Details : ", { id: sessionUpdate.id, ...sessionUpdate })
                            result(null, { id: sessionUpdate.id, ...sessionUpdate })
                        })
                }

            }

        })
}

Session.viewSessions = (batchId, result) => {
    const query = "SELECT s.id, s.batchId, s.sessionName, s.date, s.time, s.type, s.remarks, s.venueORlink, t.trainerName, s.attendenceCode, s.addedDate, s.updatedDate, CASE WHEN cancelStatus = 0 THEN 'ACTIVE' WHEN cancelStatus = 1 THEN 'CANCELLED' ELSE 'unknown' END AS cancelStatus FROM sessiondetails s JOIN trainersinfo t ON s.trainerId = t.id WHERE s.isActive = 1 AND s.deleteStatus = 0 AND s.batchId = ?";
    db.query(query, [batchId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        // Format the date for each session
        const formattedSessions = res.map(session => ({ ...session, date: session.date.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' }), addedDate: session.addedDate.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' }), updatedDate: session.updatedDate ? session.updatedDate.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' }) : null })); // Formats the date as 'YYYY-MM-DD'

        console.log("sessions: ", formattedSessions);
        result(null, formattedSessions);
    });
}

Session.viewUpcomingSessions = (batchId, result) => {
    const query = "SELECT sd.id, sd.batchId, sd.sessionName, sd.date, sd.time, sd.type, sd.remarks, sd.venueORlink, t.trainerName, sd.addedDate, sd.updatedDate FROM sessiondetails sd JOIN trainersinfo t ON sd.trainerId = t.id WHERE sd.isActive = 1 AND sd.deleteStatus = 0 AND sd.cancelStatus = 0 AND (sd.date > CURRENT_DATE OR (sd.date = CURRENT_DATE AND sd.time >= CURRENT_TIME)) AND sd.batchId = ? ORDER BY sd.date DESC;";
    db.query(query, [batchId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        // Format the date for each session
        const formattedSessions = res.map(session => ({ ...session, date: session.date.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' }), addedDate: session.addedDate.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' }), updatedDate: session.updatedDate ? session.updatedDate.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' }) : null })); // Formats the date as 'YYYY-MM-DD'
        console.log("session: ", formattedSessions);
        result(null, formattedSessions);
    });
};

Session.deleteSession = (sessionId, result) => {
    db.query("SELECT * FROM sessiondetails WHERE id = ? AND deleteStatus = 0 AND isActive = 1", sessionId, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length === 0) {
            console.log("Session doesn't exist");
            result("Session doesn't exist", null);
            return;
        }

        db.query("UPDATE sessiondetails SET isActive = 0, deleteStatus = 1 WHERE id = ?", sessionId, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            console.log("Session deleted successfully");
            result(null, "Session deleted successfully");
        });
    });
};


// Code for Searching the Session
Session.searchSession = (search, result) => {
    const searchTerm = '%' + search + '%'
    db.query("SELECT s.id, s.batchId, s.sessionName, s.date, s.time, s.type, s.remarks, s.venueORlink, s.trainerId, s.attendenceCode, s.addedDate, s.updatedDate FROM sessiondetails s JOIN batches b ON s.batchId = b.id JOIN trainersinfo t ON s.trainerId = t.id JOIN college c ON b.collegeId = c.id WHERE s.isActive = 1 AND s.deleteStatus = 0  AND c.isActive = 1 AND c.deleteStatus = 0 AND  (b.batchName LIKE ? OR c.collegeName LIKE  ? OR t.trainerName LIKE ? )",
        [searchTerm, searchTerm, searchTerm],
        (err, res) => {
            if (err) {
                console.log("Error : ", err)
                result(err, null)
                result
            } else {
                console.log("Session  Details : ", res)
                result(null, res)
            }
        })
}

Session.cancelSession = (sessionId, result) => {
    db.query("SELECT * FROM sessiondetails WHERE id = ? AND deleteStatus = 0 AND isActive = 1", sessionId, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length === 0) {
            console.log("Session doesn't exist");
            result("Session doesn't exist", null);
            return;
        }
        const sessiondetails = res[0].id;

        db.query("DELETE FROM attendence WHERE sessionId = ?", sessionId, (err, deleteRes) => {
            if (err) {
                console.log("Error deleting attendance records: ", err);
                result(err, null);
                return;
            }

            db.query("UPDATE sessiondetails SET cancelStatus = 1 WHERE id = ?", sessionId, (err, UpdateRes) => {
                if (err) {
                    console.log("Error marking session as canceled: ", err);
                    result(err, null);
                    return;
                }
                result(null, sessiondetails);
            });
        });
    });
};


Session.fetchAttendenceCode = (attendenceCode, result) => {
    db.query("SELECT s.id FROM sessiondetails s WHERE s.attendenceCode = ? AND cancelStatus = 0 AND deleteStatus = 0 AND isActive = 1 AND s.date = CURRENT_DATE()",
        [attendenceCode], (codeErr, codeRes) => {
            if (codeErr) {
                console.log(codeErr);
                result(codeErr, null);
                return;
            }
            if (codeRes.length === 0) {
                console.log("Invalid Attendance Code");
                result("Invalid Attendance Code", null);
                return;
            } else {
                const sessionId = codeRes[0].id;
                console.log(sessionId)
                return result(null, sessionId)
            }
        })
}

Session.CheckIsTodaySessionAvailable = (result) => {
    db.query("SELECT * FROM sessiondetails WHERE cancelStatus = 0 AND deleteStatus = 0 AND isActive = 1 AND date = CURRENT_DATE()", (err, res) => {
            if (err) {
                console.log("Error : ", err)
                result(err, null)
                return
            }
            if (res.length === 0) {
                console.log("Session Not Found")
                result("Session Not Found", null)
                return
            }
            result(null, res)
        })
}

Session.viewOneSession = (sessionId, result) => {
    db.query("SELECT id,sessionName,date,time,type,remarks,venueORlink,trainerId FROM sessiondetails WHERE id = ? AND isActive = 1 AND deleteStatus = 0", sessionId,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("data: ", res);
            result(null, res);
        });
};


module.exports = Session