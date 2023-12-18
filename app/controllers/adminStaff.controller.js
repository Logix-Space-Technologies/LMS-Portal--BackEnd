const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AdminStaff = require("../models/adminStaff.model");

const saltRounds = 10;

exports.create = (request, response) => {
    const { AdStaffName, PhNo, Address, AadharNo, Email, Password } = request.body;
    const adstaffToken=request.body.token
    // Validation for AdStaffName
    if (!AdStaffName || AdStaffName.trim() === "") {
        return response.json({ "status": "AdStaffName cannot be empty" });
    }

    // Validation for PhNo
    if (!PhNo || !/^\+91[6-9][0-9]{9}$/.test(PhNo)) {
        return response.json({ "status":"Invalid Phone Number" });
    }

    // Validation for Address
    if (!Address || Address.length > 100) {
        return response.json({ "status":"Address cannot be empty and should not exceed 100 characters" });
    }

    // Validation for AadharNo
    if (!AadharNo || !/^\d{12}$/.test(AadharNo)) {
        return response.json({ "status":"Invalid Aadhar Number" });
    }

    // Validation for Email
    if (!Email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email)) {
        return response.json({ "status":"Invalid Email" });
    }

    // Validation for Password
    if (!Password || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!*#a-zA-Z\d]).{8,12}$/.test(Password)) {
        return response.json({ "status": "Password should have minimum 8 and maximum 12 characters and have at least one lowercase letter, one uppercase letter, and one digit." });
    }
    

    // Generate a salt and hash the password
    bcrypt.hash(Password, saltRounds, (err, hashedPassword) => {
        if (err) {
            return response.json({ "status": err });
        }

        const newAdminStaff = new AdminStaff({
            AdStaffName: AdStaffName,
            PhNo: PhNo,
            Address: Address,
            AadharNo: AadharNo,
            Email: Email,
            Password: hashedPassword
        });

        AdminStaff.create(newAdminStaff, (err, data) => {
            if (err) {
                response.json({ "status": err });
            } else {
                jwt.verify(adstaffToken,"lmsapp",(err,decoded)=>{
                    if (decoded) {
                        response.json({ "status": "success", "data": data });
                    } else {
                        response.json({ "status": "Unauthorized User !!! "});
                    }
                })
            }

        });
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
