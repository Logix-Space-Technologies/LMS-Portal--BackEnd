const express = require('express')
const router = express.Router()
const AdminController = require('../controllers/admin.controller')
const CollegeController = require('../controllers/college.controller')
const AdminStaffController = require('../controllers/adminStaff.controller')
const ClgStaffController=require("../controllers/clgStaff.controller")

const taskController = require("../controllers/task.controller");

const BatchesController= require("../controllers/batches.controller") 
const ClgStaffLogController  = require("../controllers/collegeStaffLog.controller")
const AdminStaffLogController = require("../controllers/adminStaffLog.controller")

const StudentController=require('../controllers/student.controller')
const RefundController = require("../controllers/refund.controller")
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

router.post("/viewallcollegestaff", ClgStaffController.viewAllCollegeStaff);

router.post("/addBatches",BatchesController.batchCreate)

router.post("/deletebatch", BatchesController.batchDelete)

router.post("/deleteadmstaff",AdminStaffController.admStaffDelete)

router.post("/admchangepwd",AdminController.adminChangePwd)

router.post("/viewAllBatches",BatchesController.batchView)

router.post("/updateAdminStaff",AdminStaffController.adminStaffUpdate)


router.post("/searchBatch",BatchesController.searchBatch)


router.post("/addtask", taskController.createTask);

router.post("/updatetask", taskController.taskUpdate);


router.post("/deleteTask",taskController.taskDelete)

router.post("/updateBatch", BatchesController.batchUpdate);

router.post('/searchCollegeStaff', ClgStaffController.searchCollegeStaff);

router.post("/viewtasks",taskController.taskView)

router.post("/searchCollege",CollegeController.searchCollege)

router.post("/searchAdminStaff",AdminStaffController.adminStaffSearch)

router.post("/viewClgStaffLog",ClgStaffLogController.viewCollegeStaffLog)

router.post("/viewalladmstafflog",AdminStaffLogController.viewAdminStaffLog)

router.post("/searchTasks",taskController.searchTask)


router.post("/clgStaffLogin",ClgStaffController.collegeStaffLogin)

router.post("/studreg",StudentController.createStudent)

router.post("/studViewTask",StudentController.studentTaskView)

router.post("/studentLogin",StudentController.studLog)

router.post("/AdminStaffLogin", AdminStaffController.adminStaffLogin)

router.post("/CollegeStaffViewBatch", ClgStaffController.collegeStaffViewBatch)

router.post("/searchStudent",ClgStaffController.searchStudentByCollegeId)


router.post("/refundRequest",RefundController.createRefundRequest)


router.post("/adminStaffChangePassword",AdminStaffController.adminStaffChangePswd)

router.post("/collegeStaffChangePassword",ClgStaffController.collegeStaffChangePassword)


module.exports = router