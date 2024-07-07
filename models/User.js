const mongoose = require('mongoose');   // Import mongoose for schema definition and database interaction
const bcrypt = require('bcryptjs');     // Import bcryptjs for hashing passwords

// Define the User schema
const userSchema = new mongoose.Schema({
  // Username field with type String, required, and unique constraints
  username: { 
    type: String, 
    required: true, 
    unique: true 
  },
  // Email field with type String, required, and unique constraints
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  // Password field with type String and required constraint
  password: { 
    type: String, 
    required: true 
  },
});

// Pre-save hook to hash the password before saving the user
userSchema.pre('save', async function(next) {
  // If the password field is not modified, move to the next middleware
  if (!this.isModified('password')) return next();
  // Generate a salt with 10 rounds
  const salt = await bcrypt.genSalt(10);
  // Hash the password using the generated salt
  this.password = await bcrypt.hash(this.password, salt);
  // Call the next middleware
  next();
});

// Method to compare the provided password with the hashed password
userSchema.methods.comparePassword = function(candidatePassword) {
  // Use bcrypt to compare the provided password with the stored hashed password
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
