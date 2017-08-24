let chokidar = require('chokidar');
let shelljs = require('shelljs');
let dir = '';
let command = '';

chokidar.watch(dir).on('change', (event, path) => {
    console.log('exec start');
    shelljs.exec(command);
    console.log('exec end');
});
