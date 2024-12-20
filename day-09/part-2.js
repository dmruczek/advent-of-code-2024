const DiskFragmenter = require('./disk-fragmenter');
const diskFragmenter = new DiskFragmenter();
console.log(diskFragmenter.processFilesystemSmart('input.txt'));