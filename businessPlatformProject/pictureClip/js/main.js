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
 * 前面的知识，需要用到cancas进行绘制下载
 * 1.选择图片进行预览
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

var imgSrc = '';


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
    img.onload = function () {
        ctx.drawImage(img, 0, 0);
    }
}

function init() {
    sourceImgCanvas.width = sourceImgCanvasWidth;
    sourceImgCanvas.height = sourceImgCanvasHeight;
    fileImgDom.addEventListener('change', readFile);
}

init();
