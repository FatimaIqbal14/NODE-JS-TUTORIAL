const logEvents = require('./logEvents');
const fs = require('fs')
const fsPromises = require('fs').promises;
const path = require('path')
const http = require('http')

const logging = require('events')
class MyLog extends logging { };
const myLog = new MyLog();

const PORT = process.env.PORT || 3500;

const fileExists = async(filePath, contentType, response) => {
    try{
        const data = await fsPromises.readFile(filePath, 'utf-8')
        response.writeHead(200, { 'Content-Type': contentType})
        response.end(data)
    } catch(err){
        console.log(err);
        response.statusCode = 500;
        response.end()
    }
}

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    const extension = path.extname(req.url)

    let contentType;

    switch(extension) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.txt':
            contentType = 'text/plain';
            break;
        default:
            contentType = 'text/html';
    }

    let filePath = contentType === 'text/html' && req.url === '/' ? path.join(__dirname, 'views', 'index.html') : contentType === 'text/html' && req.url.slice(-1) === '/' ? path.join(__dirname, 'views', req.url, 'index.html') : contentType === 'text/html' ? path.join(__dirname,'views', req.url) : path.join(__dirname, req.url)
    
    if(!extension && req.url.slice(-1) !== '/') filePath += '.html'

    if (fs.existsSync(filePath)) {
        fileExists(filePath, contentType, res)
    } else{
        switch (path.parse(filePath).base) {
            case 'old-file.html':
                res.writeHead(301, {'location' : '/new-page.html'})
                res.end();
                break;
            case 'www-page.html' :
                res.writeHead(301, {'location' : '/'})
                res.end()
                break;
            default:
                fileExists(path.join(__dirname, 'views', '404.html'), 'text/html', res)
        }
    }
});

server.listen(PORT, () => console.log(`Port running on port ${PORT}`))

/*let filePath;

if(req.url == '/' || req.url == 'index.html'){
    res.stsatusCode = 200;
    res.setHeader('Content-type', 'index.html');
    fs.readFile(path.join(__dirname, 'views', 'index.html'), 'utf-8', (err, data) => {
        if(err) throw err;
        res.end(data);
    })
}*/

