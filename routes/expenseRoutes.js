const express = require('express');
const { createExpense, getExpenses } = require('../controllers/expenseController');
const { check } = require('express-validator'); // Import the check function from express-validator to validate user inputs
const authMiddleware = require('../middlewares/authMiddleware'); // Import the authMiddleware for authentication check
const router = express.Router(); // Creates a new router instance

// Route to create a new expense with authentication middleware
router.post(
  '/create', // Define the endpoint for creating expenses
  authMiddleware, // Use authMiddleware for authentication
  [
    // Validate the request body fields
    check('date', 'Date is required').isISO8601(), // Check that date is in ISO 8601 format
    check('amount', 'Amount is required').isFloat({ min: 0 }), // Check that amount is a float number greater than or equal to 0
    check('description', 'Description is required').not().isEmpty(), // Check that description is not empty
    check('category', 'Category is required').not().isEmpty(), // Check that category is not empty
  ],
  createExpense // Call the createExpense controller function if validation passes
);

// Route to get all expenses for the logged-in user with authentication middleware
router.get('/', authMiddleware, getExpenses);

// Export the router to be used in other parts of the application
module.exports = router;
