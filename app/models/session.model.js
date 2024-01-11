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

                                                                            console.log("Added Session:", { id: insertRes.id, ...newSession });
                                                                            result(null, { id: insertRes.id, ...newSession });
                                                                        });
                                                                    })
                                                            } else {
                                                                // Insert data into sessiondetails table
                                                                db.query("INSERT INTO sessiondetails SET ?", newSession, (insertErr, insertRes) => {
                                                                    if (insertErr) {
                                                                        console.error("Error inserting data:", insertErr);
                                                                        return result(insertErr, null);
                                                                    }

                                                                    console.log("Added Session:", { id: insertRes.id, ...newSession });
                                                                    result(null, { id: insertRes.id, ...newSession });
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
                    (err,res)=>{
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

Session.viewSessions=(result)=>{
    const query = "SELECT id,batchId,sessionName,date,time,type,remarks,venueORlink,trainerId,attendenceCode,addedDate, updatedDate FROM sessiondetails WHERE isActive = 1 AND deleteStatus = 0 ";

    db.query(query, (err, res)=>{
        if (err) {
            console.log("error: ", res);
            result(err,null)
            return;
        }

        console.log("session: ", res);
        result(null , res);
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


module.exports = Session