var files = {};

var proComplie = function (str) {
    var replaced = str.replace('/<%\s+(include.*)\s+%>/g', function (match, code) {
        var partial = code.split(/\s/)[1];
        if (!files[partial]) {
            files[partial] = fs.readFileSync(path.join(VIEW_FOLDER, partial), 'utf8');
        }
        return files[partial];
    })

    res.render = function (viewname, data) {
        var layout = data.layout;
        if (layout) {
            if (!cache[layout]) {
                try {
                    cache[layout] = fs.readFileSync(path.join(VIEW_FOLDER, layout), 'utf8');
                }
                catch (e) {
                    res.writeHead(500, {'Content-Type': 'text/html'});
                    res.end('布局文件错误');
                    return;
                }
            }
        }
        var layoutContent = cache[layout] || '<%-body%>';

        var replaced;
        try {
            replaced = renderLayout(layoutContent, viewname);
        }
        catch (e) {
            res.writeHead(500, {'Content-Type': 'text/html'});
            res.end('模版文件错误');
            return;
        }

        var key = viewname + ':' + (layout || '');
        if (!cache[key]) {
            cache[key] = compile(replaced);
        }

        res.writeHead(200, {'Content-Type': 'text/html'});
        var html = cache[key](data);
        res.end(html);
    }
}

res.render('user', {
    layout: 'layout.html',
    users: []
});

var cache = {};
var layout = 'layout.html';

app.get('/profile', function (req, res) {
    if (!cache[layout]) {
        cache[layout] = fs.readFileSync(path.join(VIEW_FOLDER, layout), 'utf8');
    }

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(render(compile(cache[layout])));
});
