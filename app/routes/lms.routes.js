const express = require('express')
const router = express.Router()
const AdminController = require('../controllers/admin.controller')
const CollegeController = require('../controllers/college.controller')
const AdminStaffController = require('../controllers/adminStaff.controller')
const ClgStaffController = require("../controllers/clgStaff.controller")
const taskController = require("../controllers/task.controller");
const studentLogController = require("../controllers/studentLog.controller");
const BatchesController = require("../controllers/batches.controller")
const ClgStaffLogController = require("../controllers/collegeStaffLog.controller")
const AdminStaffLogController = require("../controllers/adminStaffLog.controller")
const StudentController = require('../controllers/student.controller')
const MaterialController = require('../controllers/material.controller')
const RefundController = require("../controllers/refund.controller")
const SubmitTaskController = require("../controllers/submit_task.controller")
const SessionsController = require('../controllers/session.controller');
const TrainerController = require("../controllers/trainers.controllers")
const NotificationController = require("../controllers/notifications.controller")
const curriculumController = require("../controllers/curriculum.controller")
const AttendenceController = require("../controllers/attendence.controller")
const CommunityManagerController = require("../controllers/communityManager.controller")

// router.post("/", admin.adminRegister)
router.post("/", AdminController.adminLogin)

router.post("/addCollege", CollegeController.collegeCreate)

router.post("/viewallcolleges", CollegeController.collegeAllView)

router.post("/addAdminStaff", AdminStaffController.create)

router.post("/addclgstaff", ClgStaffController.clgStaffCreate)

router.post("/viewalladmstaff", AdminStaffController.viewalladmstaff)

router.post("/updateClgStaff", ClgStaffController.collegeStaffUpdate);

router.post("/viewonecollgestaff", ClgStaffController.viewOneClgStaff);

router.post("/deletecolgstaff", ClgStaffController.clgStaffDelete);

router.post("/updateCollege", CollegeController.updateCollege)

router.post('/deleteCollege', CollegeController.deleteCollege)

router.post("/viewallcollegestaff", ClgStaffController.viewAllCollegeStaff);

router.post("/addBatches", BatchesController.batchCreate)

router.post("/deletebatch", BatchesController.batchDelete)

router.post("/adminviewbatch", BatchesController.batchViewAdmin)

router.post("/deleteadmstaff", AdminStaffController.admStaffDelete)

router.post("/admchangepwd", AdminController.adminChangePwd)

router.post("/viewAllBatches", BatchesController.batchView)

router.post("/updateAdminStaff", AdminStaffController.adminStaffUpdate)

router.post("/viewoneadminstaff", AdminStaffController.viewOneAdminStaff)

router.post("/searchBatch", BatchesController.searchBatch)

router.post("/addtask", taskController.createTask);

router.post("/updatetask", taskController.taskUpdate);

router.post("/deleteTask", taskController.taskDelete)

router.post("/updateBatch", BatchesController.batchUpdate);

router.post("/viewonebatch", BatchesController.viewOneBatch);

router.post('/searchCollegeStaff', ClgStaffController.searchCollegeStaff);

router.post("/viewtasks", taskController.taskView)

router.post("/searchCollege", CollegeController.searchCollege)

router.post("/searchAdminStaff", AdminStaffController.adminStaffSearch)

router.post("/viewClgStaffLog", ClgStaffLogController.viewCollegeStaffLog)

router.post("/viewalladmstafflog", AdminStaffLogController.viewAdminStaffLog)

router.post("/searchTasks", taskController.searchTask)

router.post("/clgStaffLogin", ClgStaffController.collegeStaffLogin)

router.post("/studreg", StudentController.createStudent)

router.post("/studViewTask", StudentController.studentTaskView)

router.post("/studViewTaskOfSessions", StudentController.studentSessionRelatedTaskView)

router.post("/studentLogin", StudentController.studLog)

router.post("/AdminStaffLogin", AdminStaffController.adminStaffLogin)

router.post("/AddMaterials", MaterialController.createMaterial)

router.post("/CollegeStaffViewBatch", ClgStaffController.collegeStaffViewBatch)

router.post("/searchStudent", ClgStaffController.searchStudentByCollegeId)

router.post("/refundRequest", RefundController.createRefundRequest)

router.post("/adminStaffChangePassword", AdminStaffController.adminStaffChangePswd)

router.post("/collegeStaffViewStudent", ClgStaffController.collegeStaffViewStudent)

router.post("/studentChangePassword", StudentController.StdChangePassword)

router.post("/collegeStaffChangePassword", ClgStaffController.collegeStaffChangePassword)

router.post("/searchcollegesByAdminStaff", AdminStaffController.searchCollegesByAdminStaff)

router.post("/studentViewProfile", StudentController.studentViewProfile)

router.post("/studentUpdateProfile", StudentController.profileUpdateStudent)

router.post("/searchMaterial", MaterialController.searchMaterial)

router.post("/getAllRefundRequests", RefundController.getRefundRequests)

router.post("/clgstaffviewtask", ClgStaffController.clgStaffViewTask)

router.post("/studentverificationbyCollegeStaff", ClgStaffController.studentVerificationByCollegeStaff)

router.post("/unverifiedStudents", StudentController.viewUnverifiedStudents)

router.post("/collegeStaffSearchTasks", taskController.collegeStaffSearchTasks)

router.post("/adminDashboard", AdminController.adminDashBoards);

