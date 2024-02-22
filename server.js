const express = require("express");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
const adminRoutes = require("./app/routes/lms.routes");

const app = express();
const PORT = 3030;

const allowedOrigins = ['*'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200, // For legacy browser support
};

// Enable CORS for all routes
app.use(cors(corsOptions));

// Parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS preflight request handling for specific route
app.options("/api/lms/studreg", cors(corsOptions));

// API routes
app.use("/api/lms", adminRoutes);

// Error handling for CORS issues
app.use((err, req, res, next) => {
  if (err.message === 'Not allowed by CORS') {
    res.status(403).json({ error: 'CORS Error: Not allowed by CORS' });
  } else {
    next(err);
  }
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}.`);
});
