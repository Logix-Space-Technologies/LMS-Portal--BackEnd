const jwt = require("jsonwebtoken");
const Session = require("../models/session.model");
const Validator = require("../config/data.validate");
const { Student } = require("../models/student.model");
const Attendence = require("../models/attendence.model")
const mailContents = require('../config/mail.content');
const mail = require('../../sendEmail');
const { AdminStaffLog, logAdminStaff } = require("../models/adminStaffLog.model")
const db = require('../models/db')
const path = require('path');
require('dotenv').config({ path: '../../.env' });


function formatTime(timeString) {
    const options = { hour: '2-digit', minute: '2-digit', hour12: true };
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString([], options);
}

exports.createSession = (request, response) => {
    const sessionToken = request.headers.token;
    const key = request.headers.key; //give key of respective logins of admin and adminstaff.
    jwt.verify(sessionToken, key, (err, decoded) => {
        if (decoded) {
            const validationErrors = {};

            if (Validator.isEmpty(request.body.batchId).isValid) {
                validationErrors.batchId = Validator.isEmpty(request.body.batchId).message;
            }
            if (Validator.isEmpty(request.body.sessionName).isValid) {
                validationErrors.sessionName = Validator.isEmpty(request.body.sessionName).message;
            }
            if (Validator.isEmpty(request.body.date).isValid) {
                validationErrors.date = Validator.isEmpty(request.body.date).message;
            }
            if (!Validator.isValidDate(request.body.date).isValid) {
                validationErrors.date = Validator.isValidDate(request.body.date).message;
            }
            if (!Validator.isDateGreaterThanToday(request.body.date).isValid) {
                validationErrors.date = Validator.isDateGreaterThanToday(request.body.date).message;
            }

            if (Validator.isEmpty(request.body.time).isValid) {
                validationErrors.time = Validator.isEmpty(request.body.time).message;
            }

            if (!Validator.isValidTime(request.body.time).isValid) {
                validationErrors.time = Validator.isValidTime(request.body.time).message;
            }

            if (Validator.isEmpty(request.body.type).isValid) {
                validationErrors.type = Validator.isEmpty(request.body.type).message;
            }

            if (Validator.isEmpty(request.body.remarks).isValid) {
                validationErrors.remarks = Validator.isEmpty(request.body.remarks).message;
            }

            if (Validator.isEmpty(request.body.venueORlink).isValid) {
                validationErrors.venueORlink = Validator.isEmpty(request.body.venueORlink).message;
            }

            if (Validator.isEmpty(request.body.trainerId).isValid) {
                validationErrors.trainerId = Validator.isEmpty(request.body.trainerId).message;
            }

            if (Validator.isEmpty(request.body.attendanceCode).isValid) {
                validationErrors.attendanceCode = Validator.isEmpty(request.body.attendanceCode).message;
            }

            if (Object.keys(validationErrors).length > 0) {
                return response.json({ "status": "Validation failed", "data": validationErrors })
            }

            const newSession = new Session({
                batchId: request.body.batchId,
                sessionName: request.body.sessionName,
                date: request.body.date.split('/').reverse().join('-'),
                time: request.body.time,
                type: request.body.type,
                remarks: request.body.remarks,
                venueORlink: request.body.venueORlink,
                trainerId: request.body.trainerId
            });

            Session.createSession(newSession, (err, data) => {
                if (err) {
                    return response.json({ "status": err });
                } else {
                    // console.log(data)
                    const sessionId = data.id
                    // console.log(sessionId)
                    //fetch corresponding students
                    Student.searchStudentByBatch(newSession.batchId, (err, res) => {
                        if (err) {
                            return response.json({ "status": err });
                        } else {
                            console.log(res)
                            res.forEach(element => {
                                let studentid = element.id
                                // let sessionid=newSession.id
                                const newAttendence = new Attendence({
                                    studId: studentid,
                                    sessionId: sessionId
                                })
                                const studentName = element.studName
                                const studentEmail = element.studEmail
                                const sessionTime = formatTime(newSession.time)
                                const sessionDate = newSession.date.split('-').reverse().join('/')
                                const upcomingSessionHtmlContent = mailContents.upcomingSessionContent(studentName, newSession.sessionName, sessionDate, sessionTime, newSession.venueORlink);
                                const upcomingSessionTextContent = mailContents.upcomingSessionTextContent(studentName, newSession.sessionName, sessionDate, sessionTime, newSession.venueORlink);
                                mail.sendEmail(studentEmail, 'Session Reschedule Announcement', upcomingSessionHtmlContent, upcomingSessionTextContent);
                                if (key == "lmsapp") {
                                    logAdminStaff(0, "Admin Created new Session")
                                }
                                Attendence.create(newAttendence, (err, res) => {
                                    if (err) {
                                        console.log({ "status": err });
                                    } else {

                                        // console.log({ "status": "success", "data": res });
                                    }
                                })
                            });

                            return response.json({ "status": "success", "data": data });

                        }
                    }
                    )
                    // console.log(data)
                    // return response.json({ "status": "success", "data": data });
                }
            });
        } else {
            return response.json({ "status": "Unauthorized User!!" });
        }
    });
}

