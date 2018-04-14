/**
 * 看了一下实际的作品，没有想象中那么难。不过也不简单
 * 这个做完之后就可以去做ios和安卓的那两个简单的项目，让我也对安卓和ios有一个基础的
 * 认识这样也方便我以后进行开发混合应用
 * 好开始进行这个项目，看今晚是否能完成这个项目。
 * 如果可以完成那就太好了。不过感觉应该很难。一步一步来。先要建立一个画布。那么肯定是canvas
 * 难点在于拖动换位置，这个功能很炫，之前一直想探索怎么实现这次刚好就体验一下。本来以为要做一个ps
 * 那样的东西感觉很复杂。不过我可以砍需求。一点一点的做。
 */
var mainCanvas = document.getElementById('main-canvas');
var mainCanvasWidth = 600;
var mainCanvasHeight = 400;

/**
 * 第一步要先完成我们鼠标落下和弹起还有需要有一个轨迹的线条出来
 * 检测鼠标按下去然后我们开始记录他的轨迹
 *
 */

// 记录鼠标位置还有设置当前可以进行滑动
function drawLineStart(e) {

}

function drawLineMove() {
}

function drawLineUp() {
}

function initMainCanvasSize() {
    mainCanvas.width = mainCanvasWidth;
    mainCanvas.height = mainCanvasHeight;
}

function init() {
    initMainCanvasSize();
    document.addEventListener('mousedown', drawLineStart);
    document.addEventListener('mousemove', drawLineMove);
    document.addEventListener('mouseup', drawLineUp);
}
init();
