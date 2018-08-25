var a = require('./a');
var path = require('path');

delete require.cache[path.resolve(__dirname, './a.js')];
// Object.keys(require.cache).forEach(function(key) {
//     console.log(key);
//     delete require.cache[key];
// })
var b = require('./b');


