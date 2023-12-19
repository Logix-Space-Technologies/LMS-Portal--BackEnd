const db=require('../models/db')
const {response}=require('express')



const College = function(college) {
    this.id = batches.id;
    this.collegeName = college.collegeName;
    this.collegeAddress = college.collegeAddress;
    this.website = college.website;
    this.email = college.email;
    this.collegePhNo = college.collegePhNo;
    this.collegeImage = college.collegeImage;
};

College.collegeCreate = (newCollege, result) => {
    if (newCollege.collegeName !== "" && newCollege.collegeName !== null) {
        db.query("SELECT * FROM college WHERE email=?", newCollege.email, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            } else {
                if (res.length > 0) {
                    console.log("Email already exists");
                    result(null, "Email already exists" );
                    return;
                } else {
                    db.query("INSERT INTO college SET ?", newCollege, (err, res) => {
                        if (err) {
                            console.log("error: ", err);
                            result(null, err);
                            return;
                        } else {
                            console.log("Added College: ", { id: res.id, ...newCollege });
                            result(null, { id: res.id, ...newCollege });
                        }
                    });
                }
            }
        });
    } else {
        result(null, { "status": "Content cannot be empty!" });
    }
};


College.collegeView = async(result) =>{
    let query ="SELECT * FROM college WHERE deleteStatus= 0 AND isActive= 1"
    db.query(query, (err, response) => {
        if(err){
            console.log("error: ",err)
            result(null,err)
            return
        }else{
            console.log("College: ",response)
            result(null,response)
        }
    })
}



module.exports = College;
