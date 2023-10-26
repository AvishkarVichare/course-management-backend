const express = require('express');
const { createCourseController, addLectureToCourseController, getCoursesController, getLecturesForCourseController } = require('../controller/courseController');
const adminAuthMiddleware = require('../middleware/adminAuth');
const router = express.Router();

router.post('/create',adminAuthMiddleware, createCourseController);
router.get('/get',adminAuthMiddleware, getCoursesController);
router.get('/l/get/:courseId',adminAuthMiddleware, getLecturesForCourseController);
router.post('/l/add',adminAuthMiddleware, addLectureToCourseController);

module.exports = router;