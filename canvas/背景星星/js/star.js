var starObj =function  () {
	this.x;
	this.y;
	this.picNo;
	this.timer;
	this.xSpd;
	this.ySpd;
}

starObj.prototype.init = function  () {
	this.x = Math.random() * 550 + 100;
	this.y = Math.random() * 350 + 100;
	this.picNo = 0;
	this.timer = 0;

	//速度有正有负原来是[0,3]现在是[-1.5, 1.5]
	this.xSpd = Math.random() * 3 - 1.5; 
	this.ySpd = Math.random() * 3 - 1.5;
}

starObj.prototype.update = function  () {

	this.x += this.xSpd * deltaTime * 0.01; //每一帧星星的移动
	this.y += this.ySpd * deltaTime * 0.01;	                                       

	//如果星星超过了canvas边界就重新初始化
	if (this.x < 100 || this.x > 700) {
		this.init();
		return ;
	}

	if (this.y < 100 || this.y > 450) {
		this.init();
		return ;
	} 


	this.timer += deltaTime;
	if (this.timer > 50) {
		this.picNo = this.picNo+1;
		this.picNo = this.picNo%7;
		this.timer = 0;
	}
	
}

starObj.prototype.draw = function  () {

	//使save之间的代码受到globaAlphs的影响
	ctx.save();

	ctx.globalAlpha = life;
	ctx.drawImage(starPic, this.picNo*7 , 0, 7, 7, this.x, this.y, 7, 7);
	ctx.restore();
}

function drawStars () {
	for (var i = 0; i < num; i++) {
		stars[i].update();
		stars[i].draw();
	}
}

function showAvailable () {
	if (switchy) {

		//显示
		life += deltaTime * 0.05;
		if (life > 1) {
			life = 1;
		}
		
	} else {

		//隐藏
		life -= deltaTime * 0.05;
		if (life < 0) {
			life = 0;
		}
	}
	
}