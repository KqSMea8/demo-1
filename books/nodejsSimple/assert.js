var assert = require('assert');
assert.equal(Math.max(1, 100), 100);

describe('Array', function () {
    before(function () {
        // ...
    })
});

describe('#indexOf', function () {
    it('should return -1 when not present', function () {
        [1, 2, 3].indexOf(4).should.equal(-1);
    });
});

suite('Array', function () {
    setup(function () {
        // ...
    });

    suite('#indexOf()', function () {
        test('should return -1 when not present', function () {
            assert.equal(-1, [1, 2, 3].indexOf(4));
        });
    });
});

describe('#indexOf()', function () {
    it('should return -1 when not present', function () {
        [1, 2, 3].indexOf(4).should.equal(-1);
    });

    it('should return index when present', function () {
        [1, 2, 3].indexOf(1).should.equal(0);
        [1, 2, 3].indexOf(2).should.equal(1);
        [1, 2, 3].indexOf(3).should.equal(2);
    });
});

it('fs.readFile should be ok', function (done) {
    fs.readFile('file_path', 'utf-8', function (err, data) {
        should.not.exist(err);
        done();
    });
});

it('async test', function (done) {
    setTimeout(done, 10000);
});

it('should take less than 500ms', function (done) {
    this.timeout(500);
    setTimeout(done, 300);
});

describe('a suite of tests', function () {
    this.timeout(500);
    it('should take less than 500ms', function (done) {
        setTimeout(done, 300);
    });

    it('should take less than 500ms as well', function (done) {
        setTimeout(done, 200);
    });
});

