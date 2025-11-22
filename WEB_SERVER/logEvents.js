const DateFns = require('date-fns');;
const { v4: uuid} = require('uuid');
const paths = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

const logEmitter = (message) =>{
    const DateTime = `${DateFns.format(new Date(), 'yyyy-MM-dd\tHH:mm:ss')}`;
    const logEmit = `${DateTime}\t${uuid()}\t${message}\n`
    console.log(logEmit)
}

module.exports = logEmitter;