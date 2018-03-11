<?php
/**
 * @blog http://www.digtime.cn
 * @param   $string
 * @param  $slow 安全级别低
 */
function clean_xss(&$string, $flow = false)
{
    if (!is_array($string)) {
        $string = trim($string);
        $string = strip_tags($string);
        $string = htmlspecialchars($string);
    }

    if ($flow) {
        return true;
    }

    $string = str_replace(array('"', "\\", ".", "/", "..", "../", "./", "//"),
        '', $string);
    $no = '/%0[0-8bcef]/';
    $string = preg_replace($no, '', $string);
    $no = '/%1[0-9a-f]/';
    $string = preg_replace($no, '', $string);
    $no = '/[\x00-\x08\x0B\x0c\x0E-\x1F\x7F]+/S';
    $string = preg_replace($no, '', $string);
    return true;
}
