// 一些依赖库
var http = require("http"),
    url = require("url"),
    superagent = require("superagent"),
    cheerio = require("cheerio"),
    async = require("async"),
    eventproxy = require('eventproxy');

var path = require('path')
var childProcess = require('child_process')
var phantomjs = require('phantomjs')
var binPath = phantomjs.path


var titles = [];
var page = require('webpage').create();
page.open('http://iconfont.cn/manage/index?spm=a313x.7781069.1998910419.9&manage_type=myprojects&projectId=54479&keyword=', function(status) {
  console.log("Status: " + status);
  if(status === "success") {
    page.render('');

    var ua = page.evaluate(function () {
        return document.querySelectorAll('.icon-name');
    })

    $(ua).each(function(index, el) {
        titles.push($(this).attr('title'));
    });

    console.log(titles.join('\n'));

  }
  phantom.exit();
});

// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;

// var ep = new eventproxy(),
//     urlsArray = [], //存放爬取网址
//     // pageUrls = [],  //存放收集文章页面网站
//     pageNum = 200;  //要爬取文章的页数

// var pageUrl = 'http://iconfont.cn/manage/index?spm=a313x.7781069.1998910419.9&manage_type=myprojects&projectId=54479&keyword=';


// // 主start程序
// function start(){
//     console.log('start');
//     console.log('onRequest');
//     superagent.get(pageUrl)
//       .end(function (err, pres) {
//         var text = pres.text; // html内容
//         var $ = cheerio.load(text);
//         const dom = new JSDOM($);
//         console.log(dom)
//         var iconArr = [];
//         var iconNames = $('.icon-name');
//         for (var i = 0; i < iconNames.length; i++) {
//           iconArr.push(iconNames.eq(i).attr('title'));
//         }
//         console.log(iconArr.join(';'));
//       })
// }

// start();
