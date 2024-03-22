const express = require("express");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
const adminRoutes = require("./app/routes/lms.routes");
const firebaseAdmin = require('firebase-admin')
const app = express();
const PORT = 3030;


const allowedOrigins = ['https://lms.linkurcodes.com', 'http://localhost:3000','http://localhost:3806'];

// CORS middleware
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200, // For legacy browser support
}));

// Parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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


firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert({
    type: process.env.TYPE,
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    auth_uri: process.env.AUTH_URI,
    token_uri: process.env.TOKEN_URI,
    auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
    universe_domain: process.env.UNIVERSE_DOMAIN
  })
});

if (firebaseAdmin.apps.length > 0) {
  console.log("Firebase Admin initialized successfully.");
} else {
  console.error("Firebase Admin initialization failed.");
}



// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}.`);
});
