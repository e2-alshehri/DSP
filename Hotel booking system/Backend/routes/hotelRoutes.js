const express = require('express');
const router = express.Router();
const db = require('../database/db');

router.get('/:hotelId', (req, res) => {
  const hotelId = req.params.hotelId;

  db.get(`SELECT * FROM hotels WHERE id = ?`, [hotelId], (err, hotel) => {
    if (err || !hotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }

    db.all(`SELECT * FROM rooms WHERE hotelId = ?`, [hotelId], (err, rooms) => {
      if (err) {
        return res.status(500).json({ error: 'Error fetching rooms' });
      }

      res.json({ hotel, rooms });
    });
  });
});

router.get('/', (req, res) => {
  const { sortBy = 'price', order = 'ASC', page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  const validSorts = ['price', 'name', 'location'];
  if (!validSorts.includes(sortBy)) return res.status(400).json({ error: 'Invalid sort field' });

  db.all(`SELECT * FROM hotels ORDER BY ${sortBy} ${order} LIMIT ? OFFSET ?`, [limit, offset], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Error fetching hotels' });
    res.json(rows);
  });
});

module.exports = router