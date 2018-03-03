/**
 * 现在蛇可以动起来了，按照方向进行动。现在已经可以让蛇动起来了。下一步就是要让蛇可以转向
 * 转向怎么做呢，方向键按下，然后改变对应的direction
 *
 * 1.范围
 * 2.初始生成一个蛇，随机在棋盘上，纪录蛇的位置，并把相应位置标记
 * 3.随机生成一个要吃的点，除过蛇占领的位置，纪录点，标记相应位置
 * 4.初始蛇要有一个移动方向，设置一下，纪录蛇的移动方向
 * 5.按键控制方向
 * 6.
 */
var width = 20;
var height = 20;
var gridePanel = document.getElementById('gride-panel');
var grideWidth = 20;
var direction = 'right'; // 初始方向  'down':下 left:左 right:右
var snakeIndexArr = []; // [{x: x, y: y}]
var speed = 1000; // 单位毫秒

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

// 输入蛇的坐标，改变相应坐标点的颜色
function changeColor() {
    var currentDom = null;
    var currentId = null;
    var lastPos = null;
    var newPos = {};
    var headIndex = snakeIndexArr.shift();
    var currentId = getCurrentClass(headIndex);
    currentDom = document.getElementById(currentId);
    currentDom.className = 'gride';
    lastPos = snakeIndexArr[snakeIndexArr.length - 1];

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

    // switch (direction) {
    //     case 'up':
    //         snakeIndexArr.push({
    //             x: currentIndex.x,
    //             y: currentIndex.y - 1
    //         });
    //         break;
    //     case 'down':
    //         snakeIndexArr.push({
    //             x: currentIndex.x,
    //             y: currentIndex.y + 1
    //         });
    //         break;
    //     case 'left':
    //         snakeIndexArr.push({
    //             x: currentIndex.x - 1,
    //             y: currentIndex.y
    //         });
    //         break;
    //     case 'right':
    //         snakeIndexArr.push({
    //             x: currentIndex.x + 1,
    //             y: currentIndex.y
    //         });
    //         break;
    // }

    for (var i = 0; i < snakeIndexArr.length; i++) {
        currentIndex = snakeIndexArr[i];
        console.log(currentIndex);
        var currentId = getCurrentClass(currentIndex);
        if (currentIndex.x >= width
            || currentIndex.y >= width
            || currentIndex.x < 0
            || currentIndex.y < 0) {
            alert('game over');
            return false;
        }
        console.log(currentId);
        currentDom = document.getElementById(currentId);
        currentDom.className = 'snake';
    }

    setTimeout(function () {
        changeColor();
    }, speed);
}

/**
 * 获取制定下标的dom元素id
 *
 * @param  {array} currentIndex 当前下标对象
 * @return {string} dom元素id
 */
function getCurrentClass(currentIndex) {
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

function init() {
    // 生成一个棋盘
    createGride();
    // 生成一个蛇
    createSnake();
    // 蛇运动
    changeColor();
    // 改变蛇的运动方向
    document.addEventListener('keydown', changeDirection);
}

init();