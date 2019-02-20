/**
 * 判断文件和文件夹大小，大于某个值则删除
 */

let fs = require('fs');
let process = require('child_process');

function readFile(path, filesList) {
   files = fs.readdirSync(path);
   files.forEach(walk);
   function walk(file)
   {
        states = fs.statSync(path + '/' + file);
        if (states.isDirectory()) {
            readFile(path + '/' + file, filesList);
        } else {
            var obj = new Object();
            obj.size = states.size;
            obj.name = file;
            obj.path = path + '/' + file;
            filesList.push(obj);
        }
    }
}

function geFileList(path)
{
   var filesList = [];
   readFile(path, filesList);
   return filesList;
}

function init() {
    let path = '../test';
    let filesList = geFileList(path);
    let size = 0;

    filesList.forEach(item => {
        size += item.size;
    });

    if (size > 1024 * 1024 * 10) {
        console.log('删除文件' + path);
        process.exec('rm -rf ' + path);
    }

    console.log(size);
}

setInterval(init, 1000 * 60 * 60 * 24);
