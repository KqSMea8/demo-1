<?php
$closure = function ($name)
{
    return sprintf('hello %s', $name);
}

echo $closure('Josh');

$numberPlusOne = array_map(function($name){
    return $number + 1;
}, [1, 2, 3]);

print_r($numberPlusOne);


function enclosePerson($name)
{
    return function ($doCommand) use ($name) {
        return sprintf('%s, %s', $name, $doCommand);
    }
}

