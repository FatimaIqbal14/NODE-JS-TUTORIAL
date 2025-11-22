const express = require('express');
const router = express.Router();
const refreshUsers = require('../controllers/refreshHandle').refreshUsers;

router.post('/', refreshUsers);

module.exports = router;