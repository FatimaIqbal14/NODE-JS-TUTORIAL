const express = require('express');
const path = require('path');
const http = require('http');
const { url } = require('inspector');
const { logger } = require('./middleware/log');
const { urlencoded } = require('express');
const {ErrInfo} = require('./middleware/err');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(logger)

const whitelist = ['https://www.yoursite.com', 'http://127.0.0.1:5500', 'http://localhost:5000'];
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
        optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use(urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));



app.get(['/', '/index.html', '/index'], (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
})

app.get(['/new.html', '/new'], (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new.html'));
})

app.get(['/404.html', '/404'], (req, res) => {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
})

app.get(['/old.html', '/old'], (req, res) => {
   res.redirect('/new.html');
})

app.get('/debug', (req, res) => {
    const viewsPath = path.join(__dirname, 'views');
    const indexPath = path.join(__dirname, 'views', 'index.html');

    res.send(`
        <h1>Debug</h1>
        <p>__dirname: ${__dirname}</p>
        <p>Views folder: ${viewsPath}</p>
        <p>Index.html path: ${indexPath}</p>

        <p>File Exists: ${require('fs').existsSync(indexPath) ? "YES" : "NO"}</p>
    `)
})

app.get('/test-error', (req, res, next) => {
    const error = new Error('This is a test server error!');
    error.status = 500;
    next(error); // This will trigger ErrInfo
});

app.use((req, res, next) => {
    const error = new Error(`404 Not Found: ${req.originalUrl}`);
        error.status = 404;
        next(error);
})

app.use(ErrInfo);

app.listen(PORT, () => console.log(`Server runnng on port: ${PORT}`))  