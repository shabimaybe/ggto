const express = require('express');
const router = express.Router();
const { 
  createTrip, 
  getTrips, 
  getTripById, 
  updateTrip, 
  deleteTrip 
} = require('../controllers/tripController');
const upload = require('../middleware/upload');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// @route   POST /api/trips
// @desc    Create a new trip package
router.post('/', protect, adminOnly, upload.single('image'), createTrip);

// @route   GET /api/trips
// @desc    Get all trips
router.get('/', getTrips);

// @route   GET /api/trips/:id
// @desc    Get a trip by ID
router.get('/:id', protect, getTripById);

// @route   PUT /api/trips/:id
// @desc    Update a trip by ID
router.put('/:id', protect, adminOnly, updateTrip);

// @route   DELETE /api/trips/:id
// @desc    Delete a trip by ID
router.delete('/:id', protect, adminOnly, deleteTrip);

module.exports = router;
