const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();

// Try to use database, fallback to mock data
let useDatabase = true;
let db;

try {
  db = require("../config/db");
} catch (error) {
  console.warn("Database connection failed, using mock auth");
  useDatabase = false;
}

// Mock admin user for development
const mockAdmin = {
  id: "1",
  username: "admin",
  password: "$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password: "password"
};

const JWT_SECRET = process.env.JWT_SECRET;

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Username and password are required" });
  }

  try {
    let user = null;

    if (useDatabase && db) {
      try {
        const [rows] = await db.execute(
          "SELECT * FROM users WHERE username = ?",
          [username],
        );
        user = rows[0];
      } catch (dbError) {
        console.warn(
          "Database query failed, using mock auth:",
          dbError.message,
        );
        useDatabase = false;
      }
    }

    if (!useDatabase) {
      // Use mock admin user
      if (username === mockAdmin.username) {
        user = mockAdmin;
      }
    }

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN },
      );
      res.json({ success: true, token });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error during login" });
  }
});

router.get("/validate", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
    res.json({ success: true, message: "Token is valid", user: decoded });
  });
});

module.exports = router;
