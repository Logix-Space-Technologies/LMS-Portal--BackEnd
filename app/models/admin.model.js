const db = require('../models/db')
const bcrypt=require('bcrypt')
const Admin = function(admin){
    this.userName = admin.userName
    this.Password = admin.Password
}


// Admin.create = (newAdmin, result) =>{
//     db.query("INSERT INTO admin SET ?", newAdmin,(err,res)=>{

//         if (err) {
//             console.log("Error: ", err)
//             result(err,null)
//             return

//         } else {
//             console.log("Admin : ",{id:res.id, ...newAdmin})
//             result(null, {id:res.id, ...newAdmin})
            
//         }
//     })
// }



Admin.findByUserName = (username,result)=>{
    db.query("SELECT * FROM admin WHERE userName = ?", username, (err,res)=>{

        if (err) {
            console.log("Error : ", err)
            result(err, null)
            return
        }

        if (res.length) {
            result(null, res[0])
            return
        }

        result({kind : "not_found"}, null)

    })
}



Admin.changePassword = (ad, result) => {
    // Retrieve the hashed old password from the database
    const getPasswordQuery = "SELECT Password FROM admin WHERE userName = ?";
    db.query(getPasswordQuery, [ad.userName], (getPasswordErr, getPasswordRes) => {
        if (getPasswordErr) {
            console.log("Error: ", getPasswordErr);
            result(getPasswordErr, null);
            return;
        }

        if (getPasswordRes.length > 0) {
            const hashedOldPassword = getPasswordRes[0].Password;

            // Compare the hashed old password with the provided old password
            if (bcrypt.compareSync(ad.oldPassword, hashedOldPassword)) {
                const updatePasswordQuery = "UPDATE admin SET Password = ?, updateStatus = 1 WHERE userName = ?";
                const hashedNewPassword = bcrypt.hashSync(ad.newPassword, 10);

                db.query(updatePasswordQuery, [hashedNewPassword, ad.userName], (updateErr) => {
                    if (updateErr) {
                        console.log("Error: ", updateErr);
                        result(updateErr, null);
                        return;
                    } else {
                        result(null, { status: "Password Updated Successfully!!!" });
                    }
                });
            } else {
                result(null, { status: "Incorrect Old Password!!!" });
            }
        } else {
            result(null, { status: "User not found!!!" });
        }
    });
};







module.exports = Admin