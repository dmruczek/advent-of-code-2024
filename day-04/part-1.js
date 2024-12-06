const WordSearcher = require('./word-searcher');
const wordSearcher = new WordSearcher();
console.log(wordSearcher.findAllInstancesOfWordInFile('input.txt'));