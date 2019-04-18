const connect = require('connect');

function logger(req, res, next) {
    console.log(req, res, next);
    next();
}

function hello(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('hello world');
}

connect()
    .use((req, res) => {
        foo();
        res.setHeader('Content-Type', 'text/plain');
        res.end('hello world');
    })
    .listen(3000);

