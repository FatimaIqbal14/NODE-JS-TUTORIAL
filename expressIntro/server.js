const express = require('express');
const path = require('path');
const http = require('http');

const PORT = process.env.PORT || 3000;

const app = express();
app.get(['/', '/index.html', '/index'], (req, res) => {
    res.sendFile(path.join(__dirname, 'files', 'index.html'));
})

app.get(['/old.html', '/old'], (req, res) => {
    res.redirect(301, '/new.html');
})

app.get(['/new.html', '/new'], (req, res) => {
    res.sendFile(path.join(__dirname, 'files', 'new.html'));
})

app.get(['/next.html', '/next'], (req, res, next) => {
    console.log('An attempt to log next.html');
    next()
}, (req, res) => {
    res.send('Hey World!')
});

const one = (req, res, next) => {
    console.log('one');
    next();
}

const two = (req, res, next) => {
    console.log('two');
    next();
}

const three = (req, res) => {
    console.log('three');
    res.send('Finished!')
}

app.get(['/chain.html', '/chain'], [one, two, three]);

app.get('/:any', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'files', '404.html'))
})

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))