const express = require('express');
const router = express.Router();
const refreshTokenAuthorization = require('../controller/refreshTokenAuthorization');

router.post('/', refreshTokenAuthorization.handleRefreshToken);

module.exports = router;