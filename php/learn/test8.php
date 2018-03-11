<?php

function makeRange($length)
{
    $dataset = [];
    for ($i = 0; $i < $length; $i++)
    {
        $dataset[] = $i;
    }

    return $dataset;
}

$customRange = makeRange(1000);
foreach ($customRange as $i) {
    echo $i, PHP_EOL;
}
var_dump($customRange);