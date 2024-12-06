describe('EnhancedElfComputerInterpreter', function () {

    const EnhancedElfComputerInterpreter = require('./enhanced-elf-computer-interpreter');

    describe('processAllInstructionsFromFile', function () {
        it('should process the input file execute all valid instructions, adding up their results.', function () {
            const elfComputerInterpreter = new EnhancedElfComputerInterpreter();
            expect(elfComputerInterpreter.processAllInstructionsFromFile('test-input-2.txt')).toBe(48);
        });
    });
    
});