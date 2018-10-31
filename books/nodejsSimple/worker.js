var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello world\n');
}).listen(Math.round((1 + Math.random()) * 1000), '127.0.0.1');

var worker = new Worker('worker.js');
worker.onmessage = function (event) {
    document.getElementById('result').textContent = event.data;
}

var n = 1;
function search () {
    while (true) {
        n += 1;
        for (var i = 2; i <= Math.sqrt(n); i+= 1) {
            if (n % i == 0) {
                // continue search
            }
            postMessage(n);
        }
    }
}
