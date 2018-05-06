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
 * *
 * 4.拖拽有了，接下来就是控制层级
 * 拖拽之后他的顺序他的现有位置和index的关系，找到他的现有位置就知道了，这个该怎么设计呢
 * 现在拖拽有了，就是层级的设计，然后我就要设计这个滑动位置与层级的关系，其实是有两个数据的
 * 一个是本身标示的位置，一个是他实际位置的标示，其实我只需要做这两个标示的管理和同步就行了
 * 自身的标志在dom元素里面保存着，然后他和我们的层级关联，然后另外一个数据是目前自己真正的位置
 * 这个存到自己的属性里面，然后这个控制着z-index的层级，并且不断同步z-index的级别
 *
 * 拖拽的位置是对的，
 *
 * https://my.oschina.net/blogshi/blog/219408
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
    newCanvas.style.zIndex = index;
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
    laryer.setAttribute('draggable', true);
    laryer.setAttribute('zIndex', index);
    laryer.innerHTML = '<span>' + index + '</span><button id="layer-' + index + '">' + displayToText[display[index]]  + '</button>';

    laryer.addEventListener('dragstart', dragStart);
    laryer.addEventListener('dragover', dragOver);
    laryer.addEventListener('drop', dragLeave);

    layerControl.appendChild(laryer);
}

// 开始拖拽携带数据
function dragStart(e) {
    var text = e.target.innerHTML;
    e.dataTransfer.setData('text', text);
    console.log(text);
}

// 设置可以出发drop事件
function dragOver(e) {
    e.preventDefault();
}

// 接收携带的数据，然后插入到当前元素的前面
function dragLeave(e) {
    var target = e.target;

    // 现在是目标元素可能都是就是或的关系
    if (target.tagName.toLowerCase() === 'button') {
        target = target.parentNode;
    }

    var zIndex = parseInt(target.getAttribute('zIndex'), 10);

    console.log('target');
    console.log(target);

    var text = e.dataTransfer.getData('text');
    var laryer = document.createElement('div');
    laryer.setAttribute('draggable', true);
    laryer.innerHTML = text;
    laryer.addEventListener('dragstart', dragStart);
    laryer.addEventListener('drop', dragLeave);

    // 插入之前先删除原元素
    var spanNum = parseInt(laryer.children[0].innerText);
    console.log(spanNum);

    // 删除
    var oldNode = document.getElementById('layer-' + spanNum).parentNode;
    layerControl.removeChild(oldNode);

    // 插入
    layerControl.insertBefore(laryer, target);

    // 把这个元素前面的所有元素的zIndex都要前移,他的属性的zIndex值都要前移
    let preSbiling = target.previousSibling;
    let preZIndex = parseInt(target.getAttribute('zIndex'), 10) - 1;
    console.log('target', target);
    console.log('preSbiling', preSbiling);
    while (preSbiling) {
        preSbiling.setAttribute('zIndex', preZIndex);
        preSbiling = preSbiling.previousSibling;
        preZIndex--;
    }

    // 同步zIndex的值
    preSbiling = target.previousSibling;
    while (preSbiling) {
        // 替换相应层级的zIndex，获取当前元素，然后把当前元素的数字拿到，
        currentIndex = preSbiling.getAttribute('zIndex');

        spanNum = parseInt(preSbiling.children[0].innerText);
        console.log(spanNum);
        oldCanvas = document.getElementById('canvas-' + spanNum);
        oldCanvas.style.zIndex = currentIndex;

        preSbiling = preSbiling.previousSibling;
    }
}

// 那篇文章的思路是把拖拽的元素的数据带上
// 基本上拖拽这里就是讲的是数据的获取和设置，然后可拖动的属性怎么设置
// 这里我要做的就是拖动的时候把数据带上，然后到目标元素放在他的前面就行，
function dragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
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

function dragoverMove(e) {
    var target = e.target;
    console.log(target);
}

function init() {
    initMainCanvasSize();
    mainContainer.addEventListener('mousedown', drawLineStart);
    mainContainer.addEventListener('mousemove', drawLineMove);
    mainContainer.addEventListener('mouseup', drawLineUp);
    layerControl.addEventListener('click', addControlDisplay);
}
init();






/**
 * 1.ios 自动循环播放的广告条 类似于京东的轮播图
 * 实现一个自动循环播放的广告条
广告条要符合以下要求：
        1.    广告的条数不固定，为0则隐藏广告位，有几条就展示几条。
        2.    图片尺寸固定，不需要考虑图片剪裁
        3.    广告的图片从远端拉取，每拉到一条就展示一条，动态添加。
        4.    自动循环播放，并且支持手动滑动。
        5.    带有导航点，点击可以跳转对应广告
        6.    点击广告位可以有不同的效果：本地跳转，跳转浏览器，弹窗

 2.复现ANR
 任务描述

 写出不少于3种常见ANR错误的Android代码

 主线程复现ANR
 BroadcastReceiver复现ANR
 Service复现ANR
 任务注意事项
 */
