/**
 * 每隔半个小时提醒我喝水
 *
 * 设置时间间隔
 * 定时器执行
 * 弹框提醒
 */
var time = 30 * 60 * 1000;


remind();

function remind() {
    alert('该喝水了😄');
    setTimeout(remind, time);
}