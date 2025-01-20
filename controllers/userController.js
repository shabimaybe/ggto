const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

// Generate JWT token
const generateToken = (id,role) => {
  return jwt.sign({ id,role }, process.env.JWT_SECRET, {

  });
};

// Create a new user
exports.createUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(`Original Password: ${password}`);
  console.log(`Hashed Password: ${hashedPassword}`);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      token: generateToken(user._id,user.role),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// Authenticate user and get token
exports.authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log(`Authenticating user with email: ${email}`);
  console.log(`Password provided: ${password}`);

  const user = await User.findOne({ email });

  if (!user) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  console.log(`Stored Hashed Password: ${user.password}`);
  console.log(`Password match status: ${isPasswordMatch}`);

  if (user && isPasswordMatch) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      token: generateToken(user._id,user.role),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// Get all users
exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

// Get a user by ID
exports.getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  res.status(200).json(user);
});

// Update a user by ID
exports.updateUserById = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const user = await User.findById(req.params.id);

  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }
    user.role = role || user.role;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// Delete a user by ID
exports.deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
