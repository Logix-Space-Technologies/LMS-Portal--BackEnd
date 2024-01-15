const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Admin = require("../models/admin.model");
const Validator = require('../config/data.validate')
const { AdminStaffLog, logAdminStaff } = require("../models/adminStaffLog.model")



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
    const validationErrors = {}

    if (Validator.isEmpty(userName).isValid) {
        validationErrors.username = Validator.isEmpty(userName).message;
    }

    if (Validator.isEmpty(Password).isValid) {
        validationErrors.password = Validator.isEmpty(Password).message;
    }

    if (Object.keys(validationErrors).length > 0) {
        return response.json({ "status": "Validation failed", "data": validationErrors });
    }

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
                            logAdminStaff(0,"Admin Logged In")
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
    const { userName, oldPassword, newPassword } = request.body;
    const token = request.headers.token

    jwt.verify(token, "lmsapp", (error, decoded) => {
        if (decoded) {
            Admin.changePassword({ userName, oldPassword, newPassword }, (err, result) => {
                if (err) {
                    return response.json({ "status": err });
                }
                if (oldPassword === newPassword) {
                    return response.json({ "status": "Old Password and New Password cannot be same." })
                }

                const validationErrors = {};

                const passwordValidation = Validator.isValidPassword(newPassword);

                if (!passwordValidation.isValid) {
                    validationErrors.password = passwordValidation.message;
                    return response.json({ "status": validationErrors });
                }

                if (result.status === "Password Updated Successfully!!!") {
                    const hashedNewPassword = bcrypt.hashSync(newPassword, 10);

                    Admin.changePassword({ userName, oldPassword, newPassword: hashedNewPassword }, (updateErr, updateResult) => {
                        if (updateErr) {
                            return response.json({ "status": updateErr });
                        } else {
                            logAdminStaff(0,"Admin Password Changed")
                            return response.json({ "status": "Password Successfully Updated!!!" });
                        }
                    });
                } else {
                    return response.json(result);
                }
            });

        } else {
            response.json({ "status": "Unauthorized User!!!" });
        }
    });
};


exports.adminDashBoards = (request, response) => {
    jwt.verify(request.headers.token, "lmsapp", (error, decoded) => {
        if (decoded) {
            Admin.adminDashBoard((err, result) => {
                if (err) {
                    return response.json({ "status": err });
                } else {
                    return response.json({ "status": "Success", "data": result });
                }
            });
        } else {
            response.json({ "status": "Unauthorized User!!!" });
        }
    });


}

exports.viewAdminLog = (request, response) => {
    const adminLogToken = request.headers.token
    const key=request.headers.key
    jwt.verify(adminLogToken, key, (err, decoded) => {
        if (decoded) {
            Admin.getAll((err, data) => {
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