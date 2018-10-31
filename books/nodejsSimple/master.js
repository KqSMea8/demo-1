var fork = require('child_process').fork;
var cpus = require('os').cpus();
for (var i = 0; i < cpus.length; i++) {
    fork('./worker.js');
}

var cp = require('child_process');
cp.spawn('node', ['worker.js']);
cp.exec('node worker.js', function (err, stdout, stderr) {

});

cp.execFile('worler.js', function (err, stdout, sterr) {

});

cp.fork('./worker.js');
