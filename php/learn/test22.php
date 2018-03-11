<?php
session_start();
try {
    // 从请求主体中获取电子邮件地址
    $email = filter_input(INPUT_POST, 'email');

    // 从请求主体中获取密码
    $password = filter_input(INPUT_POST, 'password');
}