var co = require('co');
var fs = require('fs');

var readFile = function (fileName) {
    return new Promise(function (resolve, reject) {
        fs.readFile(fileName, function (error, data) {
            if (error) return reject(error);
            resolve(data);
        });
    });
};

var gen = function* () {
    var f1 = yield readFile('./a.js');
    var f2 = yield readFile('./b.js');
    console.log(f1.toString());
    console.log(f2.toString());
};

co(gen).then(function () {
    console.log('generator 函数执行完成');
}).catch(function (err) {
    console.log(err);
})