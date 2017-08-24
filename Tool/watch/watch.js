let chokidar = require('chokidar');
let shelljs = require('shelljs');

chokidar.watch('./template').on('change', (event, path) => {
    console.log('exec sh build.sh start');
    shelljs.exec("node audiobook.js");
    console.log('exec sh build.sh end');
});
