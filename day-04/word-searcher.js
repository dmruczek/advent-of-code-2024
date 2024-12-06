module.exports = class WordSearcher {

    
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
        
        for (let i = 0; i < stringArray.length; i++) {
            data.push(stringArray[i].split(''));
        }

        return data;
    }

    findWordCount(data) {
        this.foundWordsOnly = [];
        for (let i = 0; i < data.length; i++) {
            this.foundWordsOnly.push([]);
            for (let j = 0; j < data[i].length; j++) {
                this.foundWordsOnly[i].push('.');
            }
        }

        let count = 0;
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].length; j++) {
                if (data[i][j] === 'X') {

                    for (let xDir = -1; xDir < 2; xDir++) {
                        for (let yDir = -1; yDir < 2; yDir++) {
                            if (this.checkDirectionForWord(data, i, j, yDir, xDir)) {
                                count ++;
                            }
                        }
                    }
                }
            }
        }
        // this.printData(this.foundWordsOnly);

        return count;
    }

    checkDirectionForWord(data, y, x, yDirection, xDirection) {

        if (this.checkForLetter('M', data, y + (1 * yDirection), x + (1 * xDirection)) && 
            this.checkForLetter('A', data, y + (2 * yDirection), x + (2 * xDirection)) && 
            this.checkForLetter('S', data, y + (3 * yDirection), x + (3 * xDirection))) {

            this.foundWordsOnly[y][x] = 'X';
            this.foundWordsOnly[y + (1 * yDirection)][x + (1 * xDirection)] = 'M';
            this.foundWordsOnly[y + (2 * yDirection)][x + (2 * xDirection)] = 'A';
            this.foundWordsOnly[y + (3 * yDirection)][x + (3 * xDirection)] = 'S';
            return true;
        }
        return false;
    }

    checkForLetter(letter, data, y, x) {
        if (y >= 0 && y < data.length && x >= 0 && x < data[y].length) {
            return letter === data[y][x];
        }
        return false;
    }

    printData(data) {
        for (let row of data) {
            console.log(row.join(""));
        }
    }

    findAllInstancesOfWordInFile(filename) {
        const stringArray = this.loadInput(filename);
        const data = this.processInputData(stringArray);
        return this.findWordCount(data);
    }

};
