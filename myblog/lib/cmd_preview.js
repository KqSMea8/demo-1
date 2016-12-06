var express = require('express');
var serveStatic = require('serve-static');
var path = require('path');

var utils = require('./utils');

var open = require('open');


module.exports = function (dir) {
	dir = dir || '.';

	//初始化express
	var app = express();
	var router = express.Router();
	app.use('/assets', serveStatic(path.resolve(dir, 'assets')));
	app.use(router);

	//渲染文章
	router.get('/posts/*', function(req, res, next) {
		var name = utils.stripExtname(req.params[0]);
		var file = path.resolve(dir, '_posts', name + '.md');
		var html = utils.renderPost(dir, file);
		res.end(html);
	})

	//渲染文章
	router.get('/', function(req, res, next) {
		var html = utils.renderIndex(dir);
		res.end(html);
	})

	var config = utils.loadConfig(dir);
	var port = config.port || 3000;
	var url = 'http://127.0.0.1:' + port;
	app.listen(port);
	open(url);
}


//去掉文件中的扩展名
function stripExtname(name) {
	var i = 0 - path.extname(name).length;
	if(i == 0) i = name.length;
	return name.slice(0, i);
}

//将markdown转化为HTML
function markdownToHTML(content) {
	return md.render(content || '');
}


//解析文章内容
function parseSourceContent(data) {
	var split = '---\n';
	var i = data.indexOf(split);
	var info = {};
	if(i !== -1) {
		var j = data.indexOf(split, i + split.length);
		if(j !== -1) {
			var str = data.slice(i + split.length, j).trim();
			data = data.slice(j + split.length);
			str.split('\n').forEach(function(line) {
				var i = line.indexOf(':');
				if(i !== -1) {
					var name = line.slice(0, i).trim();
					var value = line.slice(i + 1).trim();
					info[name] = value;
				}
			});
		}
	}
	info.source = data;
	return info;
}


//渲染模板
function renderFile(file, data) {
	return swig.render(fs.readFileSync(file).toString(), {
		filename: file,
		autoescape: false,
		locals: data
	});
}