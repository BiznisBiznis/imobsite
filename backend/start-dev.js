require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Import routes
const authRoutes = require("./routes/auth");
const propertiesRoutes = require("./routes/properties");
const teamRoutes = require("./routes/team");
const analyticsRoutes = require("./routes/analytics");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:8080",
      "http://localhost:3000",
      "http://localhost:5173",
    ],
    credentials: true,
  }),
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/properties", propertiesRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/analytics", analyticsRoutes);

// Simple health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is running!",
    timestamp: new Date().toISOString(),
    port: PORT,
  });
});

// Catch all route
app.get("*", (req, res) => {
  res.status(404).json({ success: false, message: "Endpoint not found" });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error("Unhandled error:", error);
  res.status(500).json({ success: false, message: "Internal server error" });
});

const server = app.listen(PORT, () => {
  console.log(`🚀 Backend server is running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🏠 Properties API: http://localhost:${PORT}/api/properties`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(() => {
    console.log("Process terminated");
  });
});

process.on("SIGINT", () => {
  console.log("SIGINT received, shutting down gracefully");
  server.close(() => {
    console.log("Process terminated");
  });
});
