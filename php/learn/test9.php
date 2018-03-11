<?php
function makeRange($length)
{
    for ($i = 0; $i < $length; $i++)
    {
        yield $i;
    }
}

foreach (makeRange(1000000) as $i) {
    echo $i, PHP_EOL;
}


function getRows($file) {
    $handle = fopen($file, 'rb');
    if ($handle === false) {
        throw new Exception();
    }

    while (feof($handle) === false) {
        yield fgercsv($handle);
    }

    fclose($handle);
}

foreach (getRows('data.csv') as $row) {
    print_r($row);
}