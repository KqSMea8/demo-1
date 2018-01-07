/**
 * @author: sufubo
 * @file 标签云
 * @参考链接 http://www.cnblogs.com/axes/p/3501424.html
 */
var RADIUS = 220;
var tagBall = document.getElementById('tagBall');
var tagEle = document.querySelectorAll('.tag');
var CX = tagBall.offsetWidth / 2;
var CY = tagBall.offsetHeight / 2;
var EX = tagBall.offsetLeft + document.body.scrollLeft + document.documentElement.scrollLeft;
var EY = tagBall.offsetTop + document.body.scrollTop + document.documentElement.scrollTop;
var angleX = Math.PI / 500;
var angleY = Math.PI / 500;
var tags = [];
var fallLength = 500; // 焦距 距离z轴的距离

function init() {
    var tagsLength = tagEle.length;
    for (var i = 0; i < tagsLength; i++) {
        var a, b;
        var k = -1 + (2 * (i + 1) - 1) / tagsLength;
        var a = Math.acos(k);
        var b = a * Math.sqrt(tagsLength * Math.PI);
        var x = RADIUS * Math.sin(a) * Math.cos(b);
        var y = RADIUS * Math.sin(a) * Math.sin(b);
        var z = RADIUS * Math.cos(a);
        var t = new tag(tagEle[i], x, y, z);
        tagEle[i].style.color = 'rgb(' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ')';

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

tag.prototype.move = function() {
    var scale = fallLength / (fallLength - this.z);
    var alpha = (this.z + RADIUS) / (2 * RADIUS);
    this.ele.style.fontSize = 15 * scale + 'px';
    this.ele.style.opacity = alpha + 0.5;
    this.ele.style.filter = 'opacity(' + (alpha + 0.5) * 100 + ')';
    this.ele.style.zIndex = parseInt(scale * 100);
    this.ele.style.left = this.x + CX - this.ele.offsetWidth / 2 + 'px';
    this.ele.style.top = this.y + CY - this.ele.offsetHeight / 2 + 'px';
}

function rotateX() {
    var cos = Math.cos(angleX);
    var sin = Math.sin(angleX);
    tags.forEach(function() {
        var y1 = this.y * cos - this.z * sin;
        var z1 = this.y * sin + this.z * cos;
        this.y = y1;
        this.z = z1;
    })
}

function rotateY() {
    var cos = Math.cos(angleY);
    var sin = Math.sin(angleY);
    tags.forEach(function() {
        z1 = this.z * cos - this.x * sin;
        x1 = this.z * sin + this.x * cos;
        this.x = x1;
        this.z = z1;
    })
}

tagBall.addEventListener('mousemove', function(e) {
    var x = e.clientX - EX - CY;
    var y = e.clientY - EY - CY;
    angleY = x * .0001;
    angleX = y * .0001;
});

Array.prototype.forEach = function (callback) {
    for (var i = 0; i < this.length; i++) {
        callback.call(this[i]);
    }
}

function animate() {
    rotateX();
    rotateY();
    tags.forEach(function () {
        this.move();
    });

    requestAnimationFrame(animate);
}


init();
animate();