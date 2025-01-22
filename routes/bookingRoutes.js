const express = require('express');
const router = express.Router();
const { createBooking, getBookings, getBookingById } = require('../controllers/bookingController');

// @route   POST /api/bookings
// @desc    Create a booking
router.post('/', createBooking);

// @route   GET /api/bookings
// @desc    Get all bookings
router.get('/', getBookings);

// @route   GET /api/bookings/:id
// @desc    Get a booking by ID
router.get('/:id', getBookingById);

module.exports = router;
