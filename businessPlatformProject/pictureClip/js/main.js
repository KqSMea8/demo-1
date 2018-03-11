/**
 * 图片裁剪器
 */

/**
 * 1.选择图片
 * 2.选中图片出现裁剪框以及裁剪预览，裁剪框背景使用黑白格画布填充
 * 3.先按照固定宽高度先做出来，先进行裁剪。后面再想着自由拉伸，那个就是之前检测鼠标位置的翻版
 * 可支持用户输入宽高
 * 4.将裁剪图片以请求方式发送给服务端，服务端生成最终图片，并将其保存在本地
 *
 * 他是自己写了一个本地服务器然后做的上传再下载我也可以本地做一个服务器，然后上传上去，然后再进行下载
 * 这个好还有后端部分的涉及。好，先分析需求，然后分解再制作。选择图片比较简,和我的想法基本一致，都是
 * 前面的知识，需要用到canvas进行绘制下载,和巨型画布有些重合，这次是裁剪。可以稍微做简单的一些
 * 意思到了就行，
 * 2.制作裁剪框，然后在框里面截取图片显示
 * 3.下载所需要的图片
 *
 * 制作组件就是要可以new出来，这块顺便要把之前的继承那块的知识复习一下
 */
var fileImgDom = document.getElementById('img');
var sourceImgCanvas = document.getElementById('sourceImg');
var targetImgCanvas = document.getElementById('targetImg');
var sourceImgCanvasWidth = 1024;
var sourceImgCanvasHeight = 768;
var frameWidth = 100;
var frameHeight = 100;
var imgSrc = '';
var downloadDom = document.getElementById('download');

// 画出预览裁剪的背景图
function drawClipCancasWall() {
    // 绘制矩形方块，要可以跳过去，隔一个然后画一个，需要一个判断条件, 奇数行判断为偶数
    // 偶数行判断为奇数然后就画OK
    var ctx = sourceImgCanvas.getContext('2d');
    var gridWidth = 20;
    var judgeOdd = gridWidth * 2;
    for (var row = 0; row < sourceImgCanvasWidth; row = row + gridWidth) {
        for (var col = 0; col < sourceImgCanvasHeight; col = col + gridWidth) {
            if ((row % judgeOdd === 0) && (col % judgeOdd !== 0)
                || (row % judgeOdd !== 0) && (col % judgeOdd === 0)) {
                ctx.fillStyle = '#ccc';
                ctx.fillRect(row, col, gridWidth, gridWidth);
            }
        }
    }
}

// 读取图片数据
function readFile(e) {
    var file = this.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
        drawToCanvas(this.result);
    }
}

// 画出预览图
function drawToCanvas(imgData) {
    var ctx = sourceImgCanvas.getContext('2d');
    var img = new Image();
    img.src = imgData;
    imgSrc = imgData;
    img.onload = function () {
        ctx.drawImage(img, 0, 0);
        drawClipFrame();
        console.log(img.width); // 可以获取图片宽度，以便于放在预览显示中间
    }
}

// 画出裁剪框
function drawClipFrame() {
    var ctx = sourceImgCanvas.getContext('2d');
    ctx.strokeStyle = '#999';
    ctx.strokeRect(0, 0, frameWidth, frameHeight);
    clipImage();
}

// 裁剪图片
function clipImage() {
    var ctxTarget = targetImgCanvas.getContext('2d');

    // 裁剪图片,这里因为用get会把背景也取到，所以我们只取图片的区域,预览出来
    var img = new Image();
    img.src = imgSrc;
    img.onload = function () {
        targetImgCanvas.width = frameWidth;
        targetImgCanvas.height = frameHeight;
        ctxTarget.drawImage(img, 0, 0, frameWidth, frameHeight, 0, 0, frameWidth, frameHeight);
    }
}

// 下载裁剪后的文件
function download() {
    var content = targetImgCanvas.toDataURL('image/png');
    console.log(content);
    // 先转为2进制文件

    // 2进行文件在转为a标签的链接，然后进行下载
    var aLink = document.createElement('a');
    var blob = base64Img2Blob(content); //new Blob([content])

    var evt = document.createEvent("MouseEvents");
    evt.initEvent("click", true, true);
    aLink.download = 'download.png';
    aLink.href = URL.createObjectURL(blob);
    aLink.dispatchEvent(evt);
}

function base64Img2Blob(code){
    var parts = code.split(';base64,');
    var contentType = parts[0].split(':')[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;

    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], {type: contentType});
}


function init() {
    sourceImgCanvas.width = sourceImgCanvasWidth;
    sourceImgCanvas.height = sourceImgCanvasHeight;
    drawClipCancasWall();
    fileImgDom.addEventListener('change', readFile);
    downloadDom.addEventListener('click', download);
}

init();
