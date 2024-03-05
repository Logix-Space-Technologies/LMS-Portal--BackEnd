const { request, response } = require("express");
const { Student, Payment, Tasks, SubmitTask, Session } = require("../models/student.model");
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Validator = require("../config/data.validate");
const PDFDocument = require('pdfkit-table');
const fs = require('fs');
const mailContents = require('../config/mail.content');
const mail = require('../../sendEmail');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');
require('dotenv').config({ path: '../../.env' });
const path = require("path");
// const { Session } = require("inspector");

// AWS S3 Client Configuration
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});


// Multer Configuration for file upload with unique filename
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // Unique filename: Current timestamp + random number + original extension
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

const upload = multer({
    storage: storage, limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});

exports.createStudent = (req, res) => {
    uploadSingle = upload.single('studProfilePic');
    uploadSingle(req, res, async (error) => {
        if (error) {
            return res.status(500).json({ "status": error.message });
        }

        if (!req.file) {
            return res.status(400).json({ "status": "No file uploaded" });
        }

        const file = req.file;
        const fileStream = fs.createReadStream(file.path);

        const uploadParams = {
            Bucket: process.env.S3_BUCKET,
            Key: `uploads/${file.filename}`,
            Body: fileStream
        };

        try {
            const data = await s3Client.send(new PutObjectCommand(uploadParams));
            const imageUrl = `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`;
            // Remove the file from local storage
            fs.unlinkSync(file.path);
            const { collegeId, batchId, studName, admNo, rollNo, studDept, course, studEmail, studPhNo, aadharNo, password, rpPaymentId, rpOrderId, rpAmount } = req.body;
            const saltRounds = 10;
            const studProfilePic = imageUrl;
            // Validation
            const validationErrors = {};
            if (Validator.isEmpty(collegeId).isValid) {
                validationErrors.collegeId = Validator.isEmpty(collegeId).message;
            }
            else if (Validator.isEmpty(batchId).isValid) {
                validationErrors.batchId = Validator.isEmpty(batchId).message;
            }
            else if (Validator.isEmpty(studName).isValid) {
                validationErrors.studName = Validator.isEmpty(studName).message;
            }
            else if (!Validator.isValidName(studName).isValid) {
                validationErrors.studName = Validator.isValidName(studName).message;
            }
            else if (Validator.isEmpty(admNo).isValid) {
                validationErrors.admNo = Validator.isEmpty(admNo).message;
            }
            else if (Validator.isEmpty(rollNo).isValid) {
                validationErrors.rollNo = Validator.isEmpty(rollNo).message;
            }
            else if (Validator.isEmpty(studDept).isValid) {
                validationErrors.studDept = Validator.isEmpty(studDept).message;
            }
            else if (Validator.isEmpty(course).isValid) {
                validationErrors.course = Validator.isEmpty(course).message;
            }
            else if (Validator.isEmpty(aadharNo).isValid) {
                validationErrors.aadharNo = Validator.isEmpty(aadharNo).message;
            }
            else if (!Validator.isValidAadharNumber(aadharNo).isValid) {
                validationErrors.aadharNo = Validator.isValidAadharNumber(aadharNo).message;
            }
            else if (Validator.isEmpty(studEmail).isValid) {
                validationErrors.studEmail = Validator.isEmpty(studEmail).message;
            }
            else if (!Validator.isValidEmail(studEmail).isValid) {
                validationErrors.studEmail = Validator.isValidEmail(studEmail).message;
            }
            else if (!Validator.isValidPhoneNumber(studPhNo).isValid) {
                validationErrors.studPhNo = Validator.isValidPhoneNumber(studPhNo).message;
            }
            else if (!Validator.isValidPassword(password).isValid) {
                validationErrors.password = Validator.isValidPassword(password).message;
            }
            else if (request.file && !Validator.isValidImageWith1mbConstratint(request.file).isValid) {
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
                    studProfilePic: imageUrl,
                    aadharNo: aadharNo,
                    password: hashedPassword
                });
                Student.create(newStudent, (err, data) => {
                    if (err) {
                        return res.json({ "status": err });
                    } else {
                        // Payment creation logic can be added here
                        const newPayment = new Payment({
                            studId: data.id,
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

        } catch (error) {
            fs.unlinkSync(file.path);
            response.status(500).json({ "status": err.message });
        }
    });
};



exports.studLog = (request, response) => {
    const { studEmail, password, type } = request.body;

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
            jwt.sign({ studEmail: getStudEmail, password: getPassword }, "lmsappstud", {
                expiresIn: (type === 'web') ? '30m' : ((type === 'mobile') ? '30d' : undefined)
            },
                (error, token) => {
                    if (error) {
                        return response.json({ "status": "Unauthorized User!!" })
                    } else {
                        if (type === 'web') {
                            // Code for web app
                            console.log('Accessed from web app');
                        } else if (type === 'mobile') {
                            // Code for mobile app
                            console.log('Accessed from mobile app');
                        } else {
                            console.log('Unknown type');
                        }
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
    const studTaskToken = request.headers.token
    jwt.verify(studTaskToken, "lmsappstud", (err, decoded) => {
        if (decoded) {
            Tasks.studentTaskView(studId, (err, data) => {
                if (err) {
                    return response.json({ "status": err });
                } else {
                    if (data.length === 0) {
                        return response.json({ "status": "No tasks found!" });
                    } else {
                        return response.json({ "status": "success", "data": data });
                    }
                }
            })
        } else {
            return response.json({ "status": "Unauthorized User!!" });
        }
    })
}

exports.studentSessionRelatedTaskView = (request, response) => {
    const studId = request.body.id
    const sessionId = request.body.sessionId
    const studTaskToken = request.headers.token
    jwt.verify(studTaskToken, "lmsappstud", (err, decoded) => {
        if (decoded) {
            Tasks.studentSessionRelatedTaskView(studId, sessionId, (err, data) => {
                if (err) {
                    return response.json({ "status": err });
                } else {
                    if (data.length === 0) {
                        return response.json({ "status": "No tasks found!" });
                    } else {
                        return response.json({ "status": "success", "data": data });
                    }
                }
            })
        } else {
            return response.json({ "status": "Unauthorized User!!" });
        }
    })
}


exports.StdChangePassword = (request, response) => {
    const { studEmail, oldPassword, newPassword } = request.body;
    const token = request.headers.token
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
            } else {
                return response.json({ "status": "success" });
            }
        });
    });
};


exports.studentViewProfile = (request, response) => {
    const studId = request.body.studId
    const studProfileToken = request.headers.token

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
    uploadSingle = upload.single('studProfilePic');
    uploadSingle(request, response, async (error) => {
        if (error) {
            return response.status(500).json({ "status": error.message });
        }

        if (!request.file) {
            return response.status(400).json({ "status": "No file uploaded" });
        }

        const file = request.file;
        const fileStream = fs.createReadStream(file.path);

        const uploadParams = {
            Bucket: process.env.S3_BUCKET,
            Key: `uploads/${file.filename}`,
            Body: fileStream
        };

        try {
            const data = await s3Client.send(new PutObjectCommand(uploadParams));
            const imageUrl = `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`;
            // Remove the file from local storage
            fs.unlinkSync(file.path);
            const { studName, admNo, rollNo, studDept, course, studPhNo, aadharNo } = request.body
            const updateProfileToken = request.headers.token
            const studProfilePic = imageUrl;
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
                        return response.json({ "status": "Validation failed", "data": validationErrors });
                    }


                    const newStudent = new Student({
                        'id': request.body.id,
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


        } catch (err) {
            fs.unlinkSync(file.path);
            response.status(500).json({ "status": err.message });
        }
    })
}


exports.viewUnverifiedStudents = (request, response) => {
    const token = request.headers.token;

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

// View All Students By Admin And Admin Staff
exports.viewAllStudsByAdmin = (request, response) => {
    const viewAllStudentByAdminToken = request.headers.token
    key = request.headers.key
    jwt.verify(viewAllStudentByAdminToken, key, (err, decoded) => {
        if (decoded) {
            const batchId = request.body.batchId
            Student.viewAllStudentByAdmin(batchId, (err, data) => {
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
    const token = request.headers.token;
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
            } else {
                return response.json({ "status": "success" });
            }
        });
    });

};


exports.viewEvaluatedTasks = (request, response) => {
    viewEvaluatedToken = request.headers.token
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
    const { studId } = request.body;
    const token = request.headers.token;

    jwt.verify(token, 'lmsappstud', (err, decoded) => {
        if (err) {
            response.json({ "status": 'Unauthorized User!!' });
            return;
        }

        Student.refundAmountReceivedStatus(studId, (err, data) => {
            if (err) {
                console.log(err);
                response.json({ "status": err });
                return;
            } else {
                console.log('Refund amount received status successfully updated');
                response.json({ "status": "success" });
                return
            }
        });
    });
};



exports.searchStudentsByAdmAndAdmstf = (request, response) => {
    const { studentSearchQuery } = request.body;
    const token = request.headers.token;
    const key = request.headers.key;

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

//for student registration view batch dropdown
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

//for student registration view college dropdown
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
                    return response.json({ "status": err });
                } else {
                    generatePDF(data, (pdfPath, pdfError) => {
                        if (pdfError) {
                            return response.json({ "status": pdfError });
                        }
                        response.setHeader('Content-Type', 'application/pdf');
                        response.setHeader('Content-Disposition', 'attachment; filename=batch_wise_students_list.pdf');
                        fs.createReadStream(pdfPath).pipe(response);
                    });
                }
            });
        } else {
            return response.json({ "status": "Unauthorized User!!" });
        }
    });
}

