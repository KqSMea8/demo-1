/**
 * @file 上传代码到开发机
 */
var path = require('path');
var receiverClient = require('receiver-client');

/*
**  参数以数组的形式传值，支持上传多个文件
**  from 上传目录（绝对路径，必填）
**  to 目标主机及推送路径（基于主机的根目录，必填）
**  excludes 排除的目录，多个目录用空格分隔（选填）
*/
receiverClient([{
    from: path.resolve('./dist/'),
    to: ''
}]);