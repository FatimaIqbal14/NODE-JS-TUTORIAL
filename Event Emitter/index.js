const EventEmitter = require('./Event_emitter');

const LogEmitter = require('events')

class MyEmitter extends EventEmitter { };
 
const myEmitter = new MyEmitter()

myEmitter.on('log', (msg) => EventEmitter(msg));

setTimeout(() => {
    myEmitter.emit('log', 'Log Event emitted!')
}, 2000)