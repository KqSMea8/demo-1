var crypto = require('crypto');
var fs = require('fs');

// 读取命令行参数
var args = process.argv[2];
console.log(args);

//从文件创建一个可读流
var stream = fs.createReadStream(args);
var fsHash = crypto.createHash('sha1');
// var fsHash = crypto.createHash('md5');

stream.on('data', function(d) {
    fsHash.update(d);
});

stream.on('end', function() {
    var md5 = fsHash.digest('hex');
    // console.log("文件的MD5是：%s", md5);
    console.log("文件的hash是：%s", md5);
});