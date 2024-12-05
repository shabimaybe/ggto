const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const hotelSchema = new mongoose.Schema({
  hotelName: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  reviews: [reviewSchema],
  pricePerNight: {
    type: Number,
    required: true
  },
  contactInfo: {
    type: String,
    required: true
  },
  affiliated: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Hotel = mongoose.model('Hotel', hotelSchema);
module.exports = Hotel;
