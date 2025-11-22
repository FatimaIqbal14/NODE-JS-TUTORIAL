const path = require('path');
const  express = require('express');
const router = express.Router();
const data = require('../data/data.json')
const functions = require('../controller/routeController.js');

router.route('/')
    .get(functions.getAllEmployees)

    .put(functions.updateEmployee)

    .post(functions.createNewEmployee)

    .delete(functions.deleteEmployee);

    router.route('/:id')
        .get(functions.getEmployee);
    
   

module.exports = router;