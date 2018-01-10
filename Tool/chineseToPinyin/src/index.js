var pinyin = require("pinyin");
var path = require('path');


// 读取所有文件，将文件中的内容替换进行输出
var fs = require("fs");
var path = path.resolve(__dirname, '../dist/');

fs.readdir(path, function (err, files) {
    if (err) {
        throw new Error(err);
    }

    /**
     * 读取文件名
     * 改为拼音
     * 修改文件名
     */
    files.forEach(function (file) {
        console.log(file);

        var index = file.indexOf('.');
        var prefix = file.slice(0, index);

        var oldPath = path + '/' + file; // 源文件路径

        var name = pinyin(prefix, {
            style: pinyin.STYLE_NORMAL
        }) + '';

        name = name.replace(/,/g, '');

        var newPath = path + '/'+ name + '.png'; // 新路径

        rename(oldPath, newPath);
    })
})



function rename(oldPath, newPath) {
    console.log(newPath);
    fs.rename(oldPath, newPath, function(err) {
        if (err) {
            throw err;
        }
    });
}

