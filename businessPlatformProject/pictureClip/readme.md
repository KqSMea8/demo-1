# 图片裁剪器

- 有透明画布算法
```
function drawClipCancasWall() {
    // 绘制矩形方块，要可以跳过去，隔一个然后画一个，需要一个判断条件, 奇数行判断为偶数
    // 偶数行判断为奇数然后就画OK
    var ctx = sourceImgCanvas.getContext('2d');
    var gridWidth = 20;
    var judgeOdd = gridWidth * 2;
    for (var row = 0; row < sourceImgCanvasWidth; row = row + gridWidth) {
        for (var col = 0; col < sourceImgCanvasHeight; col = col + gridWidth) {
            if ((row % judgeOdd === 0) && (col % judgeOdd !== 0)
                || (row % judgeOdd !== 0) && (col % judgeOdd === 0)) {
                ctx.fillStyle = '#ccc';
                ctx.fillRect(row, col, gridWidth, gridWidth);
            }
        }
    }
}
```