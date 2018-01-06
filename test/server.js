var http=require("http");
var url=require("url");
var fs=require("fs");
var path=require("path");
// var mime=require("./mime").types;

var server=http.createServer(function(req,res){
    var pathname=url.parse(req.url).pathname;
    console.log(pathname);
    var realpath="static"+pathname;
    console.log(realpath);
    fs.exists(realpath, function(exists){
        if(!exists){
            res.writeHead("404",{"content-type":"text/plain"});
            res.write("404,not found!");
            res.end();
        }else{
            fs.readFile(realpath,function(err,data){
                if(err){
                    res.writeHead(500,{"content-type":"text/plain"});
                    res.end(err);
                }else{
                    var ext=path.extname(realpath);

                    // var contenttype= mime[ext]||"text/plain";
                    var contenttype= "text/html";
                    res.writeHead(200,{"content-type": contenttype});
                    res.write(data);
                    res.end();

                }
            });
        }
    });
});
server.listen(8000, function () {
    console.log('监听端口 http://localhost:8000');
});