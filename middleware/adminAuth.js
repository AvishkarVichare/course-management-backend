const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin'); // Import the Admin model

const adminAuthMiddleware = async (req, res, next) => {
  const token = req.header('token'); 
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, 'shhh'); 
    const admin =  Admin.findOne(decoded.id);

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
