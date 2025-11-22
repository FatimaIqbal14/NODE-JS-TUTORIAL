const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const verifyJWT = require('./Middleware/verifyJWT.js')
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());
app.use(cookieParser());
dotenv.config();

//ROUTES
app.use('/', require('./routes/htmlRoutes'));
app.use('/api', require('./routes/api'));
app.use('/auth', require('./routes/auth.js'));
app.use('/register', require('./routes/register.js'));
app.use('/logout', require('./routes/logout.js'));
app.use('/refresh', require('./routes/refresh.js'));


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));