exports.sessionUpdate = (request, response) => {
    const sessionUpdateToken = request.headers.token;
    const key = request.headers.key;

    jwt.verify(sessionUpdateToken, key, (err, decoded) => {
        if (decoded) {
            const validationErrors = {};

            if (Validator.isEmpty(request.body.sessionName).isValid) {
                validationErrors.sessionName = Validator.isEmpty(request.body.sessionName).message;
            }
            if (!Validator.isValidName(request.body.sessionName).isValid) {
                validationErrors.sessionName = Validator.isValidName(request.body.sessionName).message;
            }
            if (Validator.isEmpty(request.body.date).isValid) {
                validationErrors.date = Validator.isEmpty(request.body.date).message;
            }
            if (!Validator.isValidDate(request.body.date).isValid) {
                validationErrors.date = Validator.isValidDate(request.body.date).message;
            }
            if (!Validator.isDateGreaterThanToday(request.body.date).isValid) {
                validationErrors.date = Validator.isDateGreaterThanToday(request.body.date).message;
            }
            if (Validator.isEmpty(request.body.time).isValid) {
                validationErrors.time = Validator.isEmpty(request.body.time).message;
            }
            if (!Validator.isValidTime(request.body.time).isValid) {
                validationErrors.time = Validator.isValidTime(request.body.time).message;
            }
            if (Validator.isEmpty(request.body.type).isValid) {
                validationErrors.type = Validator.isEmpty(request.body.type).message;
            }
            if (Validator.isEmpty(request.body.remarks).isValid) {
                validationErrors.remarks = Validator.isEmpty(request.body.remarks).message;
            }
            if (Validator.isEmpty(request.body.venueORlink).isValid) {
                validationErrors.venueORlink = Validator.isEmpty(request.body.venueORlink).message;
            }
            if (Validator.isEmpty(request.body.trainerId).isValid) {
                validationErrors.trainerId = Validator.isEmpty(request.body.trainerId).message;
            }

            if (Object.keys(validationErrors).length > 0) {
                return response.json({ "status": "Validation failed", "data": validationErrors });
            }

            const upSession = new Session({
                'id': request.body.id,
                sessionName: request.body.sessionName,
                date: request.body.date.split('/').reverse().join('-'),
                time: request.body.time,
                type: request.body.type,
                remarks: request.body.remarks,
                venueORlink: request.body.venueORlink,
                trainerId: request.body.trainerId
            });

            Session.updateSession(upSession, (err, data) => {
                if (err) {
                    return response.json({ "status": err });
                } else {
                    let originaldate = data.originalDate;
                    let sessionDate = upSession.date.split('-').reverse().join('/');
                    let sessionTime = formatTime(upSession.time);
                    db.query("SELECT * FROM sessiondetails WHERE id = ?", [upSession.id], (err, sessionres) => {
                        if (err) {
                            return response.json({ "status": err });
                        }
                        console.log(sessionres);
                        const batchId = sessionres[0].batchId;

                        Student.searchStudentByBatch(batchId, (err, res) => {
                            if (err) {
                                return response.json({ "status": err });
                            }

                            res.forEach(element => {
                                const studentEmail = element.studEmail;
                                const updateSessionHtmlContent = mailContents.reschedulingSessionHTMLContent(originaldate, sessionDate, sessionTime, upSession.type, upSession.venueORlink);
                                const updateSessionTextContent = mailContents.reschedulingSessionTextContent(originaldate, sessionDate, sessionTime, upSession.type, upSession.venueORlink);
                                mail.sendEmail(studentEmail, 'Session Reschedule Announcement', updateSessionHtmlContent, updateSessionTextContent);
                            });

                            if (key == "lmsapp") {
                                logAdminStaff(0, "Admin Updated Session Details");
                            }
                            return response.json({ "status": "success", "data": data });
                        });
                    });
                }
            });
        } else {
            return response.json({ "status": "Unauthorized User!!" });
        }
    });
};




// code to view sessions
exports.viewSessions = (request, response) => {
    const sessionToken = request.headers.token;
    const key = request.headers.key;
    //add the appropriate key
    jwt.verify(sessionToken, key, (err, decoded) => {
        if (decoded) {
            const batchId = request.body.batchId
            Session.viewSessions(batchId, (err, data) => {
                if (err) {
                    return response.json({ "status": err });
                }
                if (data.length === 0) {
                    return response.json({ "status": "No sessions are currently active" });
                } else {
                    return response.json({ "status": "success", "Sessions": data });
                }
            });

        } else {
            return response.json({ "status": "Unauthorized access!!" });
        }
    });
};

