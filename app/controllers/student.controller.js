const { request, response } = require("express");
const { Student, Payment, Tasks, SubmitTask } = require("../models/student.model");
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Validator = require("../config/data.validate");
const PDFDocument = require('pdfkit-table');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const fileNameWithoutSpaces = Date.now() + file.originalname.replace(/\s/g, '');
        cb(null, fileNameWithoutSpaces);
    },
});

const upload = multer({ storage: storage }).single('studProfilePic');

exports.createStudent = (req, res) => {
    upload(req, res, function (err) {
        if (err) {
            console.error("Error uploading image:", err);
            return res.json({ "status": err });
        }

        const { collegeId, batchId, studName, admNo, rollNo, studDept, course, studEmail, studPhNo, aadharNo, password, rpPaymentId, rpOrderId, rpAmount } = req.body;

        const saltRounds = 10;

        const studProfilePic = req.file ? req.file.filename : null;

        // Validation
        const validationErrors = {};

        if (Validator.isEmpty(collegeId).isValid) {
            validationErrors.collegeId = Validator.isEmpty(collegeId).message;
        }

        if (Validator.isEmpty(batchId).isValid) {
            validationErrors.batchId = Validator.isEmpty(batchId).message;
        }

        if (Validator.isEmpty(studName).isValid) {
            validationErrors.studName = Validator.isEmpty(studName).message;
        }

        if (!Validator.isValidName(studName).isValid) {
            validationErrors.studName = Validator.isValidName(studName).message;
        }

        if (Validator.isEmpty(admNo).isValid) {
            validationErrors.admNo = Validator.isEmpty(admNo).message;
        }

        if (Validator.isEmpty(rollNo).isValid) {
            validationErrors.rollNo = Validator.isEmpty(rollNo).message;
        }

        if (Validator.isEmpty(studDept).isValid) {
            validationErrors.studDept = Validator.isEmpty(studDept).message;
        }

        if (Validator.isEmpty(course).isValid) {
            validationErrors.course = Validator.isEmpty(course).message;
        }

        if (Validator.isEmpty(aadharNo).isValid) {
            validationErrors.aadharNo = Validator.isEmpty(aadharNo).message;
        }

        if (!Validator.isValidAadharNumber(aadharNo).isValid) {
            validationErrors.aadharNo = Validator.isValidAadharNumber(aadharNo).message;
        }

        if (Validator.isEmpty(studEmail).isValid) {
            validationErrors.studEmail = Validator.isEmpty(studEmail).message;
        }

        if (!Validator.isValidEmail(studEmail).isValid) {
            validationErrors.studEmail = Validator.isValidEmail(studEmail).message;
        }

        if (!Validator.isValidPhoneNumber(studPhNo).isValid) {
            validationErrors.studPhNo = Validator.isValidPhoneNumber(studPhNo).message;
        }

        if (!Validator.isValidPassword(password).isValid) {
            validationErrors.password = Validator.isValidPassword(password).message;
        }

        if (request.file && !Validator.isValidImageWith1mbConstratint(request.file).isValid) {
            validationErrors.image = Validator.isValidImageWith1mbConstratint(request.file).message;
        }



        // If validation fails
        if (Object.keys(validationErrors).length > 0) {
            return res.json({ "status": "Validation failed", "data": validationErrors });
        }

        bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
            if (err) {
                return res.json({ "status": err });
            }

            const newStudent = new Student({
                collegeId: collegeId,
                batchId: batchId,
                studName: studName,
                admNo: admNo,
                rollNo: rollNo,
                studDept: studDept,
                course: course,
                studEmail: studEmail,
                studPhNo: studPhNo,
                studProfilePic: studProfilePic,
                aadharNo: aadharNo,
                password: hashedPassword
            });

            Student.create(newStudent, (err, data) => {
                if (err) {
                    return res.json({ "status": err });
                } else {
                    // Payment creation logic can be added here
                    const newPayment = new Payment({
                        studId: data.id, // Assuming 'id' is the student's ID
                        rpPaymentId: rpPaymentId,
                        rpOrderId: rpOrderId,
                        rpAmount: rpAmount
                    });

                    Payment.create(newPayment, (paymentErr, paymentData) => {
                        if (paymentErr) {
                            return res.json({ "status": paymentErr });
                        } else {
                            
                            return res.json({ "status": "success", "data": data, "paymentData": paymentData });
                        }
                    });
                }
            });
        });
    });
};



