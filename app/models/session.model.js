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

module.exports = Session