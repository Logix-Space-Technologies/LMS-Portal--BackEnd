const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Admin = require("../models/admin.model");
const { request, response } = require("express");

const saltRounds = 10;

exports.adminRegister = (request,response) =>{
    const {userName,Password} = request.body

    const hashedPassword = bcrypt.hashSync(Password,saltRounds)

    const newAdmin = new Admin({
        userName,
        Password: hashedPassword,
    })

    Admin.create(newAdmin, (err, data)=>{

        if (newAdmin.userName!="" && newAdmin.Password!=null) {

            if (err) {
                response.json({"status" : err})
            } else {
                response.json({"status" : "Success", "data" : data })
            }

        } else {
            response.json({"status" : "Username cannot be empty !!!!"})
        }

    })
}