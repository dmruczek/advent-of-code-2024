describe('ElfComputerInterpreter', function () {

    const ElfComputerInterpreter = require('./elf-computer-interpreter');

    describe('processAllInstructionsFromFile', function () {
        it('should process the input file execute all valid instructions, adding up their results.', function () {
            const elfComputerInterpreter = new ElfComputerInterpreter();
            expect(elfComputerInterpreter.processAllInstructionsFromFile('test-input.txt')).toBe(161);
        });
    });
    
});