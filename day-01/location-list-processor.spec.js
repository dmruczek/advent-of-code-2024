describe('LocationListProcessor', function () {

    const LocationListProcessor = require('./location-list-processor');

    describe('loadInput', function () {
        it('should read the contents of the file into a string', function () {
            const locationListProcessor = new LocationListProcessor();
            const rawData = locationListProcessor.loadInput('test-input.txt');
            const expected = ['3   4','4   3','2   5','1   3','3   9','3   3'];
            expect(rawData).toEqual(expected);
        });
    });


    describe('processInputData', function () {
        it('should process the raw data into two lists of numbers that are sorted from smallest to largest', function () {
            const locationListProcessor = new LocationListProcessor();
            const rawData = locationListProcessor.loadInput('test-input.txt');
            const processedData = locationListProcessor.processInputData(rawData);
            const expected = { list1: [ 1, 2, 3, 3, 3, 4 ], list2: [ 3, 3, 3, 4, 5, 9 ] };
            expect(processedData).toEqual(expected);
        });
    });

    describe('calculateTotalDistance', function () {
        it('should take the processed data in as an input, and output the total distance between all locations.', function () {
            const locationListProcessor = new LocationListProcessor();
            const distance = locationListProcessor.calculateTotalDistance({ list1: [ 1, 2, 3, 3, 3, 4 ], list2: [ 3, 3, 3, 4, 5, 9 ] });
            expect(distance).toBe(11);
        });
    });

    describe('compareLists', function () {
        it('should load the data from the input file, and then use that data to calculate the distance between all locations.', function () {
            const locationListProcessor = new LocationListProcessor();
            const distance = locationListProcessor.compareLists('test-input.txt');
            expect(distance).toBe(11);
        });
    });
    
});