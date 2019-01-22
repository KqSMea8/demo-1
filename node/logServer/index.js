const http = require('http');
const querystring = require('querystring');
const fs = require('fs');

http.createServer(function (req, res) {
    req.setEncoding('utf-8');
    var postData = "";
    req.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
    });

    req.addListener("end", function () {
        console.log('数据接收完毕');
        console.log(postData);
        // var params = querystring.parse(postData);

        var data = JSON.parse(postData);
        data = data.data;

        console.log(postData);

        fs.appendFile('./log.txt', data + '\n', () => {
            console.log('追加内容完成');
        });

        res.writeHead(200, {
            "Content-Type": "text/json;charset=utf-8"
        });
        res.end(JSON.stringify({
            status: 0,
            msg: 'success'
        }));
    });
}).listen(8080, "127.0.0.1")