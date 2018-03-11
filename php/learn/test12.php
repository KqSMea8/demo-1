<?php
if (php_sapi_name() === 'cli-server') {
    echo 'php内置服务器';
} else {
    echo 'php其他服务器';
}