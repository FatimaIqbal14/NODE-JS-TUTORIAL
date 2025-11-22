const express = require('express');
const router = express.Router();
const handleRegister = require('../controllers/registerHandle').handleRegister;

router.post('/', handleRegister);

module.exports = router;