	(function(){var getDom = function(id){
   	return document.getElementById(id);
   }
   var list1 = getDom('list1');
   var list2 = getDom('list2');
   var list3 = getDom('list3');
   var detail = getDom('detail');


   var left = detail.offsetLeft;
   var timer;
   function startMove(a){
   		clearInterval(timer);
		timer = setInterval(function(){
		   	left = detail.offsetLeft;
		   	if(left < -a*279){
		   		detail.style.left = left + 1+'px';
		   	}
		   	else if(left === -a*279){
		   		clearInterval(timer);
		   	}
		   	else if(left > -a*279){
		   		detail.style.left = left-1+'px';
		   	}		
	   	},10);
};
	 

    list1.onclick = function(){
	  	list1.className = 'tab';
	  	list2.className = '';
	  	list3.className = '';
	  	startMove(0);

  	}
  	list2.onclick = function(){
	  	list2.className = 'tab';
	  	list1.className = '';
	  	list3.className = '';
	  	startMove(1);
  	}
 	list3.onclick = function(){
	  	list3.className = 'tab';
	  	list1.className = '';
	  	list2.className = '';
	  	startMove(2);
  	}
  	var input = getDom('input');
 		input.onkeyup =function(){
 		this.value = this.value.toUpperCase();
 	}
 })();

 