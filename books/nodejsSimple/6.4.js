var http = require('http');
var helloworld = '';

for (var i = 0; i < 1024 * 10; i++) {
    helloworld += 'a';
}

helloworld = new Buffer(helloworld);

http.createServer(function (req, res) {
    res.writeHead(200);
    res.end(helloworld);
}).listen(8001);

function runTest() {
    assert(fs.statSync(filename).size === filesize);
    var rs = fs.createReadStream(filename, {
        highWaterMark: size,
        encoding: encoding
    });

    rs.on('open', function () {
        bench.start();
    });

    var bytes = 0;
    rs.on('data', function (chunk) {
        bytes += chunk.length;
    });

    rs.on('end', function () {
        try {
            fs.unlinkSync(filename);
        }
        catch (e) {

        }
        bench.end(bytes / (1024 * 1024));
    })
}