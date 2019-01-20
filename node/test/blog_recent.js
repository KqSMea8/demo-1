const http = require('http');
const fs = require('fs');
http.createServer((req, res) => {
    if (req.url == '/') {
        fs.readFile('./titles.json', (err, data) => {
            if (err) {
                console.error(err);
                res.end('Server Error');
            }
            else {
                let titles = JSON.parse(data.toString());
                let newTitles = [];
                for (let key in titles) {
                    newTitles.push(titles[key]);
                }

                fs.readFile('./template.html', (err, data) => {
                    if (err) {
                        console.error(err);
                        res.end('Server Errpr');
                    }
                    else {
                        const tmpl = data.toString();
                        const html = tmpl.replace('%', newTitles.join('</li><li>'));
                        res.writeHead(200, {'Content-Type': 'text/html'});
                        res.end(html);
                    }
                })
            }
        })
    }
}).listen(8000, '127.0.0.1');