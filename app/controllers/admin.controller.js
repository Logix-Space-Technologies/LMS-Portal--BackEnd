const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Admin = require("../models/admin.model");
const { request, response } = require("express");
const Validator = require('../config/data.validate')

// const saltRounds = 10;

// exports.adminRegister = (request,response) =>{
//     const {userName,Password} = request.body

//     const hashedPassword = bcrypt.hashSync(Password,saltRounds)

//     const newAdmin = new Admin({
//         userName,
//         Password: hashedPassword,
//     })

//     Admin.create(newAdmin, (err, data)=>{

//         if (newAdmin.userName!="" && newAdmin.Password!=null) {

//             if (err) {
//                 response.json({"status" : err})
//             } else {
//                 response.json({"status" : "Success", "data" : data })
//             }

//         } else {
//             response.json({"status" : "Username cannot be empty !!!!"})
//         }

//     })
// }

exports.adminLogin = (request, response) => {
    const { userName, Password } = request.body

    const getUserName = request.body.userName
    const getPassword = request.body.Password

    Admin.findByUserName(userName, (err, admin) => {

        if (err) {
            if (err.kind === "not_found") {
                response.json({ "status": "Admin does not Exist." })
            } else {
                response.json({ "status": "Error retrieving Admin Details." })
            }
        } else {
            const passwordMatch = bcrypt.compareSync(Password, admin.Password)

            if (passwordMatch) {
                jwt.sign({ userName: getUserName, Password: getPassword }, "lmsapp", { expiresIn: "1d" },
                    (error, token) => {
                        if (error) {
                            response.json({ "status": "Unauthorized User!!" })
                        } else {
                            response.json({ "status": "Success", "data": admin, "token": token })
                        }
                    })
            } else {
                response.json({ "status": "Invalid Username or Password !!!" })
            }

        }
    })
}



exports.adminChangePwd = (request, response) => {
    const { userName, oldPassword, newPassword, token } = request.body;

    jwt.verify(token, "lmsapp", (error, decoded) => {
        if (decoded) {
            Admin.changePassword({ userName, oldPassword, newPassword }, (err, result) => {
                if (err) {
                    return response.json({ status: err });
                }

                const validationErrors = {};

                const passwordValidation = Validator.isValidPassword(newPassword);

                if (!passwordValidation.isValid) {
                    validationErrors.password = passwordValidation.message;
                    return response.json({ status: validationErrors });
                }

                if (result.status === "Password Updated Successfully!!!") {
                    const hashedNewPassword = bcrypt.hashSync(newPassword, 10);

                    Admin.changePassword({ userName, oldPassword, newPassword: hashedNewPassword }, (updateErr, updateResult) => {
                        if (updateErr) {
                            return response.json({ status: updateErr });
                        } else {
                            return response.json({ status: "Password Successfully Updated!!!" });
                        }
                    });
                } else {
                    return response.json(result);
                }
            });

        } else {
            response.json({ status: "Unauthorized User!!!" });
        }
    });
};



