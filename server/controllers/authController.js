const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const { successResponse, errorResponse } = require('../utils/apiResponse');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    return successResponse(res, {
      token: generateToken(username),
      username,
    }, 'Login successful');
  }
  return errorResponse(res, 'Invalid credentials', 401);
});

module.exports = { login };
