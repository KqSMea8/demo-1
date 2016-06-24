window.requestAnimFrame = (function  () {
	return window.requestAnimFrame || window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame || window.msRequestAnimationFrame ||
	function  (callback, element) {
		return window.setTimeout(callback, 1000/60);
	}
}());