let chokidar = require('chokidar');
let shelljs = require('shelljs');
let dir = '';
let command = '';
let timer = null;

chokidar.watch(dir).on('change', (event, path) => {
    if (!timer) {
        setTimeout(function () {
            console.log('exec start');
            shelljs.exec(command);
            console.log('exec end');
            clearTimeout(timer);
            timer = null;
        }, 20);
    }
});
