import { decode } from "iconv-lite";

var encode = function (username, password) {
    return new Buffer(username + ':' + password).toString('base64');
}

function authorization(req, res) {
    var auth = req.headers['authorization'] || '';
    var parts = auth.splite('');
    var method = parts[0] || '';
    var encoded = parts[1] || '';
    var decoded = new Buffer(encoded, 'base64').toString('utf-8').splite(':');
    var user = decoded[0];
    var pass = decoded[1];
    if (!checkUser(user, pass)) {
        res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
        res.writeHead(401);
        res.end();
    }
    else {
        handle(req, res);
    }
}

function data(req, res) {
    if (hasBody(req)) {
        var buffers = [];
        req.on('data', function (chunk) {
            buffers.push(chunk);
        });
        req.on('end', function () {
            req.rawBody = Buffer.concat(buffers).toString();
            handle(req, res);
        });
    }
    else {
        handle(req, res);
    }
}

var handle = function(req, res) {
    if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
        req.body = querystring.parse(req.rawBody);
    }

    todo(req, res);
}
