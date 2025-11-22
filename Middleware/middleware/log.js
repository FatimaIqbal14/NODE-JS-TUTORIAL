const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const {v4: uuid} = require('uuid');
const dateFns = require('date-fns');

const logInfo = async(message) => {
    const DateTime = `${dateFns.format(new Date(), 'yyyy-MM-dd\tHH:mm:ss')}`;
    const logMessage = `${DateTime}\t${uuid()}\t${message}\n`;
    console.log(logMessage);
    try{
        if(!fs.existsSync(path.join(__dirname, 'logs'))) {
            fsPromises.mkdir(path.join(__dirname, 'logs'));
        }
        await fsPromises.appendFile(path.join(__dirname, 'logs', 'logger.txt'), logMessage);
    } catch(err) {
        console.log(`An error was caught whuch is: ${err.message}`);
    }
}

const logger = (req, res, next) => {
    logInfo(`${req.method}\t${req.url}\t${req.headers.origin}`);
    next();
}

module.exports = {logInfo, logger};