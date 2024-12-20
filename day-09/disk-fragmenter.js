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
        let data = {
            filesystem: [],
            freeSpots: [],
            dataBlocks: []
        };

        for (let i = 0; i < stringArray[0].length; i++) {
            const chr = stringArray[0][i];
            const sizeOfBlock = parseInt(chr);
            let charToPrint = i/2 + '';
            if (i % 2 == 1) {
                charToPrint = '.';
                data.freeSpots.push({startIndex: data.filesystem.length, sizeOfBlock: sizeOfBlock});
            } else {
                data.dataBlocks.push({startIndex: data.filesystem.length, sizeOfBlock: sizeOfBlock, character: charToPrint});
            }
            for (let j = 0; j < sizeOfBlock; j++) {
                data.filesystem.push(charToPrint);

            }
        }
        // console.log(data.freeSpots);
        // console.log(data.dataBlocks);

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

    moveData(data, dataBlock, newPosition) {

        for (let i = 0; i < dataBlock.sizeOfBlock; i++) {
            data.filesystem[newPosition + i] = dataBlock.character;
            data.filesystem[dataBlock.startIndex + i] = '.';
        }
    }

    rePositionData(data) {

        for (let dataBlockToMove of data.dataBlocks.reverse()) {
            const dataSize = dataBlockToMove.sizeOfBlock;
            for (let i = 0; i < data.freeSpots.length; i++) {
                const freeSpot = data.freeSpots[i];
                if (freeSpot.sizeOfBlock >= dataSize && freeSpot.startIndex < dataBlockToMove.startIndex) {
                    this.moveData(data, dataBlockToMove, freeSpot.startIndex);
                    freeSpot.startIndex = freeSpot.startIndex + dataSize;
                    freeSpot.sizeOfBlock = freeSpot.sizeOfBlock - dataSize;
                    break;
                }
            }
        }
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
        this.fragmentData(data.filesystem);
        return this.calculateChecksum(data.filesystem);
    }

    processFilesystemSmart(filename) {
        const rawData = this.loadInput(filename);
        const data = this.processInputData(rawData);
        this.rePositionData(data);
        return this.calculateChecksum(data.filesystem);
    }

};