router.post("/viewAllStudByAdmin", StudentController.viewAllStudsByAdmin)

router.post("/viewStudentLog", studentLogController.viewStudentLog)

router.post('/tasksubmissionByStudent', StudentController.taskSubmissionByStudent);

router.post("/clgStaffSearchBatch", ClgStaffController.clgStaffSearchBatches)

router.post("/evaluateTask", SubmitTaskController.evaluateTask)

router.post("/viewRefundStatus", RefundController.getRefundStatus)

router.post("/studentViewEvaluatedTask", StudentController.viewEvaluatedTasks)

router.post("/profileViewByCollegeStaff", ClgStaffController.viewCollegeStaffProfile);

router.post("/profileViewByAdmStaff", AdminStaffController.viewAdminStaffProfile)

router.post("/adSfViewSubmittedTask", AdminStaffController.adsfViewSubmttedTask)

router.post("/admStaffRefundApproval", RefundController.approveRefundRequest)

router.post("/refundamntrcvdstatus", StudentController.refundAmountReceivedStatus)

router.post("/cancelRefundRequest", RefundController.cancelRefundRequest)

router.post("/rejectRefund", RefundController.rejectRefundRequest)

router.post("/viewSuccessfulRefunds", RefundController.getSuccessfulRefunds)

router.post("/searchStudentsByAdmAndAdmstf", StudentController.searchStudentsByAdmAndAdmstf)

router.post("/studregviewbatch", StudentController.studRegViewBatch)

router.post("/studregviewbatchamount", StudentController.studRegViewBatchAmount)

router.post("/studentregviewcollege", StudentController.studregCollegeAllView)

router.post('/createsession', SessionsController.createSession);

router.post("/addTrainers", TrainerController.createTrainer)

router.post("/sendNotification", NotificationController.createNotifications)

router.post("/generatePdf", StudentController.generateListOfBatchWiseStudents)

router.post("/viewAllTrainer", TrainerController.viewTrainers)

router.post("/searchTrainer", TrainerController.searchTrainer)

router.post("/deleteTrainer", TrainerController.deleteTrainer)

router.post("/updateTrainer", TrainerController.trainerDetailsUpdate)

router.post("/updateSession", SessionsController.sessionUpdate)

router.post("/viewSessions", SessionsController.viewSessions)

router.post("/deleteSessions", SessionsController.deleteSession)

router.post("/studentNofificationView", StudentController.studentNotificationView)

router.post("/studentViewSession", StudentController.studViewSession)

router.post("/searchSession", SessionsController.searchSession)

router.post('/createCurriculum', curriculumController.createCurriculum);

router.post('/searchCurriculum', curriculumController.searchCurriculum);

router.post('/cancelSession', SessionsController.cancelSession);

router.post('/curriculumview', curriculumController.currView)

router.post('/deletecurriculum', curriculumController.curriculumDelete)

router.post('/updatecurriculum', curriculumController.updateCurriculum)

router.post('/studmarkattendance', AttendenceController.markAttendance)

router.post('/colgstaffviewattendance', AttendenceController.collegeStaffViewAttendance)

router.post('/viewAdminLog', AdminController.viewAdminLog)

router.post('/updateMaterial', MaterialController.updateMaterial)

router.post('/studentViewAttendance', AttendenceController.studentViewAttendance)

router.post('/studentViewSessionWiseAttendance', AttendenceController.studentViewSessionWiseAttendance)

router.post('/viewCollegeStudent', CollegeController.studentViewCollege)

router.post('/viewUpcomingSessions', SessionsController.viewUpcomingSessions)

router.post('/viewBatchMaterials', MaterialController.viewBatchMaterials)

router.post('/viewCollegeStaffofStudent', ClgStaffController.viewCollegeStaffOfStudent)

router.post('/studentViewTransaction', StudentController.studentViewPaymentTransactions)

router.post('/studentViewNextSessionDate', StudentController.studentViewNextSession)

router.post('/studupdatesubmittedtask', StudentController.studentupdatesubmittedtask)

router.post('/studentviewsubmittedtask', StudentController.studentviewsubmittedtask)

router.post('/adminviewonetrainer', TrainerController.viewOneTrainer)

router.post('/generateAttendancePdf', StudentController.generateBatchWiseAttendanceList)

router.post('/viewOneCurriculum', curriculumController.viewOneCurriculum)

router.post('/viewOneTask', taskController.viewOneTask)

router.post('/isSessionHappeningToday', SessionsController.isSessionHappeningToday)

router.post('/AdmViewAllMaterial', AdminStaffController.AdmViewAllMaterial)

router.post('/AdmViewOneMaterial', AdminStaffController.viewOneMaterial)

router.post('/viewOneclg', CollegeController.viewOneClgDetail)

router.post('/AdmViewOneSession', SessionsController.viewOneSession)

router.post('/ClgStaffViewSession', ClgStaffController.viewSessionsByCollegeStaff)

router.post('/GenerateSessionWiseAttendancePdf',StudentController.generateSessionWiseAttendanceList)

router.post('/createCommunityManager', CommunityManagerController.createCommunityManager)

router.post('/deleteCommunityManager', CommunityManagerController.deleteCommunityManager)

router.post('/studregotpmailsend',StudentController.regOtpVerification)

router.post('/studregotpverify',StudentController.verifyOtp)

module.exports = router
