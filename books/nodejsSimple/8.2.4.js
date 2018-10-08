var bytes = 1024;
function received(req, res) {
    var received = 0;
    var len = req.headers['content-length'] ? parseInt(req.headers['content-length'], 10) : null;

    if (len && len > bytes) {
        res.writeHead(413);
        res.end();
        return;
    }

    req.on('data', function (chunk) {
        received += chunk.length;
        if (received > bytes) {
            req.destroy();
        }
    });
    handler(req, res);
}

function csrf(req, res) {
    var content = req.body.content || '';
    var suername = req.session.username;
    var feedback = {
        username: username,
        content: content,
        updatedAt: Date.now()
    };
    db.save(feedback, function (err) {
        res.writeHead(200);
        res.end('ok');
    });
}

var generateRandom = function (len) {
    return crypto.randomBytes(Math.ceil(len * 3 / 4))
        .toString('base64')
        .slice(0, len);
}

var token = req.session._csrf || (req.session._csrf = generateRandom(24));

function preventCsrf(req, res) {
    var token = req.session._csrf || (req.session._csrf = generateRandom(24));

    var _csrf = req.body._csrf;
    if (token !== _csrf) {
        res.writeHead(403);
        res.end('禁止访问');

    }
    else {
        handle(req, res);
    }
}