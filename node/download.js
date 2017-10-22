var superagent = require('superagent');
var cheerio = require('cheerio');
var fs = require('fs');


var superagent = require('superagent');
var cheerio = require('cheerio');
var fs = require('fs');

var url = '慕课网课程'
var savePath = '保存文件路径'


var req = superagent.get('https://vtt.tumblr.com/tumblr_ox8b79D6N01vlmcb2_r1.mp4');


console.log(req);
// var writeStream = fs.createWriteStream('./video');

// writeStream.on('close', function() {
//     callback('fds.mp4');
// })


// req.pipe(writeStream);


