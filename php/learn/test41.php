<?php
require 'settings.php';

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
    )
} catch (PDOException $e) {
    // 连接数据库失败
    echo 'Database connetction failed';
}

// 查询语句
$stmtSubtract = $pdo->prepare('
    UPDATE accounts
    SET amount = amount - :amount
    WHERE name = :name
');

$stmtAdd = $pdo->prepare('
    UPDATE accounts
    SET amount = amount + :amount
    WHERE name = :name
');

// 开始事务
$pdo->beginTransaction();

// 从账户1中取钱
$fromAccount = 'Checking';
$withdrawal = 50;
$stmtSubtract->bindParam(':name', $fromAccount);
$stmtSubtract->bindParam(':amount', $withdrawal, PDO::PARAM_INT);
$stmtSubtract->execute();

// 把钱存入账户2
$toAccount = 'Savings';
$deposit = 50;
$stmtAdd->bindParam(':name', $toAccount);
$stmtAdd->bindParam(':amount', $deposit, PDO::PARAM_INT);
$stmtAdd->execute();

// 提交事务
$pdo->commit();











