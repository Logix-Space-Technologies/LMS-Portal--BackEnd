const db = require("../models/db");

const Student = function (student) {
    this.id = student.id;
    this.collegeId = student.collegeId;
    this.batchId = student.batchId;
    this.studName = student.studName;
    this.admNo = student.admNo;
    this.rollNo = student.rollNo;
    this.studDept = student.studDept;
    this.course = student.course;
    this.studEmail = student.studEmail;
    this.studPhNo = student.studPhNo;
    this.studProfilePic = student.studProfilePic;
    this.aadharNo = student.aadharNo;
    this.password = student.password;
    this.membership_no = student.membership_no;
};

const Payment = function (payment) {
    this.id = payment.id;
    this.studId = payment.studId;
    this.rpPaymentId = payment.rpPaymentId;
    this.rpOrderId = payment.rpOrderId;
    this.rpAmount = payment.rpAmount;
};

let payStudId;


Student.create = (newStudent, result) => {
    const currentDate = new Date();
    const oneyrfromnow = new Date(currentDate);
    oneyrfromnow.setFullYear(currentDate.getFullYear() + 1);
    const oneAfterYear = oneyrfromnow.toDateString();

    // Convert to "YYYY-MM-DD" format
    const year = oneyrfromnow.getFullYear();
    const month = String(oneyrfromnow.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(oneyrfromnow.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    const currentYear = new Date().getFullYear();
    const currentMonth = (new Date().getMonth() + 1).toString().padStart(2, "0");
    const membershipNoPrefix = "LUC";

    db.query("SELECT * FROM student WHERE admNo = ? AND collegeId = ? AND batchId = ? AND deleteStatus = 0 AND isActive = 1",
        [newStudent.admNo, newStudent.collegeId, newStudent.batchId], (err, res) => {
            if (err) {
                console.error("Error while checking uniqueness: ", err);
                result(err, null);
                return;
            } else {
                if (res.length > 0) {
                    console.log("Admission No already exists");
                    result("Admission No already exists", null);
                    return;
                } else {
                    db.query("SELECT * FROM student WHERE rollNo = ? AND collegeId = ? AND batchId = ? AND deleteStatus = 0 AND isActive = 1",
                        [newStudent.rollNo, newStudent.collegeId, newStudent.batchId],
                        (err, res) => {
                            if (err) {
                                console.error("Error while checking uniqueness: ", err);
                                result(err, null);
                                return;
                            } else {
                                if (res.length > 0) {
                                    console.log("Roll No already exists");
                                    result("Roll No already exists", null);
                                    return;
                                } else {
                                    db.query("SELECT * FROM student WHERE aadharNo = ? AND deleteStatus = 0 AND isActive = 1",
                                        [newStudent.aadharNo], (err, res) => {
                                            if (err) {
                                                console.error("Error while checking uniqueness: ", err);
                                                result(err, null);
                                                return;
                                            } else {
                                                if (res.length > 0) {
                                                    console.log("Aadhar No already exists");
                                                    result("Aadhar No already exists", null);
                                                    return;
                                                } else {
                                                    db.query("SELECT * FROM student WHERE studEmail = ? AND deleteStatus = 0 AND isActive = 1",
                                                        [newStudent.studEmail], (err, res) => {
                                                            if (err) {
                                                                console.error("Error while checking uniqueness: ", err);
                                                                result(err, null);
                                                                return;
                                                            } else {
                                                                if (res.length > 0) {
                                                                    console.log("Email already exists");
                                                                    result("Email already exists", null);
                                                                    return;
                                                                } else {
                                                                    // Update counter and fetch currentCounter
                                                                    db.query("UPDATE counter SET Counter = Counter + 1", (err, updateRes) => {
                                                                        if (err) {
                                                                            console.error("Error while updating counter: ", err);
                                                                            result(err, null);
                                                                            return;
                                                                        }

                                                                        db.query("SELECT Counter FROM counter", (err, counterRes) => {
                                                                            if (err) {
                                                                                console.error("Error while fetching counter value: ", err);
                                                                                result(err, null);
                                                                                return;
                                                                            }

                                                                            const currentCounter = counterRes[0].Counter.toString().padStart(5, "0");
                                                                            const finalMembershipNo = `${membershipNoPrefix}${currentYear}${currentMonth}${currentCounter}`;

                                                                            newStudent.membership_no = finalMembershipNo;
                                                                            newStudent.validity = formattedDate;

                                                                            // Checking if membership_no already exists

                                                                            db.query("SELECT * FROM student WHERE membership_no = ? AND deleteStatus = 0 AND isActive = 1",
                                                                                [newStudent.membership_no], (err, res) => {
                                                                                    if (err) {
                                                                                        console.error("Error while checking uniqueness: ", err);
                                                                                        result(err, null);
                                                                                        return;
                                                                                    } else {
                                                                                        if (res.length > 0) {
                                                                                            db.query("UPDATE counter SET Counter = Counter + 1", (err, updateRes) => {
                                                                                                if (err) {
                                                                                                    console.error("Error while updating counter: ", err);
                                                                                                    result(err, null);
                                                                                                    return;
                                                                                                }

                                                                                                db.query("SELECT Counter FROM counter", (err, counterRes) => {
                                                                                                    if (err) {
                                                                                                        console.error("Error while fetching counter value: ", err);
                                                                                                        result(err, null);
                                                                                                        return;
                                                                                                    }

                                                                                                    const currentCounter = counterRes[0].Counter.toString().padStart(5, "0");
                                                                                                    const finalMembershipNo = `${membershipNoPrefix}${currentYear}${currentMonth}${currentCounter}`;

                                                                                                    newStudent.membership_no = finalMembershipNo;

                                                                                                    // Insert new student
                                                                                                    db.query("INSERT INTO student SET ?", newStudent, (err, res) => {
                                                                                                        if (err) {
                                                                                                            console.error("Error while inserting a new student: ", err);
                                                                                                            result(err, null);
                                                                                                            return;
                                                                                                        }

                                                                                                        console.log("New student added: ", { id: res.insertId, ...newStudent });
                                                                                                        payStudId = res.insertId;
                                                                                                        Payment.create = (newPayment, result) => {
                                                                                                            newPayment.studId = payStudId;
                                                                                                            db.query(
                                                                                                                "INSERT INTO payment (studId, rpPaymentId, rpOrderId, rpAmount) VALUES (?, ?, ?, ?)",
                                                                                                                [newPayment.studId, newPayment.rpPaymentId, newPayment.rpOrderId, newPayment.rpAmount],
                                                                                                                (err, paymentRes) => {
                                                                                                                    if (err) {
                                                                                                                        console.error("Error during payment: ", err);
                                                                                                                        return result(err, null);
                                                                                                                    }

                                                                                                                    console.log("Payment: ", { id: paymentRes.insertId, ...newPayment });
                                                                                                                    result(null, { id: paymentRes.insertId, ...newPayment });
                                                                                                                }
                                                                                                            );
                                                                                                        };
                                                                                                        result(null, { id: res.insertId, ...newStudent })
                                                                                                    });

                                                                                                });
                                                                                            });

                                                                                        } else {
                                                                                            db.query("INSERT INTO student SET ?", newStudent, (err, res) => {
                                                                                                if (err) {
                                                                                                    console.error("Error while inserting a new student: ", err);
                                                                                                    result(err, null);
                                                                                                    return;
                                                                                                }

                                                                                                console.log("New student added: ", { id: res.insertId, ...newStudent });
                                                                                                payStudId = res.insertId;
                                                                                                Payment.create = (newPayment, result) => {
                                                                                                    newPayment.studId = payStudId;
                                                                                                    db.query(
                                                                                                        "INSERT INTO payment (studId, rpPaymentId, rpOrderId, rpAmount) VALUES (?, ?, ?, ?)",
                                                                                                        [newPayment.studId, newPayment.rpPaymentId, newPayment.rpOrderId, newPayment.rpAmount],
                                                                                                        (err, paymentRes) => {
                                                                                                            if (err) {
                                                                                                                console.error("Error during payment: ", err);
                                                                                                                return result(err, null);
                                                                                                            }

                                                                                                            console.log("Payment: ", { id: paymentRes.insertId, ...newPayment });
                                                                                                            result(null, { id: paymentRes.insertId, ...newPayment });
                                                                                                        }
                                                                                                    );
                                                                                                };
                                                                                                result(null, { id: res.insertId, ...newStudent })
                                                                                            });

                                                                                        }

                                                                                    }
                                                                                })
                                                                        });
                                                                    });

                                                                }
                                                            }
                                                        });
                                                }

                                            }


                                        });
                                }
                            }

                        });
                }
            }
        });
};



module.exports = { Student, Payment };
