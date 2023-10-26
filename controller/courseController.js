const Course = require('../models/Course');
const Lecture = require('../models/Lecture');
const Instructor = require('../models/Instructor');

// Create a new course
exports.createCourseController = async (req, res) => {
  try {
    const { name, level, description, image } = req.body;
    // console.log(req.body)
    const newCourse = new Course({ name, level, description, image });
    await newCourse.save();

    res.status(201).json({
      success: true,
      message: 'Course created',
      data: newCourse,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// Add a lecture to a course
exports.addLectureToCourseController = async (req, res) => {
  try {
    const { courseId, date, instructorId } = req.body;

    console.log(req.body)

    const isInstructorExists = await Instructor.findById(instructorId);
    if (!isInstructorExists) {
      return res.json({message:'no such instructor exists'});

    }

    const instructor = await Instructor.findById(instructorId);


    const isCourseExists = await Course.findById(courseId);
    if (!isCourseExists) {
      return res.json({message:'no such course exists'});
    }

    const instructorLectures = await Lecture.find({ instructor: instructorId });
    const newDate = new Date(date).toISOString().substring(0, 10); // Format: "YYYY-MM-DD"
    const hasDateConflict = instructorLectures.some((lecture) => {
      const existingDate = lecture.date.toISOString().substring(0, 10); // Format: "YYYY-MM-DD"
      return existingDate === newDate;
    });
    
    if (hasDateConflict) {
      return res.json({
        success: false,
        message: 'Lecture scheduling clash. Instructor already has a lecture on this date.',
      });
    }

   

    const newLecture = new Lecture({ date, instructor, course: courseId });
    await newLecture.save();

    const course = await Course.findById(courseId);
    // console.log(course)
    course.lectures.push(newLecture);
    await course.save();

    res.status(201).json({
      success: true,
      message: 'Lecture added to the course',
      data: newLecture,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// get all courses
exports.getCoursesController = async (req, res) => {
  try {
    const courses = await Course.find();

    res.status(200).json({
      success: true,
      courses,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

// get all lectures of particular course
exports.getLecturesForCourseController = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    const lectures = await Lecture.find({ course: courseId }).populate({
      path: 'instructor',
      select: '-password'
    });

    res.status(200).json({
      success: true,
      data: lectures,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

