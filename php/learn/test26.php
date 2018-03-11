<?php

date_default_timezone_set('America/New_York');

// 创建DateTime实例
$datetime = new DateTime('2014-01-01 14:00:00');

// 创建长度为两周的间隔
$interval = new DateInterval('P2W');

// 修改DateTime实例
$datetime->add($interval);
echo $datetime->format('Y-m-d H:i:s');

$datetime = DateTime::createFromFormat('M j, Y H:i:s', 'Jan 2, 2014 23:04:12');

