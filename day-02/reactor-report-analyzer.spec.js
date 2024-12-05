describe('ReactorReportAnalyzer', function () {

    const ReactorReportAnalyzer = require('./reactor-report-analyzer');

    describe('countSafeReports', function () {
        it('should process the input file and count the number of reports that are considered safe.', function () {
            const reactorReportAnalyzer = new ReactorReportAnalyzer();
            const safeReports = reactorReportAnalyzer.countSafeReports('test-input.txt');
            expect(safeReports).toBe(2);
        });
    });

    describe('countSafeReportsWithProblemDampener', function () {
        it('should process the input file and count the number of reports that are considered safe including the problem dampener.', function () {
            const reactorReportAnalyzer = new ReactorReportAnalyzer();
            const safeReports = reactorReportAnalyzer.countSafeReportsWithProblemDampener('test-input.txt');
            expect(safeReports).toBe(4);
        });
    });

    

    describe('isReportSafe', function() {
        it('should determine whether or not this individual report data is safe.', function () {
            const reactorReportAnalyzer = new ReactorReportAnalyzer();
            expect(reactorReportAnalyzer.isReportSafe([7, 6, 4, 2, 1])).toBe(true);
            expect(reactorReportAnalyzer.isReportSafe([1, 2, 7, 8, 9])).toBe(false);
            expect(reactorReportAnalyzer.isReportSafe([9, 7, 6, 2, 1])).toBe(false);
            expect(reactorReportAnalyzer.isReportSafe([1, 3, 2, 4, 5])).toBe(false);
            expect(reactorReportAnalyzer.isReportSafe([8, 6, 4, 4, 1])).toBe(false);
            expect(reactorReportAnalyzer.isReportSafe([1, 3, 6, 7, 9])).toBe(true);
            expect(reactorReportAnalyzer.isReportSafe([4, 3, 6, 7, 9])).toBe(false);
        });
    });

    
});