window.onload=function(){
	waterfall('main','box');
	var dataInt = {"data":[{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"}]};
	window.onscrolls=function(){
		if(checkScrollSlide){
			var oParent = document.getElementById('main');
			//将数据渲染到当前页面尾部
			for(var i=0; i<dataInt.data.length;i++){
				var oBox = document.createElement('div');
				oBox.className='box';
				oParent.appendChild(oBox);
				var oPic = document.createElement('div');
				oPic.className='pic';
				oBox.appendChild(oPic);
				var oImg = document.createElement('img');
				oImg.src = "images/"+dataInt.data[i].src;
				oPic.appendChild(oImg);
			}
			waterfall('main','box');
		}
	}
}
//检测是否具备加载数据块的条件
function checkScrollSlide(){
	var oParent = document.getElementById('main');
	var oBoxs = getByClass(oParent,'box');
	var lastBoxH = oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
	var scrollTop=document.body.scrollTop || document.documentElement.scrollTop;
	console.log(scrollTop);			
	var height = document.body.clientHeight || document.documentElement.clientHeight;
	console.log(height);
	return (lastBoxH<scrollTop+height)?true:false;

}

function waterfall(parent, box){
//将main下的所有class为box的元素取出来
var oParent = document.getElementById(parent);
var oBoxs = getByClass(oParent,box);
console.log(oBoxs.length);
//计算整个页面显示的列数使用（页面宽度/box的宽）
var oBoxW = oBoxs[0].offsetWidth;
console.log(oBoxW);
var cols = Math.floor(document.documentElement.clientWidth/oBoxW);
console.log(cols);
//设置main的宽
oParent.style.cssText='width:'+oBoxW*cols+'px;margin:0 auto';
var hArr=[];
for(var i=0; i<oBoxs.length;i++){
	if(i<=cols){
		hArr.push(oBoxs[i].offsetHeight);
	}else{
		var minH = Math.min.apply(null,hArr);
		console.log(minH);
		var index = getMinIndex(hArr,minH);
		oBoxs[i].style.position='absolute';
		oBoxs[i].style.top=minH+'px';
		oBoxs[i].style.left=oBoxW*index+'px';
		// oBoxs[i].style.left=oBoxs[index].offsetLeft+'px';这两个都可以 
		hArr[index]+=oBoxs[i].offsetHeight;
	}
}
console.log(hArr);
}
function getMinIndex(arr,val){
	for(var i in arr){
		if(arr[i]==val){
			return i;
		}
	}
}
//根据class获取元素
function getByClass(parent,clsName){
	var boxArr = new Array();//用来存储所有class为box的元素
	var oElements = parent.getElementsByTagName('*');//就获取这个下所有的子元素
	for(var i = 0; i<oElements.length;i++){
		if(oElements[i].className == clsName){
			boxArr.push(oElements[i]);
		}
	}
	return boxArr;
}
