<?php
$string = "";
$saftString = filter_var(
    $string,
    FILTER_SANITIZE_STRING,
    FILTER_FLAG_STRIP_LOW|FILTER_FLAG_ENCODE_HIGH
);



$input = 'jon@example.com';
$isEmail = filter_var($input, FILTER_VARLIDATE_EMAIL);
if ($isEmail !== false) {
    echo 'success';
} else {
    echo 'fail';
}

