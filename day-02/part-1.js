const ReactorReportAnalyzer = require('./reactor-report-analyzer');
const reactorReportAnalyzer = new ReactorReportAnalyzer();
console.log(reactorReportAnalyzer.countSafeReports('input.txt'));