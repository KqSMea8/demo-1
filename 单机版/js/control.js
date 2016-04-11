var power = true;//初始牌权是玩家的

var countCilck = 0; //第几次点击听牌按钮 ，偶数次为玩家点击，奇数次为玩家点击                  

// 开始游戏
var start = $('#start');
start.onclick = function  () {
	var init = $('.init');
	init.style.display = 'none';
	var inGame = $('.inGame');
	inGame.style.display = 'block';
}

// 第一次发牌
var giveCard = $('.giveCard');
giveCard.onclick = function  () {
	giveCardOnclick ();
}	

