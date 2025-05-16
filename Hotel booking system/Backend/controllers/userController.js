const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const userController = {
    async register(req, res) {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        try {
            await User.create(email, hashedPassword);
            res.status(201).json({ message: "User registered" });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async login(req, res) {
        const { email, password } = req.body;
        const user = await User.findByEmail(email);
        if (!user) return res.status(404).json({ message: "User not found" });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(403).json({ message: "Invalid password" });

        const token = jwt.sign({ id: user.id, role: user.role }, 'secretKey', { expiresIn: '1h' });
        res.json({ token });
    }
};

module.exports = userController;
