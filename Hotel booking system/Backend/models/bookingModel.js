const db = require('../database/db');

const Booking = {
    create(userId, hotelId, startDate, endDate) {
        return new Promise((resolve, reject) => {
            db.run(`INSERT INTO bookings (userId, hotelId, startDate, endDate) VALUES (?, ?, ?, ?)`,
            [userId, hotelId, startDate, endDate],
            function(err) {
                if (err) reject(err);
                else resolve(this.lastID);
            });
        });
    },

    getByUser(userId) {
        return new Promise((resolve, reject) => {
            db.all(`SELECT bookings.*, hotels.name AS hotelName FROM bookings JOIN hotels ON bookings.hotelId = hotels.id WHERE bookings.userId = ?`, 
            [userId],
            (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    },

    delete(id) {
        return new Promise((resolve, reject) => {
            db.run(`DELETE FROM bookings WHERE id = ?`, [id], function(err) {
                if (err) reject(err);
                else resolve();
            });
        });
    },

    getAll() {
        return new Promise((resolve, reject) => {
            db.all(`SELECT * FROM bookings`, [], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }
}

module.exports = Booking;
