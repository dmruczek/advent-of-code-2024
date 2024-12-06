module.exports = class GuardPathPredictor {
    
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
            board: []
        };

        for (let i = 0; i < stringArray.length; i++) {
            const str = stringArray[i];
            data.board.push(str.split(""));
            for (let j = 0; j < data.board[i].length; j++) {
                if (data.board[i][j] === '^') {
                    data.guardX = j;
                    data.guardY = i;
                    data.guardFace = 'UP';
                }
            }
        }

        return data;
    }

    // printBoard(data) {
    //     for (let row of data.board) {
    //         console.log(row.join(""));
    //     }
    // }

    processGuardStep(data) {
        const guardTurnMap = {"UP": "RIGHT", "RIGHT": "DOWN", "DOWN": "LEFT", "LEFT": "UP"};
        const guardShapeMap = {"UP": "^", "RIGHT": ">", "DOWN": "v", "LEFT": "<"};

        let newX, newY;

        if (data.guardFace === "UP") {
            newX = data.guardX;
            newY = data.guardY - 1;
        } else if (data.guardFace === "RIGHT") {
            newX = data.guardX + 1;
            newY = data.guardY;
        } else if (data.guardFace === "DOWN") {
            newX = data.guardX;
            newY = data.guardY + 1;
        } else {
            newX = data.guardX - 1;
            newY = data.guardY;
        }

        if (newX < 0 || newY < 0 || newX === data.board[0].length || newY === data.board.length) {
            data.board[data.guardY][data.guardX] = 'X';
            data.finished = true;
            return data;
        }

        if (data.board[newY][newX] === '#') {
            data.guardFace = guardTurnMap[data.guardFace];
            data.board[data.guardY][data.guardX] = guardShapeMap[data.guardFace];
        } else {
            data.board[data.guardY][data.guardX] = 'X';
            data.guardX = newX;
            data.guardY = newY;
            data.board[newY][newX] = guardShapeMap[data.guardFace];
        }

        return data;
    }    

    calculateNumberOfGuardSteps(data) {

        // this.printBoard(data);
        for (let i = 0; i < 10000; i++) {
            data = this.processGuardStep(data);
            // console.log('\n');
            // this.printBoard(data);
            if (data.finished) {
                break;
            }
        }

        return this.countVisitedPositions(data);
    }

    countVisitedPositions(data) {
        let count = 0;
        for (let y = 0; y < data.board.length; y ++) {
            for (let x = 0; x < data.board[y].length; x++) {
                if (data.board[y][x] === 'X') {
                    count++;
                }
            }
        }
        return count;
    }


    predictGuardPathAndCalculateNumberOfSteps(filename) {
        const stringArray = this.loadInput(filename);
        const data = this.processInputData(stringArray);
        return this.calculateNumberOfGuardSteps(data);

    }

};
