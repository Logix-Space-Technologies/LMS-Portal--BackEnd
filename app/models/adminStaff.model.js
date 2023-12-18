const { response } = require("express")
const db = require("../models/db")

const AdminStaff = function (adminStaff) {
    this.id=adminStaff.id
    this.AdStaffName = adminStaff.AdStaffName
    this.PhNo = adminStaff.PhNo
    this.Address = adminStaff.Address
    this.AadharNo = adminStaff.AadharNo
    this.Email = adminStaff.Email
    this.Password = adminStaff.Password

}



AdminStaff.create = (newAdminStaff, result) => {
    if (newAdminStaff.AdStaffName != "" && newAdminStaff.AdStaffName != null) {
        db.query("SELECT * FROM admin_staff WHERE Email=?", newAdminStaff.Email, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            } else {
                if (res.length > 0) {
                    console.log("Email already exists");
                    result(null, "Email already exists",null);
                    return;

                } else {


                    db.query("INSERT INTO admin_staff SET ?", newAdminStaff, (err, res) => {
                        console.log(newAdminStaff)
                        if (err) {
                            console.log("error: ", err)
                            result(null, err)
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
}

AdminStaff.getAlladmstaff = async (result) => {
    let query = "SELECT * FROM admin_staff"
    db.query(query, (err, res) => {
        if (err) {
            console.log("error: ",err)
            result(null,err)
            return
        } else {
            console.log("Adminstaffs: ",res)
            result(null,res)
            
        }
    })
}


AdminStaff.admStaffDelete = (admStaffId, result) => {
    db.query("UPDATE admin_staff SET isActive=0, deleteStatus=1 WHERE id=?",[admStaffId.id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err,null);
        return;
      } 
      if(res.affectedRows === 0){
        result({ kind: "not_found"}, null)
        return
    }

    console.log("Delete admin staff with id: ",{id:admStaffId.id})
    result(null,{id:admStaffId.id})
    });
  };
  





module.exports = AdminStaff