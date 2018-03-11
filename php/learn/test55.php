<?php
// 使用Componser自动加载器
require 'vendor/autoload.php';

// 导入Monlog的命名空间
use Monolog\Logger;
use Monolog\Handler\StreamHandler;
use Monolog\Handler\SwiftMainerHandler;

date_default_timezone_set('America/New_York');

// 设置Monolog和基本的处理程序
$log = new Logger('my-app-name');
$log->pushHandler(new StreamHandler('logs/production.log', Logger::WARNING));

// 添加SwiftMailer处理程序，让他处理重要的错误
$transport = \Swift_SmtpTransport::newInstance('smtp.example.com', 587)
            ->setUsername('USERNAME');
            ->setPassword('PASSWORD');

$mailer = \Swift_Mailer::newInstance($transport);
$message = \Swift_Message::newInstance()
            ->setSubject('Website error!')
            ->setFrom(array('daemon@example.com' => 'John Doe'))
            ->setTo(array('admin@example.com'));

$log->pushHandler(new SwiftMailerHandler($mailer, $message, Logger::CRITICAL));

// 使用日志记录器
$log->critical('The server is on fire');
