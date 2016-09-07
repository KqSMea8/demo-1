var fs = require('fs');

//mock一些数据给发送到前端去

function getData (req, res) {

    var obj = {'name': 'sufubo'};

    //从文件中读取数据返回
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});

    //从文件中读数据发送过去
    var data=fs.readFileSync('../tmp/data.txt','utf-8');
    res.end(data);

}

function saveData (req, res, postData) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});    //将数据保存到文件

    //写文件
    fs.writeFile('../tmp/data.txt', postData);

    res.end('接受到请求了');
}



exports.saveData = saveData;
exports.getData = getData;