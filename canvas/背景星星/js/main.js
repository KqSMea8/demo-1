var main = (function  () {

	var can, ctx, w, h, img = new Image();


	function drawBackGround () {
		ctx.fillStyle = "#393550";
		ctx.fillRect(0, 0, w, h);
	}

	function gameLoop () {
		window.requestAnimFrame(gameLoop);
		drawBackGround ();
		drawGirl ();
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

		gameLoop ();
		
		
	}
	return {
		init: init
	}
}());