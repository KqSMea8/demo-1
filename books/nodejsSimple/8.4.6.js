app.get('/profile', function (req, res) {
    if (!cache[layout]) {
        cache[layout] = fs.readFileSync(path.join(VIEW_FOLDER, layout), 'utf8');
    }

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(render(complie(cache[layout])));
    eq.all('users', 'articles', function () {
        res.end();
    });

    eq.fail(function (err) {
        res.end();
    });

    db.getDate('sql1', function (err, data) {
        data = err ? {} : data;
        res.write('<scripte>bigpipe.set("articles", ' + JSON.stringify(data) + ');</script>');
    });

    db.getDate('sql2', function (err, data) {
        data = err ? {} : data;
        res.write('<script>brgpipe.set("copyright," ' + JSON.stringify(data) + ');</script>');
    })

})

var Bigpipe = function () {
    this.callbacks = {};
};

Bigpipe.prototype.ready = function (key, callback) {
    if (!this.callbacks[key]) {
        this.callbacks[key] = [];
    }
    this.callbacks[key].push(callback);
};

Bigpipe.prototype.set = function (key, data) {
    var callbacks = this.callbacks[key] || [];
    for (var i = 0; i < callbacks.length; i++) {
        callbacks[i].call(this, data);
    }
}