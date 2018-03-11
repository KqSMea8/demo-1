<?php
$handler = fopen('data.txt', 'rb');
stream_filter_append($handler, 'string.toupper');
while (feof($handler) !== true) {
    echo fgets($handler);
}

fclose($handler);
