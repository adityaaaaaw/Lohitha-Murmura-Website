const jwt = require('jsonwebtoken');
const { errorResponse } = require('../utils/apiResponse');

const protect = (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.admin = decoded;
      next();
    } catch (error) {
      return errorResponse(res, 'Not authorized, token failed', 401);
    }
  }
  if (!token) return errorResponse(res, 'Not authorized, no token', 401);
};

module.exports = { protect };
