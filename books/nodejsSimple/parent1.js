var cp = require('child_process');
var child1 = cp.fork('child.js');
var child2 = cp.fork('child.js');

var server = require('net').createServer();
server.on('connection', socket => {
    socket.end('handled by parent\n');
});

server.listen(1337, () => {
    child1.send('server', server);
    child2.send('server', server);

    server.close();
});

process.on('SIGTREM', () => {
    console.log('Got a SIGTERM, exiting...');
    process.exit(1);
});

console.log('server running with PID:', process.pid);
process.kill(process.pid, 'SIGTERM');

