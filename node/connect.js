const connect = require('connect');

function logger(req, res, next) {
    console.log(req, res, next);
    next();
}

function hello(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('hello world');
}

function setup(format) {
    // 设置逻辑
    const regexp = /:(\w+)/g;

    return function createLogger(req, res, next) {
        const str = format.replace(regexp, (match, property) => {
            return req[property];
        });
        console.log(str);
        next();
    }
}

module.exports = setup;


// const app = connect()
//     .use(logger(':method :url'))
//     .use(hello)

connect()
    .use(logger)
    .use(hello)
    .listen(3000);

