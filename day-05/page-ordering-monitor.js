module.exports = class PageOrderingMonitor {

    
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
            rules: [],
            printQueues: []
        };
        
        for (let i = 0; i < stringArray.length; i++) {
            const str = stringArray[i];
            if (str.includes('|')) {
                // process rule
                data.rules.push(str.split('|'));
            } else if (str.includes(',')) {
                // process print queue
                data.printQueues.push(str.split(','));
            }
        }

        return data;
    }

    isPrintQueueValid(printQueue, rules) {

        for (let rule of rules) {
            if (printQueue.includes(rule[0]) && printQueue.includes(rule[1])) {
                const page1Index = printQueue.indexOf(rule[0]);
                const page2Index = printQueue.indexOf(rule[1]);

                if (page2Index < page1Index) {
                    // console.log('Print Queue ' + printQueue + ' violates rule ' + rule[0] + '|' + rule[1]);
                    return false;
                }
            }
        }
        return true;
    }

    validatePrintQueuesAndCalculateCode(data) {
        let total = 0;
        for (let printQueue of data.printQueues) {
            if (this.isPrintQueueValid(printQueue, data.rules)) {
                total += parseInt(printQueue[Math.floor(printQueue.length/2)]);
            }
        }
        return total;
    }


    detectValidPrintQueuesAndReturnCode(filename) {
        const stringArray = this.loadInput(filename);
        const data = this.processInputData(stringArray);
        return this.validatePrintQueuesAndCalculateCode(data);
    }

};
