describe('BlinkStoneSimulator', function () {

    const BlinkStoneSimulator = require('./blink-stone-simulator');

    describe('simulateBlinksAndCountStones', function () {
        it('should simulate the number of blinks requested and then count the number of stones.', function () {
            const blinkStoneSimulator = new BlinkStoneSimulator();
            expect(blinkStoneSimulator.simulateBlinksAndCountStones('test-input.txt', 25)).toBe(55312);
        });
    });

});