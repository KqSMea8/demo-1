var mime = function (req) {
    var str = req.headers['content-type'] || '';
    return str.split(';')[0];
}

var handle = function (req, res) {
    if (mime(req) === 'application/json') {
        try {
            req.body = JSON.parse(req.rawBody);
        }
        catch (e) {
            res.writeHead(400);
            res.end('Invalid JSON');
            return ;
        }
    }
    todo(req, res);
}

var xml2js = require('xml2js');

var handle = function (req, res) {
    if (mime(req) === 'application/xml') {
        xml2js.parseString(req.rawBody, function (err, xml) {
            if (err) {
                res.writeHead(400);
                res.end('Invalid XML');
                return;
            }
            req.body = xml;
            todo(req, res);
        })
    }
}

function upload(req, res) {
    if (hasBody(req)) {
        var done = function () {
            handle(req, res);
        };

    }
}