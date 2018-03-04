/**
 * 现在蛇已经动起来了，然后蛇还差吃东西了，这样就快接近成功了。怎么吃东西呢
 * 先随机生成一个东西，然后检测碰撞，如果头一个的下一个碰到了，就把这个东西的位置增加到已知的
 * 数组长度就行了。关键是怎么生成这个东西，在数组剩下的空间里面随机找一个，这个算法不好。要记录
 * 生剩余的空间，我想到另一个就是我每次随机生成一个坐标，然后去看他的状态是否是已经标记的，如果标记的话
 * 说明这个坐标是蛇的身体，如果不是就把这个东西显示出来。然后蛇每次运动就检测他下一个的状态。先去
 * 生成食物，然后检测他的状态直到是食物位置，然后改变他的状态，改变位置的颜色
 * 蛇动的时候检测当前方向上下一个位置的状态，如果是食物就把这个状态的坐标置入蛇的身体，然后改变这个坐标的
 * 状态为蛇的身体
 * 吃完食物之后在生成一个食物
 *
 *
 * 现在要做的是每次动的时候，去检测他下一个位置的状态
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
var grideWidth = 20;
var direction = 'right'; // 初始方向  'down':下 left:左 right:右
var snakeIndexArr = []; // [{x: x, y: y}] 蛇的坐标
var speed = 1000; // 单位毫秒
var data = [];    // 记录坐标状态， 0: 空状态 1: 食物 -2: 蛇的身体
var timer = null;

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
}

/**
 * 蛇运动
 *
 * 要想使蛇运动起来就是改变坐标根据当前的方向然后改变坐标,怎么改变呢，把最后一个删掉，然后添加
 * 到最前面的添加
 *
 * @return {[type]} [description]
 */
function moveSnake() {
    snakeIndexArr.shift();
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

    snakeIndexArr.push(newPos);
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
        changeSnakeColor();
        createFood();
    }
}

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

// 输入蛇的坐标，改变相应坐标点的颜色
function changeColor() {
    var currentDom = null;
    var currentId = null;
    var lastPos = null;
    var newPos = {};
    var headIndex;
    var currentId;

    lastPos = snakeIndexArr[snakeIndexArr.length - 1];

    detectionFrontFood();

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
        changeColor();
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

function init() {
    // 生成一个棋盘
    createGride();
    // 初始化网格状态
    initData();
    // 生成一个蛇
    createSnake();
    // 蛇运动
    changeColor();
    // 改变蛇的运动方向
    document.addEventListener('keydown', changeDirection);
    // 生成食物
    createFood();
}

init();