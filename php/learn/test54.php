<?php
// 使用Composer自动加载器
require 'path/to/vendor/autoload.php';

// 导入Monolog的命名空间
use Monolog\Logger;
use Monolog\Handler\StreamHandler;

// 设置Monolog提供的日志记录器
$log = new Logger('my-app-name');
$log->pushHandler(new StreamHandler('path/to/your.log', Logger::WARNING));

