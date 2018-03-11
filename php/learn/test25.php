<?php
date_default_timezone_set('America/New_York');

$datetime = new DateTime();

$datetime = new DateTime('2014-04-27 5:03 AM');

$datetime = DateTime::createFromFormat('M j, Y H:i:s', 'Jan 2, 2014 23:04:12');