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

function init() {
    // 生成一个棋盘
    createGride();
}

init();