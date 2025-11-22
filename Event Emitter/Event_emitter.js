const dateFns = require('date-fns');
const { v4: uuid } = require('uuid');

const fs = require('fs')
const path = require('path')
const fsPromises = require('fs.promises')

const EventEmitter = (message) => {
    const DateTime = `${dateFns.format(new Date(), 'yyyy-MM-dd\tHH:mm:ss')}`;
    const LogEmit = `${DateTime}\t${uuid()}\t${message}\n`
    console.log(LogEmit)
    try{
        if(!fs.existsSync(path.join(__dirname, 'logs'))){
            fsPromises.mkdir(path.join(__dirname, 'logs'))
        }
        fs.appendFile(path.join(__dirname, 'logs', 'LogEmitter'), LogEmit)
    } catch(err) {
        console.log(`We have encountered an error ${err}`)
    }
}

module.exports = EventEmitter