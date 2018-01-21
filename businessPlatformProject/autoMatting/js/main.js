var canvas = document.getElementById('main');



function drawImage(e) {
    // 获取图片的路径
    var imgSrc = e.target;

    var blob = URL.createObjectURL(imgSrc.files[0]);
    console.log(blob);

    // 使用canvas进行画图
    var img = new Image();   // 创建img元素
    img.onload = function(){
        // 执行drawImage语句
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, 1024, 768);
    }
    img.src = blob; // 设置图片源地址
}


function init() {
    var files = document.getElementById('file');
    files.addEventListener('change', drawImage);
}

init();