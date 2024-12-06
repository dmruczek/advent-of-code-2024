describe('WordSearcher', function () {

    const WordSearcher = require('./word-searcher');

    describe('findAllInstancesOfWordInFile', function () {
        it('should process the input file and find all instances of the given word.', function () {
            const wordSearcher = new WordSearcher();
            expect(wordSearcher.findAllInstancesOfWordInFile('test-input.txt')).toBe(18);
        });
    });
    
});