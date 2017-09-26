var fs = require("fs");
// 一些依赖库
var http = require("http"),
    url = require("url"),
    superagent = require("superagent"),
    cheerio = require("cheerio"),
    async = require("async"),
    eventproxy = require('eventproxy');


var fileName = 'txt.txt';

function start(){
    var data = fs.readFileSync(fileName);
    console.log("程序执行完毕。");

    // html内容
    var $ = cheerio.load(data.toString());

    var iconArr = [];
    var iconNames = $('.icon-name');
    var len = iconNames.length;
    for (var i = 0; i < len; i++) {
      var title = iconNames.eq(i).attr('title');
      var iconCode = iconNames.eq(i).next('.icon-code-show').attr('title');
      iconArr.push(title + ':' + iconCode);

    }

    console.log('总共有：' + iconArr.length + '种图标');
    console.log(iconArr.join(';'));

    fs.writeFile('output.txt', iconArr.join(';'),  function(err) {
       if (err) {
           return console.error(err);
       }
       console.log("数据写入成功！");
       console.log("--------我是分割线-------------")
       console.log("读取写入的数据！");
    });
}

start();