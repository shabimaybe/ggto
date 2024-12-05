const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  tripName: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  reviews: {
    type: Number,
    required: true
  },
  mealsIncluded: {
    type: Boolean,
    default: false
  },
  transportIncluded: {
    type: Boolean,
    default: false
  },
  availableRooms: {
    type: Number,
    required: true
  },
  vipAccess: {
    type: Boolean,
    default: false
  },
  originalPrice: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    default: 0
  },
  image: {
    type: String, // Store the Cloudinary URL of the image
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Trip = mongoose.model('Trip', tripSchema);
module.exports = Trip;