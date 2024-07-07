const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');

//Routes
const authRoutes = require('./routes/authRoutes');
const expenseRoutes = require('./routes/expenseRoutes');


// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodie

// Connect Database
connectDB();

// Routes setup
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);

// Root endpoint for health check
app.get('/', (req, res) => {
    res.send('financial-expense-tracker API is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message });
});

module.exports = app;

