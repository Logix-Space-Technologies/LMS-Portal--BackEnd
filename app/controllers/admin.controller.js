const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Admin = require("../models/admin.model");
const Validator = require('../config/data.validate')
const { AdminStaffLog, logAdminStaff } = require("../models/adminStaffLog.model")
const firebaseAdmin = require('firebase-admin')

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
        type: process.env.TYPE,
        project_id: process.env.PROJECT_ID,
        private_key_id: process.env.PRIVATE_KEY_ID,
        private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'), 
        client_email: process.env.CLIENT_EMAIL,
        client_id: process.env.CLIENT_ID,
        auth_uri: process.env.AUTH_URI,
        token_uri: process.env.TOKEN_URI,
        auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
        universe_domain: process.env.UNIVERSE_DOMAIN
    })
});

exports.sendNotifications = (request, response) => {
    const token = request.body.token;
    const message = request.body.message;
    const payload = {
        notification: {
            title: "New Notification",
            body: message
        }
    };

    // Send notification to the device
    firebaseAdmin.messaging().sendToDevice(token, payload)
        .then((sendResponse) => {
            console.log('Notification sent successfully:', sendResponse);
            return response.status(200).send({ status: "success", data: 'Notification sent successfully' });
        })
        .catch((error) => {
            console.error('Error sending notification:', error);
            return response.status(500).send({ status: "failed", data: 'Failed to send notification', error: error });
        });
};


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
                            logAdminStaff(0, "Admin Logged In")
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
    const token = request.headers.token;

    // Basic Validation
    const validationErrors = {};
    if (Validator.isEmpty(userName).isValid) {
        validationErrors.userName = "Username is required";
    }
    if (Validator.isEmpty(oldPassword).isValid) {
        validationErrors.oldPassword = "Old password is required";
    }
    if (Validator.isEmpty(newPassword).isValid) {
        validationErrors.newPassword = "New password is required";
    }
    if (oldPassword === newPassword) {
        validationErrors.newPassword = "Old password and new password cannot be the same";
    }
    if (!Validator.isValidPassword(newPassword).isValid) {
        validationErrors.newPassword = "New password is not valid";
    }

    // If validation fails
    if (Object.keys(validationErrors).length > 0) {
        return response.json({ "status": "Validation failed", "data": validationErrors });
    }

    // JWT Verification
    jwt.verify(token, "lmsapp", (error, decoded) => {
        if (decoded) {
            Admin.adminChangePassword({ userName, oldPassword, newPassword }, (err, result) => {
                if (err) {
                    return response.json({ "status": err });
                } else {
                    return response.json({ "status": "success" });
                }
            });
        } else {
            return response.json({ "status": "Unauthorized User!!" });
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
            return response.json({ "status": "Unauthorized User!!!" });
        }
    });


}

exports.viewAdminLog = (request, response) => {
    const adminLogToken = request.headers.token
    const key = request.headers.key
    jwt.verify(adminLogToken, key, (err, decoded) => {
        if (decoded) {
            Admin.getAll((err, data) => {
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

exports.adminforgotpassword = (request, response) => {
    const { userName, oldPassword, newPassword } = request.body;
    // Basic Validation
    const validationErrors = {};
    if (Validator.isEmpty(userName).isValid) {
        validationErrors.userName = "Username is required";
    } else if (Validator.isEmpty(oldPassword).isValid) {
        validationErrors.oldPassword = "Old password is required";
    } else if (Validator.isEmpty(newPassword).isValid) {
        validationErrors.newPassword = "New password is required";
    } else if (oldPassword === newPassword) {
        validationErrors.newPassword = "Old password and new password cannot be the same";
    } else if (!Validator.isValidPassword(newPassword).isValid) {
        validationErrors.newPassword = "New password is not valid";
    }

    // If validation fails
    if (Object.keys(validationErrors).length > 0) {
        return response.json({ "status": "Validation failed", "data": validationErrors });
    }

    Admin.adminChangePassword({ userName, oldPassword, newPassword }, (err, result) => {
        if (err) {
            return response.json({ "status": err });
        } else {
            return response.json({ "status": "success" });
        }

    });

}