exports.studLog = (request, response) => {
    const { studEmail, password } = request.body

    const getStudEmail = request.body.studEmail
    const getPassword = request.body.password
    const validationErrors = {}


    if (!Validator.isValidEmail(studEmail).isValid) {
        validationErrors.email = Validator.isValidEmail(studEmail).message;
    }

    if (Validator.isEmpty(password).isValid) {
        validationErrors.password = Validator.isEmpty(password).message;
    }

    if (Object.keys(validationErrors).length > 0) {
        return response.json({ "status": "Validation failed", "data": validationErrors });
    }

    Student.findByEmail(studEmail, (err, stud) => {
        if (err) {
            return response.json({ "status": err })
        }

        const passwordMatch = bcrypt.compareSync(password, stud.password)
        if (passwordMatch) {
            jwt.sign({ studEmail: getStudEmail, password: getPassword }, "lmsappstud", { expiresIn: "30m" },
                (error, token) => {
                    if (error) {
                        return response.json({ "status": "Unauthorized User!!" })
                    } else {
                        return response.json({ "status": "Success", "data": stud, "token": token })
                    }
                })
        } else {
            return response.json({ "status": "Invalid Email or Password !!!" })
        }

    })
}



exports.studentTaskView = (request, response) => {
    const studId = request.body.id
    const studTaskToken = request.body.token
    jwt.verify(studTaskToken, "lmsappstud", (err, decoded) => {
        if (decoded) {
            Tasks.studentTaskView(studId, (err, data) => {
                if (err) {
                    response.json({ "status": err });
                } else {
                    if (data.length === 0) {
                        response.json({ "status": "No tasks found!" });
                    } else {
                        response.json({ "status": "success", "data": data });
                    }
                }
            })
        } else {
            response.json({ "status": "Unauthorized User!!" });
        }
    })
}


exports.StdChangePassword = (request, response) => {
    const { studEmail, oldPassword, newPassword, token } = request.body;

    // Verify the JWT token
    jwt.verify(token, "lmsappstud", (err, decoded) => {
        if (err || !decoded) {
            response.json({ "status": "Unauthorized User!!" });
            return;
        }

        // Validate old and new passwords
        const validationErrors = {};

        if (!oldPassword) {
            validationErrors.oldPassword = "Old password is required.";
        }

        const passwordValidation = Validator.isValidPassword(newPassword);
        if (!passwordValidation.isValid) {
            validationErrors.newPassword = passwordValidation.message;
        }

        if (Object.keys(validationErrors).length > 0) {
            return response.json({ "status": "Validation failed", "data": validationErrors });
        }

        // Check old password and update if valid
        Student.StdChangePassword({ studEmail, oldPassword, newPassword }, (err, data) => {
            if (err) {
                response.json({ "status": err });
                return;
            }
            if (oldPassword === newPassword) {
                response.json({ "status": "Old password and new password cannot be same." });
                return;
            }

            if (data.status === "Incorrect Old Password!!") {
                response.json({ "status": "Incorrect Old Password!!" });
            } else if (data.status === "No Student Found") {
                response.json({ "status": "User Not Found!!!" });
            } else {
                response.json({ "status": "Password Updated Successfully." });
            }
        });
    });
};


exports.studentViewProfile = (request, response) => {
    const studId = request.body.studId
    const studProfileToken = request.body.token

    jwt.verify(studProfileToken, "lmsappstud", (err, decoded) => {
        if (decoded) {
            Student.viewStudentProfile(studId, (err, data) => {
                if (err) {
                    response.json({ "status": err })
                } else {
                    response.json({ "status": "success", "data": data });
                }
            })
        } else {
            response.json({ "status": "Unauthorized User!!" });
        }
    })
}


