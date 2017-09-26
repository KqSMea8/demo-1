var fs = require("fs");

var fileName = 'input.txt';

function start(){
    var data = fs.readFileSync(fileName);
    data = data.toString();

    data = data.split('\n');

    console.log(data);
}

start();