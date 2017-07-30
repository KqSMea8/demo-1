var express = require('express');
var  fs = require("fs");
var app = express();


var data = {
    name: 'sufubo',
    age: 22
};


app.get('/test', function (req, res) {
    // 返回json数据
    res.json(data); // 这里就是json数据不用进行转化

    // 这是读取文件进行发送到
    // fs.readFile('./test.html', 'utf8', function(err, data) {
    //     res.writeHead(200);
    //     res.write(data, "binary");
    //     res.end()
    //     return;
    // });
})


// 启动服务器
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});