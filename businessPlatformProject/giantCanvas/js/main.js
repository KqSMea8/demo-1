/**
 * @file 巨型画布
 * @author sufubo
 */


/**
 * 如何拖动的时候下面的预览图跟着动就需要计算他们之间的关系
 * 下面小的也需要显示图片，但是是缩小版的，然后上面有一个方框，然后方框的位置是和你拖动的位置是有关系的
 * 我需要算出来这个比例，然后根据比例去移动框就行了
 *
 */


var canvasBig = document.getElementById('canvas-left');
var canvasSmall = document.getElementById('canvas-right');
var posParams = {
    imgX: 0,
    imgY: 0,
    left: 0,
    right: 0;
};

// 图片预览
function drawImage() {
    var ctx = document.getElementById('canvas-left').getContext('2d');
    var imgSrc = 'images/sleep.png';
    var img = new Image();
    img.onload = function(){
        ctx.drawImage(img, 0, 0);
    }
    img.src = imgSrc;
}

// 图片拖动
function dragImage() {
    // 移动就是用drawImage进行移动

}

function startDrag() {
    // 获取当前图片位置和鼠标位置

}

function startMove() {
}

function startDown() {
}

function init() {
    drawImage();
    canvasBig.addEventListener('mousedown', startDrag);
    canvasBig.addEventListener('mousemove', startMove)
    canvasBig.addEventListener('mousedown', startDown)
}

init();