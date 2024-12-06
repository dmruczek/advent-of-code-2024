describe('XWordSearcher', function () {

    const XWordSearcher = require('./x-word-searcher');

    describe('findAllInstancesOfWordInFile', function () {
        it('should process the input file and find all instances of the given word.', function () {
            const wordSearcher = new XWordSearcher();
            expect(wordSearcher.findAllInstancesOfWordInFile('test-input.txt')).toBe(9);
        });
    });
    
});