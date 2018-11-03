var fs = require('fs');
var muk = require('muk');
before(function () {
    muk(fs, 'readFileSync', function (path, encoding) {
        throw new Error('mock readFileSync error');
    });
});

after(function () {
    muk.restore();
});

beforeEach(function () {
    muk(fs, 'readFileSync', function (path, encoding) {
        throw new Error('mock readFileSync error');
    });
});

afterEach(function () {
    muk.restore();
});

fs.readFile = function (filename, encoding, callback) {
    callback(new Error('mock readFile error'));
}

fs.readFile = function (filename, encoding, callback) {
    process.nextTick(function () {
        callback(new Error('mock readFile error'));
    });
};