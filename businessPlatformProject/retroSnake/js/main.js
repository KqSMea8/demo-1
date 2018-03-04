/**
 * 生成障碍物算法
 * 如果要随机生成多余的障碍物，而且还要是连续的，这个怎么做，还是随机先生成一个数
 * 然后固定的选取周围坐标，发现如果状态不对，就换方向直到是对的状态，然后继续下一个，直到生成所需长度
 * 这是随机生成直的和不是直的，如果想生成固定形状的，那就更简单的，还是随机生成一个点，剩下的点坐标都知道了
 * 如果有一个不符合要求就换
 *
 * 1.范围
 * 2.初始生成一个蛇，随机在棋盘上，纪录蛇的位置，并把相应位置标记
 * 3.随机生成一个要吃的点，除过蛇占领的位置，纪录点，标记相应位置
 * 4.初始蛇要有一个移动方向，设置一下，纪录蛇的移动方向
 * 5.按键控制方向
 * 6.记录坐标状态， 0: 空状态 1: 食物 -2: 蛇的身体
 */
var width = 20;
var height = 20;
var gridePanel = document.getElementById('gride-panel');
var startDom = document.getElementById('start');
var pauseDom = document.getElementById('pause');
var cancelPauseDom = document.getElementById('cancel-pause');
var grideWidth = 20;
var direction = 'right'; // 初始方向  'down':下 left:左 right:右
var snakeIndexArr = []; // [{x: x, y: y}] 蛇的坐标
var speed = 1000; // 单位毫秒
var data = [];    // 记录坐标状态， 0: 空状态 1: 食物 -2: 蛇的身体
var timer = null;

/**
 * 生成网格显示
 * @return
 */
function createGride() {
    var rn = 0;
    var cn = 0;
    var gridePanelWidth = 0;
    var gridePanelHeight = 0;
    // 生成一个框格100*100的，那就是先要创建一百个div然后
    for (var i = 0; i < width; i++ ) {
        for (var j = 0; j < height; j++) {
            var div = document.createElement('div');
            rn = i < 10 ? '0' + i : i; // y轴
            cn = j < 10 ? '0' + j : j; // x轴
            div.id = 'g-' + cn + rn;
            div.className = 'gride';
            div.style.width = grideWidth + 'px';
            div.style.height = grideWidth + 'px';
            gridePanel.appendChild(div);

        }
    }

    gridePanelWidth = width * grideWidth;
    gridePanelHeight = height * grideWidth;
    gridePanel.style.width = gridePanelWidth + 'px';
    gridePanel.style.height = gridePanelHeight + 'px';
}

// 初始化网格坐标状态
function initData() {
    for (var i = 0; i < width; i++ ) {
        data[i] = [];
        for (var j = 0; j < height; j++) {
            data[i][j] = 0;
        }
    }
}

// 生成一个蛇
function createSnake() {

    // 初始先生成一个蛇也就是找到这个蛇的位置，然后把这个位置给记录下来
    var x = Math.floor(Math.random() * width);
    var y = Math.floor(Math.random() * height);

    // 改变蛇坐标状态
    data[x][y] = 2;

    snakeIndexArr.push({
        x,
        y
    });

    y = y + 1;
    y = y > 19 ? 18 : y;

    snakeIndexArr.push({
        x,
        y
    });

    data[x][y] = 2;
}

/**
 * 获取蛇下一步运动坐标
 *
 * 要想使蛇运动起来就是改变坐标根据当前的方向然后改变坐标,怎么改变呢，把最后一个删掉，然后添加
 * 到最前面的添加
 *
 * @return {Object} 蛇新的位置坐标对象
 */
function getSnakeNextPos() {
    var lastPos = snakeIndexArr[snakeIndexArr.length - 1];
    var newPos = {};
    switch (direction) {
        case 'up':
            newPos.x = lastPos.x;
            newPos.y = lastPos.y - 1;
            break;
        case 'down':
            newPos.x = lastPos.x;
            newPos.y = lastPos.y + 1;
            break;
        case 'left':
            newPos.x = lastPos.x - 1;
            newPos.y = lastPos.y;
            break;
        case 'right':
            newPos.x = lastPos.x + 1;
            newPos.y = lastPos.y;
            break;
        default:
            throw new Error('direction is error');
    }

    return newPos;
}

