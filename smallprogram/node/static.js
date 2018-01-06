let express = require('express');

let app = express();

app.use(express.static('static', { 
    setHeaders: function (res, path, stat) {
        res.set('Cache-Control', 'max-age=1600');
    }
}));
// app.use(express.static('static', {setHeaders: function () {

// }}));

var server = app.listen(3003, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});