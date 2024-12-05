const express = require('express');
const router = express.Router();
const { 
  createHotel, 
  getHotels, 
  getHotelById, 
  updateHotel, 
  deleteHotel 
} = require('../controllers/hotelController');

// @route   POST /api/hotels
// @desc    Create a hotel
router.post('/', createHotel);

// @route   GET /api/hotels
// @desc    Get all hotels
router.get('/', getHotels);

// @route   GET /api/hotels/:id
// @desc    Get a hotel by ID
router.get('/:id', getHotelById);

// @route   PUT /api/hotels/:id
// @desc    Update a hotel by ID
router.put('/:id', updateHotel);

// @route   DELETE /api/hotels/:id
// @desc    Delete a hotel by ID
router.delete('/:id', deleteHotel);

module.exports = router;
