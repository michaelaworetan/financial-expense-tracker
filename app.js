const express = require('express');
const connectDB = require('./config/db');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');


// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect Database
connectDB();


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

