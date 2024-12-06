const GuardPathPredictor = require('./guard-path-predictor');
const guardPathPredictor = new GuardPathPredictor();
console.log(guardPathPredictor.predictGuardPathAndCalculateNumberOfSteps('input.txt'));