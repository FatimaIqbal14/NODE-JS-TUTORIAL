const express = require('express');
const path = require('path');
const fs = require('fs');
const route = express.Router();
const functions = require('../controller/apiController');

route.route('/api')
    .get(functions.getAllEmployees)
    .post(functions.createNewEmployee)
    .put(functions.updateEmployees)
    .delete(functions.deleteEmployee);

route.route('/api/:id')
    .get(functions.getEmployee);

module.exports = route;
