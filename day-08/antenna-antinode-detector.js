module.exports = class AntennaAntinodeDetector {
    
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
            antennaMap: {},
            board: []
        };

        let yPos = 0;
        for (let str of stringArray) {
            data.board.push([]);
            for (let xPos = 0; xPos < str.length; xPos++) {
                const antennaChar = str[xPos];
                data.board[yPos].push(antennaChar);
                if (str[xPos] !== '.') {
                    if (!data.antennaMap[antennaChar]) {
                        data.antennaMap[antennaChar] = [];
                    }
                    data.antennaMap[antennaChar].push({x: xPos, y: yPos});
                }
            }
            yPos++;
        }
        // this.printBoard(data.board);
        return data;
    }

    // printBoard(board) {
    //     let str;
    //     for (let row of board) {
    //         str = '';
    //         for (let pos of row) {
    //             str += pos;
    //         }
    //         console.log(str);
    //     }
    // }

    findAntinodesForAntenna(data, antennaChar) {
        const allAntennaPositions = data.antennaMap[antennaChar];
        for (let i = 0; i < allAntennaPositions.length; i++) {
            const antenna1 = allAntennaPositions[i];
            for (let j = 0; j < allAntennaPositions.length; j++) {
                if (i !== j) {
                    const antenna2 = allAntennaPositions[j];

                    const xDiff = antenna1.x - antenna2.x;
                    const yDiff = antenna1.y - antenna2.y;

                    let antinode1 = {};
                    let antinode2 = {};
                    antinode1.x = antenna1.x + xDiff;
                    antinode1.y = antenna1.y + yDiff;

                    antinode2.x = antenna2.x - xDiff;
                    antinode2.y = antenna2.y - yDiff;
                    this.addAntinode(data, antinode1);
                    this.addAntinode(data, antinode2);
                }
            }
        }
    }

    addAntinode(data, antinode) {
        if (antinode.x >= 0 && antinode.x < data.board[0].length && antinode.y >= 0 && antinode.y < data.board.length) {
            data.board[antinode.y][antinode.x] = '#';
        }
    }

    findAntinodes(data) {

        for (const antennaChar in data.antennaMap) {
            this.findAntinodesForAntenna(data, antennaChar);
        }
        // this.printBoard(data.board);
    }

    countAntinodes(data) {
        let total = 0;
        for (let row of data.board) {
            for (let pos of row) {
                if (pos === '#') {
                    total++;
                }
            }
        }
        return total;
    }

    detectTotalAntinodes(filename) {
        const rawData = this.loadInput(filename);
        const data = this.processInputData(rawData);
        this.findAntinodes(data);
        return this.countAntinodes(data);
    }

};
