var routes = {'all': []};
var app = {};
app.use = function (path, action) {
    routes.all.push([pathRegexp(path), action]);
};

['get', 'put', 'delete', 'post'].forEach(function (method) {
    routes[method] = [];
    app[method] = function (path, action) {
        routes[method].push([pathRegexp(path), action]);
    };
});

app.post('/user/:username', addUser);

app.delete('/user/:username', removeUser);

app.push('/user/:username', updateUser);

app.get('/user/:username', getUser);

var match = function (pathname, routes) {
    for (var i = 0; i < routes.length; i++) {
        var route = routes[i];
        var reg = route[0].regexp;
        var keys = route[0].keys;
        var matched = reg.exec(pathname);
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
            return true;
        }
    }

    return false;
}

function routeRest(req, res) {
    var pathname = url.parse(req.url).pathname;
    var method = req.method.toLowerCase();
    if (routes.hasOwnPerperty(method)) {
        if (match(pathname, routes[method])) {
            return;
        }
        else {
            if (match(pathname, routes.all)) {
                return;
            }
        }
    }
    else {
        if (match(pathname, routes.all)) {
            return;
        }
    }

    handle404(req, res);
}
