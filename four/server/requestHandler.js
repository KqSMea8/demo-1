
//mock一些数据给发送到前端去

function getData (req, res) {

    var obj = {'name': 'sufubo'};

    //从文件中读取数据返回
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});

    res.write(JSON.stringify(obj));
    res.end();
}

function saveData (req, res, postData) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});    //将数据保存到文件
    res.end('接受到请求了');
}

exports.saveData = saveData;
exports.getData = getData;