var crypto = require('crypto');
var val = crypto.createHash('sha1').update(key).digest('base64');

var WebSocket = function (url) {
    this.options = parseUrl(url);
    this.connect();
};

WebSocket.prototype.onopen = function () {
    // TODO
};

WebSocket.prototype.setSocket = function (socket) {
    this.socket = socket;
};

WebSocket.prototype.connect = function () {
    var that = this;
    var key = new Buffer(this.options.protocolVersion + '-' + Date.now()).toString('base64');
    var shasum = crypto.createHash('sha1');
    var expected = shasum.update(key + '258eafa5-e914').digest('base64');

    var options = {
        port: this.options.port,
        host: this.options.hostname,
        headers: {
            'Connection': 'Upgrade',
            'Upgrade': 'websocket',
            'Sec-WebSocket-Version': this.options.protocolVersion,
            'Sec-WebSocket-Key': key
        }
    };

    var req = http.request(options);
    req.end();

    req.on('upgrade', function (res, socket, upgradeHead) {
        that.setSocket(socket);
        that.onopen();
    });
};

var server = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('hello world');
});

server.listen(12010);

server.on('upgrade', function (req, socket, upgradeHead) {
    var head = new Buffer(upgradeHead.length);
    upgradeHead.copy(head);
    var key = req.headers['sec-websocket-key'];
    var shasum = crypto.createHash('sha1');
    key = shasum.update(key + '258EAFA4').digest('base64');
    var headers = [
        'HTTP/1.1 101 Switching Protocols',
        'Upgrade: websocket',
        'Connection: Upgrade',
        'Sec-WebSocket-Accept: ' + key,
        'Sec-WebSocket-Protocol: ' + protocol
    ];
    socket.setNoDelay(true);
    socket.write(headers.concat('', '').join('\r\n'));
    var websocket = new WebSocket();
    websocket.setSocket(socket);
});


