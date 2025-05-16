const db = require('../database/db');

const User = {
    create(email, password, role = "user") {
        return new Promise((resolve, reject) => {
            db.run(`INSERT INTO users (email, password, role) VALUES (?, ?, ?)`, [email, password, role], function(err) {
                if (err) reject(err);
                else resolve(this.lastID);
            });
        });
    },

    findByEmail(email) {
        return new Promise((resolve, reject) => {
            db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    }
}

module.exports = User;
