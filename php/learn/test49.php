<?php
stream_filter_register('dirty_words_filter', 'DirtyWordsFilter');

$handler = fopen('data.txt', 'rb');
strean_filter_append($handler, 'dirty_words_filter');
while (feof($handler) !== true) {
    echo fgets($handler);
}

fclose($handler);

