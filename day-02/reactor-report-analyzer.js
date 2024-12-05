module.exports = class ReactorReportAnalyzer {

    
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

        for (let str of stringArray) {
            const split = str.split(' ');
            let numList = [];
            for (let splitStr of split) {
                numList.push(parseInt(splitStr));
            }
            data.push(numList);
        }
        return data;
    }

    countSafeReportsFromData(data) {
        let total = 0;
        for (let report of data) {
            if (this.isReportSafe(report)) {
                total ++;
            }
        }
        return total;
    }

    isReportSafe(reportData) {
        const directionality = reportData[1] - reportData[0];
        for (let i = 1; i < reportData.length; i++) {
            const difference = reportData[i] - reportData[i-1];
            if (directionality < 0 && difference > 0) {
                return false;
            }
            if (directionality > 0 && difference < 0) {
                return false;
            }
            if (difference < -3 || difference > 3 || difference === 0) {
                return false;
            }
        }
        return true;
    }

    countSafeReportsWithProblemDampenerFromData(data) {
        let total = 0;
        for (let report of data) {
            if (!this.isReportSafe(report)) {
                for (let i = 0; i < report.length; i++) {
                    const newReport = [
                        ...report.slice(0,i),
                        ...report.slice(i+1)
                    ];
                    if (this.isReportSafe(newReport)) {
                        total++;
                        break;
                    }
                }
            } else {
                total ++;
            }
        }
        return total;
    }

    countSafeReports(filename) {
        const rawData = this.loadInput(filename);
        const data = this.processInputData(rawData);
        return this.countSafeReportsFromData(data);
    }

    countSafeReportsWithProblemDampener(filename) {
        const rawData = this.loadInput(filename);
        const data = this.processInputData(rawData);
        return this.countSafeReportsWithProblemDampenerFromData(data);
    }



};
