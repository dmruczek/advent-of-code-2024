module.exports = class XWordSearcher {

    
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
                if (data[i][j] === 'A') {

                    if (this.checkForLetter('M', data, i-1, j-1) &&
                        this.checkForLetter('S', data, i+1, j+1) &&
                        this.checkForLetter('M', data, i+1, j-1) &&
                        this.checkForLetter('S', data, i-1, j+1)) {
                            count++;
                    }
                    if (this.checkForLetter('S', data, i-1, j-1) &&
                        this.checkForLetter('M', data, i+1, j+1) &&
                        this.checkForLetter('M', data, i+1, j-1) &&
                        this.checkForLetter('S', data, i-1, j+1)) {
                            count++;
                    }
                    if (this.checkForLetter('S', data, i-1, j-1) &&
                        this.checkForLetter('M', data, i+1, j+1) &&
                        this.checkForLetter('S', data, i+1, j-1) &&
                        this.checkForLetter('M', data, i-1, j+1)) {
                            count++;
                    }
                    if (this.checkForLetter('M', data, i-1, j-1) &&
                        this.checkForLetter('S', data, i+1, j+1) &&
                        this.checkForLetter('S', data, i+1, j-1) &&
                        this.checkForLetter('M', data, i-1, j+1)) {
                            count++;
                    }

                }
            }
        }

        return count;
    }

    checkForLetter(letter, data, y, x) {
        if (y >= 0 && y < data.length && x >= 0 && x < data[y].length) {
            return letter === data[y][x];
        }
        return false;
    }

    findAllInstancesOfWordInFile(filename) {
        const stringArray = this.loadInput(filename);
        const data = this.processInputData(stringArray);
        return this.findWordCount(data);
    }

};
