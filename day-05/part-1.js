const PageOrderingMonitor = require('./page-ordering-monitor');
const pageOrderingMonitor = new PageOrderingMonitor();
console.log(pageOrderingMonitor.detectValidPrintQueuesAndReturnCode('input.txt'));