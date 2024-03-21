const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AdminStaff = require("../models/adminStaff.model");
const Validator = require("../config/data.validate");
const mailContents = require('../config/mail.content');
const mail = require('../../sendEmail');

const saltRounds = 10;

exports.create = (request, response) => {
    const { AdStaffName, PhNo, Address, AadharNo, Email, Password } = request.body;
    const adstaffToken = request.headers.token;

    // Checking token validation
    jwt.verify(adstaffToken, "lmsapp", (tokenError, decoded) => {
        if (!decoded) {
            return response.json({ "status": "Unauthorized User !!!" });
        }

        // Checking validations
        const validationErrors = {};

        // Validation for AdStaffName
        if (Validator.isEmpty(request.body.AdStaffName).isValid) {
            validationErrors.name = Validator.isEmpty(request.body.AdStaffName).message;
        }
        if (!Validator.isValidName(request.body.AdStaffName).isValid) {
            validationErrors.name = Validator.isValidName(request.body.AdStaffName).message
        }

        // Validation for mobile number
        if (!Validator.isValidMobileNumber(request.body.PhNo).isValid) {
            validationErrors.mobile = Validator.isValidMobileNumber(request.body.PhNo).message;
        }

        // Validation for Address
        if (Validator.isEmpty(request.body.Address).isValid) {
            validationErrors.address = Validator.isEmpty(request.body.Address).message;
        }
        if (!Validator.isValidAddress(request.body.Address).isValid) {
            validationErrors.address = Validator.isValidAddress(request.body.Address).message;
        }

        // Validation for AadharNo
        if (!Validator.isValidAadharNumber(request.body.AadharNo).isValid) {
            validationErrors.aadharno = Validator.isValidAadharNumber(request.body.AadharNo).message;
        }

        // Validation for Email
        if (!Validator.isValidEmail(request.body.Email).isValid) {
            validationErrors.email = Validator.isValidEmail(request.body.Email).message;
        }

        // Validation for Password
        if (!Validator.isValidPassword(request.body.Password).isValid) {
            validationErrors.password = Validator.isValidPassword(request.body.Password).message;
        }

        // If validation fails
        if (Object.keys(validationErrors).length > 0) {
            return response.json({ "status": "Validation failed", "data": validationErrors });
        }
        let password = request.body.Password
        // Generate a salt and hash the password
        bcrypt.hash(Password, saltRounds, (hashError, hashedPassword) => {
            if (hashError) {
                return response.json({ "status": hashError });
            }

            const newAdminStaff = new AdminStaff({
                AdStaffName: AdStaffName,
                PhNo: PhNo,
                Address: Address,
                AadharNo: AadharNo,
                Email: Email,
                Password: hashedPassword
            });

            AdminStaff.create(newAdminStaff, (createError, data) => {
                if (createError) {
                    return response.json({ "status": createError });
                } else {
                    // //send mail
                    const adminStaffName = newAdminStaff.AdStaffName
                    const adminStaffEmail = newAdminStaff.Email
                    const adminStaffHTMLEmailContent = mailContents.admStaffAddHTMLContent(adminStaffName, password, adminStaffEmail);
                    const adminStaffTextEmailContent = mailContents.admStaffAddTextContent(adminStaffName, password, adminStaffEmail);
                    mail.sendEmail(adminStaffEmail, 'Registration Successful!', adminStaffHTMLEmailContent, adminStaffTextEmailContent);
                    return response.json({ "status": "success", "data": data });
                }
            });
        });
    });
};


exports.viewalladmstaff = (request, response) => {
    const admstaffToken = request.headers.token
    jwt.verify(admstaffToken, "lmsapp", (err, decoded) => {
        if (decoded) {
            AdminStaff.getAlladmstaff((err, data) => {
                if (err) {
                    console.log(err)
                    return response.json({ "status": err })
                } else {
                    return response.json(data)
                }
            })
        } else {
            return response.json({ "status": "Unauthorized User!!" })
        }
    })
}



