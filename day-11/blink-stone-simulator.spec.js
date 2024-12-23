describe('BlinkStoneSimulator', function () {

    const BlinkStoneSimulator = require('./blink-stone-simulator');

    describe('simulateTwentyFiveBlinksAndCountStones', function () {
        it('should simulate twenty five blinks and then count the number of stones.', function () {
            const blinkStoneSimulator = new BlinkStoneSimulator();
            expect(blinkStoneSimulator.simulateTwentyFiveBlinksAndCountStones('test-input.txt')).toBe(55312);
        });
    });

});