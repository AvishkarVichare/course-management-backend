const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Instructor = require('../models/Instructor');
const Lecture = require('../models/Lecture');

// create instructor / sign up
exports.createInstructorController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingInstructor = await Instructor.findOne({ email });

    if (existingInstructor) {
      return res.json({
        success: false,
        message: 'Instructor with this email already exists',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newInstructor = new Instructor({
      name,
      email,
      password: hashedPassword,
    });

    await newInstructor.save();

    const data = {
      id: newInstructor._id,
      name: newInstructor.name,
      email: newInstructor.email,
    };

    const token = jwt.sign(data, 'shhh');

    res.status(201).json({
      success: true,
      token,
      message: 'Instructor created and logged in',
      data: newInstructor,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// login Instructor 
// Controller for instructor login
exports.loginInstructorController = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const instructor = await Instructor.findOne({ email });
  
      if (!instructor) {
        return res.json({
          success: false,
          message: 'Incorrect credentials',
        });
      }
  
      const isPasswordValid = await bcrypt.compare(password, instructor.password);
  
      if (!isPasswordValid) {
        return res.json({
          success: false,
          message: 'Incorrect credentials',
        });
      }
  
      const data = {
        id: instructor._id,
        name: instructor.name,
        email: instructor.email,
      };
  
      const token = jwt.sign(data, 'shhh');
  
      res.status(200).json({
        success: true,
        token,
        message: 'Instructor logged in',
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };

//   get list of all instructors - for admin use only 
exports.getAllInstructorsController = async (req, res) => {
    try {
  
      const instructors = await Instructor.find();
  
      res.status(200).json({
        success: true,
        instructors,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };



  // get list of all scheduled lectures of particular instructor - for intsructor panel
  exports.getListOfAllLecturesSchedulesController =  async (req, res) => {
    const instructorId = req.instructor.id; 
    // console.log(instructorId)
    try {
      const instructorLectures = await Lecture.find({ instructor: instructorId }).populate('course', 'name');
  
      res.status(200).json({
        success: true,
        data: instructorLectures,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Error retrieving instructor lectures',
      });
    }
  };