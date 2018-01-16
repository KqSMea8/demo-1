/**
 * @file 巨型画布
 * @author sufubo
 */


/**
 * 1.图片预览
 * 2.图片拖动
 */


var img = new Image();   // 创建一个<img>元素
img.src = 'http://img.hb.aicdn.com/b4c384a9e8437c317bd3241993cec71f16aa7197d613-YFMrjg_sq320';
img.onload = function () {

}


function draw() {
    var ctx = document.getElementById('canvas-left').getContext('2d');
    var imgSrc = 'images/sleep.png';
    var img = new Image();
    img.onload = function(){
        ctx.drawImage(img, 0, 0);
        ctx.beginPath();
        ctx.moveTo(30, 96);
        ctx.lineTo(70, 66);
        ctx.lineTo(103, 76);
        ctx.lineTo(170, 15);
        ctx.stroke();
    }
    img.src = imgSrc;
}

function init() {
    draw();
}

init();