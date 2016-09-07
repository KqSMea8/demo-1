var http = require('http');
var url = require('url');
var util = require('util');
var querystring = require('querystring');
var requestHandler = require('./requestHandler');
var saveData = requestHandler.saveData;
var getData = requestHandler.getData;


function start () {

    function onRequest (req, res) {

        switch(req.method){
            case 'POST':
                req.setEncoding('utf-8');
                var postData = '';
                req.addListener('data', function (postDataChunk) {
                   postData += postDataChunk;
                })
                req.addListener('end', function () {
                   console.log(postData);
                   saveData(req, res, postData);
                })
                break;
            case 'GET':
                getData(req, res);
                break;
            default:
                return ;
        }

       var query = url.parse(req.url, true).query
       // console.log(query)

       //我现在的目标是找到对应的那个参数进行判断，保存数据和取数据
    }

    http.createServer(onRequest).listen(8888);
    console.log('server listen 8888');
}


exports.start = start;