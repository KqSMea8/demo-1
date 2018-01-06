var fs = require('fs');
var https = require('https');

var options = {
    host: '127.0.0.1',
    port: 6666,
    method: 'GET',
    path: '/'
};

var req = https.request(options, function (res) {
    res.on('data', function (data) {
        console.log(data);
    });
});

req.write('Bye itbilu.com');
req.end();