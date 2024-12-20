describe('DiskFragmenter', function () {

    const DiskFragmenter = require('./disk-fragmenter');

    describe('processFilesystem', function () {
        it('should run the fragmentation program and return the checksum', function () {
            const diskFragmenter = new DiskFragmenter();
            expect(diskFragmenter.processFilesystem('test-input.txt')).toBe(1928);
        });
    });

    describe('processFilesystemSmart', function () {
        it('should run the smart reposition program and return the checksum', function () {
            const diskFragmenter = new DiskFragmenter();
            expect(diskFragmenter.processFilesystemSmart('test-input.txt')).toBe(2858);
        });
    });

    

});