const db = require('../models/db')

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









module.exports = Admin