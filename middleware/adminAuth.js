const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin'); // Import the Admin model

const adminAuthMiddleware = async (req, res, next) => {
  const token = req.header('x-auth-token'); // Assuming the token is sent in the 'x-auth-token' header

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const admin = jwt.verify(token, 'shhh'); 

    if (!admin) {
      return res.status(401).json({ message: 'Invalid token - Admin not found.' });
    }

    req.admin = admin;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = adminAuthMiddleware;
