(function($){
	$.fn.hasAttr = function(name) {  
			return this.attr(name) !== undefined;
	};
})(jQuery);