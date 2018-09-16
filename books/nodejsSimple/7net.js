var net = require('net');
var server = net.createServer(function (socket) {
    socket.on('data', function (data) {
        socket.write('你好');
    })

    socket.on('end', function () {
        console.log('连接断开');
    });

    socket.write('欢迎光临<<深入浅出nodejs>>');
});

server.listen(8124, function () {
    console.log('server bound');
});

// server.listen('/tmp/echo.sock');

// var client = net.connect({port: 8124}, function () {
//     console.log('client connected');
//     client.write('world!');
// });

// client.on('data', function (data) {
//     console.log(data.toString());
//     client.end();
// });

// client.on('end', function () {
//     console.log('client disconnected');
// });
