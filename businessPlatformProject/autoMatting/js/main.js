var files = document.getElementById('file');
var canvas = document.getElementById('main');
var width = canvas.width;
var height = canvas.height;
var currentWidth = width;
var currentHeight = height;
var ctx = canvas.getContext('2d');
var img = null;
var htmlR = document.querySelector('.r');
var htmlG = document.querySelector('.g');
var htmlB = document.querySelector('.b');
var htmlA = document.querySelector('.a');

// 初始化画图
function drawImage(e) {

    // 获取图片的路径
    var imgSrc = e.target;
    var blob = URL.createObjectURL(imgSrc.files[0]);
    img = new Image();

    img.onload = function(){
        ctx.drawImage(img, 0, 0, 709, 600);
    }

    img.src = blob;
}


// 自动扣图


// 图片放大和缩小
function controlImageSize(e) {
    if (!img) {
        alert('请选中图片');
        return false;
    }

    var direction = e.wheelDelta;
    var rate = 1;
    currentWidth =  currentWidth + direction;
    currentHeight = currentHeight + direction;

    if (currentWidth > width) {
        currentWidth = width;
    }

    if (currentHeight > height) {
        currentHeight = height;
    }

    if (currentWidth < 0) {
        currentWidth = 10;
    }

    if (currentHeight < 0) {
        currentHeight = 10;
    }

    if (currentWidth >= width && currentHeight >= height
        || currentWidth <= 10 && currentHeight <= 10) {
        return false;
    }

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0, currentWidth, currentHeight);
    return true;
}

// 鼠标点击可以获取颜色值信息
function getImagePointRBGAInfo(e) {
    var clientX = e.clientX;
    var clientY = e.clientY;
    var color = ctx.getImageData(clientX, clientY, 1, 1).data;
    console.log(color);
    var red = color[0];
    var green = color[1];
    var blue = color[2];
    var alpha = color[3];
    htmlR.innerHTML = red;
    htmlG.innerHTML = green;
    htmlB.innerHTML = blue;
    htmlA.innerHTML = alpha / 255;
    document.body.style.background = 'rgba(' + red + ','
        + green + ',' + blue + ',' + alpha/255 + ')';
}


function init() {
    files.addEventListener('change', drawImage);
    canvas.addEventListener('mousewheel', controlImageSize);
    canvas.addEventListener('click', getImagePointRBGAInfo);
}

init();
