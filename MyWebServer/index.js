//extension and sitch cases
//redirect to home page
//existence of files
//json format
//images

const http = require('http');
const fsPromises = require('fs').promises;
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3500;

const fileServed = async (filePath, ContentType, response) => {
    try{
       const data = await fsPromises.readFile(filePath, !ContentType.includes('image') ? 'utf-8' : '')
       const json_data = ContentType == 'application/json' ? JSON.parse(data) : data;
       response.writeHead(filePath.includes('404.html') ? 404 : 200, {'Content-Type' : ContentType})
       res.end(json_data ? JSON.stringify(data) : data)

        } catch (err) {
        console.log(err);
        response.statusCode = 500;
        res.end();
    }
}

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);
   
    const extention = path.extname(req.url);

    let ContentType;

    switch(extention) {
        case '.css':
            ContentType = 'text/css';
            break;
        case '.json':
            ContentType = 'application/json';
            break;
        case '.js':
            ContentType = 'text/javascript';
            break;
        case '.txt':
            ContentType = 'text/plain';
            break;
        case '.jpg':
            ContentType = 'image/jpg';
            break;
        case '.jpeg':
            ContentType = 'image/jpeg';
            break;
        case '.png':
            ContentType = 'image/png';
            break;
        default:
            ContentType = 'text/css';
    
    }

    let filePath = ContentType  === 'text/html' && req.url === '/'
    ? path.join(__dirname, 'views', 'index.html')
    : ContentType === 'text/html' && req.url.slice(-1) === '/'
    ? path.join(__dirname, 'views', req.url, 'index.html')
    : ContentType === 'index/html' 
    ? path.join(__dirname, 'views', req.url)
    : path.join(__dirname, req.url);

    if (req.url.slice(-1) !== '/' && !extention) filePath += '.html';

    const fileExists = fs.existsSync(filePath);

    if (fileExists) {
        fileServed(filePath, ContentType, res);
    } else{
        switch(path.parse(filePath).base) {
            case 'old-page.html':
                res.writeHead(301, {'location': 'new-page.html'})
                res.end();
                break;
            case 'www-page.html':
                res.writeHead(301, {'location': '/'})
                res.end();
                break;
            default:

                
        }
    }
})
    
server.listen(PORT, () => console.log(`Server runing on port: ${PORT}`))
