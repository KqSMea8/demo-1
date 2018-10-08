app.get('/path', function (req, res) {
    fs.readFile('file/path', 'utf8', function (err, text) {
        if (err) {
            res.writeHead(500, {'Content-Type': 'text/html'});
            res.end('模版文件错误');
            return;
        }

        res.writeHead(200, {'Content-Type': 'text/html'});
        var html = render(complie(text), data);
        res.end(html);
    })
})

var cache = {};
var VIEW_FOLDER = '/path/to/wwwroot/views';

res.render = function (viewname, data) {
    if (!cache[viewname]) {
        var text;
        try {
            text = fs.readFileSync(path.join(VIEW_FOLDER, viewname), 'utf8');
        }
    }
}