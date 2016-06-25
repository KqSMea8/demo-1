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

	//�ٶ������и�ԭ����[0,3]������[-1.5, 1.5]
	this.xSpd = Math.random() * 3 - 1.5; 
	this.ySpd = Math.random() * 3 - 1.5;
}

starObj.prototype.update = function  () {

	this.x += this.xSpd * deltaTime * 0.01; //ÿһ֡���ǵ��ƶ�
	this.y += this.ySpd * deltaTime * 0.01;	                                       

	//������ǳ�����canvas�߽�����³�ʼ��
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

	//ʹsave֮��Ĵ����ܵ�globaAlphs��Ӱ��
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

		//��ʾ
		life += deltaTime * 0.05;
		if (life > 1) {
			life = 1;
		}
		
	} else {

		//����
		life -= deltaTime * 0.05;
		if (life < 0) {
			life = 0;
		}
	}
	
}