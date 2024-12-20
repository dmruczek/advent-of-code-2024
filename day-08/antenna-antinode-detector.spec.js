describe('AntennaAntinodeDetector', function () {

    const AntennaAntinodeDetector = require('./antenna-antinode-detector');

    describe('detectTotalAntinodes', function () {
        it('should calculate the total number of antinodes given the layout of antennas in the input file', function () {
            const antennaAntinodeDetector = new AntennaAntinodeDetector();
            expect(antennaAntinodeDetector.detectTotalAntinodes('test-input.txt')).toBe(14);
        });

        it('should also handle horizontally or vertically oriented antennas', function () {
            const antennaAntinodeDetector = new AntennaAntinodeDetector();
            expect(antennaAntinodeDetector.detectTotalAntinodes('test-input-2.txt')).toBe(4);
        });

    });

});