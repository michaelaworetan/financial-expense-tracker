const Expense = require('../models/Expense');

// Import express-validator functions for validating and sanitizing user inputs
const { check, validationResult } = require('express-validator');

// Create new expense controller to handle creating expenses
exports.createExpense = async (req, res) => {
  // Validate the request and check for validation errors
  const errors = validationResult(req);
  // If there are validation errors, return a 400 status with the errors
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Extract date, amount, description, and category from the request body
    const { date, amount, description, category } = req.body;
    // Create a new expense linked to the logged-in user (req.user.id comes from authentication middleware)
    const expense = new Expense({ user: req.user.id, date, amount, description, category });
    // Save the expense to the database
    await expense.save();
    // Respond with a 201 status and a success message
    res.status(201).json({ message: 'Expense logged successfully' });
  } catch (error) {
    // If there's an error during expense creation, respond with a 500 status and an error message
    res.status(500).json({ error: 'Error logging expense' });
  }
};

// Retrieve user expenses controller to fetch expenses
exports.getExpenses = async (req, res) => {
  try {
    // Find all expenses for the logged-in user (req.user.id comes from authentication middleware)
    const expenses = await Expense.find({ user: req.user.id });
    // Respond with a 200 status and the array of fetched expenses
    res.status(200).json(expenses);
  } catch (error) {
    // If there's an error fetching expenses, respond with a 500 status and an error message
    res.status(500).json({ error: 'Error fetching expenses' });
  }
};
