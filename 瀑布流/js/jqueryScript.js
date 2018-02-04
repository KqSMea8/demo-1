$(window).on('load', function() {
	waterfall();
	var dataInt = {"data":[{"src":"o.jpg"},{"src":"2.jpg"},{"src":"3.jpg"}]};
	$(window).on('scroll',function(){
		if(checkScrollSlide){
			$.each(dataInt.data,function(key,value){
				console.log(value);
				var oBox=$('<div>').addClass('box').appendTo($('#main'));
				var oPic = $('<div>').addClass('pic').appendTo($(oBox));
				 $('<img>').attr('src','images/'+$(value).attr('src')).appendTo($(opic));
				// console.log($(value).attr('src'));
				

			})
			waterfall();
		}
	})


})
function checkScrollslide(){
	var $lastBox=$('#main>div').last();
	var lastBoxDis=$lastBox.offset().top+Math.floor($lastBox.outerHeight()/2);
	var scrollTop=$(window).scrollTop();
	var documentH = $(window).height();
	return (lastBoxDis<scrollTop+documentH)?true:false;

}
function waterfall(){
	var $boxs = $('#main>div');//找到所有main下面的一级div
	var w = $boxs.eq(0).outerWidth();//获取每一列的宽度，包括margin和padding
	var cols = Math.floor($(window).width()/w);//获取列数
	$('main').width(w*cols).css('margin','0','auto');
	var hArr = [];
	$boxs.each(function(index,value){
		var h=$boxs.eq(index).outerHeight();//找到index下标的然后获取他的高
		if(index<cols){
			hArr[index] = h;
		}else{
			var minH = Math.mim.apply(null,hArr);
			var minHIndex = $.inArray(minH,hArr);		
			$(value).css({
				'postion': 'absolute',
				'top': minH+'px',
				'left':minHIndex*w+'px'
			});
			hArr[minHIndex]+=$boxs.eq(index).outerHeight()

		}
	})
	console.log(hArr);


}