exports.adminStaffUpdate = (request, res) => {
    const { AdStaffName, PhNo, Address, AadharNo } = request.body;
    const token = request.headers.token;

    // Token verification
    jwt.verify(token, "lmsapp", (tokenError, decoded) => {
        if (!decoded) {
            return res.json({ "status": "Unauthorized access!!" });
        }

        // Checking validations
        const validationErrors = {};

        // Validation for AdStaffName
        if (Validator.isEmpty(request.body.AdStaffName).isValid) {
            validationErrors.name = Validator.isEmpty(request.body.AdStaffName).message;
        }
        if (!Validator.isValidName(request.body.AdStaffName).isValid) {
            validationErrors.name = Validator.isValidName(request.body.AdStaffName).message
        }
        // Validation for mobile number
        if (!Validator.isValidMobileNumber(request.body.PhNo).isValid) {
            validationErrors.PhNo = Validator.isValidMobileNumber(request.body.PhNo).message;
        }
        // Validation for Address
        if (!Validator.isValidAddress(request.body.Address).isValid) {
            validationErrors.address = Validator.isValidAddress(request.body.Address).message;
        }

        // Validation for AadharNo
        if (!Validator.isValidAadharNumber(request.body.AadharNo).isValid) {
            validationErrors.aadharno = Validator.isValidAadharNumber(request.body.AadharNo).message;
        }

        // If validation fails
        if (Object.keys(validationErrors).length > 0) {
            return res.json({ "status": "Validation failed", "data": validationErrors });
        }

        const admStaff = new AdminStaff({
            'id': request.body.id,
            AdStaffName: AdStaffName,
            PhNo: PhNo,
            Address: Address,
            AadharNo: AadharNo,

        });

        AdminStaff.updateAdminStaff(admStaff, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    return res.json({ "status": "Admin Staff with the provided id is not found" });
                } else {
                    return res.json({ "status": err });
                }
            }

            return res.json({ "status": "success", "data": data });
        });
    });
};


exports.admStaffDelete = (request, response) => {
    const deleteToken = request.headers.token
    jwt.verify(deleteToken, "lmsapp", (err, decoded) => {
        if (decoded) {
            const admStfDlt = new AdminStaff({
                'id': request.body.id
            });
            AdminStaff.admStaffDelete(admStfDlt, (err, data) => {
                if (err) {
                    if (err.kind === "not_found") {
                        return response.json({ "status": "Admin Staff id not found." })

                    } else {
                        return response.send({ "status": err })
                    }
                }
                return response.json({ "status": "Admin Staff Deleted." })
            });
        } else {
            return response.json({ "status": "Unauthorized User!!" });
        }
    })


};


