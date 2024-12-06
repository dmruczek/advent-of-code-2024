const GuardPathPredictor = require('./guard-path-predictor');
const guardPathPredictor = new GuardPathPredictor();
console.log(guardPathPredictor.placeObstructionsToSetGuardInLoop('input.txt'));