<?php
$dataStart = new \DateTime();
$dataInterval = \DateInterval::crteateFromDateString('-1 day');
$dataPeriod = new \DatePeriod($dateStart, $dateInterval, 30);
foreach ($dataPeriod as $date) {
    $file = 'sftp://USER:PASS@rsync.net/' . $date->format('Y-m-d') . '.log.bz2';
    if (file_exists($file)) {
        $handle = fopen($file, 'rb');
        stream_filter_append($handle, 'bzip2.lzf_decompress');
        while (feof($handle) !== true) {
            $line = fgets($handle);
            if (strpos($line, 'www.example.com') !== false) {
                fwrite(STDOUT, $line);
            }
        }
        fclose($handle);
    }
}
