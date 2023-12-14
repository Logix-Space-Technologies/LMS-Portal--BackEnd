const express = require('express')
const router = express.Router()
const AdminController = require('../controllers/admin.controller')
const CollegeController = require('../controllers/college.controller')
const AdminStaffController = require('../controllers/adminStaff.controller')

// router.post("/", admin.adminRegister)
router.post("/", AdminController.adminLogin)

router.post("/addCollege",CollegeController.collegeCreate)

router.post("/viewCollege",CollegeController.viewCollege)

router.post("/addAdminStaff",AdminStaffController.create)

router.post("/viewadmstaff",AdminStaffController.viewadmstaff)
//view admin staff routing


module.exports = router