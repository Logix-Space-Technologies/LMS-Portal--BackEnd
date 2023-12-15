const { response } = require("express")
const db = require("../models/db")

const AdminStaff = function (adminStaff) {
    this.AdStaffName = adminStaff.AdStaffName
    this.PhNo = adminStaff.PhNo
    this.Address = adminStaff.Address
    this.AadharNo = adminStaff.AadharNo
    this.Email = adminStaff.Email
    this.Password = adminStaff.Password



}

const MIN_PASSWORD_LENGTH = 8
const MAX_PASSWORD_LENGTH = 12


AdminStaff.create = (newAdminStaff, result) => {
    const admPassword = newAdminStaff.Password.length
    if (admPassword >= MIN_PASSWORD_LENGTH && admPassword <= MAX_PASSWORD_LENGTH) {

        if (newAdminStaff.AdStaffName != "" && newAdminStaff.AdStaffName != null) {
            db.query("SELECT * FROM admin_staff WHERE Email=?", newAdminStaff.Email, (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                } else {
                    if (res.length > 0) {
                        console.log("Email already exists");
                        result("Email already exists", null);
                        return;

                    } else {


                        db.query("INSERT INTO admin_staff SET ?", newAdminStaff, (err, res) => {
                            console.log(newAdminStaff)
                            if (err) {
                                console.log("error: ", err)
                                result(err, null)
                                return

                            } else {
                                console.log("Added Admin Staff: ", { id: res.id, ...newAdminStaff })
                                result(null, { id: res.id, ...newAdminStaff })


                            }
                        })



                    }

                }
            })


        } else {
            response.json({ "status": "Content cannot be empty!" })

        }

    } else {
        response.json({ "status": "Password length should be between 8 and 12 characters!!" })

    }
}









module.exports = AdminStaff