describe('LavaTrailFinder', function () {

    const LavaTrailFinder = require('./lava-trail-finder');

    describe('findTrailheadsAndCalculateScore', function () {
        it('should find all trailheads in the map and calculate the total score', function () {
            const lavaTrailFinder = new LavaTrailFinder();
            expect(lavaTrailFinder.findTrailheadsAndCalculateScore('test-input.txt')).toBe(36);
        });
    });

});