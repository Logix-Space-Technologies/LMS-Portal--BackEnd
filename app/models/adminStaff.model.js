const { response } = require("express")
const db = require("../models/db")

const AdminStaff = function(adminStaff){
    this.AdStaffName = adminStaff.AdStaffName
    this.PhNo = adminStaff.PhNo
    this.Address = adminStaff.Address
    this.AadharNo = adminStaff.AadharNo
    this.Email = adminStaff.Email
    this.Password = adminStaff.Password
    
}



AdminStaff.create = (newAdminStaff, result)=>{
    if (newAdminStaff.AdStaffName!="" && newAdminStaff.AdStaffName != null) {
        db.query("INSERT INTO admin_staff SET ?", newAdminStaff, (err,res)=>{
            console.log(newAdminStaff)
            if (err) {
                console.log("error: ", err)
                result(null,err)
                return
                
            } else {
                console.log("Added Admin Staff: ",{id: res.id, ...newAdminStaff})
                result(null,{id: res.id, ...newAdminStaff})

                
            }
        })
        
    } else {
        response.json({"status":"Content cannot be empty!"})
        
    }
}


module.exports = AdminStaff