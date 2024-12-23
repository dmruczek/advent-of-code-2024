describe('LavaTrailFinder', function () {

    const LavaTrailFinder = require('./lava-trail-finder');

    describe('findTrailheadsAndCalculateScore', function () {
        it('should find all trailheads in the map and calculate the total score', function () {
            const lavaTrailFinder = new LavaTrailFinder();
            expect(lavaTrailFinder.findTrailheadsAndCalculateScore('test-input.txt')).toBe(36);
        });
    });

    describe('findTrailheadsAndCalculateScoreUsingRating', function () {
        it('should find all trailheads in the map and calculate the total score using a rating system for each trailhead', function () {
            const lavaTrailFinder = new LavaTrailFinder();
            expect(lavaTrailFinder.findTrailheadsAndCalculateScoreUsingRating('test-input.txt')).toBe(81);
        });
    });

});