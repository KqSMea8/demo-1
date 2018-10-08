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

        if (mime(req) === 'application/json') {
            parseJSON(req, done);
        }
        else if (mime(req) === 'application/xml') {
            parseXML(req, done);
        }
        else if (mime(req) === 'multipart/form-data') {
            parseMultipart(req, done);
        }
    }
    else {
        handle(req, res);
    }
}

var formidable = require('formidable');
function parseBody(req, res) {
    if (hasBody(req)) {
        if (mime(req) === 'multipart/form-data') {
            var form = new formidable.IncomingForm();
            form.parse(req, function (err, fields, files) {
                req.body = fields;
                req.files = files;
                handle(req, res);
            })
        }
    }
    else {
        handle(req, res);
    }
}

