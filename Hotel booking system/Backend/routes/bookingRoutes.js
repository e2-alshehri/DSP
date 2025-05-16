const express = require('express');
const router = express.Router();
const db = require('../database/db');
const { authenticateToken, isAdmin } = require('../middleware/authMiddleware');

router.post('/', authenticateToken, (req, res) => {
    const { hotelId, roomId, startDate, endDate } = req.body;
    const userId = req.user.id;

    if (!startDate || !endDate) {
        return res.status(400).json({ error: "Dates required" });
    }

    db.run(`INSERT INTO bookings (userId, hotelId, roomId, startDate, endDate, status)
            VALUES (?, ?, ?, ?, ?, ?)`,
        [userId, hotelId, roomId, startDate, endDate, 'booked'],
        function (err) {
            if (err) return res.status(500).json({ error: "Booking failed" });

            db.run("UPDATE rooms SET availability = 0 WHERE id = ?", [roomId]);
            res.status(201).json({ message: "Booking successful", bookingId: this.lastID });
        }
    );
});

router.get('/me', authenticateToken, (req, res) => {
    const userId = req.user.id;

    db.all(`SELECT bookings.*, hotels.name AS hotelName FROM bookings 
            JOIN hotels ON bookings.hotelId = hotels.id 
            WHERE bookings.userId = ?`, [userId],
        (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        }
    );
});

router.delete('/:id', authenticateToken, (req, res) => {
    const bookingId = req.params.id;

    db.run(`DELETE FROM bookings WHERE id = ?`, [bookingId], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Booking cancelled" });
    });
});

router.get('/', authenticateToken, isAdmin, (req, res) => {
    db.all(`SELECT * FROM bookings`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

module.exports = router;
