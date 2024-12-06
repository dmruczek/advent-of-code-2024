describe('GuardPathPredictor', function () {

    const GuardPathPredictor = require('./guard-path-predictor');

    describe('predictGuardPathAndCalculateNumberOfSteps', function () {
        it('should process the input file and determine the number of steps the guard will take.', function () {
            const guardPathPredictor = new GuardPathPredictor();
            expect(guardPathPredictor.predictGuardPathAndCalculateNumberOfSteps('test-input.txt')).toBe(41);
        });
    });

    describe('placeObstructionsToSetGuardInLoop', function () {
        it('should process the input file and determine the number of places an obstruction can be set to put the guard in a loop.', function () {
            const guardPathPredictor = new GuardPathPredictor();
            expect(guardPathPredictor.placeObstructionsToSetGuardInLoop('test-input.txt')).toBe(6);
        });
    });

});