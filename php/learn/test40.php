<?php
require 'settings.php';

// 没有使用事物，如果遇到故障怎么办,转出的钱没有存入就这么消失了


// PDO连接
try {
    $pdo = new PDO(
        sprintf(
            'mysql:host=%s;dbname=%s;port=%s;charset=%s',
            $settings['host'],
            $settings['name'],
            $settings['port'],
            $settings['charset']
        ),
        $settings['username'],
        $settings['password']
    );
} catch (PDOException $e) {
    // 连接数据库失败
    echo 'Database connection failed';
    exit;
}

// 查询语句
$stmtSubstract = $pdo->prepare('
    UPDATE accounts
    SET amount = amount - :amount
    WHERE name = :name
');

$stmtAdd = $pdo->prepare('
    UPDATE accounts
    SET amount = amount + :amount
    WHERE name = :name
');

// 从账户1中取钱
$fromAccount = 'Checking';
$withdrawal = 50;
$stmtSubstract->bindParam(':name', $fromAccount);
$stmtSubstract->bindParam(':amount', $withDrawal, PDO::PARAM_INT);
$stmtSubstract->execute();

// 把钱存入账户2
$toAccount = 'Savings';
$deposit = 50;
$stmtAdd->bindParam(':name', $toAccount);
$stmtAdd->bindParam(':amount', $deposit, PDO::PARAM_INT);
$stmtAdd->execute();






