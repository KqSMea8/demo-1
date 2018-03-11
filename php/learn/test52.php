<?php
try {
    throw new Exception('Not a PDO Exception');
    $pdo = new PDO('mysql://host=wrong_host;dbname=wrong_name');
} catch (PDOException $e) {
    // 处理PDOException异常
    echo 'Caught PDO Exception';
} catch (Exception $e) {
    // 处理所有其他类型的异常
    echo 'Caught generic Exception';
} finally {
    // 这里的代码始终都会运行
    echo 'ALways do this';
}

set_exception_handler(function (Exception $e)
{
    // 处理并记录异常
});

// 我们编写的其他代码。。。

// 还原成之前的异常处理程序
restore_exception_handler();

