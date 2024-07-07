const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to authenticate the user using JWT
const authMiddleware = async (req, res, next) => {
  // Extract the token from the Authorization header, removing the 'Bearer ' prefix
  const token = req.header('Authorization').replace('Bearer ', '');

  // If no token is provided, return a 401 status with an error message
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token using the secret key from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by the ID decoded from the token
    req.user = await User.findById(decoded.id);

    // If no user is found, return a 401 status with an error message
    if (!req.user) {
      return res.status(401).json({ error: 'Invalid token.' });
    }

    // If the user is authenticated, proceed to the next middleware or route handler
    next();
  } catch (error) {
    // If an error occurs during token verification, return a 401 status with an error message
    res.status(401).json({ error: 'Invalid token.' });
  }
};

// Export the authMiddleware function
module.exports = authMiddleware;
