const jwt = require('jsonwebtoken');
const Instructor = require('../models/Instructor'); 

const instructorAuthMiddleware = async (req, res, next) => {
  const token = req.header('token');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, 'shhh'); 
    // console.log(decoded)
    const instructor = await Instructor.findById(decoded.id);
    // console.log(instructor)

    if (!instructor) {
      return res.status(401).json({ message: 'Invalid token - Instructor not found.' });
    }

    req.instructor = decoded;

    console.log(req.instructor)
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = instructorAuthMiddleware;
