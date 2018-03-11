<?php
// 构建并执行SQL查询
$sql = 'SELECT id, email FROM users WHERE email = :email';
$statement = $pdo->prepare($sql);
$email = filter_input(INPUT_GET, 'email');
$statement->bindValue(':email', $email, PDO::PARAM_INT);
$statement->execute();

// 迭代结果
$results = $statement->fetchAll(PDO::FETCH_ASSOC);
foreach ($results as $result) {
    echo $result['email'];
}

