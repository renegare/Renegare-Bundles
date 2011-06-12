/*!
 * jQuery Symfony 2 Form Plugin 1.0.0
 * Requires jQuery 1.x
 * https://github.com/renegare/JQuery-Symfony2-Form-Plugin
 *
 * Copyright Software Freedom Conservancy, Inc.
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */

(function($){

	var defaults = {
		'error_template_id': 'errorTemplateList',
		'error_css_selector': '.errors',
		'field_css_selector': '.field',
		'collection_field_css_selector': '.collection-field',
		'widget_css_selector': '.widget',
		'previous_button_css_selector': '.previous',
		'next_button_css_selector': '.next',
		'save_button_css_selector': '.save',
		'cancel_button_css_selector': '.cancel',
		'add_button_css_selector': '.add-item',
		'delete_button_css_selector': '.delete-item',
		'prototype_place_holder': '$$name$$',
		'prototype_place_holder_escape_chars': '$',
		'prototype_place_holder_replace_attr': ['id','class','name','for', 'data-bind'],
		'enable_form_index': 'symfony2form_enable_form_index',
		'parent_indexes': 'symfony2form_parent_indexes',
		'previous_callback': function(){ return false; },
		'next_callback': function(){ return false; },
		'save_callback': function(){ return false; },
		'cancel_callback': function(){ return false; }
	};
	
	var methods = {
		init: function(options){
			options = $.extend({}, defaults, options);
			this.data('symfony2form_vars', options);
			$.symfony2form.enableButtons(this, options);
			$.symfony2form.enableNavButtons(this, options);
			return this;
		},
		display_errors: function(errors){
			var options = this.data('symfony2form_vars');
			this.symfony2form('clear_errors');
			for(key in errors){
				// may be an animation?
				$('#'+key, this).html( $('#'+options.error_template_id).tmpl(errors[key]) );
			}
		},
		clear_errors: function(){
			var options = this.data('symfony2form_vars');
			$(options.error_css_selector, this).empty();
		}
	}
	$.fn.symfony2form = function(method){
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist.' );
		}  
		return this;
	};
	
	$.symfony2form = {};
	
	$.symfony2form['enableNavButtons'] = function($root, options){
		
		
		$(options.next_button_css_selector, $root).click(function(e){
			return options.next_callback(e, $root);
		});
		
		$(options.previous_button_css_selector, $root).click(function(e){
			return options.previous_callback(e, $root);
		});
		$(options.save_button_css_selector, $root).click(function(e){
			return options.save_callback(e, $root);
		});
		$(options.cancel_button_css_selector, $root).click(function(e){
			return options.cancel_callback(e, $root);
		});
		
		return $root;
	};
	
	$.symfony2form['enableAddButtons'] = function($root, options){
		$(options.add_button_css_selector, $root).click(function(){
			var $widget = $(this).parents(options.field_css_selector+':first').find(options.widget_css_selector+':first');
			var $new_row = $widget.find('.prototype:first').tmpl().appendTo( $widget.find(':first') );		
			
			$.symfony2form.replaceIndexPlaceholder( $new_row, $widget.find(':first'), options );
			$.symfony2form.enableButtons( $new_row, options);
			return false;
		});
		return $root;
	};
	
	$.symfony2form['enableDeleteButtons'] = function($root, options){
		$(options.delete_button_css_selector, $root).click(function(){
			$(this).parents(options.field_css_selector+':first').remove();
			return false;
		});
		return $root;
	};
	
	$.symfony2form['enableButtons'] = function($root, options){
		this.enableDeleteButtons($root, options);
		this.enableAddButtons($root, options);
		return $root;
	};
	
	$.symfony2form['replaceIndexPlaceholder'] = function($item, $parent, options){
//		var options = $($parent).data('symfony2form_vars');
		if(!$parent.data(options.enable_form_index)){
			$parent.data(options.enable_form_index, 0);
		}
		if(!$parent.data(options.parent_indexes)){
			$parent.data(options.parent_indexes, []);
		}
		
		var index = $parent.data(options.enable_form_index) +1;
		var parent_indexes = $parent.data(options.parent_indexes).slice();
		
		parent_indexes.push(index);
		
		var replace_keyword = options.prototype_place_holder_escape_chars && $.addslashes? $.addslashes(options.prototype_place_holder, options.prototype_place_holder_escape_chars) : options.prototype_place_holder;
		var attr_to_change = options.prototype_place_holder_replace_attr;
		
		var $pattern = new RegExp(replace_keyword);
		
		
		$item.find('['+attr_to_change.join('],*[')+']').andSelf().each(function(){
			$this = $(this);
			for(key in attr_to_change){
				var attr = attr_to_change[key];
				if($this.hasAttr(attr)){
					$(parent_indexes).each(function(){
						$this.attr( attr,  $this.attr(attr).replace($pattern, this) );
					});
				}
			}
		});
		
		$parent.data(options.enable_form_index,index);
		
		
		var $next_parent = $item.find(options.collection_field_css_selector+' '+options.widget_css_selector+':first > :first')
		if($next_parent.size()){
			$next_parent.data(options.parent_indexes,parent_indexes);
		} else {
//			console.log(parent_indexes);
		}
		
		return $item;
	};
	
	
})(jQuery);