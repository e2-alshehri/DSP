const Booking = require('../models/bookingModel');

const bookingController = {

    async create(req, res) {
        const userId = req.user.id;
        const { hotelId, startDate, endDate } = req.body;

        try {
            const bookingId = await Booking.create(userId, hotelId, startDate, endDate);
            res.status(201).json({ bookingId });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async getMyBookings(req, res) {
        const bookings = await Booking.getByUser(req.user.id);
        res.json(bookings);
    },

    async deleteBooking(req, res) {
        await Booking.delete(req.params.id);
        res.json({ message: "Booking cancelled" });
    },

    async getAllBookings(req, res) {
        const bookings = await Booking.getAll();
        res.json(bookings);
    }
}

module.exports = bookingController;
