module.exports = class BlinkStoneSimulator {
    
    loadInput(filename) {
        const path = require('path');
        const fs = require('fs');
        const os = require('os');
    
        const data = fs.readFileSync(path.resolve(__dirname, filename), 'utf-8');
        const stringArray = data.split(os.EOL);
        return stringArray;
    }

    processInputData(stringArray) {
        let data = {};
        const strSplit = stringArray[0].split(' ');
        data.stoneArray = strSplit.map(str => parseInt(str, 10));
        return data;
    }


    processStone(stone) {
        let newStones = [];

        if (stone == 0) {
            newStones.push(1);
        } else {
            const stoneStr = stone + '';
            if (stoneStr.length % 2 === 0) {
                const mid = stoneStr.length / 2;
                newStones.push(parseInt(stoneStr.slice(0,mid), 10));
                newStones.push(parseInt(stoneStr.slice(mid), 10));
            } else {
                newStones.push(stone * 2024);
            }
        }
        return newStones;
    }

    doSim(data, numberOfBlinks) {
        let currentStoneArray = data.stoneArray;

        for (let i = 0; i < numberOfBlinks; i++) {
            let nextStoneArray = [];
            for (let stone of currentStoneArray) {
                Array.prototype.push.apply(nextStoneArray, this.processStone(stone));
            }
            // console.log(nextStoneArray);
            currentStoneArray = nextStoneArray;
        }

        return currentStoneArray.length;
    }



    simulateBlinksAndCountStones(filename, numberOfBlinks) {
        const rawData = this.loadInput(filename);
        const data = this.processInputData(rawData);
        return this.doSim(data, numberOfBlinks);
    }


};
