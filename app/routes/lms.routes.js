const express = require('express')
const router = express.Router()
const AdminController = require('../controllers/admin.controller')
const CollegeController = require('../controllers/college.controller')
const AdminStaffController = require('../controllers/adminStaff.controller')
const ClgStaffController=require("../controllers/clgStaff.controller")

// router.post("/", admin.adminRegister)
router.post("/", AdminController.adminLogin)

router.post("/addCollege",CollegeController.collegeCreate)

router.post("/viewCollege",CollegeController.viewCollege)

router.post("/addAdminStaff",AdminStaffController.create)


router.post("/addclgstaff",ClgStaffController.clgStaffCreate)

router.post("/viewadmstaff",AdminStaffController.viewadmstaff)


router.post("/viewcollegestaff",ClgStaffController.viewCollegeStaff)

router.post("/updateClgStaff/:id", ClgStaffController.collegeStaffUpdate);

module.exports = router