const express = require('express')
const router = express.Router()
const lmsController = require("../controllers/lms.controller")

// router.post("/", admin.adminRegister)
router.post("/", lmsController.adminLogin)

router.post("/addadmstaff",lmsController.create)




module.exports = router