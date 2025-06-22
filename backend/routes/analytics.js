const express = require("express");
const router = express.Router();

// Try to use database, fallback to mock data
let useDatabase = true;
let db;

try {
  db = require("../config/db");
} catch (error) {
  console.warn("Database connection failed, using mock analytics");
  useDatabase = false;
}

// GET /api/analytics/stats
router.get("/stats", async (req, res) => {
  try {
    if (useDatabase && db) {
      try {
        const [[visitorsToday]] = await db.query(
          "SELECT COUNT(DISTINCT ip_address) as count FROM analytics_logs WHERE DATE(timestamp) = CURDATE()"
        );
        const [[teamMembers]] = await db.query(
          "SELECT COUNT(*) as count FROM team_members"
        );
        const [[totalProperties]] = await db.query(
          "SELECT COUNT(*) as count FROM properties"
        );
        const [[totalValue]] = await db.query(
          "SELECT SUM(price) as total FROM properties"
        );

        res.json({
          success: true,
          data: {
            visitorsToday: visitorsToday.count,
            teamMembers: teamMembers.count,
            totalProperties: totalProperties.count,
            totalValue: totalValue.total,
          },
        });
        return;
      } catch (dbError) {
        console.warn(
          "Database query failed, using mock analytics:",
          dbError.message
        );
        // Fallback to mock data for this request only
      }
    }

    // Use mock analytics data if db fails
    res.json({
      success: true,
      data: {
        visitorsToday: 123,
        teamMembers: 4,
        totalProperties: 6,
        totalValue: 1250000,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// GET /api/analytics/logs
router.get("/logs", async (req, res) => {
  try {
    const [logs] = await db.query(
      "SELECT * FROM analytics_logs ORDER BY timestamp DESC",
    );
    res.json({ success: true, data: { data: logs, total: logs.length } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// GET /api/analytics/daily
router.get("/daily", async (req, res) => {
  try {
    const [daily] = await db.query(`
            SELECT DATE(timestamp) as date, COUNT(DISTINCT ip_address) as visitors, COUNT(*) as pageViews
            FROM analytics_logs
            GROUP BY DATE(timestamp)
            ORDER BY date DESC
            LIMIT 30
        `);
    res.json({ success: true, data: daily });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// GET /api/analytics/pages
router.get("/pages", async (req, res) => {
  try {
    const [pages] = await db.query(`
            SELECT page, COUNT(*) as views
            FROM analytics_logs
            GROUP BY page
            ORDER BY views DESC
        `);
    res.json({ success: true, data: pages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// POST /api/analytics/track
router.post("/track", async (req, res) => {
  try {
    const { page, country } = req.body;
    const ip = req.ip;
    await db.query(
      "INSERT INTO analytics_logs (page, ip_address, country) VALUES (?, ?, ?)",
      [page, ip, country],
    );
    res.status(201).json({ success: true, message: "Visit tracked" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;
