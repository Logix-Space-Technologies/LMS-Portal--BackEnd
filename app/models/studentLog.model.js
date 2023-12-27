const db = require('../models/db');
const bcrypt = require('bcrypt');

const Student = function (student) {
    this.studEmail = student.studEmail;
    this.password = student.password;
};

Student.findByEmail = (email, result) => {
    db.query("SELECT * FROM student WHERE studEmail = ? AND deleteStatus = 0 AND isActive = 1", [email], (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

module.exports = Student;
