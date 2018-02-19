/**
 * 看了演示的知道了需求，我就做个第一关就可以了。后面的也就第三关比较麻烦要有障碍物
 * 不过障碍物也可以实现就是随机在剩下的空间里面去方也就是把某几个连续的点设置为一个标志
 * 可以固定的简单几个固定的方向，固定的长度进行配置
 * 后面需要再想随机的算法。
 * 这里可以参考别人的。或者自己想，可以先考虑一个大概的算法就可以。
 *
 * 我这里只做一个第一关的普通模式就行了。
 * 先思考一下需求。可以用上下左右键控制蛇的方向，然后还有蛇有一个速度，蛇只能往前左右走
 * 在有一个范围内，有一只蛇，然后有要吃的东西，他也随机在棋盘上剩下的空间里。然后蛇要开始移动
 * 然后使用不同的键去控制这个方向，然后要有蛇去吃标记的点，如果蛇碰到标记的点，蛇怎么知道这个
 * 是标记的点，蛇每到一个点就去检测这个点的状态，那这个就是涉及到每个状态的同步。用数组去保存
 * 这些点，然后就把这个点给更新了，给蛇的尾巴长度加1那就是最后一个点。先让蛇运动起来先不要吃东西
 * ，然后一条二个点的蛇。让他运动起来。然后操作方向，怎么动起来，就是点的变化。存起来一些点。然后
 * 高亮，动起来是有规律的。x和y轴
 *
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
var direction = 'up'; // 初始方向  'down':下 left:左 right:右
var snakeIndexArr = [];

function createGride() {
    var rn = 0;
    var cn = 0;
    var gridePanelWidth = 0;
    var gridePanelHeight = 0;
    // 生成一个框格100*100的，那就是先要创建一百个div然后
    for (var i = 0; i < width; i++ ) {
        for (var j = 0; j < height; j++) {
            var div = document.createElement('div');
            rn = i < 10 ? '0' + i : i;
            cn = j < 10 ? '0' + j : j;
            div.id = 'g-' + rn + cn; // i行j列
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
        x: x < 10 ? '0' + x : x,
        y: y < 10 ? '0' + y : y
    });

    y = y + 1;
    y = y > 19 ? '18' : y;

    snakeIndexArr.push({
        x: x < 10 ? '0' + x : x,
        y: y < 10 ? '0' + y : y
    });

    // 他是把蛇当作一个对象，所以是this，我呢就直接是全局变量了。


    // 如果用一个数组，进行记录，在移动的时候改变当前位置，如何和继承联系起来
    // 就是在新建对象的时候有初始值进行复制
    // 记录下来位置的点的颜色进行标亮，改变颜色
}

// 输入蛇的坐标，改变相应坐标点的颜色
function changeColor() {
    var currentDom = null;
    var currentId = null;
    var currentIndex = null;
    var headIndex = snakeIndexArr.shift();
    currentId = 'g-' + headIndex.x + headIndex.y;
    // console.log(currentId);
    currentDom = document.getElementById(currentId);
    currentDom.className = 'gride';


    currentIndex = snakeIndexArr[snakeIndexArr.length - 1];
    switch (direction) {
        case 'up':
            snakeIndexArr.push({
                x: currentIndex.x,
                y: currentIndex.y < 9
                    ? '0' + (parseInt(currentIndex.y, 10) + 1) : parseInt(currentIndex.y, 10) + 1
            });
            break;
        case 'down':
            snakeIndexArr.push({
                x: currentIndex.x,
                y: currentIndex.y < 11 ? '0' + (parseInt(currentIndex.y, 10) - 1) : parseInt(currentIndex.y, 10) - 1
            });
            break;
        case 'left':
            snakeIndexArr.push({
                x: currentIndex.x < 11 ? '0' + (parseInt(currentIndex.x, 10) - 1) : parseInt(currentIndex.x, 10) - 1,
                y: currentIndex.y
            });
            break;
        case 'right':
            snakeIndexArr.push({
                x: currentIndex.x < 9 ? '0' + (parseInt(currentIndex.x, 10) + 1) : currentIndex.x + 1,
                y: currentIndex.y
            });
            break;
        default:
            return;
    }

    for (var i = 0; i < snakeIndexArr.length; i++) {
        currentIndex = snakeIndexArr[i];
        console.log(currentIndex);
        currentId = 'g-' + currentIndex.x + currentIndex.y;
        console.log(currentId);
        currentDom = document.getElementById(currentId);
        currentDom.className = 'snake';
    }

}

function init() {
    // 生成一个棋盘
    createGride();

    // 生成一个蛇
    createSnake();
    changeColor();
}

init();