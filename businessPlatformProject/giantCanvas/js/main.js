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
var imgSrc = 'images/timg.jpeg';
var ctx = null;
var ctxSmall = null;
var img = null;
var smallImg = null;
var move = false;
var posParams = {
    imgX: 0,
    imgY: 0,
    top: 0,
    left: 0
};
var canvasSmallRect = 0;
var rectWidth = 0;
var reactHeight = 0;

// 图片预览
function drawImage() {
    ctx = canvasBig.getContext('2d');
    img = new Image();
    img.onload = function(){
        ctx.drawImage(img, 0, 0);
    }
    img.src = imgSrc;
}

// 图片拖动
function dragImage(x, y) {
    // 移动就是用drawImage进行移动,计算移动的距离
    ctx.clearRect(0, 0, canvasBig.width, canvasBig.height);
    ctx.drawImage(img, x, y);
}

function startDrag(e) {
    posParams.top = e.pageY;
    posParams.left = e.pageX;
    move = true;
}

function startMove(e) {
    if (!move) {
        return false;
    }

    var data = computedGap(e);

    var distX = posParams.imgX + data.gapLeft;
    var distY = posParams.imgY + data.gapTop;

    if (distX >= 0) {
        distX = 0;
    }
    else if (distX < -(img.width - canvasBig.width)) {
        distX = -(img.width - canvasBig.width);
    }

    if (distY >= 0) {
        distY = 0;
    }
    else if (distY < -(img.height - canvasBig.height)) {
        distY = -(img.height - canvasBig.height);
    }

    dragImage(distX, distY);
}

function computedGap(e) {
    var currentTop = e.pageY;
    var currentLeft = e.pageX;
    var gapTop = currentTop - posParams.top;
    var gapLeft = currentLeft - posParams.left;

    return {
        gapTop: gapTop,
        gapLeft: gapLeft
    };
}

function startUp(e) {

    // 更新记录图片的位置，控制图片移动停止
    var data = computedGap(e);
    posParams.imgX = posParams.imgX + data.gapLeft;
    posParams.imgY = posParams.imgY + data.gapTop;

    dragSmallFrame();

    move = false;
}

function showCanvasSmall() {

    // 画出图片
    ctxSmall = canvasSmall.getContext('2d');
    smallImg = new Image();

    rectWidth = canvasSmall.width * .8;
    rectHeight = canvasSmall.height * .8;


    smallImg.onload = function(){
        ctxSmall.drawImage(smallImg, 0, 0, canvasSmall.width, canvasSmall.height);

        // 画出线框
        ctxSmall.beginPath();
        ctxSmall.rect(0, 0, rectWidth, rectHeight);
        ctxSmall.closePath();
        ctxSmall.strokeStyle = "#e42";
        ctxSmall.stroke();
    }

    smallImg.src = imgSrc;
}

function dragSmallFrame() {

    // 移动小图片的框
    // 移动的范围
    var leftRatio = img.width - canvasBig.width;
    var topRatio = img.height - canvasBig.height;

    var moveRangeX = canvasSmall.width - rectWidth;
    var moveRangeY = canvasSmall.height - rectHeight;

    var smallDistX = -posParams.imgX / leftRatio * moveRangeX;
    var smallDistY = -posParams.imgY / topRatio * moveRangeY;

    // 清除原来的矩形
    ctxSmall.clearRect(0, 0, canvasSmall.width, canvasSmall.height);

    ctxSmall.drawImage(smallImg, 0, 0, canvasSmall.width, canvasSmall.height);

    ctxSmall.beginPath();
    ctxSmall.rect(smallDistX, smallDistY, rectWidth, rectHeight);
    ctxSmall.closePath();
    ctxSmall.strokeStyle = "#e42";
    ctxSmall.stroke();
}

function addEventCanvasBig() {
    canvasBig.addEventListener('mousedown', startDrag);
    canvasBig.addEventListener('mousemove', startMove)
    canvasBig.addEventListener('mouseup', startUp);
}

function init() {
    drawImage();
    addEventCanvasBig();
    showCanvasSmall();
}

init();