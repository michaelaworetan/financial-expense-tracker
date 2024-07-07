const express = require('express');
const { register, login } = require('../controllers/authController');

// Import the check function from express-validator to validate user inputs
const { check } = require('express-validator');

// Create a new router instance
const router = express.Router();

// Route to handle user registration
router.post(
  '/register', // Define the endpoint for registration
  [
    // Validate the username field
    check('username', 'Username is required').not().isEmpty(), // Check that username is not empty
    // Validate the email field
    check('email', 'Please include a valid email').isEmail(), // Check that email is a valid email address
    // Validate the password field
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }), // Check that password is at least 6 characters long
  ],
  register // Call the register controller function if validation passes
);

// Route to handle user login
router.post(
  '/login', // Define the endpoint for login
  [
    // Validate the email field
    check('email', 'Please include a valid email').isEmail(), // Check that email is a valid email address
    // Validate the password field
    check('password', 'Password is required').exists(), // Check that password field exists
  ],
  login // Call the login controller function if validation passes
);

// Export the router to be used in other parts of the application
module.exports = router;
