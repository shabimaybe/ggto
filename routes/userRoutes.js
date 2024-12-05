const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/login', userController.authUser); // Route for user login
router.post('/', userController.createUser); // Route for creating a new user
router.get('/', protect, userController.getAllUsers); // Route for getting all users (protected)
router.get('/:id', protect, userController.getUserById); // Route for getting a user by ID (protected)
router.put('/:id', protect, userController.updateUserById); // Route for updating a user by ID (protected)
router.delete('/:id', protect, userController.deleteUserById); // Route for deleting a user by ID (protected)

module.exports = router;
