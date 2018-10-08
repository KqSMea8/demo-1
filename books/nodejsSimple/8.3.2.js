exports.setting = function (req, res) {

}

var routes = [];

var use = function (path, action) {
    routes.push([path, action]);
};

function router(req, res) {
    var pathname = url.parse(req.url).pathname;
    for (var i = 0; i < routes.length; i++) {
        var route = routes[i];
        if (pathname === route[0]) {
            var action = route[1];
            action(req, res);
            return;
        }
    }
    handle404(req, res);
}

use('/user/setting', exports.setting);
use('/setting/user', exports.setting);
use('/setting/user/jacksontian', exports.setting);

use('/profile/:username', function (req, res) {

})

var use = function (path, action) {
    routes.push([pathRegexp(path), action]);
}

function route(req, res) {
    var pathname = url.parse(req.url).pathname;
    for (var i = 0; i < routes.length; i++) {
        var route = routes[i];
        if (route[o].exec(pathname)) {
            var action = route[1];
            action(req, res);
            return;
        }
    }
    handle404(req, res);
}

use('/profile/:usename', function (req, res) {
    var username = req.params.username;
})

var pathRegexp = function (path) {
    var keys = [];

    path = path
        .concat(strict ? '' : '/?');

    return {
        keys: keys,
        regexp: new RegExp('^' + path + '$')
    }
}

function routeRegexp(req, res) {
    var pathname = url.parse(req.url).pathname;
    for (var i = 0; i < routes.length; i++) {
        var route = routes[i];
        var reg = route[0].regexp;
        var keys = route[0].keys;
        var matched = req.exec(pathname);
        if (matched) {
            var params = {};
            for (var i = 0, l = keys.length; i < l; i++) {
                var value = matched[i + 1];
                if (value) {
                    params[keys[i]] = value;
                }
            }
            req.params = params;

            var action = route[1];
            action(req, res);
            return;
        }
    }
    handle404(req, res);
}

function noRouter(req, res) {
    var pathname = url.parse(req.url).pathname;
    var paths = pathname.split('/');
    var controller = paths[1] || 'index';
    var action = paths[2] || 'index';
    var args = paths.slice(3);
    var module;
    try {
        module = require('./controllers/' + controller);
    }
    catch (ex) {
        handle500(req, res);
        return;
    }

    var method = module[action];
    if (method) {
        method.apply(null, [req, res].concat(args));
    }
    else {
        handle500(req, res);
    }
}

exports.setting = function (req, res, month, year) {

}