// 检测下一个位置的状态是否是食物，如果是食物就吃
function detectionFrontFood() {
    var lastPos = snakeIndexArr[snakeIndexArr.length - 1];
    var x = 0;
    var y = 0;

    // 取到最后一个然后预测下一步的状态判断，并且要判断下一步是不是墙，如果是墙就不预测
    switch (direction) {
        case 'up':
            x = lastPos.x;
            y = lastPos.y - 1;
            break;
        case 'down':
            x = lastPos.x;
            y = lastPos.y + 1;
            break;
        case 'left':
            x = lastPos.x - 1;
            y = lastPos.y;
            break;
        case 'right':
            x = lastPos.x + 1;
            y = lastPos.y;
            break;
        default:
            throw new Error('direction is error');
    }

    if (x < 0
        || y < 0
        || x >= width
        || y >= height) {
        return false;
    }
    else if (data[x][y] === 1) {

        // 是食物，把当前坐标添加到蛇的身上，
        // 改变状态，并且生成新的食物
        data[x][y] = 2;
        snakeIndexArr.push({
            x: x,
            y: y
        });
        // 这里没问题
        changeSnakeColor();
        createFood();
    }
}

// 给蛇的坐标添加颜色
function changeSnakeColor() {
    var currentDom = null;
    var currentId = null;
    var currentIndex;

    for (var i = 0; i < snakeIndexArr.length; i++) {
        currentIndex = snakeIndexArr[i];
        console.log(currentIndex);
        currentId = getCurrentId(currentIndex);
        console.log(currentId);
        currentDom = document.getElementById(currentId);
        currentDom.className = 'snake';
    }
}

// 蛇动起来并吃食物
function moveSnake() {
    var currentDom = null;
    var currentId = null;
    var lastPos = null;
    var newPos = {};
    var headIndex;
    var currentId;

    // 检测食物
    detectionFrontFood();

    newPos = getSnakeNextPos();

    // 判断是不是不符合要求,如果坐标不符合要求,不添加到数组中，游戏结束
    // 减少和增加放一块
    if (newPos.x >= width
        || newPos.y >= height
        || newPos.x < 0
        || newPos.y < 0) {
        alert('game over');
        return false;
    }

    // 去掉最后一个
    headIndex = snakeIndexArr.shift();
    currentId = getCurrentId(headIndex);
    currentDom = document.getElementById(currentId);
    currentDom.className = 'gride';

    // 增加下一个
    snakeIndexArr.push(newPos);

    changeSnakeColor();

    timer = setTimeout(function () {
        moveSnake();
    }, speed);
}


/**
 * 获取制定下标的dom元素id
 *
 * @param  {array} currentIndex 当前下标对象
 * @return {string} dom元素id
 */
function getCurrentId(currentIndex) {
    var x = currentIndex.x;
    var y = currentIndex.y;
    var currentX = x < 10 ? '0' + x : x;
    var currentY = y < 10 ? '0' + y : y;
    var currentId = 'g-' + currentX + currentY;
    return currentId;
}

/**
 * 改变蛇的运动方向
 *
 * @return null
 */
function changeDirection(e) {
    var keyCode = e.keyCode;
    var keyCodeSheet = {
        left: 37,
        up: 38,
        right: 39,
        down: 40
    };
    console.log(keyCode);
    switch(keyCode) {
        case keyCodeSheet.left:
            direction = 'left';
            break;
        case keyCodeSheet.up:
            direction = 'up';
            break;
        case keyCodeSheet.right:
            direction = 'right';
            break;
        case keyCodeSheet.down:
            direction = 'down';
            break;
    }
    console.log(direction);
}

/**
 * 生成贪吃蛇的食物
 *
 * @return
 */
function createFood() {
    var x = Math.round(Math.random() * width);
    var y = Math.round(Math.random() * height);
    var currentDom = null;
    var currentId = '';
    if (data[x][y] === 0) { // 符合要求
        data[x][y] = 1;
        x = x < 10 ? '0' + x : x;
        y = y < 10 ? '0' + y : y;
        currentId = 'g-' + x + y;
        currentDom = document.getElementById(currentId);
        currentDom.className = 'food';
    }
    else { // 不符合要求重新生成
        createFood();
    }
}

/**
 * 开始游戏
 *
 * @return
 */
function startHandler() {
    // 生成一个蛇并让蛇动起来
    // 生成一个蛇
    createSnake();
    // 蛇运动
    moveSnake();
    // 生成食物
    createFood();
}

/**
 * 暂停游戏
 *
 * @return
 */
function pauseHandler() {
    // 暂停游戏就是让蛇停止运动，怎么让蛇停止运动，清除定时器
    clearTimeout(timer);
}

/**
 * 取消暂停
 *
 * @return
 */
function cancelPauseHandler() {
    // 让蛇运动起来
    moveSnake();
}

function init() {
    // 生成一个棋盘
    createGride();
    // 初始化网格状态
    initData();
    // 改变蛇的运动方向
    document.addEventListener('keydown', changeDirection);
    // 开始游戏
    startDom.addEventListener('click', startHandler);
    // 暂定游戏
    pauseDom.addEventListener('click', pauseHandler);
    // 取消暂停
    cancelPauseDom.addEventListener('click', cancelPauseHandler);
}

init();