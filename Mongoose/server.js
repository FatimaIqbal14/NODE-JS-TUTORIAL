const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();


app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());


app.use('/register', require('./router/register'));
app.use('/auth', require('./router/login'));
app.use('/refresh', require('./router/refresh'));
app.use('/logout', require('./router/logout'));


app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));