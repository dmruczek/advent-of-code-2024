module.exports = class LavaTrailFinder {
    
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
            fullMap: [],
            trailheads: []
        };
      

        for (let y = 0; y < stringArray.length; y++) {
            let row = stringArray[y];
            data.fullMap.push([]);
            for (let x = 0; x < row.length; x++) {
                const elevation = parseInt(row[x]);

                if (elevation === 0) {
                    data.trailheads.push({x: x, y: y});
                }

                data.fullMap[y].push(elevation);
            }
        }

        // console.log(data);
        return data;

    }


    findAllTrailsForTrailhead(data, trailhead) {
        let currentSteps = [{x: trailhead.x, y: trailhead.y}];

        for (let elevation = 0; elevation < 9; elevation++) {

            let nextSteps = [];
            for (let position of currentSteps) {
                const viableNextPositions = this.findViableNextSteps(data.fullMap, position, elevation);
                Array.prototype.push.apply(nextSteps, viableNextPositions);                
            }
            // console.log('raw ' + JSON.stringify(nextSteps));

            // de-dupe:
            currentSteps = [];
            for (let position of nextSteps) {
                
                let found = false;
                for (let positionToCheck of currentSteps) {
                    if (position.x === positionToCheck.x && position.y === positionToCheck.y) {
                        found = true;
                    }
                }
                if (!found) {
                    currentSteps.push(position);
                }
            }
            // console.log('elevation ' + elevation + ': ' + JSON.stringify(currentSteps));

        }
        return currentSteps;
    }

    findViableNextSteps(map, position, elevation) {
        let viableNextPositions = [], y, x;

        // UP
        y = position.y - 1;
        x = position.x;
        if (this.isViableStep(map, elevation, y, x)) {
            viableNextPositions.push({y:y, x:x});
        }

        // DOWN
        y = position.y + 1;
        x = position.x;
        if (this.isViableStep(map, elevation, y, x)) {
            viableNextPositions.push({y:y, x:x});
        }

        // LEFT
        y = position.y;
        x = position.x - 1;
        if (this.isViableStep(map, elevation, y, x)) {
            viableNextPositions.push({y:y, x:x});
        }

        // RIGHT
        y = position.y;
        x = position.x + 1;
        if (this.isViableStep(map, elevation, y, x)) {
            viableNextPositions.push({y:y, x:x});
        }

        return viableNextPositions;
    }

    isViableStep(map, currentElevation, nextY, nextX) {
        return nextY > -1 && nextX > -1 && nextY < map.length && nextX < map[0].length && map[nextY][nextX] === (currentElevation + 1);
    }

    finaAllTrailsAndCalculateTotalScore(data) {
        let total = 0;

        for (let trailhead of data.trailheads) {
            total += this.findAllTrailsForTrailhead(data, trailhead).length;
        }
        return total;
    }



    findTrailheadsAndCalculateScore(filename) {
        const rawData = this.loadInput(filename);
        const data = this.processInputData(rawData);
        return this.finaAllTrailsAndCalculateTotalScore(data);
    }

};
