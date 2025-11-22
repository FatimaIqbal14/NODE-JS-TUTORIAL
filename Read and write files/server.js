console.log("Server is starting...");

const os = require("os");
const path = require('path');
const math = require('./math.js');
const fs = require('fs')
const fsPromises = require('fs').promises;

fs.readFile('./files/start.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    console.log(data);
})

process.on('uncaughtException', err => {
    console.log(`There was an uncaught error: ${err}`)
    process.exit(1)
})

fs.readFile(path.join(__dirname, 'files', 'sample.txt'), 'utf-8', (err, data) => {
    if (err) throw error;
    console.log(`The file contains: ${data}`);
})

process.on('uncaughtException', err => {
    console.log(`There was an uncaught error: ${err}`)
})

fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), 'Nice to have you here!', (err) => {
    if (err)
        console.log(`There is an error: ${err}`);
    else
        console.log('Write operation completed!')

    fs.appendFile(path.join(__dirname, 'files', 'reply.txt'), '\n\nYAAAASSSS!', (err) => {
    if (err)
        console.log(`There is an error: ${err}`);
    else
        console.log('Append operation completed!')

        fs.rename(path.join(__dirname, 'files', 'reply.txt'), path.join(__dirname, 'files', 'NEWREPLY.txt'), (err) => {
    if (err)
        console.log(`There is an error: ${err}`);
    else
        console.log('Rename operation completed!')
        
})
        
})
        
})
const fileOps = async () =>{
    try{
        const ReadData = fsPromises.readFile(path.join(__dirname,'files', 'NEWREPLY.txt'), 'utf-8')
console.log(ReadData);
fsPromises.writeFile(path.join(__dirname,'files', 'NEWREPLY11.txt'), 'Hey! What is up???')
fsPromises.appendFile(path.join(__dirname,'files', 'NEWREPLY11.txt'), '\n\nI am great, thanks for asking!')
fsPromises.rename(path.join(__dirname,'files', 'NEWREPLY11.txt'), path.join(__dirname,'files', 'NEWREPLY12.txt'))
    } catch(err){
        console.log(err);
    }
}


console.log(math.add(4, 8));

//console.log(os.type());
//console.log(os.version());
//console.log(os.homedir());
//
//
//console.log(__dirname)
//console.log(__filename)
//
//console.log(path.dirname(__filename));
//console.log(path.basename(__filename));
//console.log(path.extname(__filename));
//
//console.log(path.parse(__filename));
//console.log(path.parse(__dirname));

