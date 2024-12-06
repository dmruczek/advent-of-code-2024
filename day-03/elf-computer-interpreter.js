module.exports = class ElfComputerInterpreter {

    
    loadInput(filename) {
        const path = require('path');
        const fs = require('fs');
        const os = require('os');
    
        const data = fs.readFileSync(path.resolve(__dirname, filename), 'utf-8');
        const stringArray = data.split(os.EOL);
        return stringArray;
    }

    processInputData(stringArray) {
        let unparsedInstructionArray = [];
        for (let i = 0; i < stringArray.length; i++) {
            unparsedInstructionArray.push( ...this.findInstructions(stringArray[i]));
        }

        let instructions = [];
        for (let unparsedInstructionStr of unparsedInstructionArray) {
            instructions.push(this.parseInstruction(unparsedInstructionStr));
        }

        return instructions;
    }

    findInstructions(str) {
        const instructionRegEx = /mul\(\d{1,3},\d{1,3}\)/g;
        const matches = [...str.matchAll(instructionRegEx)];
        let instructionArray = [];
        for (let match of matches) {
            instructionArray.push(match[0]);
        }
        return instructionArray;
    }

    parseInstruction(unparsedInstructionStr) {
        const instructionDetailsRegEx = /(\w+)\((\d+),(\d+)\)/;
        const matches = instructionDetailsRegEx.exec(unparsedInstructionStr);
        return {
            instruction: matches[1],
            arg1: parseInt(matches[2]),
            arg2: parseInt(matches[3])
        };

    }

    calculateSumOfAllExecutedInstructions(instructions) {
        let total = 0;
        for (let instruction of instructions) {
            total += instruction.arg1 * instruction.arg2;
        }
        return total;
    }

    processAllInstructionsFromFile(filename) {
        const stringArray = this.loadInput(filename);
        const instructions = this.processInputData(stringArray);
        return this.calculateSumOfAllExecutedInstructions(instructions);
    }


};
