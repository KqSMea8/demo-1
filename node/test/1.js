var fs = require('fs');

var reader = fs.createReadStream('a.js');
var writer = fs.createWriteStream('out.txt');
// reader.on('data', function (chunk) {
//     writer.write(chunk);
// });
// reader.on('end', function () {
//     writer.end();
// })

reader.pipe(writer);