describe('OperatorFinder', function () {

    const OperatorFinder = require('./operator-finder');

    describe('calibrate', function () {
        it('should process the input file and determine which items in the list can be calculated using the given operators and add those values', function () {
            const operatorFinder = new OperatorFinder();
            expect(operatorFinder.calibrate('test-input.txt')).toBe(3749);
        });

        it('should process the input file and determine which items in the list can be calculated using the given operators and add those values including concatenation if enabled', function () {
            const operatorFinder = new OperatorFinder();
            expect(operatorFinder.calibrate('test-input.txt', true)).toBe(11387);
        });

    });


    describe('calculate', function () {
        it('X', function () {
            const operatorFinder = new OperatorFinder();
            expect(operatorFinder.calculate(292, 11, '*', [6, 16, 20])).toBe(-1);
            expect(operatorFinder.calculate(292, 11, '+', [6, 16, 20])).toBe(292);
        });
    });



});