var starObj =function  () {
	this.x;
	this.y;
	this.picNo;
	this.timer;
}

starObj.prototype.init = function  () {
	this.x = Math.random() * 550 + 100;
	this.y = Math.random() * 350 + 100;
	this.picNo = 0;
	this.timer = 0;
}

starObj.prototype.update = function  () {

	this.timer += deltaTime;
	if (this.timer > 50) {
		this.picNo = this.picNo+1;
		this.picNo = this.picNo%7;
		this.timer = 0;
	}
	
}

starObj.prototype.draw = function  () {
	ctx.drawImage(starPic, this.picNo*7 , 0, 7, 7, this.x, this.y, 7, 7);
}

function drawStars () {
	for (var i = 0; i < num; i++) {
		stars[i].update();
		stars[i].draw();
	}
}