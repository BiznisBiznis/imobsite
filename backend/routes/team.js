const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

// GET /api/team
router.get('/', async (req, res) => {
    try {
        const [team] = await db.query('SELECT * FROM team_members');
        res.json({ success: true, data: { data: team, total: team.length } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// GET /api/team/:id
router.get('/:id', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM team_members WHERE id = ?', [req.params.id]);
        if (rows.length > 0) {
            res.json({ success: true, data: rows[0] });
        } else {
            res.status(404).json({ success: false, message: 'Team member not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// POST /api/team
router.post('/', async (req, res) => {
    try {
        const newMember = { id: uuidv4(), ...req.body };
        const { id, name, role, phone, email, image } = newMember;
        await db.query('INSERT INTO team_members (id, name, role, phone, email, image) VALUES (?, ?, ?, ?, ?, ?)', [id, name, role, phone, email, image]);
        res.status(201).json({ success: true, data: newMember });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// PUT /api/team/:id
router.put('/:id', async (req, res) => {
    try {
        const { name, role, phone, email, image } = req.body;
        const [result] = await db.query('UPDATE team_members SET name = ?, role = ?, phone = ?, email = ?, image = ? WHERE id = ?', [name, role, phone, email, image, req.params.id]);
        if (result.affectedRows > 0) {
            const [updatedRows] = await db.query('SELECT * FROM team_members WHERE id = ?', [req.params.id]);
            res.json({ success: true, data: updatedRows[0] });
        } else {
            res.status(404).json({ success: false, message: 'Team member not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// DELETE /api/team/:id
router.delete('/:id', async (req, res) => {
    try {
        const [result] = await db.query('DELETE FROM team_members WHERE id = ?', [req.params.id]);
        if (result.affectedRows > 0) {
            res.json({ success: true, message: 'Team member deleted' });
        } else {
            res.status(404).json({ success: false, message: 'Team member not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

module.exports = router;
