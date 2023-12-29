const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AdminStaff = require("../models/adminStaff.model");
const Validator = require("../config/data.validate");
const { request, response } = require("express");

const saltRounds = 10;

exports.create = (request, response) => {
    const { AdStaffName, PhNo, Address, AadharNo, Email, Password } = request.body;
    const adstaffToken = request.body.token;

    // Checking token validation
    jwt.verify(adstaffToken, "lmsapp", (tokenError, decoded) => {
        if (!decoded) {
            return response.json({ "status": "Unauthorized User !!! " });
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
                    response.json({ "status": createError });
                } else {
                    response.json({ "status": "success", "data": data });
                }
            });
        });
    });
};


exports.viewalladmstaff = (request, response) => {
    const admstaffToken = request.body.token
    jwt.verify(admstaffToken, "lmsapp", (err, decoded) => {
        if (decoded) {
            AdminStaff.getAlladmstaff((err, data) => {
                if (err) {
                    console.log(err)
                    response.json({ "status": err })
                } else {
                    response.json(data)
                }
            })
        } else {
            response.json({ "status": "Unauthorized User!!" })
        }
    })
}



exports.adminStaffUpdate = (request, res) => {
    const { AdStaffName, PhNo, Address, AadharNo } = request.body;
    const token = request.body.token;

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
            validationErrors.mobile = Validator.isValidMobileNumber(request.body.PhNo).message;
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
    const deleteToken = request.body.token
    console.log(deleteToken)
    jwt.verify(deleteToken, "lmsapp", (err, decoded) => {
        if (decoded) {
            const admStfDlt = new AdminStaff({
                'id': request.body.id
            });
            AdminStaff.admStaffDelete(admStfDlt, (err, data) => {
                if (err) {
                    if (err.kind === "not_found") {
                        console.log("Admin Staff id not found.")
                        response.json({ "status": "Admin Staff id not found." })

                    } else {
                        return response.send({ "status": err })
                    }
                }
                return response.json({ "status": "Admin Staff Deleted." })
            });
        } else {
            response.json({ "status": "Unauthorized User!!" });
        }
    })


};


exports.adminStaffSearch = (request, response) => {
    const adminStaffSearchQuery = request.body.adminStaffSearchQuery
    const adminStaffSearcToken = request.body.token

    jwt.verify(adminStaffSearcToken, "lmsapp", (err, decoded) => {
        if (decoded) {
            if (!adminStaffSearchQuery) {
                console.log("Search Item is required.")
                return response.json({ "status": "Search Item is required." })
            }
            AdminStaff.adminStaffSearch(adminStaffSearchQuery, (err, data) => {
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



exports.adminStaffLogin = (request, response) => {
    const{Email,Password} = request.body
    
    const getEmail = request.body.Email
    const getPassword = request.body.Password

    AdminStaff.findByEmail(Email, (err, admin_staff) => {
        if (err) {
            if (err.kind === "not_found") {
                response.json({ "status": "Admin Staff does not exist" })
            } else {
                response.json({ "status": "Error retrieving Admin Staff details" })

            }

        } else {
            const passwordMatch = bcrypt.compareSync(Password, admin_staff.Password)

            if (passwordMatch) {
                jwt.sign({ Email: getEmail, Password: getPassword }, "lmsappone", { expiresIn: "1d" },
                    (error, token) => {
                        if (error) {
                            response.json({ "status": "Unauthorized user!!" })
                        } else {
                            response.json({ "status": "Success", "data": admin_staff, "token": token })
                        }
                    }

                )
            } else {
                response.json({ "status": "Invalid Email or Password!!!" })
            }
        }
    })
}



// Admin-Staff Change Password
exports.adminStaffChangePswd = (request, response) => {
    const {Email, oldAdSfPassword, newAdSfPassword, token} = request.body

    jwt.verify(token, "lmsappone", (error, decoded) => {
        if (decoded) {
            if(oldAdSfPassword === newAdSfPassword){
                response.json({ "status": "Old password and new password cannot be same." });
                return;
            }
            AdminStaff.asChangePassword({Email, oldAdSfPassword, newAdSfPassword}, (err, result) => {
                if (err) {
                    return response.json({"status" : err})
                }
                const validationErrors = {}

                const passwordValidation = Validator.isValidPassword(newAdSfPassword)
                if (!passwordValidation.isValid) {
                    validationErrors.password = passwordValidation.message
                    return response.json({"status" : validationErrors})
                }

                if (result.status === "Password Updated Successfully.") {
                    const hashedNewPassword = bcrypt.hashSync(newAdSfPassword, 10)

                    AdminStaff.asChangePassword({Email, oldAdSfPassword, newAdSfPassword : hashedNewPassword}, (updateErr, UpdateResult) => {
                        if (updateErr) {
                            return response.json({"status" : updateErr})
                        } else {
                            return response.json({"status" : "Password Updated Successfully."})
                        }
                    })
                } else {
                    return response.json(result)
                }
            })
        } else {
            return response.json({"status" : "Unauthorized User!!"})
        }
    })
}

exports.searchCollegesByAdminStaff = (request, response) => {
    const collegeSearchQuery = request.body.collegeSearchQuery;
    const collegeSearchToken = request.body.token;

    jwt.verify(collegeSearchToken, "lmsappone", (err, decoded) => {
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


exports.adminStaffLogout = (request, response) => {
    const token = request.body.token;
    if (!token) {
        response.json({ "status": "No token found" });
        return;
    }
    jwt.verify(token, 'lmsapp', (err, decoded) => {
        if (err) {
            response.json({ "status": "Token is invalid or expired" });
        } else {
            response.clearCookie('token');
            response.json({ "status": "Logout successful" });
        }
    });
};
