/**
 * spa.fake.js
 * Fake.module
 */

spa.fake = (function  () {
	'use strict';
	var peopleList, getPeopleList, fakeIdSerial, makeFakeId, mockSio;

	fakeIdSerial = 5;

	makeFakeId = function  () {
		return 'id_' + String(fakeIdSerial++);
	};

	peopleList = [
	{ name: 'Betty', _id: 'id_01', css_map: {top: 20, left: 20, 'background-color': 'rgb(128, 128, 128)'}

	},{
		name: 'Mike', _id: 'id_02', css_map: {top: 60, left: 20, 'background-color': 'rgb(128, 192, 128)'}
	},{
		name: 'Pebbles', _id: 'id_o3', css_map: {top: 140, left: 20, 'background-color': 'rgb(192, 128, 128)'}
	}];



	getPeopleList = function  () {
		return [
			{ name: 'Betty', _id: 'id_01',
			  css_map: {tip: 20, left: 20,
			  	'background-color': 'rgb(128, 128, 128)'
			   }
			},
			{name: 'Mike', _id: 'id_02',
			   css_map: {top: 60, left: 20,
			       'background-color': 'rgb(128, 255, 128)'
			    }
			},
			{name: 'Pebbles', _id: 'id_03',
				css_map: {top: 100, left: 20,
				    'background-color': 'rgb(128, 192, 192)'
				}
			},
			{name: 'Wilma', _id: 'id_04',
			css_map: {top: 140, left: 20, 
				'background-color': 'rgb(192, 128, 128)'
			 }
		    }
		]
	};

	mockSio = (function  () {
		var on_sio, emit_sio, emit_mock_msg,
		 send_listchange, listchange_idto, callback_map = {};

		on_sio = function  (msg_type, callback) {
			callback_map[msg_type] = callback;
		}

		emit_sio = function  (msg_type, data) {
			
			var person_map;			
			if (msg_type === 'adduser' && callback_map.userupdate) {
				setTimeout(function  () {
					person_map = {
						_id: makeFakeId(),
						name: data.name,
						css_map: data.css_map
					};
					peopleList.push(person_map);
					callback_map.uperupdate([person_map]);
				}, 3000);
			}
	

			if (msg_type === 'updatechat' && callback_map.updatechat) {
				setTimeout(function  () {
					var user = spa.model.people.get_user();
					callback_map.updatechat([{
						dest_id: user.id,
						dest_name: user.name,
						sender_id: data.dest_id,
						msg_text: 'Thanks for the note ,' + user.name
					}])
				}, 2000);
			}

			/**
			 * 如果接收到leavechat消息，则清楚chat使用的回调函数，这意味着用户已经登出
			 */
			if (msg_type === 'leavechat') {
				delete callback_map.listchange;
				delete callback_map.updatechat;

				if (listchange_idto) {
					clearTimeout(listchange_idto);
					listchange_idto = undefined;
				}

				send_listchange();
			}
		};

		/**
		 * 每隔8秒钟，给已登入的用户发送模拟消息，当设置了updatechat回调函数时，
		 * 仅当有用户登入才会成功，
		 * 成功时，程序就不再调用自身，因此不会再尝试发送模拟消息
		 */
		emit_mock_msg = function  () {
			setTimeout(function  () {
				var user = spa.model.people.get_user();
				if (callback_map.updatechat) {
					callback_map.updatechat([{
						dest_id: user_id,
						dest_name: user.name,
						sender_id: 'id_04',
						msg_text: 'Hi there '+ user.name + '!wilma here'
					}])
				}else {
					emit_mock_msg();
				}
			}, 8000);
		}


		/**
		 * 添加send_listchange函数，模拟接收来自后端的listchange消息，每隔一秒，该
		 * 方法会查找listchange回调函数（仅在用户登入并加入聊天室之后，chat对对象才会注册这个回调函数），
		 * 如果找到了回调函数，参数是模拟的peoplelist,send_listchange函数会停止轮询。
		 */
		send_listchange = function  () {
			listchange_idto = setTimeout(function  () {
				if (callback_map.listchange) {
					callback_map.listchange([peopleList]);
					emit_mock_msg(); //在用户登入后，开始发送模拟消息
					listchange_idto = undefined;
				}else {
					send_listchange();
				}
			}, 1000);
		}

		send_listchange(); 


		return {
			emit: emit_sio, 
			on: on_sio
		}
	}())

	return {
		mockSio: mockSio
	};
}());