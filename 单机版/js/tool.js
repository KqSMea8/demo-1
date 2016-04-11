function $ (select) {
	return document.querySelector(select);
}
function $s (select) {
	return document.querySelectorAll(select);
}
//52张牌
var card = [];
var cardFace = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
var color = ["黑","红","梅","方"];
//玩家一
var play1 = [];
var count1 = 0;
//玩家二
var play2 = [];
var count2 = 0;
//洗牌
function washCard () {
	console.log('洗牌')
	for (var i = 0; i < 52; i++) {
   	 card[i] = i;//52张牌赋值
	}
	for (var j = 0; j < 26; j++) {
	    //打乱26次
	    var m = parseInt(Math.random()*52);//在52张牌中找到第一张
	    var n = parseInt(Math.random()*52);//在52张牌中找到第二张
	    swap(m, n, card);//下午接着写这个交换函数
	}
}
//交换数字
function swap (m, n, card) {
	var temp = card[m];
	    card[m] = card[n];
	    card[n] = temp;
}

//渲染牌色
function renderCard (arr1, arr2) {
	 console.log('渲染代码');  
}	

//发牌
function deal () {
	//先发两张给玩家一
	play1.push(card.pop());
	console.log(play1.length)
	play1.push(card.pop());
	// 再发两张给玩家二
	play2.push(card.pop());
	play2.push(card.pop());
	render (play1, play2);
}

//渲染牌
function render (play1, play2) {
	var card1 = $('#card1');
    var card2 = $('#card2');
    var html1 = '';
    var html2 = '';
    console.log(power);
   	if (power) {    
   		console.log(play1[0]%13+1);
   		html1 += '<img src="img/back.png"><img src="img/'+(play1[0]+1)+'.png">';

     	// html1 += '花色:'+color[getColor(play1[0])]+',牌值'+ cardFace[play1[0]%13]+';'; 
   	} else {  
   		html1 = '';
   		for (var i = 0; i < play1.length; i++) {  
   		   console.log(play1[i]%13)
   		   html1 += '<img src="img/'+(play1[i]+1)+'.png">';
     	   // html1 += '花色:'+color[getColor(play1[i])]+',牌值'+ cardFace[play1[i]%13]+';'; 
       }
   	}
    for (var j = 0; j < play2.length; j++) {
    	console.log(play2[j]%13)
    	html2 += '<img src="img/'+(play2[j]+1)+'.png">';
     	// html2 += '花色:'+color[getColor(play2[j])]+',牌值'+ cardFace[play2[j]%13]+';'; 
    } 
    if (play1.length == 0) {
    	card1.innerHTML = '';
    } else {
    	card1.innerHTML = html1;
    }
    if (play2.length == 0) {
    	card2.innerHTML = '';
    } else {
    	card2.innerHTML = html2;
    }
}
//计算发牌的点数
//值是从零开始算的
function calPoint (i) {
	//J，Q，K都是10
	if (i%13 + 1 > 10) {
	    i = 10;
	    return i;
	} else {
	     return i%13+1;
	}
}
//计算总分
function calAllPoint (arr) {
	var sum = 0;
	for (var i = 0; i < arr.length; i++) {
	    sum += calPoint(arr[i]);
	}
	return sum;
}
//判断花色
function  getColor(num) {
	if (num < 13) {
	    return 0;
	} else if (num < 26) {
	    return 1;
	} else if (num < 39) {
	    return 2;
	} else {
	    return 3;
	}
}

function judgResult () {
	var sum1 = calAllPoint (play1) ;
	console.log('庄家的点数'+sum1)
	var sum2 = calAllPoint (play2) ;
	console.log('玩家的点数'+sum2)
	if ((sum1 > 21) && (sum2 > 21)) {
		power = true;
		alert('平局');
	} else if ( (sum1<21) && (sum2<21) && (21 - sum1) > (21 - sum2) ) {
		alert('玩家胜');
		power = true;
		count2++;
	} else if ( (sum1<21) && (sum2<21) &&  (21 - sum1) < (21 - sum2) ) {
		alert('庄家胜');
		power = true;
		count1++;
	} else if ( sum1 < 21 && (sum2 > 21)) {
		alert('庄家胜');
		power = true;
		count1++;
	} else if ( sum1 > 21 && (sum2 < 21)){
		alert('玩家胜');
		power = true;
		count2++;
	} else if (Math.abs(21 - sum1) > Math.abs(21 - sum2)){
		alert('玩家胜');
		power = true;
		count2++;
	} else if (Math.abs(21 - sum1) < Math.abs(21 - sum2)) {
		alert('庄家胜');
		power = true;
		count1++;
	} else {
		alert('平局');
		power = true;
	}
	renderbank (play1);
	renderGold ();
}

