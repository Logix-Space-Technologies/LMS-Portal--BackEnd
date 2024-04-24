const db = require('../../models/db');
const jwt = require("jsonwebtoken");

const whatsappmsgfeedbacksearchclgstaff = (request, response) => {
    const token = request.headers.token;
    const key = request.headers.key;
    const searchTerm = request.body.searchTerm

    jwt.verify(token, key, (error, decoded) => {
        if (!searchTerm) {
            return response.json({ "status": "Search query cannot be empty" })
        }
        if (decoded) {
            db.query("SELECT c.collegeName, cs.collegeStaffName, w.id, w.clgstaffId, w.msgId, w.message, CASE WHEN w.queuedStatus = 1 THEN 'Queued' ELSE 'Not queued' END AS queuedStatus, CASE WHEN w.sentStatus = 1 THEN 'Sent' ELSE 'Not sent' END AS sentStatus, CASE WHEN w.deliveryStatus = 1 THEN 'Delivered' ELSE 'Yet to be delivered' END AS deliveryStatus, CASE WHEN w.readStatus = 1 THEN 'Read' ELSE 'Not read' END AS readStatus, w.sentDate, w.deliveryDate, w.readDateTime FROM whatsappmsgfeedbackclgstaff w JOIN college_staff cs ON cs.id = w.clgstaffId JOIN college c ON c.id = cs.collegeId WHERE w.sentDate >= DATE_SUB(NOW(), INTERVAL 1 MONTH) AND (c.collegeName LIKE ? OR cs.collegeStaffName LIKE ?) ORDER BY w.sentDate DESC;", [searchTerm, searchTerm], (err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    if (res.length === 0) {
                        return response.json({ "status": "No data Found !!" })
                    } else {
                        const formattedFeedbackLog = res.map(feedbacklog => ({
                            ...feedbacklog,
                            sentDate: feedbacklog.sentDate ? feedbacklog.sentDate.toLocaleString('en-IN', {
                                timeZone: 'Asia/Kolkata',
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit'
                            }) : null,
                            deliveryDate: feedbacklog.deliveryDate ? feedbacklog.deliveryDate.toLocaleString('en-IN', {
                                timeZone: 'Asia/Kolkata',
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit'
                            }) : null,
                            readDateTime: feedbacklog.readDateTime ? feedbacklog.readDateTime.toLocaleString('en-IN', {
                                timeZone: 'Asia/Kolkata',
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit'
                            }) : null
                        }));
                        return response.json({ "status": "success", "data": formattedFeedbackLog });
                    }
                }
            });
        } else {
            return response.json({ "status": "Unauthorized User!!" })
        }
    })
};

module.exports.sendfn = whatsappmsgfeedbacksearchclgstaff