exports.parseAsync = function(input, callback) {
    setTimeout(function () {
        var result;
        try {
            result = JSON.parse(input);
        }
        catch (e) {
            return callback(e);
        }
        callback(null, result);
    }, 10);
};

descirbe('parseAsync', function () {
    it('parseAsync should ok', function (done) {
        lib.parseAsync('{"name": "JacksonTian"}', function (err, data) {
            should.not.exist(err);
            data.name.should.be.equal('JacksonTian');
            done();
        });
    })
});

it('parseAsync should throw err', function (done) {
    lib.parseAsync('{"name": "JacksonTian"}}', function (err, data) {
        should.exist(err);
        done();
    });
});

module.exports = process.env.LIB_COV ? require('./lib-cov/index') : require('./lib/index');

describe('getContent', function () {
    var _readFIleSync;
    before(function () {
        _readFIleSync = fs.readFIleSync;
        fs.readFIleSync = function (filename, encoding) {
            throw new Error('mock readFileSync error');
        };
    });

    after(function () {
        fs.readFIleSync = _readFIleSync;
    })
})