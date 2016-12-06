#!/usr/bin/env node

var program = require('commander');

//命令版本号
program.version('0.0.1');

//help命令
program
    .command('help')
    .description('显示使用帮助')
    .action(function () {
    	program.outputHelp();
    });

//create命令
program
	.command('create [dir]')
	.description('创建一个博客')
	.action(require('../lib/cmd_create'));

//preview命令
program
	.command('preview [dir]')
	.description('实时预览')
	.action(require('../lib/cmd_preview'));

//build命令
program
	.command('build [dir]')
	.description('生成整站静态HTML')
	.option('-o, --output <dir>', '生成的静态HTML存放目录')
	.action(require('../lib/cmd_build'));

//开始解析命令
program.parse(process.argv);

