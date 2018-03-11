<?php
throw new Exception('Something went wrong. Time for lunch!');

try {
    $pdo = new PDO('mysql://host=wrong_host;dbname=wrong_name');
} catch (PDOException $e) {
    // 获取异常的属性，以便输出信息
    $code = $e->getCode();
    $message = $e->getMessage();

    // 给用户显示一个友好的信息
    echo 'Something went wrong. Chect back soon, please';
    exit;
}

