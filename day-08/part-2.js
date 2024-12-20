const AntennaAntinodeDetector = require('./antenna-antinode-detector');
const antennaAntinodeDetector = new AntennaAntinodeDetector();
console.log(antennaAntinodeDetector.detectTotalAntinodes('input.txt'));