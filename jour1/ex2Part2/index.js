const sum = require('./sum');

const inputNum1 = process.argv[2];
const inputNum2 = process.argv[3];

const result = sum(inputNum1, inputNum2);

console.log(result)