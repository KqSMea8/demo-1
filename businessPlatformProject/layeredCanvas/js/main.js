/**
 * 看了一下实际的作品，没有想象中那么难。不过也不简单
 * 这个做完之后就可以去做ios和安卓的那两个简单的项目，让我也对安卓和ios有一个基础的
 * 认识这样也方便我以后进行开发混合应用
 * 好开始进行这个项目，看今晚是否能完成这个项目。
 * 如果可以完成那就太好了。不过感觉应该很难。一步一步来。先要建立一个画布。那么肯定是canvas
 * 难点在于拖动换位置，这个功能很炫，之前一直想探索怎么实现这次刚好就体验一下。本来以为要做一个ps
 * 那样的东西感觉很复杂。不过我可以砍需求。一点一点的做。
 * 怎么突然心情不好了。这样不行。被人放鸽子了就心情不好了。然后现在连代码都看不进去了。还是自己心态
 * 的问题，要调整好自己的心态。不能被这点事情影响了自己的心情。我的时间是很宝贵的
 * 我要利用我这点时间来好好的学习。就是人家说的不看外貌看气质。我要气质好。自然就有女朋友
 * 要自信，还有会打扮自己。然后这方面的老师有石卉。可以找他。不要去想那些不好的。想想我拥有的。
 * 要今天要把这个分层画布完成。明天还有一大堆的事情，这个学习不能废弃，现在就一个人，正是好好学习的
 * 好机会。
 *
 *
 * 现在做到的是画布已经出来了。然后也新建了很多的画布。
 *
 *
 * 1.把每个画布都单独拎出来放在旁边进行控制，可以设置他的隐藏
 *     这个在创建层的时候在旁边也需要建立一个相应的控制中心，然后点击控制中心的隐藏还有显示可以控制
 *     对应层的显示和隐藏
 * 2.设置画布的背景色
 * 3.拖拽控制层的层级
 */
var mainContainer = document.getElementById('canvas-container');
var layerControl = document.getElementById('canvas-control');
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
var display = [];
var displayToText = {
    block: '显示',
    none: '隐藏'
};

function createLayer() {
    var newCanvas = document.createElement('canvas');
    newCanvas.width = mainCanvasWidth;
    newCanvas.height = mainCanvasHeight;
    newCanvas.id = 'canvas-' + index;
    mainContainer.appendChild(newCanvas);
    currentCanvas = newCanvas;
    currentContext = newCanvas.getContext('2d');
}

// 创建层的控制中心
// 控制对应层的显示和隐藏，要考虑到可以拉取，所以要用到事件监听
// 然后在每个里面加上自己的id值进行查找对应，就可以控制了
// 这里的显示从一个状态码进行表示，然后映射成对应的值
// 需要用另外一个状态去维护他的显示状态
function createControl() {
    var laryer = document.createElement('div');
    display[index] = 'none';
    laryer.innerHTML = '<span>' + index + '</span><button id="layer-' + index + '">' + displayToText[display[index]]  + '</button>';
    layerControl.appendChild(laryer);
}


// 控制显示和隐藏，添加事件监听
function addControlDisplay(e) {
    var target = e.target;
    var index = target.id.split('-')[1];
    console.log(index);
    if (display[index] === 'none') {
        display[index] = 'block';
        target.innerHTML = '显示';
        document.getElementById('canvas-' + index).style.display = 'none';
    }
    else {
        display[index] = 'none';
        target.innerHTML = '隐藏';
        document.getElementById('canvas-' + index).style.display = 'block';
    }
}

/**
 * 第一步已经完成了。接下来我们需要有一个可以分层的画布。
 * 没理解这个背景层是做什么的，就是我画的这个区域，然后可以控制我画的线的显示
 * 哪里出问题了呢，画布已经显示出来了。但是并没有画出来
 */

// 记录鼠标位置还有设置当前可以进行滑动
function drawLineStart(e) {
    moveFlag = true;
    createLayer();
    createControl();
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
    mainContainer.addEventListener('mousedown', drawLineStart);
    mainContainer.addEventListener('mousemove', drawLineMove);
    mainContainer.addEventListener('mouseup', drawLineUp);
    layerControl.addEventListener('click', addControlDisplay);
}
init();
