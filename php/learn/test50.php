<?php
$exception = new Exception('Danger, Will Robinson!', 100);

$code = $exception->getCode();
$message = $exception->getMessage();

echo $code;
echo $message;

