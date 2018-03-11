<?php
$handler = fopen('php://filter/read=string.toupper/resource=data.txt', 'rb');
while (feof($handler) !== true) {
    echo fgets($handler);
}
fclose($handler);
