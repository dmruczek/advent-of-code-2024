module.exports = class TrebuchetCalibrator {

    
    loadInput(filename) {
        const path = require('path');
        const fs = require('fs');
        const os = require('os');
    
        const data = fs.readFileSync(path.resolve(__dirname, filename), 'utf-8');
        const stringArray = data.split(os.EOL);
        return stringArray;
    }

    processCalibrationLine(str) {
        const numbers = this.extractNumbers(str);
        return parseInt((this.getFirstNumber(numbers) + this.getLastNumber(numbers)), 10);
    }

    processCalibrationLine2(str) {
        const numbers = this.extractNumbers2(str);
        return (this.getFirstNumber(numbers)*10) + this.getLastNumber(numbers);
    }

    extractNumbers(str) {
        return str.match(/\d/g);
    }

    extractNumbers2(str) {
        // return str.match(/\d|(one)|(two)|(three)|(four)|(five)|(six)|(seven)|(eight)|(nine)/g);

        let numArray = new Array(str.length);
        const numbersToSearch = [
            "one",
            "two",
            "three",
            "four",
            "five",
            "six",
            "seven",
            "eight",
            "nine",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9"
        ];

        for (let numToSearch of numbersToSearch) {
            let startIndex = 0, index;
            while ((index = str.indexOf(numToSearch, startIndex)) > -1) {
                numArray[index] = this.convertToNumber(numToSearch);
                startIndex = index + numToSearch.length;
            }
        }

        numArray = numArray.filter(n => n);

        return numArray;

    }

    convertToNumber(str) {
        const strMap = {
            "one": 1,
            "two": 2,
            "three": 3,
            "four": 4,
            "five": 5,
            "six": 6,
            "seven": 7,
            "eight": 8,
            "nine": 9,
        };
        if (strMap[str]) {
            return strMap[str];
        }
        return parseInt(str, 10);
    }

    getFirstNumber(numbers) {
        return numbers[0];
    }

    getLastNumber(numbers) {
        return numbers[numbers.length-1];
    }

    calibrate(filename) {
        const stringArray = this.loadInput(filename);
        let total = 0;
        for (let str of stringArray) {
            total += this.processCalibrationLine(str);
        }
        return total;
    }

    calibrate2(filename) {
        const stringArray = this.loadInput(filename);
        let total = 0;
        for (let str of stringArray) {
            total += this.processCalibrationLine2(str);
        }
        return total;
    }
}

