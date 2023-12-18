const express = require('express')
const router = express.Router()
const AdminController = require('../controllers/admin.controller')
const CollegeController = require('../controllers/college.controller')
const AdminStaffController = require('../controllers/adminStaff.controller')
const ClgStaffController=require("../controllers/clgStaff.controller")
const BatchesController= require("../controllers/batches.controller") 

// router.post("/", admin.adminRegister)
router.post("/", AdminController.adminLogin)

router.post("/addCollege",CollegeController.collegeCreate)

router.post("/viewCollege",CollegeController.viewCollege)

router.post("/addAdminStaff",AdminStaffController.create)

router.post("/addclgstaff",ClgStaffController.clgStaffCreate)

router.post("/viewadmstaff",AdminStaffController.viewadmstaff)

router.post("/updateClgStaff", ClgStaffController.collegeStaffUpdate);

router.post("/deletecolgstaff/:id",ClgStaffController.clgStaffDelete);

router.post("/updateCollege/:id", CollegeController.updateCollege)

router.post('/deleteCollege/:id',CollegeController.deleteCollege)

router.post("/viewallcollegestaff", ClgStaffController.viewCollegeStaff);

router.post("/viewonecollegestaff", ClgStaffController.viewOneCollegeStaff) //for viewing college staffs of a single college

router.post("/addBatches",BatchesController.batchCreate)

router.post("/deleteBatch", BatchesController.batchDelete)






module.exports = router