const Tour = require('../models/tourModel');

// Create a new tour
const createTour = async (req, res) => {
  const { tourName, tourType, locations, price } = req.body;
  const createdBy = req.user._id;

  try {
    const tour = new Tour({
      tourName,
      tourType,
      locations,
      createdBy,
      price
    });
    
    const createdTour = await tour.save();
    res.status(201).json(createdTour);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all tours
const getTours = async (req, res) => {
  try {
    const tours = await Tour.find({});
    res.status(200).json(tours);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a single tour by ID
const getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (tour) {
      res.status(200).json(tour);
    } else {
      res.status(404).json({ message: 'Tour not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createTour,
  getTours,
  getTourById
};
