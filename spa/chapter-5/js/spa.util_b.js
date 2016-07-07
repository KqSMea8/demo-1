/**
 * spa.util_b.js
 * javascript browser utilities
 */

spa.util_b = (function  () {
	'use strict';

	//--------begin module scope variables
	var configMap = {

		//使用configMap来保存模块的配置
		regex_encode_html: /[&"'><]/g,
		regex_encode_noamp: /["'><]/g,
		html_encode_map: {
			'&': '&#38',
			'"': '&#34',
			"'": '&#39',
			'>': '&#62',
			'<': '&#60;'
		}
	},

		decodeHtml, encodeHtml, getEmsize;

		configMap.encode_noamp_map = $.extend({}, configMap.html_encode_map);

		delete configMap.encode_noamp_map['&'];

		//being decodeHtml
		decodeHtml = function  (str) {
			return $('<div/>').html(str || '').text();
		}

		//begin encodeHtml
		encodeHtml = function  (input_arg_str, exclude_amp) {
			var input_str = String(input_arg_str),
				regex, lookup_map;

			if(exclude_amp) {
				lookup_map = configMap.encode_noamp_map;
				regex = configMap.regext_encode_noamp;
			}else {
				lookup_map = configMap.html_encode_map;
				regex = configMap.regex_encode_html;
			}

			return input_str.replace(regex, function  (match, name) {
				return lookup_map[match] || '';
			})

		}

		//begin getEmsize
		getEmsize = function  (elem) {
			return Number(
				getComputedStyle(elem, '').fontSize.match(/\d*\.?\d*/)[0]
			);
		}

		//export methods
		return {
			decodeHtml: decodeHtml,
			encodeHtml: encodeHtml,
			getEmsize: getEmsize
		}
}())