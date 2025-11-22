const express = require('express');
const path = require('path');
const fs = require('fs');
const route = express.Router();

route.get(['/', '/home', '/home.html'], (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'home.html'));
})

route.get(['/page', '/page.html'], (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'page.html'));
})


module.exports = route;

