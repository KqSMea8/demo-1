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
var tolerance = 10; // 图像容差

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
    var red = color[0];
    var green = color[1];
    var blue = color[2];
    var alpha = color[3];
    htmlR.innerHTML = red;
    htmlG.innerHTML = green;
    htmlB.innerHTML = blue;
    htmlA.innerHTML = alpha / 255;
    // document.body.style.background = 'rgba(' + red + ','
    //     + green + ',' + blue + ',' + alpha/255 + ')';
}


/**
 * 现在就是要想怎么做扣图然后他可以自己选择一部分区域，
 * 然后按照容差的范围内进行选择，选择完之后就把这些点的颜色变了
 * 那么问题的关键点在于选择这些像素点，只要利用容差把这些像素点都找到了
 * 问题就好说了，那么怎么找到这些像素点呢。 刚看了距离色差公式，
 * 现在已知的是容差，还有起始点的，位置 颜色，要算的是和他有容差的相关点
 * 的位置，现在能想到的办法就是获取起始点的位置，然后在它周围去找他的颜色
 * 和已有颜色的差值，如果差值小于20就保存，然后接着找这个点周围的颜色
 * 差值是20以内的，我的理解是对的，就是要找颜色差值为20的，但是这个20
 * 怎么计算。简单的算法就是代入这个公式，所有符合这个公式的颜色值就
 * 保存下来就好了
 * 先用一个最简单的算法
 * 容差知道，初始位置和颜色也知道，要算得就是颜色和位置，就是区域内部进行探索
 * 位置，位置颜色符合就保存这个位置。终止条件是这个点的上下左右都没有符合的点
 * 了，那么循环终止。
 */
function mattingRegion(e) {
    var clientX = e.clientX;
    var clientY = e.clientY;
    // 获取周围八个点的色彩，如果符合容差要求就保存下来

    // 计算符合位置的点的坐标,周围左右8个点
    var around = [1, 0, 1, 1, 0, 1, -1, 1, -1, 0, -1, -1, 0, -1, 1, -1];

    var seeds = [];
    var marked = [];
    var mark = [];
    var curValue = getValue(clientX, clientY);

    var mark = Array(height).fill(0);
    for (var i = 0; i < height; i++) {
        mark[i] = Array(width).fill(0);
    }


    // 探索某个点周围8个点
    var getAround = function (x, y) {
        for (var i = 0; i < around.length; i = i + 2) {
            var tarValueX = x + around[i];
            var tarValueY = y + around[i + 1];

            if (tarValueX <= 0 || tarValueY <= 0
                || tarValueX >= width
                || tarValueY >= height) {

            }
            else {
                // 将标记过的点给剔除掉
                console.log('tarValueX:' + tarValueX);
                console.log('tarValueY:' + tarValueY);
                if (mark[tarValueX][tarValueY] === 0) {

                    var tarValue = getValue(tarValueX, tarValueY);

                    var tempTolerance = calcColorDistance(curValue.r, curValue.g, curValue.b, tarValue.r, tarValue.g, tarValue.b);

                    if (tempTolerance <= tolerance) {
                        console.log(seeds);
                        mark[tarValueX][tarValueY] = 2;

                        marked.push([tarValueX, tarValueY]);

                        seeds.push([tarValueX, tarValueY]);
                    }
                    else {
                        mark[tarValueX][tarValueY] = 1;
                    }
                }

            }


        }
    }

    // 初始化原点
    seeds.push([clientX, clientY]);

    marked.push([clientX, clientY]);

    // 现在只是一次，在还要跨越这些点到下一个点，判断是否符合要求
    // 终止条件是这些点周围都没有可以符合容差的点，那么就退出
    while (300 > seeds.length > 0) {
        // console.log(seeds);
        var curPos = seeds.pop();
        console.log('curpos');
        console.log(curPos);
        if (curPos) {
            getAround(curPos[0], curPos[1]);
        }
        else {
            break;
        }
    }

    // 将标记的点变为白色
    for (var i = 0; i < marked.length; i++) {
        var markX = marked[i][0];
        var markY = marked[i][1];
        var markData = ctx.getImageData(markX, markY, 1, 1);
        markData.data[0] = 255;
        markData.data[1] = 255;
        markData.data[2] = 255;
        ctx.putImageData(markData, markX, markY);
    }
}

function getValue(x, y) {
    var color = ctx.getImageData(x, y, 1, 1).data;
    var red = color[0];
    var green = color[1];
    var blue = color[2];
    return {
        r: red,
        g: green,
        b: blue
    }
}

// 计算容差
function calcColorDistance(r1, g1, b1, r2, g2, b2) {
    var dr = r2 - r1;
    var dg = g2 - g1;
    var db = b2 - b1;
    return Math.sqrt(dr * dr + dg * dg + db * db);
}


// src: imageData seed: 位置x和y坐标数组， distence: 容差
function RGSA(src, seed, distence) {
    var width = src.width;
    var height = src.height;
    var srcData = src.data;
    var getValue = function (x, y) {
        var i = 4 * (y * width + x);
        return {
            r: srcData[i],
            g: srcData[i + 1],
            b: srcData[i + 2],
            a: scrData[i + 3]
        }
    };
    var standarValue = getValue(seed[0], seed[1]);
    var isTolerance = function (x, y) {
        var targetValue = getValue(x, y);
        return calcColorDistance(standarValue.r, standarValue.g, standarValue.b, targetValue.r, targetValue.g, targetValue.b) <= distance;
    }

    var seeds = [];
    var marked = Array(height).fill([]);

    for (var i = 0; i < height; i++) {
        marked[i] = Array(width).fill(0);
    }

    seeds.push(seed);

    const surround = [1, 0, 1, 1, 0, 1, -1, 1, -1, 0, -1, -1, 0, -1, 1, -1];

    while (seeds.length > 0) {
        var seed = seeds.pop();
        for (var i = 0; i < 8; i++) {
            var tmpX = seed[0] + surround[2 * i];
            var tmpY = seed[1] + surround[2 * i + 1];

            if (tmpX < 0 || tmpY < 0 || tmpY >= width || tmpY >= height) {

            } else if (marked[tmpX][tmpY] == 0) {
                if (isTolerance(tmpX, tmpY)) {
                    marked[tmpX][tmpY] = 2; // 符合容差标记为2
                    seeds.push([tmpX, tmpY]);
                } else {
                    marked[tmpX][tmpY] = 1; // 不符合容差，但遍历过标记为1
                }
            }

        }
    }

    // 将标记过的点设为白色
    for (var i = 0; i < height; i++) {
        for (var j = 0; j < width; j++) {
            if (marked[i][j] == 2) {
                var tmp = 4 * (i * width + j);
                src.data[tmp] = 255;
                src.data[tmp + 1] = 255;
                src.data[tmp + 2] = 255;
            }
        }
        return marked;
    }
}

function init() {
    files.addEventListener('change', drawImage);
    canvas.addEventListener('mousewheel', controlImageSize);
    canvas.addEventListener('click', getImagePointRBGAInfo);
    canvas.addEventListener('click', mattingRegion);
}

init();