exports.profileUpdateStudent = (request, response) => {
    upload(request, response, function (err) {
        if (err) {
            console.error("Error uploading file:", err);
            return response.json({ "status": err });
        }

        const { studName, admNo, rollNo, studDept, course, studPhNo, studProfilePic, aadharNo } = request.body

        const updateProfileToken = request.body.token

        jwt.verify(updateProfileToken, "lmsappstud", (err, decoded) => {
            if (decoded) {
                // Validation
                const validationErrors = {};

                if (Validator.isEmpty(studName).isValid) {
                    validationErrors.studName = Validator.isEmpty(studName).message;
                }

                if (!Validator.isValidName(studName).isValid) {
                    validationErrors.studName = Validator.isValidName(studName).message;
                }

                if (Validator.isEmpty(admNo).isValid) {
                    validationErrors.admNo = Validator.isEmpty(admNo).message;
                }

                if (Validator.isEmpty(rollNo).isValid) {
                    validationErrors.rollNo = Validator.isEmpty(rollNo).message;
                }

                if (Validator.isEmpty(studDept).isValid) {
                    validationErrors.studDept = Validator.isEmpty(studDept).message;
                }

                if (Validator.isEmpty(course).isValid) {
                    validationErrors.course = Validator.isEmpty(course).message;
                }

                if (Validator.isEmpty(aadharNo).isValid) {
                    validationErrors.aadharNo = Validator.isEmpty(aadharNo).message;
                }

                if (!Validator.isValidAadharNumber(aadharNo).isValid) {
                    validationErrors.aadharNo = Validator.isValidAadharNumber(aadharNo).message;
                }

                if (!Validator.isValidPhoneNumber(studPhNo).isValid) {
                    validationErrors.studPhNo = Validator.isValidPhoneNumber(studPhNo).message;
                }


                if (request.file && !Validator.isValidImageWith1mbConstratint(request.file).isValid) {
                    validationErrors.image = Validator.isValidImageWith1mbConstratint(request.file).message;
                }


                // If validation fails
                if (Object.keys(validationErrors).length > 0) {
                    return res.json({ "status": "Validation failed", "data": validationErrors });
                }


                const newStudent = new Student({
                    'id': request.body.id,
                    collegeId: request.body.collegeId,
                    batchId: request.body.batchId,
                    studName: studName,
                    admNo: admNo,
                    rollNo: rollNo,
                    studDept: studDept,
                    course: course,
                    studPhNo: studPhNo,
                    studProfilePic: studProfilePic,
                    aadharNo: aadharNo
                });

                Student.updateStudentProfile(newStudent, (err, data) => {
                    if (err) {
                        if (err.kind === "not_found") {
                            return response.json({ "status": "Student with provided Id and batchId is not found." });
                        } else {
                            return response.json({ "status": err });
                        }
                    } else {
                        response.json({ "status": "success", "data": data });
                    }
                })

            } else {
                response.json({ "status": "Unauthorized User!!" });
            }
        })
    })
}


exports.viewUnverifiedStudents = (request, response) => {
    const token = request.body.token;

    jwt.verify(token, "lmsappclgstaff", (err, decoded) => {
        if (err) {
            return response.json({ "status": "Unauthorized User!!" });
        }

        if (decoded) {
            collegeId = request.body.collegeId;
            Student.viewUnverifiedStudents(collegeId, (err, data) => {
                if (err) {
                    response.json({ "status": err });
                } else {
                    response.json({ "status": "success", "data": data });
                }
            });
        }
    });
};

// View All Students By Admin
exports.viewAllStudsByAdmin = (request, response) => {
    const viewAllStudentByAdminToken = request.body.token
    key = request.body.key
    jwt.verify(viewAllStudentByAdminToken, key, (err, decoded) => {
        if (decoded) {
            Student.viewAllStudentByAdmin((err, data) => {
                if (err) {
                    return response.json({ "status": err })
                } else {
                    return response.json({ "status": "Success", "data": data })
                }
            })
        } else {
            return response.json({ "status": "Unauthorized User!!" })
        }
    })
}


exports.taskSubmissionByStudent = (request, response) => {
    const submissionData = request.body;
    const token = request.body.token;
    jwt.verify(token, "lmsappstud", (err, decoded) => {
        if (err) {
            response.json({ "status": "Unauthorized Access!!" })
            return;
        }
        const validationErrors = {};

        if (Validator.isEmpty(submissionData.gitLink).isValid) {
            validationErrors.gitLink = Validator.isEmpty(submissionData.gitLink).message;
        }

        if (!Validator.isValidGitLink(submissionData.gitLink).isValid) {
            validationErrors.gitLink = Validator.isValidGitLink(submissionData.gitLink).message;
        }

        if (Validator.isEmpty(submissionData.remarks).isValid) {
            validationErrors.Remarks = Validator.isEmpty(submissionData.remarks).message;
        }

        // If validation fails
        if (Object.keys(validationErrors).length > 0) {
            return response.json({ "status": "Validation failed", "data": validationErrors });
        }

        Student.taskSubmissionByStudent(submissionData, (err, data) => {
            if (err) {
                return response.json({ "status": err });
            }

            return response.json({ "status": "success", "data": data });
        });
    });

};


exports.viewEvaluatedTasks = (request, response) => {
    viewEvaluatedToken = request.body.token
    jwt.verify(viewEvaluatedToken, "lmsappstud", (error, decoded) => {
        if (decoded) {
            const studId = request.body.studId
            SubmitTask.viewEvaluatedTasks(studId, (error, data) => {
                if (error) {
                    return response.json({ "status": error });
                } else {
                    return response.json({ "status": "Success", "data": data });
                }
            });
        } else {
            return response.json({ "status": "Unauthorized access!!" });
        }
    });
}




