<?php
use Monolog\Logger;
use Monolog\Handler\StreamHandler;

// 准备日志记录器
$log = new Logger('myApp');
$log->pushHandler(new StreamHandler('logs/development.log', Logger::DEBUG));
$log->pushHandler(new StreamHandler('logs/production.log', Logger::WARNING));

// 使用日志记录器
$log->debug('This is a debug message');
$log->warning('This is a warning message');

