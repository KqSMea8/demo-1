/**
 * spa.shell.js
 * Shell module for SPA
 */

/*jslint 		browser: true, continue: true,
  devel: true,  indent: 2, maxerr: 50,
  newcap: true, nomen: true, plusplus: true,
  regext: true, sloppy: true, vars: false,
  white: true
 */

/** gloal $, spa */
spa.shell = (function  () {
	//----------------------BEGIN MODULE SCOPE VARIABLES-------
	var configMap = {
		main_html : String()+'<div class="spa-shell-head">'+
		          '<div class="spa-shell-head-logo"></div>'+
				'<div class="spa-shell-head-acct"></div>'+
				'<div class="spa-shell-head-search"></div>'+
				'</div>'+
				'<div class="spa-shell-main">'+
				'<div class="spa-shell-main-nav"></div>'+
				'<div class="spa-shell-main-content"></div>'+
				'</div>'+
				'<div class="spa-shell-foot"></div>'+
				'<div class="spa-shell-chat"></div>'+
				'<div class="spa-shell-modal"></div>',

		char_extend_time: 250, //根据需求1：‘开发人员能够配置
				                        //滑块的速度和高度’
				                        //在配置映射中保存起来和展开间的高度
		char_retract_time: 300,
		chat_extend_height: 450,
		chat_retract_height: 15,
		chat_extended_title: 'click to retract',  //设置提示信息文字用户操作
		chat_retracted_title: 'click to extend'
	},

	stateMap = {
		$container: null,
		is_chat_retracted: true//列出所有会用到的键，容易查找和查看
		                      
	},  //放整个模块中共享的动态信息
	   
	jqueryMap = {},  //将jquery集合缓存在jqueryMap中               

	setJqueryMap, toggleChat, onClickChat, initModule; //声明作用域中的变量
	                                                  
	//Begin DOM method 
	setJqueryMap = function  () {
		var $container = stateMap.$container;
		jqueryMap = {
		    $container: $container,
		    $chat: $container.find('.spa-shell-chat')
		}; //使用setJquerMap来缓存jquery集合，几乎我们
		                                      //每个shell和功能
	};

	//begin DOM method /toogleChat
	toggleChat = function  (do_extend, callback) {
		var px_chat_ht = jqueryMap.$chat.height(),
			is_open = px_chat_ht === configMap.chat_extend_height,
			is_closed = px_chat_ht === configMap.chat_retract_height,
			is_sliding = ! is_open && ! is_closed;

			//avoid race condition
			if (is_sliding) {
				return false;
			}

			//Begin extend chat slider
			if(do_extend) {
				jqueryMap.$chat.animate(
				{
					height: configMap.chat_extend_height
				}, configMap.chat_extend_time, function  () {
					jqueryMap.$chat.attr('title', configMap.chat_extended_title);
					stateMap.is_chat_retracted = false;
					if (callback) {
						callback(jqueryMap.$chat);
					}
				})
				return true;
			}

			//end extend chat slider
			jqueryMap.$chat.animate(
				{height: configMap.chat_retract_height},
				configMap.chat_retract_time,
				function  () {
					jqueryMap.$chat.attr(
						'title', configMap.chat_retract_title
					);
					stateMap.is_chat_retracted = true;
					if (callback) {
						callback(jqueryMap.$chat);
					}
				})
		    return true;
	};

	//bengin event handlers
	onClickChat = function  (event) {
		toggleChat(stateMap.is_chat_retracted); //添加点击事件处理程序来调用togglechat
		return false;
	}


	//Begin public method initModule
	initModule = function  ($container) {  //将公共方法放在“public Methods”
		stateMap.$container = $container;
		$container.html(configMap.main_html);
		setJqueryMap();		

		//initialize chat slider and bind click handler
		stateMap.is_chat_retracted = true;
		jqueryMap.$chat
			.attr('title', configMap.chat_retract_title)
			.click(onClickChat);
	}

	return {initModule: initModule}

}());

