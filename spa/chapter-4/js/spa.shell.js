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

		//定义uriAnchor使用的映射用于验证
		anchor_schema_map: {
			chat: {opened: true, closed: true}
		},

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
				'<div class="spa-shell-modal"></div>',

		// char_extend_time: 250, //根据需求1：‘开发人员能够配置
		// 		                        //滑块的速度和高度’
		// 		                        //在配置映射中保存起来和展开间的高度
		// char_retract_time: 300,
		// chat_extend_height: 450,
		// chat_retract_height: 15,
		// chat_extended_title: 'click to retract',  //设置提示信息文字用户操作
		// chat_retracted_title: 'click to extend'
	},


	stateMap = {
		// $container: null,
		anchor_map: {},
		// is_chat_retracted: true//列出所有会用到的键，容易查找和查看
		                      
	},  //放整个模块中共享的动态信息
	   
	jqueryMap = {},  //将jquery集合缓存在jqueryMap中               

	copyAnchorMap, changeAnchorPart, onHashchange,
	setJqueryMap, onClickChat, 
	setChatAnchor, initModule; //声明作用域中的变量
	                                                   
	//returns copy of stored anchor map; minimizes overhead
	copyAnchorMap = function  () {
		return $.extend(true, {}, stateMap.anchor_map);
	}	         

	setJqueryMap = function  () {
		var $container = stateMap.$container;
		jqueryMap = {$container: $container};
	}
	                                                   
	changeAnchorPart = function  (arg_map) {
		var anchor_map_revise = copyAnchorMap(),
			bool_return = true,
			key_name, key_name_dep;

			//begin merge change into anchor map 
		KEYVAL:
		for (key_name in arg_map) {
			if (arg_map.hasOwnProperty(key_name)) {

				//skip dependent keys during iteration
				if (key_name.indexOf('_') === 0) {
					continue KEYVAL;
				}

				//update independent key value
				anchor_map_revise[key_name] = arg_map[key_name];

				//update matching dependent key
				key_name_dep = '_' + key_name;
				if (arg_map[key_name_dep]) {
					anchor_map_revise[key_name_dep] = arg_map[key_name_dep];
				}else {
					delete anchor_map_revise[key_name_dep];
					delete anchor_map_revise['s' + key_name_dep];
				}

			}
		}

		//begin attempt to update URI, revert if not successful
		try {
			$.uriAnchor.setAnchor(anchor_map_revise);
		}catch(error) {

			//replace uri with existing state
			$.uriAnchor.setAnchor(stateMap.anchor_map, null, true);
			bool_return = false;
		}

		return bool_return;
			
	}	                                                  
	                                                  
	onHashchange = function  (event) {
		var _s_chat_previous, _s_chat_proposed, s_chat_proposed,
		    anchor_map_proposed,
		    is_ok = true,
		    anchor_map_previous = copyAnchorMap();

		    //attempe to parse anchor
		    try {
		    	anchor_map_proposed = $.uriAnchor.makeAnchorMap();
		    }catch (error) {
		    	$.uriAnchor.setAnchor(anchor_map_previous, null, true);
		    	return false;
		    }	

		    stateMap.anchor_map = anchor_map_proposed;

		    //convenience vars
		    _s_chat_previous = anchor_map_previous._s_chat;
		    _s_chat_proposed = anchor_map_proposed._s_chat;

		    //begin adjust chat component if changed
		    if (!anchor_map_previous ||
		    	 _s_chat_previous !== _s_chat_proposed) {
		    	s_chat_proposed = anchor_map_proposed.chat;
		   		switch(s_chat_proposed) {
		   			case 'opened':
		   				is_ok = spa.chat.setSliderPosition('opened');
		   			break;
		   			case 'closed':
		   				is_ok = spa.chat.setSliderPosition('closed');  
		   			break;
		   			default:
		   				spa.chat.setSliderPosition('closed');
		   				delete anchor_map_proposed.chat;
		   				$.uriAnchor.setAnchor(anchor_map_proposed, null, true);
		   		}
		    }

		    if (!is_ok) {
		    	if (anchor_map_previous) {
		    		$.uriAnchor.setAnchor(anchor_map_previous, null, true);
		    		stateMap.anchor_map = anchor_map_previous;
		    	} else {
		    		delete anchor_map_proposed.chat;
		    		$.uriAnchor.setAnchor(anchor_map_proposed, null, true);
		    	}
		    }

		    return false;
	}


	setChatAnchor = function  (position_type) {
		return changeAnchorPart({chat: position_type});
	}


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
		changeAnchorPart({
			chat: (stateMap.is_chat_retracted ? 'open' : 'closed')
	    });

	    return false;
	}


	//Begin public method initModule
	initModule = function  ($container) {  //将公共方法放在“public Methods”
		
		stateMap.$container = $container;
		$container.html(configMap.main_html);
		setJqueryMap();		

		//initialize chat slider and bind click handler
		// stateMap.is_chat_retracted = true;
		// jqueryMap.$chat
		// 	.attr('title', configMap.chat_retract_title)
		// 	.click(onClickChat);

			
		//configure uriAnchor to use our schema
		$.uriAnchor.configModule({   //配置uriAnchor插件，用于检测模式（schema）
			set_chat_anchor: setChatAnchor,
			chat_model: spa.model.chat,
			people_model: spa.model.people
		});

		//configure and initialize feature modules
		// spa.chat.configModule({});
		spa.chat.initModule(jqueryMap.$container);




		//绑定hashchange事件处理程序并立即触发它，这样模块在初始加载时就会处理书签
		$(window) 
			.bind('hashchange', onHashchange)
			.trigger('hashchange');
	}

	return {initModule: initModule}

}());

