var http = require('http');
var url = require('url');
var util = require('util');
var querystring = require('querystring');


function start () {

    function onRequest (req, res) {
       res.writeHead(200, {'Content-Type': 'text/html'});
       res.end(url.parse(req.url).pathname);
    }

    http.createServer(onRequest).listen(8080);
    console.log('server listen 8080');
}


exports.start = start;