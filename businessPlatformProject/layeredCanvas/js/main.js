/**
 * 看了一下实际的作品，没有想象中那么难。不过也不简单
 * 这个做完之后就可以去做ios和安卓的那两个简单的项目，让我也对安卓和ios有一个基础的
 * 认识这样也方便我以后进行开发混合应用
 * 好开始进行这个项目，看今晚是否能完成这个项目。
 * 如果可以完成那就太好了。不过感觉应该很难。一步一步来。先要建立一个画布。那么肯定是canvas
 * 难点在于拖动换位置，这个功能很炫，之前一直想探索怎么实现这次刚好就体验一下。本来以为要做一个ps
 * 那样的东西感觉很复杂。不过我可以砍需求。一点一点的做。
 */
var mainContainer = document.getElementById('canvas-container');
var index = 0; // 当前canvas数量
var currentCanvas = null;
var currentContext = null;
var mainCanvasWidth = 600;
var mainCanvasHeight = 400;
var bgColor = '#eee';
var lineColor = 'red';
var lineWidth = 1;
var moveFlag = false;
var oldX = 0;
var oldY = 0;

/**
 * 第一步已经完成了。接下来我们需要有一个可以分层的画布。
 * 没理解这个背景层是做什么的，就是我画的这个区域，然后可以控制我画的线的显示
 * 哪里出问题了呢，画布已经显示出来了。但是并没有画出来
 */

// 记录鼠标位置还有设置当前可以进行滑动
function drawLineStart(e) {
    moveFlag = true;
    var newCanvas = document.createElement('canvas');
    newCanvas.width = mainCanvasWidth;
    newCanvas.height = mainCanvasHeight;
    newCanvas.id = 'canvas-' + index;
    mainContainer.appendChild(newCanvas);
    currentCanvas = newCanvas;
    currentContext = newCanvas.getContext('2d');
    index++;
}

function drawLineUp(e) {
    moveFlag = false;
    oldX = 0;
    oldY = 0;
}

function drawLineMove(e) {
    if (moveFlag) {
        // 开始绘画
        var x = e.clientX - mainContainer.offsetLeft;
        var y = e.clientY - mainContainer.offsetTop;
        console.log(x);
        oldX = oldX > 0 ? oldX : x;
        oldY = oldY > 0 ? oldY : y;
        currentContext.beginPath();
        currentContext.moveTo(oldX, oldY);
        currentContext.lineTo(x, y);
        currentContext.strokeStyle = lineColor;
        currentContext.stroke();
        oldX = x;
        oldY = y;
    }
}

function initMainCanvasSize() {
    mainContainer.style.width = mainCanvasWidth + 'px';
    mainContainer.style.height = mainCanvasHeight + 'px';
    mainContainer.style.background = bgColor;
}

function init() {
    initMainCanvasSize();
    document.addEventListener('mousedown', drawLineStart);
    document.addEventListener('mousemove', drawLineMove);
    document.addEventListener('mouseup', drawLineUp);
}
init();
