const express = require('express');
const router = express.Router();
const handleLogin = require('../controllers/authHandle').handleLogin;

router.post('/', handleLogin);

module.exports = router;