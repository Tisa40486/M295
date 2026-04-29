const EventEmitter = require('events');
const sayGoodbyes = require('./goodbye');
const add = require('./add');

const emitter = new EventEmitter();

emitter.on('Hello', () => {
    console.log("Hello World !");
});

emitter.emit('Hello');

emitter.once('bye',  () => sayGoodbyes());
emitter.emit('bye');

emitter.on('add', ()=>{
    add(3,5)
});

emitter.emit('add');