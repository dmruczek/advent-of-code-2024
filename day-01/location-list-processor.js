module.exports = class LocationListProcessor {

    
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
            list1: [],
            list2: []
        };


        for (let str of stringArray) {
            const splitStr = str.split('   ');
            data.list1.push(parseInt(splitStr[0]));
            data.list2.push(parseInt(splitStr[1]));
        }

        data.list1.sort();
        data.list2.sort();

        return data;
    }

    calculateTotalDistance(data) {
        let total = 0;
        for (let i = 0; i < data.list1.length; i++) {
            let num1 = data.list1[i];
            let num2 = data.list2[i];

            let difference = num1 - num2;
            if (difference < 0) {
                difference = num2 - num1;
            }
            total += difference;
        }
        return total;
    }

    calculateSimilarity(data) {
        let totalSimilarity = 0;
        for (let num of data.list1) {
            totalSimilarity += this.calculateSimilarityForNumber(num, data.list2);
        }
        return totalSimilarity;
    }

    calculateSimilarityForNumber(num, list) {
        let similarity = 0;
        for (let num2 of list) {
            if (num === num2) {
                similarity += num;
            }
        }
        return similarity;
    }

    compareLists(filename) {
        const rawData = this.loadInput(filename);
        const data = this.processInputData(rawData);
        return this.calculateTotalDistance(data);
    }

    compareListsForSimilarity(filename) {
        const rawData = this.loadInput(filename);
        const data = this.processInputData(rawData);
        return this.calculateSimilarity(data);
    }

};