exports.viewUpcomingSessions = (request, response) => {
    const sessionToken = request.headers.token;
    const batchId = request.body.batchId;
    //add the appropriate key
    jwt.verify(sessionToken, "lmsappstud", (err, decoded) => {
        if (decoded) {
            Session.viewUpcomingSessions(batchId, (err, data) => {
                if (err) {
                    return response.json({ "status": err });
                }
                if (data.length === 0) {
                    return response.json({ "status": "No sessions are currently active" });
                } else {
                    return response.json({ "status": "success", "data": data });
                }
            });

        } else {
            return response.json({ "status": "Unauthorized access!!" });
        }
    });
};

exports.deleteSession = (request, response) => {
    const sessionDeleteToken = request.headers.token;
    const key = request.headers.key;
    jwt.verify(sessionDeleteToken, key, (err, decoded) => {

        if (decoded) {
            const sessionId = request.body.id;

            if (!sessionId) {
                return response.json({ "status": "Session ID is required" });
            }

            Session.deleteSession(sessionId, (err, data) => {
                if (err) {
                    return response.json({ "status": err });
                }

                logAdminStaff(0, "Admin Deleted Session")
                return response.json({ "status": "success", "data": data });
            });
        } else {
            return response.json({ "status": "Unauthorized User!!" });
        }
    });
};


// Code for Searching the Session
exports.searchSession = (request, response) => {
    const SessionSearchQuery = request.body.SessionSearchQuery
    const SessionSearchToken = request.headers.token
    const key = request.headers.key;

    jwt.verify(SessionSearchToken, key, (err, decoded) => {
        if (decoded) {
            if (!SessionSearchQuery) {
                console.log("Search Item is required.")
                return response.json({ "status": "Search Item is required." })
            }
            Session.searchSession(SessionSearchQuery, (err, data) => {
                if (err) {
                    response.json({ "status": err })
                } else {
                    if (data.length === 0) {
                        response.json({ "status": "No Search Items Found." })
                    } else {
                        response.json({ "status": "Result Found", "data": data })
                    }
                }
            })
        } else {
            response.json({ "status": "Unauthorized User!!" })
        }
    })
}

//cancel session 
exports.cancelSession = (request, response) => {
    const sessionCancelToken = request.headers.token;
    const key = request.headers.key;
    const sessionId = request.body.id;

    jwt.verify(sessionCancelToken, key, (err, decoded) => {
        if (err || !decoded) {
            return response.json({ "status": "Unauthorized User!!" });
        }
        if (!sessionId) {
            return response.json({ "status": "Session ID is required" });
        }
        Session.cancelSession(sessionId, (err, data) => {
            if (err) {
                return response.json({ "status": err });
            } else {
                if (key === "lmsapp") {
                    logAdminStaff(0, "Admin Cancelled Session")
                }
                console.log(data)
                db.query("SELECT * FROM sessiondetails WHERE id = ?", [data], (err, sessionres) => {
                    if (err) {
                        return response.json({ "status": err });
                    }
                    console.log(sessionres)
                    const batchId = sessionres[0].batchId;
                    const sessionDate = sessionres[0].date.toLocaleDateString();

                    const sessiontime = formatTime(sessionres[0].time);

                    Student.searchStudentByBatch(batchId, (err, res) => {
                        if (err) {
                            return response.json({ "status": err });
                        }

                        res.forEach(element => {
                            const studentName = element.studName;
                            const studentEmail = element.studEmail;
                            const cancelSessionHtmlContent = mailContents.cancelSessionContent(studentName, sessionDate, sessiontime);
                            const cancelSessionTextContent = mailContents.cancelSessionTextContent(studentName, sessionDate, sessiontime);
                            mail.sendEmail(studentEmail, 'Cancel Session Announcement', cancelSessionHtmlContent, cancelSessionTextContent);
                        });
                        return response.json({ "status": "success" });
                    });
                });
            }
        });
    });
};

exports.isSessionHappeningToday = (request, response) => {
    const sessionToken = request.headers.token;
    jwt.verify(sessionToken, "lmsappstud", (err, decoded) => {
        if (decoded) {
            Session.CheckIsTodaySessionAvailable((err, data) => {
                if (err) {
                    return response.json({ "status": err });
                }
                if (data.length === 0) {
                    return response.json({ "status": false });
                } else {
                    return response.json({ "status": true, "data": data });
                }
            });

        } else {
            return response.json({ "status": "Unauthorized access!!" });
        }
    });
}

exports.viewOneSession = (request, response) => {
    const sessionToken = request.headers.token;
    const key = request.headers.key; // Provide the respective keys for admin and admin staff
    const sessionId = request.body.id; // Assuming the session ID is provided in the request body

    jwt.verify(sessionToken, key, (err, decoded) => {
        if (decoded) {
            Session.viewOneSession(sessionId, (err, data) => {
                if (err) {
                    return response.json({ "status": err });
                }
                if (!data || data.length === 0) {
                    return response.json({ "status": "No session found with the provided ID" });
                } else {
                    return response.json({ "status": "success", "data": data });
                }
            });
        } else {
            return response.json({ "status": "Unauthorized access!!" });
        }
    });
};




