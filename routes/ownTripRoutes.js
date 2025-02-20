const express = require("express");
const router = express.Router();
const ownTripController = require("../controllers/ownTripController");

router.post("/", ownTripController.createTrip);
router.get("/", ownTripController.getAllTrips);
router.get("/:id", ownTripController.getTripById);
router.put("/:id", ownTripController.updateTrip);
router.delete("/:id", ownTripController.deleteTrip);

module.exports = router;
