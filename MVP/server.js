const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()
const routes = require('./router/router.js')
const root = require('./router/root.js')
const corsOptions = require('./Config/corsOptions.js')
const cors = require('cors')

const PORT = process.env.PORT || 5000;

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: false}))

app.listen(PORT, () => console.log(`Server running onport which is ${PORT}`))

app.use('/style', express.static(path.join(__dirname, 'style')))

app.use(express.static(path.join(__dirname, 'htmls')))

//ROUTES
app.use('/', require('./router/router.js'))
app.use('/root', require('./router/root.js'))