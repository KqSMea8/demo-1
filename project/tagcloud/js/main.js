/**
 * @author: sufubo
 * @file 标签云
 * @参考链接 http://www.cnblogs.com/axes/p/3501424.html
 */
var RADIUS = 10;
var tagBall = document.getElementById('tagBall');
var CX = tagBall.offsetWidth / 2;
var CY = tabBall.offsetHeight / 2;
function init() {
    var tags = document.querySelectorAll('.tag');
    var tagsLength = tags.length;
    for (var i = 0; i < tagsLength; i++) {
        var a, b;
        var a = Math.acos((2 * i - 1)/tagsLength - 1);
        var b = a * Math.sqrt(tagsLength * Math.PI);

        var x = RADIUS * Math.sin(a) * Math.cos(b);
        var y = RADIUS * Math.sin(a) * Math.sin(b);
        var z = RADIUS * Math.cos(a);
        var t = new tag(tags[i], x, y, z);
        tagEle[i].style.color = 'rgb(' + parseInt(Math.random()*255) + ',' + parseInt(Math.random()*255) + ',' + parseInt(Math.random()*255) + ')';

        tags.push(t);
        t.move();
    }

}


function tag(ele, x, y, z) {
    this.ele = ele;
    this.x = x;
    this.y = y;
    this.z = z;
}

tag.prototype.move = function () {
    var fallLength = 10; // 焦距 距离z轴的距离
    var scale = fallLength/(fallLength-this.z);
    var alpha = (this.z + RADIUS)/(2 * RADIUS);
    this.ele.style.fontSize = 15 * scale + 'px';
    this.ele.style.opacity = alpha + 0.5;
    this.ele.style.filter = 'opacity(' + (alpha + 0.5) * 100 + ')';
    this.ele.style.zIndex = parseInt(scale * 100);
    this.ele.style.left = this.x + CX - this.ele.offsetWidth / 2 + 'px';
    this.ele.style.left = this.y + CY - this.ele.offsetHeight / 2 + 'px';
}

function rotateX() {
    var cos = Math.cos(angleX);
    var sin = Math.sin(angleY);
    tags.forEach(function () {
        var y1 = this.y * cos - this.z * sin;
        var z1 = this.z * cos + this.y * sin;
        this.y = y1;
        this.z = z1;
    })
}

tagBall.addEventListener('mousemove', function (e) {
    var x = e.clientX -
});



init();



