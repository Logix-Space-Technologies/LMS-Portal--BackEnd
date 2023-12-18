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


            if (adminstaff.AdStaffName != "" && adminstaff.AdStaffName != null) {
                AdminStaff.create(adminstaff, (data, err) => {
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

                });

            } else {
                response.json({ "status": "Content cannot be empty." });
            }


        }
    });
};

exports.viewadmstaff=(request,response)=>{
    const admstaffToken = request.body.token
    AdminStaff.getAlladmstaff((err,data)=>{
        if (err) {
            console.log(err)
            response.json({"status":err})
        } else {
           jwt.verify(admstaffToken,"lmsapp",(err,decoded)=>{
            if (decoded) {
                response.json(data)
            } else {
                response.json({ "status": "Unauthorized User!!" })
            }
           })
        }
    })
}

exports.admStaffDelete = (request, response) => {
    const deleteToken = request.body.token
    const admstaff = new AdminStaff({
        'id': request.body.id
      });
    AdminStaff.admStaffDelete(admstaff, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          console.log(({ status: "Admin Staff id not found." }))
  
        } else {
          response.send({ message: "Error deleting Staff." })
        }
      } else {
        jwt.verify(deleteToken, "lmsapp", (err, decoded) => {
          if (decoded) {
            response.json({"status": "Deleted"})
          } else {
            response.json({ "status": "Unauthorized User!!" });
          }
        })
      }
    });
  };