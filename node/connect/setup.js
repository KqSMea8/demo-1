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