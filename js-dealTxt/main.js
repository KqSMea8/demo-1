var fs = require("fs");

var fileName = 'input.txt';

function start(){
    var data = fs.readFileSync(fileName);
    data = data.toString();

    data = data.split('\n');

    console.log("数据读入成功！");
    console.log(data);

    fs.writeFile('output.txt', data,  function(err) {
       if (err) {
           return console.error(err);
       }
       console.log("数据写入成功！");
    });


}

start();