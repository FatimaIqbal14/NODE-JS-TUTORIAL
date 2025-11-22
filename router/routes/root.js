const path = require('path');
const express = require('express');
const route = express.Router();

route.get(['/', '/index.html', '/index'], (req, res) =>{
    res.sendFile(path.join(__dirname, '..', 'public', 'views', 'index.html'))
})

route.get(['/page1.html', '/page1'], (req, res) =>{
    res.sendFile(path.join(__dirname, '..', 'public', 'views', 'page1.html'))
})

route.get(['/error.html', '/error'], (req, res) =>{
    res.sendFile(path.join(__dirname, '..', 'public', 'views', 'error.html'))
})

route.get(['/page2.html', '/page2'], (req, res) => {
        res.redirect('/page1.html');
})

const one = (req, res, next) => {
    console.log('Hello World!');
next();
}
const two = (req, res, next) => {
    console.log('Hello World AGAIN!');
next();
}
const three = (req, res, next) => {
    console.log('Hello World FOR THE LAST TIME!');
res.send('Finished!');
}

route.get(['/hello.html', '/hello'], (one, two, three));

route.get('/:any', (req, res) => {
    console.log(`An error occured: ${error.message}`);
    res.sendFile(path.join(__dirname, '..', 'public', 'views', 'error.html'))
})


module.exports = route;