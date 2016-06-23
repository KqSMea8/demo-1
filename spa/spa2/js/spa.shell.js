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

		char_extend_time: 1000, //根据需求1：‘开发人员能够配置
				                        //滑块的速度和高度’
				                        //在配置映射中保存起来和展开间的高度
		char_retract_time: 300,
		chat_extend_height: 450,
		chat_retract_height: 15
	},

	stateMap = {$container: null},  //放整个模块中共享的动态信息
	jqueryMap = {},  //将jquery集合缓存在jqueryMap中               

	setJqueryMap, toggleChat, initModule; //声明作用域中的变量
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
					if (callback) {
						callback(jqueryMap.$chat);
					}
				})
		    return true;
	};

	//Begin public method initModule
	initModule = function  ($container) {  //将公共方法放在“public Methods”
		stateMap.$container = $container;
		$container.html(configMap.main_html);
		setJqueryMap();		

		//创建测试代码，以便确保滑块功能正常，
		//在页面加载完成5s后展开滑块，过8秒后收起滑块
		setTimeout(function  () {
			toggleChat(true, function  () {
				// alert(1)
			});
		}, 3000);

		setTimeout(function  () {
			toggleChat(false, function  () {
				// alert(2)
			});
		}, 8000);
	}

	return {initModule: initModule}

}());

