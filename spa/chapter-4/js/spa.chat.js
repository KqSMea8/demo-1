/**
 * spa.chat.js
 * chat feature module for spa
 */

//global $, spa
spa.chat = (function  () {  //创建该模块的命名空间spa.chat
	
	//----------------Begin Moudle scope varlables
	var configureMap = {

		//将聊天滑块的html模版保存在configMap中
		//请随意使用自己的模版开替换这条消息
		main_html: String()
			+ '<div style="padding:1em; color:#fff;">'
				+'Say hello to chat'
			+'</div>',
		settable_map: {}
	}
})