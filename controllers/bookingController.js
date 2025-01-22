const Booking = require('../models/bookingModel');
const Trip = require('../models/tripModel');

// Create a booking
const createBooking = async (req, res) => {
  try {
    const { tripId, fullName, phoneNumber, numberOfPersons, date, departureCity } = req.body;

    // Validate trip exists
    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    // Create a new booking
    const booking = new Booking({
      trip: tripId,
      fullName,
      phoneNumber,
      numberOfPersons,
      date,
      departureCity
    });

    const savedBooking = await booking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all bookings
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('trip');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a booking by ID
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('trip');
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBooking,
  getBookings,
  getBookingById
};
