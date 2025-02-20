const mongoose = require("mongoose");

const ownTripSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  altPhoneNumber: { type: String, required: true },
  dateOfBirth: { type: String, default: false },
  cnic: { type: String, required: true },
  preferredContactMethod: { type: [String], default: false },

  destination: { type: String, required: true },
  tripStartDate: { type: String, required: true },
  tripEndDate: { type: String, required: true },
  adults: { type: Number, required: true },
  children: { type: Number, required: true },
  additionalRequirements: { type: [String] },

  hotelName: { type: String, required: true },
  numberOfRooms: { type: String, required: true },
  mattersRequired: { type: Boolean, default: false },

  vehicle: { type: String, required: true },
  city: { type: String, required: true },
  pickUpLocation: { type: String, required: true },
  dropOffLocation: { type: String, default: false }
});

module.exports = mongoose.model("OwnTrip", ownTripSchema);
