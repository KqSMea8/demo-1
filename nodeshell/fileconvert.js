var fs = require('fs');

function base64_encode(file) {
    var bitmap = fs.readFileSync(file);
    return new Buffer(bitmap).toString('base64');
}

function base64_decode(base64str, file) {
    var bitmap = new Buffer(base64str, 'base64');
    fs.writeFileSync(file, bitmap);
    console.log('******** File created from base64 encoded string ********');
}
function base64_file(base64str,file){
	var bitmap = new Buffer(base64str);
	fs.writeFileSync(file, bitmap);
	console.log('******** base64 encoded string ********');
}
var base64str = base64_encode('10408.mp3');
console.log(base64str);
