const ReactorReportAnalyzer = require('./reactor-report-analyzer');
const reactorReportAnalyzer = new ReactorReportAnalyzer();
console.log(reactorReportAnalyzer.countSafeReportsWithProblemDampener('input.txt'));