const OwnTrip = require("../models/OwnTrip");

// Create a new trip
exports.createTrip = async (req, res) => {
  try {
    const trip = new OwnTrip(req.body);
    await trip.save();
    res.status(201).json(trip);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all trips
exports.getAllTrips = async (req, res) => {
  try {
    const trips = await OwnTrip.find();
    res.json(trips);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get trip by ID
exports.getTripById = async (req, res) => {
  try {
    const trip = await OwnTrip.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: "Trip not found" });
    res.json(trip);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update trip
exports.updateTrip = async (req, res) => {
  try {
    const trip = await OwnTrip.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!trip) return res.status(404).json({ message: "Trip not found" });
    res.json(trip);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete trip
exports.deleteTrip = async (req, res) => {
  try {
    const trip = await OwnTrip.findByIdAndDelete(req.params.id);
    if (!trip) return res.status(404).json({ message: "Trip not found" });
    res.json({ message: "Trip deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