// Generate Batch-Wise Student List BY College Staff
function generatePDF(data, callback) {
    const pdfPath = 'pdfFolder/batch_wise_students_list.pdf';
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(pdfPath);

    doc.pipe(stream);
    const imageLogo = 'app/assets/logo.png';
    const logoImage = doc.openImage(imageLogo);
    const imageScale = 0.3;
    doc.image(logoImage, (doc.page.width - logoImage.width * imageScale) / 2, 20, { width: logoImage.width * imageScale });
    // Add main heading
    doc.font('Helvetica-Bold').fontSize(14).text('Batch-Wise List Of Students', {
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
            doc.font('Helvetica-Bold').fontSize(12).text(`Batch Name: ${batchName}`, {
                align: 'center',
                underline: false,
            }).font('Helvetica').fontSize(9);
            doc.text('\n');

            const students = groupedData[batchName];

            // Create table headers
            const tableHeaders = [
                { label: 'Membership No', padding: 5 },
                { label: 'Name', padding: 0 },
                { label: 'College', padding: 0 },
                { label: 'Department', padding: 0 },
                { label: 'Course', padding: 5 },
                { label: 'Email', padding: 0 },
            ];
            const tableData = students.map(student => [student.membership_no, student.studName, student.collegeName, student.studDept, student.course, student.studEmail]);

            const tableWidth = 1000;
            // Draw the table
            doc.table({
                headers: tableHeaders,
                rows: tableData,
                widths: new Array(tableHeaders.length).fill(tableWidth),
                align: ['left', 'left', 'left', 'left', 'left', 'left'],
            });

            doc.moveDown(); // Add a newline between batches
        }
    }
    // Add the generated date and time
    const generatedDate = new Date();
    doc.font('Helvetica').fontSize(9).text('Generated on: ' + generatedDate.toLocaleDateString() + ' ' + generatedDate.toLocaleTimeString(), {
        align: 'center',
    });

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





//Generate Attendance List PDF By College Staff
exports.generateBatchWiseAttendanceList = (request, response) => {
    const token = request.headers.token;
    const key = request.headers.key;
    const batchId = request.body.batchId;
    jwt.verify(token, key, (err, decoded) => {
        if (decoded) {
            Student.generateBatchWiseAttendanceList(batchId, (err, data) => {
                if (err) {
                    return response.json({ "status": err });
                } else if (data.length === 0) { // Check if data is empty
                    return response.json({ "status": "No data found" }); // Return status if no data is available
                } else {
                    generateAttendancePDF(data, (pdfPath, pdfError) => {
                        if (pdfError) {
                            return response.json({ "status": pdfError });
                        }
                        response.setHeader('Content-Type', 'application/pdf');
                        response.setHeader('Content-Disposition', 'attachment; filename=batch_wise_attendance_list.pdf');
                        fs.createReadStream(pdfPath).pipe(response);
                    });
                }
            })
        } else {
            return response.json({ "status": "Unauthorized User!!" });
        }
    })

}

function generateAttendancePDF(data, callback) {
    const pdfPath = 'pdfFolder/batch_wise_attendance_list.pdf';
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(pdfPath);

    doc.pipe(stream);
    const imageLogo = 'app/assets/logo.png';
    const logoImage = doc.openImage(imageLogo);
    const imageScale = 0.3;
    doc.image(logoImage, (doc.page.width - logoImage.width * imageScale) / 2, 20, { width: logoImage.width * imageScale });
    // Add main heading
    doc.font('Helvetica-Bold').fontSize(14).text('Batch-Wise Attendance List Of Students', {
        align: 'center',
        underline: true,
        margin: { top: 30, bottom: 30 },
    });
    doc.text('\n');

    // Include batchName after the main heading
    const batchName = data.length > 0 ? data[0].batchName : ''; // Assuming batchName is available in the data
    doc.font('Helvetica-Bold').fontSize(13).text(`Batch Name:   ${batchName}`, {
        align: 'center',
        underline: true,
        margin: { bottom: 10 },
    });

    doc.text('\n');


    // Group data by session
    const groupedData = groupAttendanceBySession(data);

    // Add content to the PDF using grouped data
    for (const sessionName in groupedData) {
        if (groupedData.hasOwnProperty(sessionName)) {
            // Batch heading
            doc.font('Helvetica-Bold').fontSize(12).text(`Session Name: ${sessionName}`, {
                align: 'center',
                underline: false,
            }).font('Helvetica').fontSize(9);
            doc.text('\n');

            const students = groupedData[sessionName];

            // Create table headers
            const tableHeaders = [
                { label: 'Date', padding: 4 },
                { label: 'Membership No.', padding: -10 },
                { label: 'Admission No', padding: -5 },
                { label: 'Student Name', padding: 0 },
                { label: 'Department', padding: 10 },
                { label: 'Course', padding: 15 },
                { label: 'Attendance Status', padding: -6 }
            ];
            const tableData = students.map(student => [student.attendanceDate, student.membership_no, student.admNo, student.studName, student.studDept, student.course, student.attendanceStatus]);

            const tableWidth = 100;
            // Draw the table
            doc.table({
                headers: tableHeaders,
                rows: tableData,
                widths: new Array(tableHeaders.length).fill(tableWidth),
                align: ['left', 'left', 'left', 'left', 'left', 'left', 'left', 'left', 'left', 'left'],
            });

            doc.moveDown(); // Add a newline between sessions
        }
    }
    // Add the generated date and time
    const generatedDate = new Date();
    doc.font('Helvetica').fontSize(9).text('Generated on: ' + generatedDate.toLocaleDateString() + ' ' + generatedDate.toLocaleTimeString(), {
        align: 'center',
    });

    doc.end();


    stream.on('finish', () => {
        callback(pdfPath);
    });
}


function groupAttendanceBySession(data) {
    // Group data by session name using a JavaScript object
    const groupedData = {};

    data.forEach(student => {
        const sessionName = student.sessionName;
        if (!groupedData[sessionName]) {
            groupedData[sessionName] = [];
        }
        groupedData[sessionName].push(student);
    });

    return groupedData;
}






// Generate Session Wise Attendance List By College Staff
exports.generateSessionWiseAttendanceList = (request, response) => {
    const token = request.headers.token;
    const key = request.headers.key;
    // Use sessionId instead of batchId
    const sessionId = request.body.sessionId;
    jwt.verify(token, key, (err, decoded) => {
        if (err) {
            return response.json({ "status": "Unauthorized User!!" });
        }
        if (decoded) {
            // Call the updated function with sessionId
            Session.generateSessionAttendanceList(sessionId, (err, data) => {
                if (err) {
                    return response.json({ "status": err });
                } else if (data.length === 0) { // Check if data is empty
                    return response.json({ "status": "No data found" }); // Return status if no data is available
                } else {
                    generateSessionAttendancePDF(data, (pdfPath, pdfError) => {
                        if (pdfError) {
                            return response.json({ "status": pdfError });
                        }
                        response.setHeader('Content-Type', 'application/pdf');
                        response.setHeader('Content-Disposition', 'attachment; filename=session_wise_attendance_list.pdf'); // Changed filename to be session-wise
                        fs.createReadStream(pdfPath).pipe(response);
                    });
                }
            });
        }
    });
};

function generateSessionAttendancePDF(data, callback) {
    const pdfPath = 'pdfFolder/session_wise_attendance_list.pdf';
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(pdfPath);

    doc.pipe(stream);
    const imageLogo = 'app/assets/logo.png';
    const logoImage = doc.openImage(imageLogo);
    const imageScale = 0.3;
    doc.image(logoImage, (doc.page.width - logoImage.width * imageScale) / 2, 20, { width: logoImage.width * imageScale });
    // Add main heading
    doc.font('Helvetica-Bold').fontSize(14).text('Session-Wise Attendance List Of Students', {
        align: 'center',
        underline: true,
        margin: { top: 30, bottom: 30 },
    });
    doc.text('\n');

    // Include batch name after the main heading
    const batchName = data.length > 0 ? data[0].batchName : ''; // Assuming batchName is available in the data
    doc.font('Helvetica-Bold').fontSize(12).text(`Batch Name:   ${batchName}`, {
        align: 'center',
        underline: true,
        margin: { bottom: 10 },
    });
    doc.text('\n');

    // Include sessionName after the batch name
    const sessionName = data.length > 0 ? data[0].sessionName : ''; // Assuming sessionName is available in the data
    doc.font('Helvetica-Bold').fontSize(10).text(`Session Name:   ${sessionName}`, {
        align: 'center',
        underline: true,
        margin: { bottom: 10 },
    });

    doc.text('\n');

    // Group data by session
    const groupedData = groupAttendanceBySessionStudent(data);

    // Add content to the PDF using grouped data
    for (const sessionName in groupedData) {
        if (groupedData.hasOwnProperty(sessionName)) {

            const students = groupedData[sessionName];

            // Create table headers
            const tableHeaders = [
                { label: 'Date', padding: 4 },
                { label: 'Membership No.', padding: -10 },
                { label: 'Admission No', padding: -5 },
                { label: 'Student Name', padding: 0 },
                { label: 'Department', padding: 10 },
                { label: 'Course', padding: 15 },
                { label: 'Attendance Status', padding: -6 }
            ];
            const tableData = students.map(student => [student.attendanceDate, student.membership_no, student.admNo, student.studName, student.studDept, student.course, student.attendanceStatus]);

            const tableWidth = 100;
            // Draw the table
            doc.table({
                headers: tableHeaders,
                rows: tableData,
                widths: new Array(tableHeaders.length).fill(tableWidth),
                align: ['left', 'left', 'left', 'left', 'left', 'left', 'left'],
            });

            doc.moveDown(); // Add a newline between sessions
        }
    }
    // Add the generated date and time
    const generatedDate = new Date();
    doc.font('Helvetica').fontSize(9).text('Generated on: ' + generatedDate.toLocaleDateString() + ' ' + generatedDate.toLocaleTimeString(), {
        align: 'center',
    });

    doc.end();

    stream.on('finish', () => {
        callback(pdfPath);
    });
}

function groupAttendanceBySessionStudent(data) {
    const groupedData = {};
    data.forEach(item => {
        if (!groupedData[item.sessionName]) {
            groupedData[item.sessionName] = [];
        }
        groupedData[item.sessionName].push(item);
    });
    return groupedData;
}









exports.studentNotificationView = (request, response) => {
    const studId = request.body.studId;
    const studTaskToken = request.headers.token;

    jwt.verify(studTaskToken, "lmsappstud", (err, decoded) => {
        if (err) {
            return response.json({ "status": "Unauthorized User" });
        } else {
            Student.studentNotificationView(studId, (err, data) => {
                if (err) {
                    return response.json({ "status": err });
                } else {
                    return response.json({ "status": "success", "data": data });
                }
            });
        }
    });
};


//Student view session details
exports.studViewSession = (request, response) => {
    const viewSessionToken = request.headers.token;
    jwt.verify(viewSessionToken, "lmsappstud", (error, decoded) => {
        if (decoded) {
            const batchId = request.body.batchId;
            Student.viewSession(batchId, (err, data) => {
                if (err) {
                    return response.json({ "status": err });
                }
                if (data.length === 0) {
                    return response.json({ "status": "No Session found!" });
                } else {
                    return response.json({ "status": "success", "data": data });
                }
            });
        } else {
            return response.json({ "status": "Unauthorized access!!" });
        }
    });
};


exports.studRegViewBatchAmount = (request, response) => {
    const batchId = request.body.batchId;
    Student.viewBatchAmount(batchId, (err, data) => {
        if (err) {
            response.json({ "status": err });
        } else {
            if (data === null) {
                // No batch found with the specified batchId
                response.json({ "status": "No Batch found!" });
            } else {
                // Batch found, return the batch amount
                response.json({ "status": "success", "data": data });
            }
        }
    });
};

exports.studentViewPaymentTransactions = (request, response) => {
    const studId = request.body.studId;
    const studToken = request.headers.token;

    jwt.verify(studToken, "lmsappstud", (err, decoded) => {
        if (err) {
            response.json({ "status": "Unauthorized User" });
        } else {
            Payment.viewStudentTransactions(studId, (err, data) => {
                if (err) {
                    response.json({ "status": err });
                } else {
                    if (data.status) {
                        response.json({ "status": data.status });
                    } else if (data.length === 0) {
                        response.json({ "status": "No payment transactions found!" });
                    } else {
                        response.json({ "status": "success", "data": data });
                    }
                }
            });
        }
    });
}


exports.studentViewNextSession = (request, response) => {
    const studToken = request.headers.token;

    jwt.verify(studToken, "lmsappstud", (err, decoded) => {
        if (decoded) {
            const batchId = request.body.batchId;
            Session.studViewNextSessionDate(batchId, (err, data) => {
                if (err) {
                    return response.json({ "status": err });
                }
                if (data.length === 0) {
                    return response.json({ "status": "No Session found!" });
                } else {
                    return response.json({ "status": "success", "data": data });
                }
            });
        } else {
            return response.json({ "status": "Unauthorized access!!" });
        }
    });
};

exports.studentupdatesubmittedtask = (request, response) => {
    const updateSubmissionData = request.body
    const studUpdateSubTaskToken = request.headers.token
    jwt.verify(studUpdateSubTaskToken, "lmsappstud", (err, decoded) => {
        if (decoded) {

            const validationErrors = {};

            if (Validator.isEmpty(updateSubmissionData.gitLink).isValid) {
                validationErrors.gitLink = Validator.isEmpty(updateSubmissionData.gitLink).message;
            }

            if (!Validator.isValidGitLink(updateSubmissionData.gitLink).isValid) {
                validationErrors.gitLink = Validator.isValidGitLink(updateSubmissionData.gitLink).message;
            }

            if (Validator.isEmpty(updateSubmissionData.remarks).isValid) {
                validationErrors.Remarks = Validator.isEmpty(updateSubmissionData.remarks).message;
            }

            // If validation fails
            if (Object.keys(validationErrors).length > 0) {
                return response.json({ "status": "Validation failed", "data": validationErrors });
            }

            SubmitTask.studentUpdateSubmittedTask(updateSubmissionData, (err, data) => {
                if (err) {
                    if (err.kind === "not_found") {
                        return response.json({ "status": "Submitted Task with provided Id is not found." });
                    } else {
                        return response.json({ "status": err });
                    }
                } else {
                    return response.json({ "status": "success", "data": data });
                }
            })


        } else {
            return response.json({ "status": "Unauthorized access!!" });
        }
    })

}

exports.studentviewsubmittedtask = (request, response) => {
    const studViewSubTaskToken = request.headers.token
    jwt.verify(studViewSubTaskToken, "lmsappstud", (err, decoded) => {
        if (decoded) {
            const id = request.body.id;
            SubmitTask.studentviewsubmittedtask(id, (err, data) => {
                if (err) {
                    return response.json({ "status": err })
                } else {
                    return response.json(data)
                }
            })
        } else {
            return response.json({ "status": "Unauthorized access!!" });
        }

    })
}

// Function to handle forgot password requests
exports.regOtpVerification = (request, response) => {
    const admNo = request.body.admNo;
    const collegeId = request.body.collegeId;
    const batchId = request.body.batchId;
    const rollNo = request.body.rollNo;
    const aadharNo = request.body.aadharNo;
    const studEmail = request.body.studEmail;

    const newStudentOtpSend = new Student({
        collegeId: collegeId,
        batchId: batchId,
        admNo: admNo,
        rollNo: rollNo,
        studEmail: studEmail,
        aadharNo: aadharNo
    });

    // Generate and hash OTP
    Student.generateAndHashOTP(newStudentOtpSend, (err, otp) => {
        if (err) {
            // Handle errors that occur during OTP generation and hashing
            return response.json({ "status": err });
        } else {
            // Assuming sendOTPEmail is a function you have defined to handle email sending
            // This function should ideally be asynchronous and handle its own errors
            const mailSent = sendOTPEmail(newStudentOtpSend.studEmail, otp); // Hypothetical function to send email
            if (mailSent) {
                // Successfully sent the OTP to the user's email
                response.json({ "status": "OTP sent to email." });
            } else {
                // Failed to send the email for some reason (e.g., email service down)
                response.json({ "status": "Failed to send OTP." });
            }
        }
    });
};


exports.verifyOtp = (req, res) => {
    // Extract email and OTP from request body
    const email = req.body.studEmail;
    const otp = req.body.otp;

    // Input validation (basic example)
    if (!email || !otp) {
        return res.json({ "status": "Email and OTP are required" });
    }

    // Call the model function to verify the OTP
    Student.verifyOTP(email, otp, (err, result) => {
        if (err) {
            // If there was an error or the OTP is not valid/expired
            return res.json({ "status": err });
        } else {
            if (result) {
                // If the OTP is verified successfully
                return res.json({ "status": "OTP verified successfully" });
            } else {
                // If the OTP does not match
                return res.json({ "status": "Invalid OTP" });
            }
        }
    });
};

// Function to send OTP
function sendOTPEmail(email, otp) {
    const otpVerificationHTMLContent = mailContents.studRegOTPVerificationHTMLContent(otp);
    const otpVerificationTextContent = mailContents.studRegOTPVerificationTextContent(otp);
    mail.sendEmail(email, 'OTP Verification For Student Registration', otpVerificationHTMLContent, otpVerificationTextContent)
    return true; // Placeholder
}

exports.viewCommunityManagers = (request, response) => {
    const token = request.headers.token;
    const key = request.headers.key;
    const batchId = request.body.batchId;
    jwt.verify(token, key, (err, decoded) => {
        if (decoded) {
            Student.viewCommunityMangers(batchId, (err, data) => {
                if (err) {
                    return response.json({ "status": err });
                } else {
                    if (data.length === 0) {
                        return response.json({ "status": "No Community Managers found!" });
                    } else {
                        return response.json({ "status": "success", "data": data });
                    }
                }
            });
        } else {
            return response.json({ "status": "Unauthorized User!!" });
        }
    });
};

exports.studentvalidityrenewal = (request, response) => {
    const { id, rpPaymentId, rpOrderId, rpAmount } = request.body

    const newStudent = new Student({
        id: id
    })

    Student.PaymentRenewal(newStudent, (err, data) => {
        if (err) {
            return res.json({ "status": err });
        } else {
            const newPayment = new Payment({
                studId: id,
                rpPaymentId: rpPaymentId,
                rpOrderId: rpOrderId,
                rpAmount: rpAmount
            })

            Payment.updatePayment(newPayment, (paymentErr, paymentData) => {
                if (paymentErr) {
                    return response.json({ "status": paymentErr });
                } else {
                    return response.json({ "status": "success", "data": data, "paymentData": paymentData });
                }
            })
        }
    })
}

exports.forgotStudpassword = (request, response) => {
    const email = request.body.studEmail
    // Generate and hash OTP
    Student.forgotPassGenerateAndHashOTP(email, (err, otp) => {
        if (err) {
            return response.json({ "status": err });
        } else {
            let studentotp = otp
            Student.searchstudentbyemail(email, (err, data) => {
                let studName = data
                // Send OTP to email
                const mailSent = sendOTPEmail(email, studName, otp);
                if (mailSent) {
                    return response.json({ "status": "OTP sent to email." });
                } else {
                    return response.json({ "status": "Failed to send OTP." });
                }
            })
        }
    });
}

// Function to send OTP
function sendOTPEmail(email, studName, otp) {
    const otpVerificationHTMLContent = mailContents.StudentOTPVerificationHTMLContent(studName, otp);
    const otpVerificationTextContent = mailContents.StudentOTPVerificationTextContent(studName, otp);
    mail.sendEmail(email, 'Password Reset Request', otpVerificationHTMLContent, otpVerificationTextContent)
    return true; // Placeholder
}

// Function to verify OTP and update password
exports.verifyStudOtp = (req, res) => {
    // Extract email and OTP from request body
    const email = req.body.studEmail;
    const otp = req.body.otp;

    // Input validation (basic example)
    if (!email || !otp) {
        return res.json({ "status": "Email and OTP are required" });
    }

    // Call the model function to verify the OTP
    Student.verifyStudOTP(email, otp, (err, result) => {
        if (err) {
            // If there was an error or the OTP is not valid/expired
            return res.json({ "status": err });
        } else {
            if (result) {
                // If the OTP is verified successfully
                return res.json({ "status": "OTP verified successfully" });
            } else {
                // If the OTP does not match
                return res.json({ "status": "Invalid OTP" });
            }
        }
    });
};

exports.studforgotpassword = (request, response) => {
    const { studEmail, oldPassword, newPassword } = request.body;

    const validationErrors = {};

    if (Validator.isEmpty(studEmail).isValid) {
        validationErrors.studEmail = "Email is required";
    } else if (Validator.isEmpty(oldPassword).isValid) {
        validationErrors.oldPassword = "Old password is required";
    } else if (Validator.isEmpty(newPassword).isValid) {
        validationErrors.newPassword = "New password is required";
    } else if (oldPassword === newPassword) {
        validationErrors.newPassword = "Old password and new password cannot be the same";
    } else if (!Validator.isValidPassword(newPassword).isValid) {
        validationErrors.newPassword = "New password is not valid";
    }

    if (Object.keys(validationErrors).length > 0) {
        return response.json({ "status": "Validation failed", "data": validationErrors });
    }

    Student.StdChangePassword({ studEmail, oldPassword, newPassword }, (err, data) => {
        if (err) {
            response.json({ "status": err });
            return;
        } else {
            return response.json({ "status": "success" });
        }
    });
}