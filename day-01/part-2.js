const LocationListProcessor = require('./location-list-processor');
const locationListProcessor = new LocationListProcessor();
console.log(locationListProcessor.compareListsForSimilarity('input.txt'));