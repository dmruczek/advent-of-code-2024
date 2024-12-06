const EnhancedElfComputerInterpreter = require('./enhanced-elf-computer-interpreter');
const elfComputerInterpreter = new EnhancedElfComputerInterpreter();
console.log(elfComputerInterpreter.processAllInstructionsFromFile('input.txt'));