<?php
set_error_handler(function ($errno, $errstr, $errfile, $errline)
{
    // 处理错误
})

set_error_handler(function ($errno, $errstr, $errfile, $errline) {
    if (!(error_reporting() & $errno)) {
        // error_reporting 指令没有设置这个错误，所以将其忽略
        return ;
    }

    throw new \ErrorException($errstr, $errno, 0, $errfile, $errline);
})

// 还原成之前的错误处理程序
restore_error_handler();
