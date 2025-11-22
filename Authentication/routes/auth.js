const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

router.post('/', authController.handleUsers);

module.exports = router;