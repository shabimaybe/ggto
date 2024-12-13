const Trip = require('../models/tripModel');

// Create a new trip
const createTrip = async (req, res) => {
    try {
      const imagePath = req.files ? req.files.map(file => file.path) : [];// Get the Cloudinary URL of the uploaded image
  
      const trip = new Trip({
        tripName: req.body.tripName,
        location: req.body.location,
        price: req.body.price,
        duration: req.body.duration,
        mealsIncluded: req.body.mealsIncluded,
        transportIncluded: req.body.transportIncluded,
        availableRooms: req.body.availableRooms,
        vipAccess: req.body.vipAccess,
        originalPrice: req.body.originalPrice,
        discount: req.body.discount,
        image: imagePath // Store Cloudinary URL of the image
      });
  
      const savedTrip = await trip.save();
      res.status(201).json(savedTrip);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  

// Get all trips
const getTrips = async (req, res) => {
  try {
    const trips = await Trip.find();
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a trip by ID
const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a trip by ID
const updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a trip by ID
const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findByIdAndDelete(req.params.id);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.status(200).json({ message: 'Trip deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTrip,
  getTrips,
  getTripById,
  updateTrip,
  deleteTrip
};
