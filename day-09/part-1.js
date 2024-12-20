const DiskFragmenter = require('./disk-fragmenter');
const diskFragmenter = new DiskFragmenter();
console.log(diskFragmenter.processFilesystem('input.txt'));