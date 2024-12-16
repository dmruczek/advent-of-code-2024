const OperatorFinder = require('./operator-finder');
const operatorFinder = new OperatorFinder();
console.log(operatorFinder.calibrate('input.txt', true));