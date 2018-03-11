<?php
$json = file_get_contents(
    'http://api.flickr.com/services/feeds/photos_public.gne?format=json'
);

$handle = fopen('/etc/hosts', 'rb');
while (feof($handle) !== true) {
    echo fgets($handle);
}

fclose($handle);

$handle = fopen('file:///etc/hosts', 'rb');
while (feof($handle) !== true) {
    echo fgets($handle);
}
fclose($handle);

