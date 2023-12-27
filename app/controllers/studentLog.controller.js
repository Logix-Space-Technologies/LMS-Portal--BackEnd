const jwt = require("jsonwebtoken")
const Student = require("../models/studentLog.model")
const { request, response } = require("express")
const bcrypt = require("bcrypt")


exports.studLog = (request, response) =>{
    const { studEmail, password } = request.body

    const getStudEmail = request.body.studEmail
    const getPassword = request.body.password

    Student.findByEmail(studEmail, (err, student) => {
        console.log(studEmail)
        if (err) {
            if (err.kind === "not_found") {
                response.json({ "status" : "Student does not Exist."})
            } else {
                response.json({"status" : "Error retrieving student details"})
            }
        } else {
            const passwordMatch = bcrypt.compareSync(password, student.password)
            console.log(passwordMatch)
            if (passwordMatch) {
                jwt.sign({ studEmail: getStudEmail, password:getPassword }, "lmsapp", { expiresIn: "1d"},
                (error, token) =>{
                    if (error) {
                        response.json({ "status": "Unauthorized User!!" })
                    } else {
                        response.json({ "status": "Success", "data": student, "token": token })
                    }
                })
            } else {
                response.json({ "status": "Invalid Email or Password !!!" })
            }
        }
    })
}