const jwt = require("jsonwebtoken");
const Session = require("../models/session.model");
const Validator = require("../config/data.validate");
const { Student } = require("../models/student.model");
const Attendence = require("../models/attendence.model")
const CollegeStaff = require("../models/clgStaff.model")
const mailContents = require('../config/mail.content');
const mail = require('../../sendEmail');
const { AdminStaffLog, logAdminStaff } = require("../models/adminStaffLog.model")
const db = require('../models/db')
const path = require('path');
const firebasetokens = require("../models/firebaseTokens.model");
require('dotenv').config({ path: '../../.env' });
const whatsAppcancelsession = require("./Whatsapp/cancelSession")
const WhatsAppupcomingSession = require("./Whatsapp/upcomingSession")


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
                    const sessionId = data.id
                    const batchId = data.batchId
                    const type = data.type
                    //fetch corresponding students
                    Student.searchStudentByBatch(newSession.batchId, (err, res) => {
                        if (err) {
                            return response.json({ "status": err });
                        } else {
                            res.forEach(element => {
                                let studentid = element.id
                                const newAttendence = new Attendence({
                                    studId: studentid,
                                    sessionId: sessionId
                                })
                                const studentName = element.studName
                                const studentEmail = element.studEmail
                                const studentPhno = element.studPhNo
                                const sessionTime = formatTime(newSession.time)
                                const sessionDate = newSession.date.split('-').reverse().join('/')
                                firebasetokens.sendNotificationByStudId(studentid, { notification: { title: "New Session", body: `A new session has been scheduled on ${sessionDate} at ${sessionTime}` } }, (err, data) => {
                                    if (err) {
                                        return response.json({ "status": err });
                                    }
                                });
                                WhatsAppupcomingSession.sendfn(sessionDate, sessionTime, newSession.venueORlink, newSession.type, studentPhno)
                                if (newSession.type === "Offline") {
                                    const upcomingSessionHtmlContent = mailContents.upcomingSessionOfflineHTMLContent(studentName, newSession.sessionName, sessionDate, sessionTime, newSession.venueORlink);
                                    const upcomingSessionTextContent = mailContents.upcomingSessionOfflineTextContent(studentName, newSession.sessionName, sessionDate, sessionTime, newSession.venueORlink);
                                    mail.sendEmail(studentEmail, `Announcement Regarding Upcoming Session Scheduled On ${sessionDate}`, upcomingSessionHtmlContent, upcomingSessionTextContent);
                                } else if (newSession.type === "Online") {
                                    const upcomingSessionHtmlContent = mailContents.upcomingSessionOnlineHTMLContent(studentName, newSession.sessionName, sessionDate, sessionTime, newSession.venueORlink);
                                    const upcomingSessionTextContent = mailContents.upcomingSessionOnlineTextContent(studentName, newSession.sessionName, sessionDate, sessionTime, newSession.venueORlink);
                                    mail.sendEmail(studentEmail, `Announcement Regarding Upcoming Session Scheduled On ${sessionDate}`, upcomingSessionHtmlContent, upcomingSessionTextContent);
                                } else {
                                    const upcomingSessionHtmlContent = mailContents.upcomingSessionRecordedHTMLContent(studentName, newSession.sessionName, sessionDate, sessionTime, newSession.venueORlink);
                                    const upcomingSessionTextContent = mailContents.upcomingSessionRecordedTextContent(studentName, newSession.sessionName, sessionDate, sessionTime, newSession.venueORlink);
                                    mail.sendEmail(studentEmail, `Announcement Regarding Upcoming Session Scheduled On ${sessionDate}`, upcomingSessionHtmlContent, upcomingSessionTextContent);
                                }
                                if (key == "lmsapp") {
                                    logAdminStaff(0, "Admin Created new Session")
                                }
                                Attendence.create(newAttendence, (err, res) => {
                                    if (err) {
                                        return response.json({ "status": err });
                                    } else {

                                        // console.log({ "status": "success", "data": res });
                                    }
                                })

                            });
                            CollegeStaff.searchClgStaffByCollege(newSession.batchId, (err, res) => {
                                if (err) {
                                    return response.json({ "status": err });
                                } else {
                                    let clgstaffEmail = res[0].email
                                    let batchName = res[0].batchName
                                    let collegeStaffName = res[0].collegeStaffName
                                    const clgstaffsessionTime = formatTime(newSession.time)
                                    const clgstaffsessionDate = newSession.date.split('-').reverse().join('/')
                                    const upcomingSessionHtmlContent = mailContents.upcomingSessionClgStaffHTMLContent(newSession.sessionName, clgstaffsessionDate, clgstaffsessionTime, newSession.venueORlink, type, batchName, collegeStaffName);
                                    const upcomingSessionTextContent = mailContents.upcomingSessionClgStaffTextContent(newSession.sessionName, clgstaffsessionDate, clgstaffsessionTime, newSession.venueORlink, type, batchName, collegeStaffName);
                                    mail.sendEmail(clgstaffEmail, `Announcement Regarding Upcoming Session Scheduled On ${clgstaffsessionDate}`, upcomingSessionHtmlContent, upcomingSessionTextContent);
                                }
                            })

                            return response.json({ "status": "success", "data": data });

                        }
                    })
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

            let originaldate = ""
            let sessionDate = ""
            let sessionTime = ""

            Session.updateSession(upSession, (err, data) => {
                if (err) {
                    return response.json({ "status": err });
                } else {
                    originaldate = data.originalDate;
                    sessionDate = upSession.date.split('-').reverse().join('/');
                    sessionTime = formatTime(upSession.time);
                    db.query("SELECT * FROM sessiondetails WHERE id = ?", [upSession.id], (err, sessionres) => {
                        if (err) {
                            return response.json({ "status": err });
                        }
                        let batchId = sessionres[0].batchId;

                        Student.searchStudentByBatch(batchId, (err, res) => {
                            if (err) {
                                return response.json({ "status": err });
                            }

                            res.forEach(element => {
                                const studName = element.studName
                                const studentEmail = element.studEmail;
                                const studentid = element.id;
                                firebasetokens.sendNotificationByStudId(studentid, { notification: { title: "Session Rescheduled", body: `Due to unforeseen circumstances, we need to reschedule the upcoming session originally scheduled for ${originaldate} to the new date ${sessionDate}. We apologize for any inconvenience this may cause and appreciate your understanding` } }, (err, data) => {
                                    if (err) {
                                        return response.json({ "status": err });
                                    }
                                });
                                if (upSession.type === "Offline") {
                                    const updateSessionHtmlContent = mailContents.reschedulingSessionOfflineHTMLContent(originaldate, sessionDate, sessionTime, upSession.type, upSession.venueORlink, studName);
                                    const updateSessionTextContent = mailContents.reschedulingSessionOfflineTextContent(originaldate, sessionDate, sessionTime, upSession.type, upSession.venueORlink, studName);
                                    mail.sendEmail(studentEmail, `Reschedule Announcement For Session Scheduled On ${sessionDate}`, updateSessionHtmlContent, updateSessionTextContent);
                                } else if (upSession.type === "Online") {
                                    const upcomingSessionHtmlContent = mailContents.reschedulingSessionOnlineHTMLContent(originaldate, sessionDate, sessionTime, upSession.type, upSession.venueORlink, studName);
                                    const upcomingSessionTextContent = mailContents.reschedulingSessionOnlineTextContent(originaldate, sessionDate, sessionTime, upSession.type, upSession.venueORlink, studName);
                                    mail.sendEmail(studentEmail, `Reschedule Announcement For Session Scheduled On ${sessionDate}`, upcomingSessionHtmlContent, upcomingSessionTextContent);
                                } else {
                                    const upcomingSessionHtmlContent = mailContents.reschedulingSessionRecordedHTMLContent(originaldate, sessionDate, sessionTime, upSession.type, upSession.venueORlink, studName);
                                    const upcomingSessionTextContent = mailContents.reschedulingSessionRecordedTextContent(originaldate, sessionDate, sessionTime, upSession.type, upSession.venueORlink, studName);
                                    mail.sendEmail(studentEmail, `Reschedule Announcement For Session Scheduled On ${sessionDate}`, upcomingSessionHtmlContent, upcomingSessionTextContent);
                                }
                            });
                            CollegeStaff.searchClgStaffByCollege(batchId, (err, res) => {
                                if (err) {
                                    return response.json({ "status": err });
                                } else {
                                    let clgstaffEmail = res[0].email
                                    let batchName = res[0].batchName
                                    let collegeStaffName = res[0].collegeStaffName
                                    const upcomingSessionHtmlContent = mailContents.reschedulingSessionClgStaffHTMLContent(originaldate, sessionDate, sessionTime, upSession.type, upSession.venueORlink, batchName, collegeStaffName);
                                    const upcomingSessionTextContent = mailContents.reschedulingSessionClgStaffTextContent(originaldate, sessionDate, sessionTime, upSession.type, upSession.venueORlink, batchName, collegeStaffName);
                                    mail.sendEmail(clgstaffEmail, `Reschedule Announcement For Session Scheduled On ${sessionDate}`, upcomingSessionHtmlContent, upcomingSessionTextContent);

                                }
                            })

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
                return response.json({ "status": "Search Item is required." })
            }
            Session.searchSession(SessionSearchQuery, (err, data) => {
                if (err) {
                    return response.json({ "status": err })
                } else {
                    if (data.length === 0) {
                        return response.json({ "status": "No Search Items Found." })
                    } else {
                        return response.json({ "status": "Result Found", "data": data })
                    }
                }
            })
        } else {
            return response.json({ "status": "Unauthorized User!!" })
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
                    const batchId = sessionres[0].batchId;
                    const sessionDate = sessionres[0].date.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: '2-digit', year: 'numeric' })
                    const sessiontype = sessionres[0].type;
                    const sessiontime = formatTime(sessionres[0].time);

                    Student.searchStudentByBatch(batchId, (err, res) => {
                        if (err) {
                            return response.json({ "status": err });
                        }

                        res.forEach(element => {
                            const studentName = element.studName;
                            const studentEmail = element.studEmail;
                            const studentPhno = element.studPhNo;
                            const studentid = element.id;
                            firebasetokens.sendNotificationByStudId(studentid, { notification: { title: "Session Cancelled", body: `We regret to inform you that the session scheduled on ${sessionDate} at ${sessiontime} has been cancelled. We apologize for any inconvenience this may cause.` } }, (err, data) => {
                                if (err) {
                                    return response.json({ "status": err });
                                }
                            });
                            const cancelSessionHtmlContent = mailContents.cancelSessionContent(studentName, sessionDate, sessiontime);
                            const cancelSessionTextContent = mailContents.cancelSessionTextContent(studentName, sessionDate, sessiontime);
                            mail.sendEmail(studentEmail, `Cancellation of the Scheduled Session on ${sessionDate}`, cancelSessionHtmlContent, cancelSessionTextContent);
                            whatsAppcancelsession.sendfn(sessionDate, sessiontime, sessiontype, studentPhno)
                        });
                        CollegeStaff.searchClgStaffByCollege(batchId, (err, res) => {
                            if (err) {
                                return response.json({ "status": err });
                            } else {
                                let clgstaffEmail = res[0].email
                                let clgstaffName = res[0].collegeStaffName
                                const cancelSessionClgStaffHtmlContent = mailContents.cancelSessionClgStaffHTMLContent(clgstaffName, sessionDate, sessiontime);
                                const cancelSessionClgStaffTextContent = mailContents.cancelSessionClgStaffTextContent(clgstaffName, sessionDate, sessiontime);
                                mail.sendEmail(clgstaffEmail, `Cancellation of the Scheduled Session on ${sessionDate}`, cancelSessionClgStaffHtmlContent, cancelSessionClgStaffTextContent);

                            }
                        })
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
    const sessionId = request.body.id;

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

exports.sendRemainderMail = (request, response) => {
    const token = request.headers.token;
    const key = request.headers.key; // Provide the respective keys for admin and admin staff
    const batchId = request.body.batchId;
    const sessionId = request.body.id;

    if (!batchId) {
        return response.json({ "status": "Batch ID Required." })
    }

    jwt.verify(token, key, (err, decoded) => {
        if (decoded) {
            Session.viewOneSession(sessionId, (err, data) => {
                if (err) {
                    return response.json({ "status": err });
                }
                if (!data || data.length === 0) {
                    return response.json({ "status": "No session found with the provided ID" });
                } else {
                    let sessionName = data[0].sessionName
                    let sessionDate = data[0].date.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: '2-digit', year: 'numeric' })
                    let sessionTime = formatTime(data[0].time)
                    let venueORlink = data[0].venueORlink
                    let type = data[0].type
                    Student.searchStudentByBatch(batchId, (err, res) => {
                        if (err) {
                            return response.json({ "status": err });
                        } else {
                            res.forEach(element => {
                                let studentEmail = element.studEmail
                                let studentName = element.studName
                                if (type === "Offline") {
                                    const SessionRemainderHtmlContent = mailContents.SessionRemainderOfflineHTMLContent(studentName, sessionName, sessionDate, sessionTime, venueORlink);
                                    const SessionRemainderTextContent = mailContents.SessionRemainderOfflineTextContent(studentName, sessionName, sessionDate, sessionTime, venueORlink);
                                    mail.sendEmail(studentEmail, `Remainder Regarding Session Scheduled On ${sessionDate}`, SessionRemainderHtmlContent, SessionRemainderTextContent);
                                } else if (type === "Online") {
                                    const SessionRemainderHtmlContent = mailContents.SessionRemainderOnlineHTMLContent(studentName, sessionName, sessionDate, sessionTime, venueORlink);
                                    const SessionRemainderTextContent = mailContents.SessionRemainderOnlineTextContent(studentName, sessionName, sessionDate, sessionTime, venueORlink);
                                    mail.sendEmail(studentEmail, `Remainder Regarding Session Scheduled On ${sessionDate}`, SessionRemainderHtmlContent, SessionRemainderTextContent);
                                } else {
                                    const SessionRemainderHtmlContent = mailContents.SessionRemainderRecordedHTMLContent(studentName, sessionName, sessionDate, sessionTime, venueORlink);
                                    const SessionRemainderTextContent = mailContents.SessionRemainderRecordedTextContent(studentName, sessionName, sessionDate, sessionTime, venueORlink);
                                    mail.sendEmail(studentEmail, `Remainder Regarding Session Scheduled On ${sessionDate}`, SessionRemainderHtmlContent, SessionRemainderTextContent);
                                }
                            })
                            return response.json({ "status": "success" });
                        }
                    });
                }
            });
        } else {
            return response.json({ "status": "Unauthorized access!!" });
        }
    });

}




