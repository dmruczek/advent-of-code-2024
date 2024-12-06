const ElfComputerInterpreter = require('./elf-computer-interpreter');
const elfComputerInterpreter = new ElfComputerInterpreter();
console.log(elfComputerInterpreter.processAllInstructionsFromFile('input.txt'));