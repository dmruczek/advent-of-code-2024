describe('TrebuchetCalibrator', function () {

    const TrebuchetCalibrator = require('./trebuchet-calibrator');

    describe('extractNumbers', function () {
        it('should extract all of the numbers from the given string', function () {
            const trebuchetCalibrator = new TrebuchetCalibrator();
            expect(trebuchetCalibrator.extractNumbers('1abc2')).toEqual([ '1', '2' ]);
            expect(trebuchetCalibrator.extractNumbers('pqr3stu8vwx')).toEqual([ '3', '8' ]);
            expect(trebuchetCalibrator.extractNumbers('a1b2c3d4e5f')).toEqual([ '1', '2', '3', '4', '5' ]);
            expect(trebuchetCalibrator.extractNumbers('treb7uchet')).toEqual([ '7' ]);
        });
    });

    describe('processCalibrationLine', function () {
        it('should extract the first and last numbers in the line and turn them into a number', function () {
            const trebuchetCalibrator = new TrebuchetCalibrator();
            expect(trebuchetCalibrator.processCalibrationLine('1abc2')).toEqual(12);
            expect(trebuchetCalibrator.processCalibrationLine('pqr3stu8vwx')).toEqual(38);
            expect(trebuchetCalibrator.processCalibrationLine('a1b2c3d4e5f')).toEqual(15);
            expect(trebuchetCalibrator.processCalibrationLine('treb7uchet')).toEqual(77);
        });
    });

    describe('calibrate', function () {
        it('should process all lines and add them together to get the total calibration number', function () {
            const trebuchetCalibrator = new TrebuchetCalibrator();
            expect(trebuchetCalibrator.calibrate('test-input.txt')).toEqual(142);
        });
    });

    describe('extractNumbers2', function() {
        it ('should extract all of the numbers from the given string, including numbers spelled out in english.', function () {
            const trebuchetCalibrator = new TrebuchetCalibrator();
            expect(trebuchetCalibrator.extractNumbers2('abcone2threexyz')).toEqual([ 1, 2, 3 ]);
            expect(trebuchetCalibrator.extractNumbers2('twoone92threenphjgdlztslfourvlfpbdqpvh')).toEqual([ 2, 1, 9, 2, 3, 4 ]);
            expect(trebuchetCalibrator.extractNumbers2('mrtwone3seventhree')).toEqual([ 2, 1, 3, 7, 3 ]);
            

        });
    });

    describe('processCalibrationLine2', function() {
        it ('should extract the first and last numbers in the line and turn them into a number, including numbers spelled out in english.', function () {
            const trebuchetCalibrator = new TrebuchetCalibrator();
            expect(trebuchetCalibrator.processCalibrationLine2('two1nine')).toEqual(29);
            expect(trebuchetCalibrator.processCalibrationLine2('eightwothree')).toEqual(83);
            expect(trebuchetCalibrator.processCalibrationLine2('abcone2threexyz')).toEqual(13);
            expect(trebuchetCalibrator.processCalibrationLine2('xtwone3four')).toEqual(24);
            expect(trebuchetCalibrator.processCalibrationLine2('4nineeightseven2')).toEqual(42);
            expect(trebuchetCalibrator.processCalibrationLine2('zoneight234')).toEqual(14);
            expect(trebuchetCalibrator.processCalibrationLine2('7pqrstsixteen')).toEqual(76);
            expect(trebuchetCalibrator.processCalibrationLine2('four48rvhnzsnzmjxrl258')).toEqual(48);
            expect(trebuchetCalibrator.processCalibrationLine2('four48rvhnzsnzmjxrl258five')).toEqual(45);
            expect(trebuchetCalibrator.processCalibrationLine2('nine')).toEqual(99);
            expect(trebuchetCalibrator.processCalibrationLine2('twoone92threenphjgdlztslfourvlfpbdqpvh')).toEqual(24);

            
        });
    });
   
    describe('calibrate2', function () {
        it('should process all lines and add them together to get the total calibration number, including numbers spelled out in english.', function () {
            const trebuchetCalibrator = new TrebuchetCalibrator();
            expect(trebuchetCalibrator.calibrate2('test-input-2.txt')).toEqual(281);
        });
    });
    
    
});