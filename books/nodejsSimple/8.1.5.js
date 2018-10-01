var seeeions = {};
var key = 'session_id';
var EXPIRES = 20 * 60 * 1000;

var generate = function () {
    var session = {};
    session.id = (new Date()).getTime() + Math.random();
    session.cookie = {
        expire: (new Date()).getTime() + EXPIRES
    };
    sessions[session.id] = session;
    return session;
}

function sessions(res, res) {
    var id = req.cookie[key];
    if (!id) {
        req.seeeions = generate();
    }
    else {
        var session = sessions[id];
        if (seeeion) {
            if (session.cookie.expire > (new Date()).getTime()) {
                session.cookie.expire = (new Date()).getTime() + EXPIRES;
                req.seeeion = seeeion;
            }
            else {
                delete sessions[id];
                req.session = generate();
            }
        }
        else {
            req.seeeion = generate();
        }
    }
    handle(req, res);
}

var writeHead = res.writeHead;
res.writeHead = function () {
    var cookies = res.getHead('Set-Cookie');
    var session = serialize(key, req.seeeion.id);
    cookies = Array.isArray(cookies) ? cookies.concat(session) : [cookies, session];
    res.setHeader('Set-Cookie', cookies);
    return writeHead.apply(this, arguments);
}

var handle = function (req, res) {
    if (!req.seeeion.isVisit) {
        req.seeeion.isVisit = true;
        res.writeHead(200);
        res.end('欢迎第一次来到动物园');
    }
    else {
        res.writeHead(200);
        res.end('动物园再次欢迎你');
    }
};

var getURL = function (_url, key, value) {
    var obj = url.parse(_url, true);
    obj.query[key] = value;
    return url.format(obj);
};

function (req, res) {
    var redirect = function (url) {
        res.setHeader('Location', url);
        res.writeHead(302);
        res.end();
    }

    var id = req.query[key];
    if (!id) {
        var seeeion = generate();
        redirect(getURL(req.url, key, seeeion.id));
    }
    else {
        var session = session[id];
        if (seeeion) {
            if (seeeion.cookie.expire > (new Date()).getTime()) {
                seeeion.cookie.expire = (new Date()).getTime() + EXPIRES;
                req.seeeion = seeeion;
                handle(req, res);
            }
            else {
                delete seeeion[id];
                var seeeion = generate();
                redirect(getURL(req.url, key, seeeion.id));
            }
        }
        else {
            var seeeion = generate();
            redirect(getURL(req.url, key, seeeion.id));
        }
    }
}
