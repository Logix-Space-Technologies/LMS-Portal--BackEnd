const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AdminStaff = require("../models/adminStaff.model");
const { request, response } = require("express");

const saltRounds = 10;

exports.create = (request, response) => {
    const adminstaff = new AdminStaff({
        AdStaffName: request.body.AdStaffName,
        PhNo: request.body.PhNo,
        Address: request.body.Address,
        AadharNo: request.body.AadharNo,
        Email: request.body.Email,
        Password: request.body.Password,
    });

    const token = request.body.token;

    
    bcrypt.hash(adminstaff.Password, saltRounds, (err, hashedPassword) => {
        if (err) {
            response.json({ "status": err });
        } else {
            adminstaff.Password = hashedPassword;

            AdminStaff.create(adminstaff, (err, data) => {
                if (adminstaff.AdStaffName != "" && adminstaff.AdStaffName != null) {
                    if (err) {
                        response.json({ "status": err });
                    } else {
                        jwt.verify(token, "lmsapp", (error, decoded) => {
                            if (decoded) {
                                response.json({ "status": "success", "data": data });
                            } else {
                                response.json({ "status": "Unauthorized User!!" });
                            }
                        });
                    }
                } else {
                    response.json({ "status": "Content cannot be empty." });
                }
            });
        }
    });
};
