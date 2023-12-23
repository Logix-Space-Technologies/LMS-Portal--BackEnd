const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AdminStaff = require("../models/adminStaff.model");
const Validator = require("../config/data.validate")

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
    AdminStaff.getAlladmstaff((err, data) => {
        if (err) {
            console.log(err)
            response.json({ "status": err })
        } else {
            jwt.verify(admstaffToken, "lmsapp", (err, decoded) => {
                if (decoded) {
                    response.json(data)
                } else {
                    response.json({ "status": "Unauthorized User!!" })
                }
            })
        }
    })
}



exports.adminStaffUpdate = (req, res) => {
    const { AdStaffName, PhNo, Address, AadharNo, Email } = req.body;
    // Validation for AdStaffName
    if (!AdStaffName || AdStaffName.trim() === "") {
        return res.json({ "status": "AdStaffName cannot be empty" });
    }

    // Validation for PhNo
    if (!PhNo || !/^\+91[6-9][0-9]{9}$/.test(PhNo)) {
        return res.json({ "status": "Invalid Phone Number" });
    }

    // Validation for Address
    if (!Address || Address.length > 100) {
        return res.json({ "status": "Address cannot be empty and should not exceed 100 characters" });
    }

    // Validation for AadharNo
    if (!AadharNo || !/^\d{12}$/.test(AadharNo)) {
        return res.json({ "status": "Invalid Aadhar Number" });
    }

    // Validation for Email
    if (!Email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email)) {
        return res.json({ "status": "Invalid Email" });
    }



    const admStaff = new AdminStaff({
        'id': req.body.id,
        AdStaffName: AdStaffName,
        PhNo: PhNo,
        Address: Address,
        AadharNo: AadharNo,
        Email: Email,
    });
    AdminStaff.updateAdminStaff(admStaff, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.json({ "status": "Admin Staff with the provided id is not found" });
            } else {
                return res.json({ "status": "Internal server error" });
            }

        }
        const updateAdmtoken = req.body.token;
        jwt.verify(updateAdmtoken, "lmsapp", (error, decoded) => {
            if (decoded) {
                return res.json({ "status": "success", "data": data });
            } else {
                return res.json({ "status": "Unauthorized access!!" });
            }
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
                        console.log(({ status: "Admin Staff id not found." }))

                    } else {
                        return response.send({"status": err })
                    }
                }
                return response.json({"status":"Delete admin staff"})
            });
        } else {
            response.json({ "status": "Unauthorized User!!" });
        }
    })


};

