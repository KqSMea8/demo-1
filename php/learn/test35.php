<?php
$sql = 'SELECT id FROM users WHERE email = :email';
$statement = $pdo->prepare($sql);

$email = filter_input(INPUT_GET, 'email');
$statement->bindValue(':email', $email);

