const express = require("express");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');

const adminRoutes = require("./app/routes/lms.routes");
const app = express();

const allowedOrigins = ['https://lms.linkurcodes.com', 'http://localhost:3000'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200 // For legacy browser support
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use("/api/lms", adminRoutes);

// Handle preflight requests
app.options("*", cors(corsOptions));

app.listen(3030, '0.0.0.0', () => {
  console.log("Server is running on port 3030.");
});
