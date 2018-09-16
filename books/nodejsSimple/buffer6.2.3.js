var iconv = require('iconv-lite');
var fs = require('fs');

var buf = new Buffer(200);
buf[10] = 200;
var str = iconv.decode(buf, 'win1251');
console.log(str);
var buf = iconv.encode('sample input string', 'win1251');
console.log(buf);

var chunks = [];
var size = 0;

var res = fs.createReadStream('./buffer6.1.js');
res.on('data', function (chunk) {
    chunks.push(chunk);
    size += chunk.length;
});
res.on('end', function () {
    var buf = Buffer.concat(chunks, size);
    var str = iconv.decode(buf, 'utf8');
    console.log(str);
})
