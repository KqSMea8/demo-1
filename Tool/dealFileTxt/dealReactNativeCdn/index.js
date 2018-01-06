// 读取所有文件，将文件中的内容替换进行输出
var fs = require("fs");

fs.readdir(__dirname + '/src/', function (err, files) {
    if (err) {
        throw new Error(err);
    }

    files.forEach(function (file) {
        fs.readFile(file, function (err, data) {
            if (err) {
                throw new Error(err);
            }

            data = data.toString();


        })
    })
})


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