function renderbank (arr) {
	var card1 = $('#card1');
    var card2 = $('#card2');
    var html1 = '';
    var html2 = '';
    console.log(power);
   	for (var i = 0; i < play1.length; i++) {  
   		console.log(play1[i]%13)
   		html1 += '<img src="img/'+(play1[i]+1)+'.png">';
     	   // html1 += '花色:'+color[getColor(play1[i])]+',牌值'+ cardFace[play1[i]%13]+';'; 
    }
    if (play1.length == 0) {
    	card1.innerHTML = '';
    } else {
    	card1.innerHTML = html1;
    }
    //这一块有bug，但是暂时没想到解决的办法
   	var point1 = $('.point1');
   	if ( (play1.length != 0) && countCilck%2 != 0 && !power ){
   		point1.innerHTML = calAllPoint (play1)+'点';
   	} else {
   		point1.innerHTML = '';
   	}
}

//改为要牌和听牌按钮
function changeBtn () {
	var btn = $('.btn');
	var html = '<button>要牌</button><button>听牌</button>';
	btn.innerHTML = html;
}


function createRound () {
    var desktop = $('.desktop');
    var mask = document.createElement('div');   
    mask.className = 'mask';    
    desktop.appendChild(mask);
	var ele = document.createElement('div');
	ele.innerHTML = '<button>再来一局</button>';
	desktop.appendChild(ele);
    var width = desktop.offsetWidth;
    var height = desktop.offsetHeight;
    console.log('ele的宽度'+ele.offsetWidth)
    ele.style.position = 'absolute';
    ele.style.left = (width - ele.offsetWidth)/2 + 'px';
    ele.style.top = (height - ele.offsetHeight)/2 + 'px';
	ele.style.background = 'background:#95daea';	
	ele.onclick = function  () {
		desktop.removeChild(mask);
		play1 = [];
		play2 = [];
		console.log('庄家的长度：'+play1.length);
		render(play1, play2);
		var btn  = $('.btn');
		btn.innerHTML = '<button class="giveCard">发牌</button>'; 
		displayScore ();
		desktop.removeChild(ele);
		giveCardOnclick ();
		// location.reload();
	}
}
function displayScore () {
	if (!power) {
   		var point1 = $('.point1');
   		if (play1.length != 0){
   			point1.innerHTML = calAllPoint (play1)+'点';
   		} else {
   			point1.innerHTML = '';
   		}
	}
    var point2 = $('.point2');
    if (play2.length != 0) {
    	point2.innerHTML = calAllPoint (play2)+'点';
    } else {
    	point2.innerHTML = '';
    }
}
  
var div = document.createElement('div');      
function renderGold () {
	div.innerHTML = '<p>庄家积分:'+count1+"</p><p>玩家积分:"+count2+'</p>';
	div.style.cssText = 'position:absolute;right:1rem;bottom:1rem;'
	var desktop = $('.desktop');
	desktop.appendChild(div);
}

function giveCardOnclick () {
	console.log('发牌')
    washCard ();//洗牌
    deal ();//发牌
    displayScore ();
    changeBtn();
    var btns = $s('.btn button');
    //要牌
	btns[0].onclick = function  () {
		if (power === true) {
			play2.push(card.pop());
			render(play1, play2);
			displayScore ();
			var point =  calAllPoint (play2);
			if (point >= 21) {
			   judgResult ();
			   alert('刷新再来一局');
			   createRound () ;
			}
		} else {
			play1.push(card.pop());
			render(play1, play2);
			displayScore ();
			var point =  calAllPoint (play1) ;
			if (point >= 21) {
				judgResult ();
				alert('刷新再来一局');
				createRound () ;
			}
		}
		

	}
	//听牌
	btns[1].onclick = function  () {
		console.log('点击的次数'+countCilck);
		if (countCilck%2 === 0) {
			alert('轮到庄家要牌还是听牌了');
			power = false;
		} else {
			//countClick是用来标记是第几次点击听牌。如果是偶数次就是 (countCilck%2 !== 0) {
			render(play1, play2);
			judgResult();
			alert('刷新再来一局');
			createRound () ;
		}
		countCilck ++;
	}
}