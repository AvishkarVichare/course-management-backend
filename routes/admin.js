const express = require('express');
const { createAdminController, loginAdminController } = require('../controller/adminController');
const router = express.Router();

router.post('/create', createAdminController);
router.post('/login', loginAdminController);

module.exports = router;