exports.adminStaffSearch = (request, response) => {
    const adminStaffSearchQuery = request.body.adminStaffSearchQuery
    const adminStaffSearcToken = request.headers.token

    jwt.verify(adminStaffSearcToken, "lmsapp", (err, decoded) => {
        if (decoded) {
            if (!adminStaffSearchQuery) {
                return response.json({ "status": "Search Item is required." })
            }
            AdminStaff.adminStaffSearch(adminStaffSearchQuery, (err, data) => {
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



exports.adminStaffLogin = (request, response) => {
    const { Email, Password } = request.body

    const getEmail = request.body.Email
    const getPassword = request.body.Password
    const validationErrors = {}

    if (!Validator.isValidEmail(Email).isValid) {
        validationErrors.email = Validator.isValidEmail(Email).message;
    }

    if (Validator.isEmpty(Password).isValid) {
        validationErrors.password = Validator.isEmpty(Password).message;
    }

    if (Object.keys(validationErrors).length > 0) {
        return response.json({ "status": "Validation failed", "data": validationErrors });
    }


    AdminStaff.findByEmail(Email, (err, admin_staff) => {
        if (err) {

            return response.json({ "status": err })

        } else {
            const passwordMatch = bcrypt.compareSync(Password, admin_staff.Password)

            if (passwordMatch) {
                jwt.sign({ Email: getEmail, Password: getPassword }, "lmsappadmstaff", { expiresIn: "30m" },
                    (error, token) => {
                        if (error) {
                            return response.json({ "status": "Unauthorized user!!" })
                        } else {
                            return response.json({ "status": "Success", "data": admin_staff, "token": token })
                        }
                    }
                )
            } else {
                return response.json({ "status": "Invalid Email or Password!!!" })
            }
        }
    })
}



// Admin-Staff Change Password
exports.adminStaffChangePswd = (request, response) => {
    const { Email, oldAdSfPassword, newAdSfPassword } = request.body;
    const token = request.headers.token;

    // Basic Validation
    const validationErrors = {};
    if (Validator.isEmpty(Email).isValid) {
        validationErrors.Email = "Email is required";
    }
    if (Validator.isEmpty(oldAdSfPassword).isValid) {
        validationErrors.oldAdSfPassword = "Old password is required";
    }
    if (Validator.isEmpty(newAdSfPassword).isValid) {
        validationErrors.newAdSfPassword = "New password is required";
    }
    if (oldAdSfPassword === newAdSfPassword) {
        validationErrors.newAdSfPassword = "Old password and new password cannot be same";
    }
    if (!Validator.isValidPassword(newAdSfPassword).isValid) {
        validationErrors.newAdSfPassword = "New password is not valid";
    }

    // If validation fails
    if (Object.keys(validationErrors).length > 0) {
        return response.json({ "status": "Validation failed", "data": validationErrors });
    }

    // JWT Verification
    jwt.verify(token, "lmsappadmstaff", (error, decoded) => {
        if (error) {
            return response.json({ "status": "Unauthorized User!!" });
        }

        if (decoded) {
            AdminStaff.asChangePassword({ Email, oldAdSfPassword, newAdSfPassword }, (err, result) => {
                if (err) {
                    return response.json({ "status": err });
                }
                return response.json({ "status": "success" });
            });
        } else {
            return response.json({ "status": "Unauthorized User!!" });
        }
    });
};

exports.searchCollegesByAdminStaff = (request, response) => {
    const collegeSearchQuery = request.body.collegeSearchQuery;
    const collegeSearchToken = request.headers.token;

    jwt.verify(collegeSearchToken, "lmsappadmstaff", (err, decoded) => {
        if (decoded) {
            if (!collegeSearchQuery) {
                console.log("Search Item is required.");
                return response.json({ "status": "Search Item is required." });
            }

            AdminStaff.searchCollegesByAdminStaff(collegeSearchQuery, (err, data) => {
                if (err) {
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


exports.viewAdminStaffProfile = (request, response) => {
    const { id } = request.body;
    const admStaffProfileToken = request.headers.token

    if (!id) {
        return response.json({ "status": "Invalid Admin staff ID" });
    }

    if (!admStaffProfileToken) {
        return response.json({ "status": "Token is required." });
    }

    jwt.verify(admStaffProfileToken, "lmsappadmstaff", (err, decoded) => {
        if (!decoded) {
            return response.json({ "status": "Unauthorized User!!" });
        }

        AdminStaff.viewAdminStaffProfile(id, (err, data) => {
            if (err) {
                console.error("Error while fetching profile:", err);
                return response.json({ "status": err });
            }

            return response.json({ "status": "success", "data": data });
        });
    });
};


// View Submitted Tasks By AdminStaff
exports.adsfViewSubmttedTask = (request, response) => {
    viewSubmittedTaskToken = request.headers.token
    jwt.verify(viewSubmittedTaskToken, "lmsappadmstaff", (error, decoded) => {
        if (decoded) {
            AdminStaff.viewSubmittedTask((error, data) => {
                if (error) {
                    return response.json({ "status": error });
                } else {
                    return response.json({ "status": "Success", "data": data });
                }
            })
        } else {
            return response.json({ "status": "Unauthorized access!!" })
        }
    })
}


exports.viewOneAdminStaff = (request, response) => {
    const trainerToken = request.headers.token;
    const key = request.headers.key; //give respective keys of admin and adminstaff
    const id = request.body.id;

    jwt.verify(trainerToken, key, (err, decoded) => {
        if (decoded) {
            AdminStaff.viewOneAdminStaff(id, (err, data) => {
                if (err) {
                    return response.json({ "status": err });
                }
                if (data.length === 0) {
                    return response.json({ "status": "No Admin staff are currently active" });
                } else {
                    return response.json({ "status": "success", "data": data });
                }
            });
        } else {
            return response.json({ "status": "Unauthorized access!!" });
        }
    });
};

exports.AdmViewAllMaterial = (request, response) => {
    const admstaffToken = request.headers.token
    const key = request.headers.key;
    jwt.verify(admstaffToken, key, (err, decoded) => {
        if (decoded) {
            AdminStaff.AdmViewAllMaterial((err, data) => {
                if (err) {
                    console.log(err)
                    return response.json({ "status": err })
                } else {
                    return response.json(data)
                }
            })
        } else {
            return response.json({ "status": "Unauthorized User!!" })
        }
    })
}

exports.viewOneMaterial = (request, response) => {
    const materialToken = request.headers.token;
    const key = request.headers.key; //give respective keys of admin and adminstaff
    const materialId = request.body.id;

    jwt.verify(materialToken, key, (err, decoded) => {
        if (decoded) {
            AdminStaff.viewOneMaterial(materialId, (err, data) => {
                if (err) {
                    return response.json({ "status": err });
                }
                if (data.length === 0) {
                    return response.json({ "status": "No Material Found" });
                } else {
                    return response.json({ "status": "success", "Material": data });
                }
            });
        } else {
            return response.json({ "status": "Unauthorized access!!" });
        }
    });
};


exports.searchSubmittedTask = (request, response) => {
    const subTaskSearchQuery = request.body.subTaskSearchQuery;
    const searchSubmittedTaskToken = request.headers.token;

    jwt.verify(searchSubmittedTaskToken, "lmsappadmstaff", (error, decoded) => {
        if (decoded) {
            if (!subTaskSearchQuery) {
                console.log("Search Item is required.");
                return response.json({ "status": "Search Item is required." });
            }
            AdminStaff.searchSubmittedTask(subTaskSearchQuery, (error, data) => {
                if (error) {
                    return response.json({ "status": error });
                } else {
                    if (data.length === 0) {
                        return response.json({ "status": "No Search Items Found." });
                    } else {
                        return response.json({ "status": "Result Found", "data": data });
                    }
                }
            })
        } else {
            return response.json({ "status": "Unauthorized access!!" })
        }
    })
}

// Function to handle forgot password request
exports.forgotPassword = (request, response) => {
    const email = request.body.Email
    // Generate and hash OTP
    AdminStaff.forgotPassGenerateAndHashOTP(email, (err, otp) => {
        if (err) {
            return response.json({ "status": err });
        } else {
            let admstaffotp = otp
            AdminStaff.searchadminstaffbyemail(email, (err, data) => {
                let adminstaffName = data
                // Send OTP to email
                const mailSent = sendOTPEmail(email, adminstaffName, admstaffotp);
                if (mailSent) {
                    return response.json({ "status": "OTP sent to email." });
                } else {
                    return response.json({ "status": "Failed to send OTP." });
                }
            })
        }
    });
};

// Function to send OTP
function sendOTPEmail(email, adminstaffName, admstaffotp) {
    const otpVerificationHTMLContent = mailContents.AdminStaffOTPVerificationHTMLContent(adminstaffName, admstaffotp);
    const otpVerificationTextContent = mailContents.AdminStaffOTPVerificationTextContent(adminstaffName, admstaffotp);
    mail.sendEmail(email, 'Password Reset Request', otpVerificationHTMLContent, otpVerificationTextContent)
    return true; // Placeholder
}



// Function to verify OTP and update password
exports.verifyOtp = (req, res) => {
    // Extract email and OTP from request body
    const email = req.body.Email;
    const otp = req.body.otp;

    // Input validation (basic example)
    if (!email || !otp) {
        return res.json({ "status": "Email and OTP are required" });
    }

    // Call the model function to verify the OTP
    AdminStaff.verifyOTP(email, otp, (err, result) => {
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

exports.admstaffforgotpassword = (request, response) => {
    const { Email, oldAdSfPassword, newAdSfPassword } = request.body;

    const validationErrors = {};

    if (Validator.isEmpty(Email).isValid) {
        validationErrors.Email = "Email is required";
    } else if (Validator.isEmpty(oldAdSfPassword).isValid) {
        validationErrors.oldAdSfPassword = "Old password is required";
    } else if (Validator.isEmpty(newAdSfPassword).isValid) {
        validationErrors.newAdSfPassword = "New password is required";
    } else if (oldAdSfPassword === newAdSfPassword) {
        validationErrors.newAdSfPassword = "Old password and new password cannot be the same";
    } else if (!Validator.isValidPassword(newAdSfPassword).isValid) {
        validationErrors.newAdSfPassword = "New password is not valid";
    }

    if (Object.keys(validationErrors).length > 0) {
        return response.json({ "status": "Validation failed", "data": validationErrors });
    }

    AdminStaff.asChangePassword({ Email, oldAdSfPassword, newAdSfPassword }, (err, result) => {
        if (err) {
            return response.json({ "status": err });
        } else {
            return response.json({ "status": "success" });
        }
    });
}

//OTP Send To Verify Email
exports.emailverification = (request, response) => {
    const email = request.body.Email
    // Generate and hash OTP
    AdminStaff.forgotPassGenerateAndHashOTP(email, (err, otp) => {
        if (err) {
            return response.json({ "status": err });
        } else {
            let admstaffotp = otp
            AdminStaff.searchadminstaffbyemail(email, (err, data) => {
                let adminstaffName = data
                // Send OTP to email
                const mailSent = sendEmailVerificationOTPEmail(email, adminstaffName, admstaffotp);
                if (mailSent) {
                    return response.json({ "status": "OTP sent to email." });
                } else {
                    return response.json({ "status": "Failed to send OTP." });
                }
            })
        }
    });
};

function sendEmailVerificationOTPEmail(email, adminstaffName, admstaffotp) {
    const otpVerificationHTMLContent = mailContents.emailverificationAdmStaffHTMLContent(adminstaffName, admstaffotp);
    const otpVerificationTextContent = mailContents.emailverificationAdmStaffTextContent(adminstaffName, admstaffotp);
    mail.sendEmail(email, 'Email Verification!', otpVerificationHTMLContent, otpVerificationTextContent)
    return true; // Placeholder
}


//Verify OTP and Update Email Verified Status
exports.emailVerificationOtpSendVerify = (req, res) => {
    // Extract email and OTP from request body
    const email = req.body.Email;
    const otp = req.body.otp;

    // Input validation (basic example)
    if (!email || !otp) {
        return res.json({ "status": "Email and OTP are required" });
    }

    // Call the model function to verify the OTP
    AdminStaff.emailVerificationOtpSendVerify(email, otp, (err, result) => {
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