/**
 * @file 发送邮件提醒
 * @author 731644018@qq.com
 */
var nodemailer = require('nodemailer');
var Config = require('./config');

var mailTransport = nodemailer.createTransport({
    host: 'smtp.163.com',
    secureConnection: true,
    auth: {
        user: '18729377257@163.com',
        pass: Config.pass
    },
});

var options = {
    from: '18729377257@163.com',
    to: '731644018@qq.com',
    subject: '提醒我干什么事情',
    text: '提醒我'
};

mailTransport.sendMail(options, function (err, msg) {
    if (err) {
        console.log(err);
    } else {
        console.log(msg);
    }
});
