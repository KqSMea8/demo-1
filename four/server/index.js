var http = require('http');
var server = require('./server');
var requestHandler = require('./requestHandler');

//不用转发路由，直接解析操作，然后进入不同的处理程序

server.start();