const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./hotel-booking.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
        password TEXT,
        role TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS hotels (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        location TEXT,
        description TEXT,
        price REAL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS rooms (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        hotelId INTEGER,
        type TEXT,
        price REAL,
        availability INTEGER,
        FOREIGN KEY(hotelId) REFERENCES hotels(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER,
        hotelId INTEGER,
        roomId INTEGER,
        startDate TEXT,
        endDate TEXT,
        status TEXT,
        FOREIGN KEY(userId) REFERENCES users(id),
        FOREIGN KEY(hotelId) REFERENCES hotels(id),
        FOREIGN KEY(roomId) REFERENCES rooms(id)
    )`);
});

module.exports = db;
