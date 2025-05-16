const Hotel = require('../models/hotelModel');

const hotelController = {
    async getAll(req, res) {
        const hotels = await Hotel.getAll();
        res.json(hotels);
    },

    async getById(req, res) {
        const hotel = await Hotel.getById(req.params.id);
        res.json(hotel);
    },

    async addHotel(req, res) {
        const { name, location, description, price } = req.body;

        if (!name || !location || !description || !price) {
            return res.status(400).json({ message: "All hotel details are required" });
        }

        try {
            const id = await Hotel.add(name, location, description, price);
            res.status(201).json({ id });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async editHotel(req, res) {
        const { name, location, description, price } = req.body;
        const hotelId = req.params.id;

        try {
            await Hotel.edit(hotelId, name, location, description, price);
            res.json({ message: "Hotel updated" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async deleteHotel(req, res) {
        const hotelId = req.params.id;

        try {
            await Hotel.delete(hotelId);
            res.json({ message: "Hotel deleted" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = hotelController;
