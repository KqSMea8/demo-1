/**
 * @file 发送邮件提醒
 * @author 731644018@qq.com
 */
const nodemailer = require('nodemailer');
const Config = require('./config');

let mailTransport = nodemailer.createTransport({
    host: 'smtp.163.com',
    secureConnection: true,
    auth: {
        user: '18729377257@163.com',
        pass: Config.pass
    },
});

function sendMail() {
    var options = {
        from: '18729377257@163.com',
        to: '731644018@qq.com',
        subject: '提醒我还信用卡',
        text: '提醒我'
    };

    mailTransport.sendMail(options, (err, msg) => {
        if (err) {
            console.log(err);
        } else {
            console.log(msg);
        }
    });
}

function init() {
    let creditCardDay = 7;
    let time = 8 * 60 * 60 * 1000;
    setInterval(() => {
        let today = new Date();
        let month = today.getMonth() + 1;
        let day = today.getDate();
       if (day === creditCardDay) {
            sendMail();
       }
    }, time);
}

init();
