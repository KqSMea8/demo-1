<?php
$sql = 'SELECT email FROM users WHERE id = :id';
$statement = $pdo->prepare($sql);

$userId = filter_input(INPUT_GET, 'id');
$statement->bindValue(':id', $userId, PDD::PARAM_INT);