exports.refundAmountReceivedStatus = (request, response) => {
    const { studId, token } = request.body;

    jwt.verify(token, 'lmsappstud', (err, decoded) => {
        if (err) {
            response.json({ status: 'Unauthorized User!!' });
            return;
        }

        Student.refundAmountReceivedStatus(studId, token, (err) => {
            if (err) {
                console.log(err);
                response.json({ status: err.status });
            } else {
                console.log('Refund amount received status successfully updated');
                response.json({ status: 'success, Refund amount received status successfully updated' });
            }
        });
    });
};



exports.searchStudentsByAdmAndAdmstf = (request, response) => {
    const { studentSearchQuery, token, key } = request.body;

    jwt.verify(token, key, (err, decoded) => {
        if (decoded) {
            if (!studentSearchQuery) {
                console.log("Search Item is required.");
                return response.json({ "status": "Search Item is required." });
            }
            Student.searchStudentsByAdmAndAdmstf(studentSearchQuery, (err, data) => {
                if (err) {
                    console.error("Error in searchStudents:", err);
                    response.json({ "status": err });
                } else {
                    if (data.length === 0) {
                        response.json({ "status": "No Search Items Found." });
                    } else {
                        response.json({ "status": "Result Found", "data": data });
                    }
                }
            });
        } else {
            response.json({ "status": "Unauthorized User!!" });
        }
    });
};


exports.studRegViewBatch = (request, response) => {
    const collegeId = request.body.collegeId;
    Student.viewBatch(collegeId, (err, data) => {
      if (err) {
        response.json({ "status": err });
      }
      if (data.length === 0) {
        response.json({ "status": "No Batch found!" });
      } else {
        response.json({ "status": "success", "data": data });
      }
      });
 
};

exports.studregCollegeAllView = (request, response) => {
    Student.collegeViewAll((err, data) => {
        if (err) {
            response.json({ "status": err })
        } else {
            response.json({ "status": "success", "data": data });
        }
    })


}


exports.generateListOfBatchWiseStudents = (request, response) => {
    const token = request.headers.token;
    const key = request.headers.key;

    jwt.verify(token, key, (err, decoded) => {
        if (decoded) {
            Student.generateAllBatchWiseList((err, data) => {
                if (err) {
                    response.json({ "status": err });
                } else {
                    generatePDF(data, (pdfPath) => {
                        response.json({ "status": "success", "data": data, "pdfPath": pdfPath });
                    });
                }
            });
        } else {
            response.json({ "status": "Unauthorized User!!" });
        }
    });
}

function generatePDF(data, callback) {
    const pdfPath = 'pdfFolder/batch_wise_students_list.pdf';
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(pdfPath);

    doc.pipe(stream);

    // Add main heading
    doc.font('Helvetica-Bold').fontSize(20).text('Batch-Wise List Of Students', {
        align: 'center',
        underline: true,
        margin: { top: 30, bottom: 30 },
    });
    doc.text('\n');
    

    // Group data by batch
    const groupedData = groupDataByBatch(data);

    // Add content to the PDF using grouped data
    for (const batchName in groupedData) {
        if (groupedData.hasOwnProperty(batchName)) {
            // Batch heading
            doc.font('Helvetica-Bold').fontSize(16).text(`Batch Name: ${batchName}`, {
                align: 'center',
                underline: true,
            }).font('Helvetica').fontSize(12);
            doc.text('\n');

            const students = groupedData[batchName];

            // Create table headers
            const tableHeaders = ['Membership No','Name', 'College', 'Email', 'Dept', 'Course'];
            const tableData = students.map(student => [student.membership_no,student.studName, student.collegeName, student.studEmail, student.studDept,student.course]);

            // Draw the table
            doc.table({
                headers: tableHeaders,
                rows: tableData,
                widths: [200, 200, 200, 200],
                align: ['left', 'left', 'left', 'left'],
            });

            doc.moveDown(); // Add a newline between batches
        }
    }

    doc.end();

    stream.on('finish', () => {
        callback(pdfPath);
    });
}


function groupDataByBatch(data) {
    // Group data by batch name using a JavaScript object
    const groupedData = {};

    data.forEach(student => {
        const batchName = student.batchName;
        if (!groupedData[batchName]) {
            groupedData[batchName] = [];
        }
        groupedData[batchName].push(student);
    });

    return groupedData;
}
