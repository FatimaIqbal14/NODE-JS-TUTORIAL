const path = require('path');
const fs = require('fs');
const express = require('express');
const route = express.Router();

route.get(['/', '/index.html', '/index'], (req, res) =>{
    const file_path = (path.join(__dirname, '..', 'public', 'pages', 'index.html'))
    if (fs.existsSync(file_path)) {
        console.log(`file path of index.html is: ${file_path}`)
        res.sendFile(file_path)
    } else {
        console.log(`Error: index.js not found at file path: ${file_path}`)
    }
})


route.get(['/new.html', '/new'], (req, res) =>{
        const file_path = (path.join(__dirname, '..', 'public', 'pages', 'new.html'))
    if (fs.existsSync(file_path)) {
        console.log(`file path of new.html is: ${file_path}`)
        res.sendFile(file_path)
    } else {
        console.log(`Error: new.js not found at file path: ${file_path}`)
    }
})


module.exports = route;