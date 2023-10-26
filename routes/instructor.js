const express = require('express');
const { createInstructorController, loginInstructorController, getAllInstructorsController, getListOfAllLecturesSchedulesController } = require('../controller/instructorController');
const adminAuthMiddleware = require('../middleware/adminAuth');
const instructorAuthMiddleware = require('../middleware/instructorAuth');
const router = express.Router();

router.post('/create', createInstructorController);
router.post('/login', loginInstructorController);
router.get('/get',adminAuthMiddleware, getAllInstructorsController);
router.get('/getlectures',instructorAuthMiddleware, getListOfAllLecturesSchedulesController);
module.exports = router;