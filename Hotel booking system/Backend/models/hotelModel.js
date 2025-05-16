const db = require('../database/db');

const Hotel = {

    getAll() {
        return new Promise((resolve, reject) => {
            db.all(`SELECT * FROM hotels`, [], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    },

    getById(id) {
        return new Promise((resolve, reject) => {
            db.get(`SELECT * FROM hotels WHERE id = ?`, [id], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    },

    add(name, location, description, price) {
        return new Promise((resolve, reject) => {
            db.run(`INSERT INTO hotels (name, location, description, price) VALUES (?, ?, ?, ?)`, 
            [name, location, description, price], function(err) {
                if (err) reject(err);
                else resolve(this.lastID);
            });
        });
    },

    edit(id, name, location, description, price) {
        return new Promise((resolve, reject) => {
            db.run(`UPDATE hotels SET name = ?, location = ?, description = ?, price = ? WHERE id = ?`,
            [name, location, description, price, id], function(err) {
                if (err) reject(err);
                else resolve();
            });
        });
    },

    delete(id) {
        return new Promise((resolve, reject) => {
            db.run(`DELETE FROM hotels WHERE id = ?`, [id], function(err) {
                if (err) reject(err);
                else resolve();
            });
        });
    }
};

module.exports = Hotel;
