describe('PageOrderingMonitor', function () {

    const PageOrderingMonitor = require('./page-ordering-monitor');

    describe('detectValidPrintQueuesAndReturnCode', function () {
        it('should process the input file apply the given rules to all of the print queues in the file.  It should then return the code derived by adding the middle page number of all valid print queues.', function () {
            const pageOrderingMonitor = new PageOrderingMonitor();
            expect(pageOrderingMonitor.detectValidPrintQueuesAndReturnCode('test-input.txt')).toBe(143);
        });
    });
   
    describe('reorderPagesAsNecessaryAndReturnCode', function () {
        it('should process the input file apply the given rules to all of the print queues in the file.  It should then return the code derived by adding the middle page number of all valid print queues.', function () {
            const pageOrderingMonitor = new PageOrderingMonitor();
            expect(pageOrderingMonitor.reorderPagesAsNecessaryAndReturnCode('test-input.txt')).toBe(123);
        });
    });

});