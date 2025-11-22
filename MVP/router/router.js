const path = require('path');
const express = require('express');
const route = express.Router();
const fs = require('fs');

route.get(['/', '/home', '/home.html'], (req, res) => {
    const file_path = path.join(__dirname, '..', 'htmls', 'home.html');
    res.sendFile(file_path);
    if (fs.existsSync(file_path)) {
        console.log(`file path of home.html: ${file_path}`);
    } else{
        console.log('file path not found')
    }
})

route.get(['/shop', '/shop.html'], (req, res) => {
    const file_path = path.join(__dirname, '..', 'htmls', 'shop.html');
    res.sendFile(file_path);
    if (fs.existsSync(file_path)) {
        console.log(`file path of shop.html: ${file_path}`);
    } else{
        console.log('file path not found')
    }
})


route.get(['/market', '/market.html'], (req, res) => {
    const file_path = path.join(__dirname, 'htmls', 'shop.html');
    res.redirect('/shop.html');
    if (fs.existsSync(file_path)) {
        console.log(`file path of shop.html: ${file_path}`);
    } else{
        console.log('file path not found')
    }
})
module.exports = route;