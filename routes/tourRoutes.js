const express = require('express');
const { createTour, getTours, getTourById } = require('../controllers/tourController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .post(protect, createTour)
  .get(getTours);

router.route('/:id')
  .get(getTourById);

module.exports = router;
