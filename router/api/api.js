const express = require('express');
const router = express.Router();
const api = {};  
const data = require('./data.json');


router.use((req, res, next) => {
    console.log('API Route Hit:', req.method, req.url);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    console.log('Content-Type:', req.get('Content-Type'));
    next();
});

router.route('/')
    .get((req, res) => {
        res.json({data});
    })
    .post((req, res) => {
        res.json({
            'firstname': req.body.firstname,
            'lastname': req.body.lastname,
        })
    })
    .put((req, res) => {
        res.json({
            'id': req.body.id,
            'firstname': req.body.firstname,
            'lastname': req.body.lastname,
        })
    })

    .delete((req, res) => {
        res.json({
            'id': req.body.id,
        })
    })
    router.route('/:id')
        .get((req, res) => {
            res.json({
                'id': req.params.id
            })
    })

    
module.exports = router;

  