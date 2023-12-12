const express = require('express')
const router = express.Router()
const admin = require("../controllers/lms.controller")

// router.post("/", admin.adminRegister)
router.post("/", admin.adminLogin)


module.exports = router