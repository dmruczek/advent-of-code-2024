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

    findLoops(data) {
        const origData = JSON.parse(JSON.stringify(data));
        let loopableObstructionSpots = [];

        // first, solve the original puzzle to find places where the guard might go:
        this.calculateNumberOfGuardSteps(data);

        // next, use the completed board to create a list of positions where obstructions could be placed in the path of the guard:
        const possibleObstructionSpots = this.findAllPossibleObstructionLocations(data, origData);

        // now loop through all of the possible obstruction spots and test each one to see if it sets the guard in a loop.
        // for (let i = 0; i < 20; i++) {
        for (let i = 0; i < possibleObstructionSpots.length; i++) {
            // console.log('Testing option ' + (i+1) + ' out of ' + possibleObstructionSpots.length);
            let possibleObstructionSpot = possibleObstructionSpots[i];

            let dataWithNewObstruction = JSON.parse(JSON.stringify(origData));
            // console.log('trying ' + JSON.stringify(possibleObstructionSpot));
            dataWithNewObstruction.board[possibleObstructionSpot.y][possibleObstructionSpot.x] = '#';

            let visitedSpots = [];
            visitedSpots.push("X:"+dataWithNewObstruction.guardX+";Y:"+dataWithNewObstruction.guardY+";D:"+dataWithNewObstruction.guardFace);

            for (let i = 0; i < 10000; i++) {
                // this.printBoard(dataWithNewObstruction);
                dataWithNewObstruction = this.processGuardStep(dataWithNewObstruction);
                const newSpot = "X:"+dataWithNewObstruction.guardX+";Y:"+dataWithNewObstruction.guardY+";D:"+dataWithNewObstruction.guardFace;
                // console.log("visited spots " + visitedSpots);
                if (dataWithNewObstruction.finished) {
                    // Left the board.  No loop.
                    break;
                } else if (visitedSpots.includes(newSpot)) {
                    
                    //console.log("re-visited spot: " + newSpot);
                    // Spot has been visited already.  I guess we're in a loop now.
                    loopableObstructionSpots.push(possibleObstructionSpot);
                    dataWithNewObstruction.board[possibleObstructionSpot.y][possibleObstructionSpot.x] = 'O';                    
                    // this.printBoard(dataWithNewObstruction);
                    break;
                } else {
                    visitedSpots.push(newSpot);
                }
            }
        }

        // console.log(loopableObstructionSpots);
        return loopableObstructionSpots.length;
    }

    findAllPossibleObstructionLocations(data, origData) {

        let possibleObstructionSpots = [];


        for (let y = 0; y < data.board.length; y ++) {
            for (let x = 0; x < data.board[y].length; x++) {
                if (data.board[y][x] === 'X' && (y !== origData.guardY || x !== origData.guardX)) {
                    possibleObstructionSpots.push({x:x, y:y});
                }
            }
        }
        return possibleObstructionSpots;
    }


    predictGuardPathAndCalculateNumberOfSteps(filename) {
        const stringArray = this.loadInput(filename);
        const data = this.processInputData(stringArray);
        return this.calculateNumberOfGuardSteps(data);
    }

    placeObstructionsToSetGuardInLoop(filename) {
        const stringArray = this.loadInput(filename);
        const data = this.processInputData(stringArray);
        return this.findLoops(data);
    }


};
