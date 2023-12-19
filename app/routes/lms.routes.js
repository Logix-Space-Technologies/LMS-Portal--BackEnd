const express = require('express')
const router = express.Router()
const AdminController = require('../controllers/admin.controller')
const CollegeController = require('../controllers/college.controller')
const AdminStaffController = require('../controllers/adminStaff.controller')
const ClgStaffController=require("../controllers/clgStaff.controller")

const taskController = require("../controllers/task.controller");

const BatchesController= require("../controllers/batches.controller") 


// router.post("/", admin.adminRegister)
router.post("/", AdminController.adminLogin)

router.post("/addCollege",CollegeController.collegeCreate)

router.post("/viewallcolleges",CollegeController.collegeAllView)

router.post("/addAdminStaff",AdminStaffController.create)

router.post("/addclgstaff",ClgStaffController.clgStaffCreate)

router.post("/viewalladmstaff",AdminStaffController.viewalladmstaff)

router.post("/updateClgStaff", ClgStaffController.collegeStaffUpdate);

router.post("/deletecolgstaff", ClgStaffController.clgStaffDelete);

router.post("/updateCollege", CollegeController.updateCollege)

router.post('/deleteCollege',CollegeController.deleteCollege)

router.post("/viewallcollegestaff", ClgStaffController.viewCollegeStaff);

router.post("/viewonecollegestaff", ClgStaffController.viewOneCollegeStaff) //for viewing college staffs of a single college

router.post("/addBatches",BatchesController.batchCreate)

router.post("/deletebatch", BatchesController.batchDelete)

router.post("/deleteadmstaff",AdminStaffController.admStaffDelete)

router.post("/admchangepwd",AdminController.adminChangePwd)

router.post("/viewAllBatches",BatchesController.batchView)

router.post("/updateAdminStaff",AdminStaffController.adminStaffUpdate)


router.post("/searchBatch",BatchesController.searchBatch)


router.post("/addtask", taskController.createTask);


router.post("/deleteTask",taskController.taskDelete)




module.exports = router