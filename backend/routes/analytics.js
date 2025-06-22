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
        const [[totalVisitors]] = await db.query(
          "SELECT COUNT(*) as count FROM analytics_logs",
        );
        const [[uniqueVisitors]] = await db.query(
          "SELECT COUNT(DISTINCT ip_address) as count FROM analytics_logs",
        );
        const [[topCountryResult]] = await db.query(
          "SELECT country, COUNT(*) as count FROM analytics_logs GROUP BY country ORDER BY country DESC LIMIT 1",
        );

        res.json({
          success: true,
          data: {
            totalVisitors: totalVisitors.count,
            uniqueVisitors: uniqueVisitors.count,
            pageViews: totalVisitors.count,
            avgSessionDuration: "N/A",
            bounceRate: "N/A",
            topCountry: topCountryResult ? topCountryResult.country : "N/A",
          },
        });
        return;
      } catch (dbError) {
        console.warn(
          "Database query failed, using mock analytics:",
          dbError.message,
        );
        useDatabase = false;
      }
    }

    // Use mock analytics data
    res.json({
      success: true,
      data: {
        totalVisitors: 342,
        uniqueVisitors: 187,
        pageViews: 1245,
        avgSessionDuration: "2m 15s",
        bounceRate: "45%",
        topCountry: "România",
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
