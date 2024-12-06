const XWordSearcher = require('./x-word-searcher');
const wordSearcher = new XWordSearcher();
console.log(wordSearcher.findAllInstancesOfWordInFile('input.txt'));