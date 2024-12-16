module.exports = class OperatorFinder {
    
    loadInput(filename) {
        const path = require('path');
        const fs = require('fs');
        const os = require('os');
    
        const data = fs.readFileSync(path.resolve(__dirname, filename), 'utf-8');
        const stringArray = data.split(os.EOL);
        return stringArray;
    }

    processInputData(stringArray) {
        let data = [];

        for (let line of stringArray) {
            line = line.replace(":", "");
            const split = line.split(" ");
            let obj = {
                testValue: parseInt(split[0]),
                numbers: []
            };

            for (let i = 1; i < split.length; i++) {
                obj.numbers.push(parseInt(split[i]));
            }
            data.push(obj);
        }
        return data;
    }

    calc(operation) {

        if (this.calculate(operation.testValue, operation.numbers[0], '*', operation.numbers.slice(1)) === operation.testValue || 
            this.calculate(operation.testValue, operation.numbers[0], '+', operation.numbers.slice(1)) === operation.testValue) {
            return operation.testValue;
        } else {
            return 0;
        }
    }


    calcAll(operations) {
        let total = 0;
        for (let operation of operations) {
            total += this.calc(operation);
        }
        return total;
    }




    calculate(testValue, runningTotal, operator, remainingNums) {

        if (remainingNums.length > 0) {
            const nextNum = remainingNums[0];
            const nextRemainingNums = remainingNums.slice(1);
            let newRunningTotal;
            if (operator === '*') {
                newRunningTotal = runningTotal * nextNum;
            } else {
                newRunningTotal = runningTotal + nextNum;
            }

            let val1 = this.calculate(testValue, newRunningTotal, '*', nextRemainingNums);
            let val2 = this.calculate(testValue, newRunningTotal, '+', nextRemainingNums);

            if (val1 === testValue || val2 === testValue) {
                return testValue;
            } else {
                return -1;
            }
        } else {
            return runningTotal;
        }
    }

    calibrate(filename) {
        const rawData = this.loadInput(filename);
        const operations = this.processInputData(rawData);
        return this.calcAll(operations);
        

    }


};
