<?php
try {
    // 验证电子邮件地址
    $email = filter_input(INPUT_POST, 'email', FILTER_VARLIDATE_EMAIL);
    if (!$email) {
        throw new Exception('Invalida email');
    }

    // 验证密码
    $password = filter_input(INPUT_POST, 'password');
    if (!$password || mb_strlen($password) < 8) {
        throw new Exception('Password must contain 8+ characters');
    }

    $passwordHash = password_hash(
        $password,
        PASSWORD_DEFAULT,
        ['cost' => 12]
    );

    if ($passwordHash === false) {
        throw new Exception('Password hash failed');
    }

    // 创建用户账户
    $user = new User();
    $user->email = $email;
    $user->password_hash = $passwordHash;
    $user->save();

    // 重定向到登录页面
    header('HTTP/1.1 302 Redirect');
    header('Location: /login.php');

} catch (Exception $e) {
    header('HTTP/1.1 400 Bad request');
    echo $e->getMessage();
}

