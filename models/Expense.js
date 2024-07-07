const mongoose = require('mongoose');

// Define the Expense schema using mongoose
const expenseSchema = new mongoose.Schema({
  // Define the user field, which references the User model and is required
  user: { 
    type: mongoose.Schema.Types.ObjectId, // Data type is ObjectId
    ref: 'User', // Reference to the User model
    required: true 
  },
  date: { 
    type: Date, // Data type is Date
    required: true
  },
  amount: { 
    type: Number, // Data type is Number
    required: true 
  },
  description: { 
    type: String, // Data type is String
    required: true 
  },
  category: { 
    type: String, // Data type is String
    required: true 
  },
});

// Create a mongoose model named 'Expense' based on the expenseSchema
module.exports = mongoose.model('Expense', expenseSchema);
