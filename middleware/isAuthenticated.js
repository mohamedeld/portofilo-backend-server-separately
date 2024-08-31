const jwt = require('jsonwebtoken');
const User = require('../models/user');

const isAuthenticatedUser = async (req, res) => {
  // Get the Authorization header from the request
  const authHeader = req.headers.authorization;

  // Check if the Authorization header exists and has the expected format
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log("Authorization header is missing or invalid");
    return { user: null, isAuthenticated: false };
  }

  // Extract the token part from the Authorization header
  const authToken = authHeader.split(' ')[1];

  let user = null;
  try {
    // Verify the token and get the user information
    const decoded = jwt.verify(authToken, process.env.SECRET_TOKEN);
    user = await User.findById(decoded.userId);
    req.user = user;
  } catch (err) {
    // Token is invalid or expired
    console.error("Token verification failed:", err.message);
    user = null;
  }

  console.log("User:", user);
  console.log("Is authenticated:", !!user);

  return {
    user,
    isAuthenticated: !!user,
  };
};

const context = async ({ req, res }) => {
  const { user, isAuthenticated } = await isAuthenticatedUser(req, res);

  return {
    req,
    res,
    user,
    isAuthenticated,
  };
};

module.exports = context;