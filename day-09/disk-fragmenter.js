module.exports = class DiskFragmenter {
    
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

        for (let i = 0; i < stringArray[0].length; i++) {
            const chr = stringArray[0][i];
            const sizeOfBlock = parseInt(chr);
            let charToPrint = i/2 + '';
            if (i % 2 == 1) {
                charToPrint = '.';
            }
            for (let j = 0; j < sizeOfBlock; j++) {
                data.push(charToPrint);
            }
        }
        // console.log('\n');
        // console.log(data.join(''));
        // console.log('\n');
        return data;
    }

    fragmentData(data) {
        let lpos = 0;
        let rpos = data.length-1;


        while (rpos > lpos) {
            // console.log('lpos=' + lpos + ';rpos=' + rpos+';');
            if (data[rpos] == '.') {
                // rpos is not a number.  Move left.
                rpos--;
            } else if (data[lpos] !== '.') {
                // lpos is not open.  Move right.
                lpos++;
            } else {
                // rpos is a number, and lpos is ready to receive it.
                data[lpos] = data[rpos];
                data[rpos] = '.';
                lpos++; rpos--;
            }
        }

        // console.log('\n');
        // console.log(data.join(''));
        // console.log('\n');

    }

    calculateChecksum(data) {
        let total = 0;
        for (let i = 0; i < data.length; i++) {
            if (data[i] !== '.') {
                total += i * parseInt(data[i]);
            }
        }
        return total;
    }

    processFilesystem(filename) {
        const rawData = this.loadInput(filename);
        const data = this.processInputData(rawData);
        this.fragmentData(data);
        return this.calculateChecksum(data);
    }

};
