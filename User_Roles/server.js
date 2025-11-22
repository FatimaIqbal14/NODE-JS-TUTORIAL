const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const connectDB = require('./config/dbConn');
const mongoose = require('mongoose');
const http = require('http');
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const verifyJWT = require('./middleware/JWT_Auth');
const verifyRoles = require('./middleware/verifyRoles');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 5000;
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

//CONNECT TO MONGODB
connectDB();

//ROUTES
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/logout', require('./routes/logout'));
app.use('/refresh', require('./routes/refresh'));

//MIDDLEWARES
app.use(verifyJWT);
app.use(verifyRoles);


mongoose.connection.once('open', () => {
    console.log('Connected to DB');
    app.listen(PORT, () => console.log(`Server running on port, ${PORT}`));
})


////IJYyK8mX9YUyMw5x

//from MOngo: mongodb+srv://fatimaiqbal1147_db_user:IJYyK8mX9YUyMw5x@cluster0.ztvzpyx.mongodb.net/?appName=Cluster0