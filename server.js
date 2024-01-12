const express = require("express");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const mysql = require("mysql");
const adminRoutes = require("./app/routes/lms.routes");
const app = express();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/lms", adminRoutes);










app.listen(3030, '0.0.0.0', () => {
  console.log("Server is running on port 3030.");
});