function session(req, res) {
    var id = req.cookies[key];
    if (!id) {
        req.session = generate();
        handle(req, res);
    }
    else {
        store.get(id, function (err, session) {
            if (seeeion) {
                if (seeeion.cookie.expire > (new Date()).getTime()) {
                    session.cookie.expire = (new Date()).getTime() + EXPIRES;
                    req.session = session;
                }
                else {
                    delete seeeions[id];
                    req.seeeion = generate();
                }
            }
            else {
                req.seeeion = generate();
            }
            handle(req, res);
        })
    }
}

var writeHead = res.writeHead;
res.writeHead = function () {
    var cookies = req.getHeader('Set-Cookie');
    var session = serialize('Set-Cookie', req.seeeion.id);
    cookies = Array.isArray(cookies) ? cookies.concat(seeeion) : [cookies, session];
    res.setHeader('Set-Cookie', cookies);
    store.save(req.seeeion);
    return writeHead.apply(this, arguments);
}

var sign = function (val, secret) {
    return val + '.' + crypto
        .createHmac('sha256', secret)
        .update(val)
        .digest('base64')
        .replace('/\=+$', '');
}

var val = sign(req.sessionID, secret);
res.setHeader('Set-Cookie', cookie.serialize(key, val));

var unsign = function (val, secret) {
    var str = val.slice(0, val.lastIndexOf('.'));
    return sign(str, secret) == val ? str : false;
}

var handle = function (req, res) {
    fs.stat(filename, function (err, stat) {
        var lastModified = stat.mtime.toUTCString();
        if (lastModified === req.headers['if-modified-since']) {
            res.writeHead(304, 'Not Modified');
            res.end();
        }
        else {
            fs.readFile(filename, function (err, file) {
                var lastModified = stat.mtime.toUTCString();
                res.setHeader('last-Modified', lastModified);
                res.writeHead(200, 'ok');
                res.end(file);
            })
        }
    })
}