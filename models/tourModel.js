const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  locationName: { type: String, required: true },
  description: { type: String, required: true },
  daysToSpend: { type: Number, required: true }
});

const tourSchema = new mongoose.Schema({
  tourName: { type: String, required: true },
  tourType: { type: String, required: true },
  locations: [locationSchema],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  price: { type: Number, required: true },
}, {
  timestamps: true,
  collection: 'tours'
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
