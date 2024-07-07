const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

// User registration controller
exports.register = async (req, res) => {
  // Validate the request and check for validation errors
  const errors = validationResult(req);
  // If there are validation errors, return a 400 status with the errors
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Extract username, email, and password from the request body
    const { username, email, password } = req.body;
    // Create a new user instance with the provided data
    const user = new User({ username, email, password });
    // Save the user to the database
    await user.save();
    // Respond with a 201 status and a success message
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    // If there's an error during registration, respond with a 500 status and an error message
    res.status(500).json({ error: 'Error registering user' });
  }
};

// User login controller
exports.login = async (req, res) => {
  // Validate the request and check for validation errors
  const errors = validationResult(req);
  // If there are validation errors, return a 400 status with the errors
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Extract email and password from the request body
    const { email, password } = req.body;
    // Find the user in the database by email
    const user = await User.findOne({ email });
    // If the user is not found or the password is incorrect, return a 401 status with an error message
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    // Generate a JWT token with the user's ID and a 1-hour expiration
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // Respond with a 200 status and the generated token
    res.status(200).json({ token });
  } catch (error) {
    // If there's an error during login, respond with a 500 status and an error message
    res.status(500).json({ error: 'Error logging in user' });
  }
};
