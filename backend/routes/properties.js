const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const mockData = require("../data/_data");

// Try to use database, fallback to mock data
let useDatabase = true;
let db;

try {
  db = require("../config/db");
} catch (error) {
  console.warn("Database connection failed, using mock data");
  useDatabase = false;
}

// GET /api/properties
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    if (useDatabase && db) {
      try {
        const [countResult] = await db.query(
          "SELECT COUNT(*) as total FROM properties",
        );
        const total = countResult[0].total;

        const [results] = await db.query(
          "SELECT * FROM properties ORDER BY createdAt DESC LIMIT ? OFFSET ?",
          [limit, offset],
        );

        res.json({
          success: true,
          data: {
            data: results.map((p) => ({
              ...p,
              badges: JSON.parse(p.badges || "[]"),
            })),
            total: total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
          },
        });
        return;
      } catch (dbError) {
        console.warn(
          "Database query failed, falling back to mock data:",
          dbError.message,
        );
      }
    }

    // Use mock data
    const allProperties = mockData.properties;
    const total = allProperties.length;
    const startIndex = offset;
    const endIndex = startIndex + limit;
    const paginatedProperties = allProperties.slice(startIndex, endIndex);

    res.json({
      success: true,
      data: {
        data: paginatedProperties,
        total: total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// GET /api/properties/:id
router.get("/:id", async (req, res) => {
  try {
    if (useDatabase && db) {
      try {
        // First, get the property with agentId
        const [rows] = await db.query(
          `SELECT p.*, 
                  t.id as agent_id, t.name as agent_name, t.role as agent_role, 
                  t.phone as agent_phone, t.email as agent_email, t.image as agent_image
           FROM properties p
           LEFT JOIN team_members t ON p.agentId = t.id
           WHERE p.id = ?`,
          [req.params.id]
        );
        
        if (rows.length > 0) {
          const property = rows[0];
          property.badges = JSON.parse(property.badges || "[]");
          
          // Add agent information if agentId exists
          if (property.agent_id) {
            property.agent = {
              id: property.agent_id,
              name: property.agent_name,
              role: property.agent_role,
              phone: property.agent_phone,
              email: property.agent_email,
              image: property.agent_image
            };
          }
          
          // Remove the agent_* fields from the property object
          const { agent_id, agent_name, agent_role, agent_phone, agent_email, agent_image, ...cleanedProperty } = property;
          
          res.json({ success: true, data: cleanedProperty });
          return;
        } else {
          res.status(404).json({ success: false, message: "Property not found" });
          return;
        }
      } catch (dbError) {
        console.warn(
          "Database query failed, falling back to mock data:",
          dbError.message,
        );
      }
    }

    // Use mock data
    const property = mockData.properties.find((p) => p.id === req.params.id);
    if (property) {
      res.json({ success: true, data: property });
    } else {
      res.status(404).json({ success: false, message: "Property not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// POST /api/properties
router.post("/", async (req, res) => {
  try {
    const newProperty = {
      id: uuidv4(),
      ...req.body,
    };
    const {
      id,
      title,
      price,
      location,
      area,
      rooms,
      type,
      videoUrl,
      thumbnailUrl,
      badges,
    } = newProperty;

    const sql =
      "INSERT INTO properties (id, title, price, location, area, rooms, floor, yearBuilt, description, type, videoUrl, thumbnailUrl, badges, agentId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    await db.query(sql, [
      id,
      title,
      price,
      location,
      area,
      rooms,
      req.body.floor || null,
      req.body.yearBuilt || null,
      req.body.description || '',
      type,
      videoUrl,
      thumbnailUrl,
      JSON.stringify(badges || []),
      req.body.agentId || null,
    ]);

    res.status(201).json({ success: true, data: newProperty });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// PUT /api/properties/:id
router.put("/:id", async (req, res) => {
  try {
    const {
      title,
      price,
      location,
      area,
      rooms,
      type,
      videoUrl,
      thumbnailUrl,
      badges,
    } = req.body;
    const sql =
      "UPDATE properties SET title = ?, price = ?, location = ?, area = ?, rooms = ?, floor = ?, yearBuilt = ?, description = ?, type = ?, videoUrl = ?, thumbnailUrl = ?, badges = ?, agentId = ? WHERE id = ?";
    const [result] = await db.query(sql, [
      title,
      price,
      location,
      area,
      rooms,
      req.body.floor || null,
      req.body.yearBuilt || null,
      req.body.description || '',
      type,
      videoUrl,
      thumbnailUrl,
      JSON.stringify(badges || []),
      req.body.agentId || null,
      req.params.id,
    ]);

    if (result.affectedRows > 0) {
      const [updatedRows] = await db.query(
        "SELECT * FROM properties WHERE id = ?",
        [req.params.id],
      );
      const property = updatedRows[0];
      property.badges = JSON.parse(property.badges || "[]");
      res.json({ success: true, data: property });
    } else {
      res.status(404).json({ success: false, message: "Property not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// DELETE /api/properties/:id
router.delete("/:id", async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM properties WHERE id = ?", [
      req.params.id,
    ]);
    if (result.affectedRows > 0) {
      res.json({ success: true, message: "Property deleted" });
    } else {
      res.status(404).json({ success: false, message: "Property not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;
