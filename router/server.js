const path = require('path');
const fs = require('fs');
const express = require('express');
const { error } = require('console');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/pages', require('./routes/route'))

app.use('/views', require('./routes/root'))

app.use('/api', require('./api/api'))

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
