const db = require('../models/db')

const Admin = function(admin){
    this.userName = admin.userName
    this.Password = admin.Password
}

Admin.create = (newAdmin, result) =>{
    db.query("INSERT INTO admin SET ?", newAdmin,(err,res)=>{

        if (err) {
            console.log("Error: ", err)
            result(err,null)
            return

        } else {
            console.log("Admin : ",{id:res.id, ...newAdmin})
            result(null, {id:res.id, ...newAdmin})
            
        }
    })
}

module.exports = Admin