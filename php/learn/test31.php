<?php
try {
    $pdo = new PDO(
        'mysql:host=127.0.0.1;dbname=books;port=3306;charset=utf8',
        'USERNAME',
        'PASSWORD'
    );
} catch (PDOException $e) {
    // 连接数据库失败
    echo 'Database connetction failed';
    exit;
}

