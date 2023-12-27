const express = require("express");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const mysql = require("mysql");
const adminRoutes = require("./app/routes/lms.routes");
const app = express();
const db = require('./app/models/db');

// Define the blacklisted token model
const BlacklistedToken = {
  findOne: ({ token }) => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM token_blacklist WHERE token = ?", [token], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.length ? results[0] : null);
        }
      });
    });
  },
  create: ({ token }) => {
    return new Promise((resolve, reject) => {
      db.query("INSERT INTO token_blacklist (token) VALUES (?)", [token], (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  },
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/lms", adminRoutes);

let token;

// Middleware to check and blacklist tokens
app.use((request, response, next) => {
  token = request.body && request.body.token;

  if (!token) {
    return response.json({ "status": "Token not provided in the request body." });
  }

  jwt.verify(token, "lmsapp", (err, decoded) => {
    if (err) {
      return response.json({ "status": "Invalid token. Please log in again." });
    } else {
      BlacklistedToken.findOne({ token })
        .then((isBlacklisted) => {
          if (isBlacklisted) {
            return response.json({ status: "Token is revoked. Please log in again." });
          } else {
            next();
          }
        })
        .catch((error) => {
          console.log("Error checking blacklisted token:", error);
          response.json({ error: "Internal Server Error" });
        });
    }
  });
});

// Handle termination signal to perform cleanup before server stops
process.on("SIGINT", () => startCleanup());
process.on("SIGTERM", () => startCleanup());

async function startCleanup() {
  try {
    await cleanup(token);
    process.exit(0);
  } catch (error) {
    console.error("Error during cleanup:", error);
    process.exit(1);
  }
}

async function cleanup(token) {
  console.log("Cleaning up before server stops.");

  if (token) {
    try {
      await BlacklistedToken.create({ token });
      console.log("Token blacklisted before server stops.");
    } catch (error) {
      console.log("Error blacklisting token:", error);
    } finally {
      // Close the MySQL connection
      db.end((err) => {
        if (err) {
          console.log("Error closing MySQL connection:", err);
        }
        process.exit(0); // Terminate the process after cleanup
      });
    }
  } else {
    console.log("Token not provided during cleanup.");

    // Close the MySQL connection
    db.end((err) => {
      if (err) {
        console.log("Error closing MySQL connection:", err);
      }
      process.exit(0); // Terminate the process after cleanup
    });
  }
}

app.listen(8080, () => {
  console.log("Server is running on port 8080.");
});
