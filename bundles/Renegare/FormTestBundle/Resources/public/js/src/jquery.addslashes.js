/*!
 * jQuery Add Slashes Plugin 1.0.0
 * Requires jQuery 1.x
 * https://github.com/renegare/JQuery-addSlashes-Plugin
 *
 * Copyright Software Freedom Conservancy, Inc.
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */


(function($) {
	$.addslashes = function (str, extra_chars) {
			var special_chars = ["'",'"','\\', '0']
			if(extra_chars){
				if(typeof(extra_chars) === 'string') extra_chars = extra_chars.split('');
				if(typeof(extra_chars) === 'object'){
					for(key in extra_chars){
						special_chars.push(extra_chars[key]);
					}
				}
			}
			
			for(key in special_chars){
				str = str.replace(new RegExp('\\'+special_chars[key],'g'),'\\'+special_chars[key]);
			}
			
			return str;
	};
})(jQuery);