var can, ctx, w, h, 
    img = new Image(), 
    starPic = new Image(),
    num = 60,
    stars = [],
    lastTime,
    deltaTime;	


function drawBackGround () {
	ctx.fillStyle = "#393550";
	ctx.fillRect(0, 0, w, h);
}

function gameLoop () {

	drawBackGround ();
	drawGirl ();

	deltaTime = Date.now() - lastTime;
	console.log(deltaTime)
	drawStars(num, stars);

	lastTime = Date.now();

	

	window.requestAnimFrame(gameLoop);
}

function drawGirl () {
	ctx.drawImage(img, 100, 100, 600, 350);
}

function init () {
	can = document.getElementById("canvas");
	ctx = can.getContext("2d");

	w = can.width;
	h = can.height;

	img.src = "img/girl.jpg";
	starPic.src = "img/star.png";

	for (var i = 0; i < num; i++) {
		var obj = new starObj();
		stars.push(obj);
		stars[i].init();
	}

	lastTime = Date.now();
	gameLoop ();
}