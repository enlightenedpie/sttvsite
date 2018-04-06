/*
 * 
 * MAIN SITE OBJECT
 * 
 */
var _st = {
	request : function(obj) {
		var ajaxp = {
			url: obj.route || '',
			method: obj.method || 'GET',
			headers: obj.headers || {},
			processData : false,
			dataType : obj.dataType || 'json',
			success: function(data){
				typeof obj.success !== 'undefined' && obj.success(data);
			},
			error: function(x,s,r){
				typeof obj.error !== 'undefined' && obj.error([x,s,r]);
			}
		}
		if (ajaxp.method !== 'GET') {
			ajaxp['data'] = JSON.stringify(obj.cdata || {})
		}
		if (typeof obj.accepts !== 'undefined'){
			ajaxp['accepts'] = obj.accepts
		}
		$.ajax(ajaxp)
	},
	menu : function(cb) {
		$('body').toggleClass('nav-sidebar-open')
		typeof cb === 'function' && cb();
	},
	closer : function(cb) {
		jQuery('body').removeClass('nav-sidebar-open login-sidebar-open');
		typeof cb === 'function' && cb();
	},
	heartBeat : function() {
		_st.request({
			route : stajax.rootURL+"/ping.php",
			success : function(d){
				try {
					if (!d) {
						throw new Exception('Invalid response from _st.heartBeat.');
					} else {
						do {
							$(document).dequeue('heartbeat')
						} while ($(document).queue('heartbeat').length)
					}
				} catch (e) {
					console.log(e);
				}
			},
			error : function(x,s,r){
				Materialize.toast('Offline', 6000);
				console.log(x,s,r);
			}
		});
	},
	login : function(el) {
		_st.request({
			route : stajax.rest.url+'/auth',
			headers : {
				'X-WP-Nonce' : stajax.rest.nonce,
			},
			success : function(d) {
				el.append(d)
				_st.modal.loader()
			},
			error : function(x) {
				console.log(x)
			}
		})
	},
	modal : (function() {
		$('.loading-spinner').each(function(i){
			$(this).attr('src',stajax.contentURL+'/i/sttv-spinner.gif')
		})
		return {
			action : '',
			element : $('.sttvmodal_inner'),
			init : function(act){
				if (typeof act === 'undefined'){
					return
				}
				if (this.action === act) {
					return this.toggle()
				}
				
				var cb;
				if (act !== 'close') {
					this.action = act
					_st.modal.loader(function() {
						_st.modal.element.empty()
					})
				}
	
				switch (act) {
					case 'close':
						break
					case 'login':
						cb = function(el) {
							_st.login(el)
						}
						break
					case 'account':
						cb = function(el) {
							//el.empty()
							el.append('account template')
							_st.modal.loader()
						}
						break
					case 'mu-checkout':
						cb = function(el) {
							_st.mu.submit(el,'#mu_form_wrapper')
						}
						break
					case 'checkout':
						break
				}
				this.toggle(cb)
			},
			toggle : function(cb) {
				$('body').toggleClass('modal-open')
				typeof cb === 'function' && cb(_st.modal.element)
			},
			loader : function(cb) {
				$('#sttvmodal').toggleClass('loader-active')
				typeof cb === 'function' && cb(_st.modal.element)
			}
		}
	})(),
	cart : (function(){
		if ( stajax.type === 'courses' ) {
			return false
		}
		var cartObj = JSON.parse(localStorage.getItem('_stcart_'))
		var initDate = Date.now()
		if ( cartObj === null || (cartObj.ID / 1000 | 0) + (30) < initDate / 1000 | 0 ) {
			cartObj = {
				ID : initDate,
				signature : btoa(navigator.userAgent+'|'+navigator.platform+'|'+navigator.product).replace(/=/g,''),
				items : {}
			}
		}

		for ( var key in cartObj.items ) {
			var obj = cartObj.items[key]
			if ( obj.type === 'multi-user' ) {
				delete cartObj.items[key]
			}
		}

		var currentCount = Object.keys(cartObj.items).length
	
		var fabWrap = $('<div/>',{id:'cart-FAB'}),
			fab = $('<a/>',{"class":'cart-fab btn-floating btn-large z-depth-5'}),
			fabCon = $('<i/>',{"class":'material-icons',text:'shopping_cart'}),
			fabAlert = $('<div/>',{"class":'cart-alert circle z-depth-2'})
	
		$('body').addClass('sttv-jscart')
	
		fabWrap.append(
			fabAlert.text(currentCount)
		).append(
			fab.append(fabCon)
		).appendTo(document.body)

		if ( currentCount > 0 ) {
			fabAlert.addClass('show').siblings('.cart-fab').addClass('pulse')
		}

		localStorage.setItem('_stcart_',JSON.stringify(cartObj))
	
		return {
			cartObj : cartObj,
			add : function add(item,skipUpdate) {
				skipUpdate = skipUpdate || false
				if ( typeof item !== 'object' ) {
					return false
				}
				var cart = this.cartObj.items,
					msg = ''
	
				if ( typeof cart[item.id] === 'undefined' ) {
					cart[item.id] = item
					msg = 'Item added'
				} else {
					cart[item.id].qty += item.qty
					msg = 'Quantity updated'
				}
	
				this.save(skipUpdate)
				return msg
			},
			remove : function(item,skipUpdate) {
				skipUpdate = skipUpdate || false
				if (typeof item !== 'string' ){
					return false
				}
				delete this.cartObj.items[item]
				return this.save(skipUpdate)
			},
			empty : function(cb) {
				this.cartObj.items = {}
				this.save()
				return typeof cb === 'function' && cb(this)
			},
			save : function(skip) {
				localStorage.setItem('_stcart_',JSON.stringify(this.cartObj))
				return !skip && this.notifications.update()
			},
			get : function() {
				return this.cartObj.items
			},
			notifications : {
				count : currentCount,
				element : fabAlert,
				update : function() {
					this.count = Object.keys(_st.cart.cartObj.items).length
					if ( this.count <= 0 ) {
						$('.cart-alert').removeClass('show').siblings('.cart-fab').removeClass('pulse')
					} else {
						$('.cart-alert').addClass('show').siblings('.cart-fab').addClass('pulse')
					}
					$('.cart-alert').text(this.count)
					return this.count
				}
			}
		}
	})(),
	checkout : '',
	mu : {
		formValid : false,
		disableForm : function(c) {
			$('.signup-submit',c).prop('disabled',!this.formValid)
		},
		validate : function(el,con) {
			var inputs = $('input,select',con)
			inputs.each(function(k,v){
				if ( $(this).is(':required') && ( ( $(this).val() && !$(this).hasClass('invalid') ) || $(this).hasClass('valid') ) ) {
					_st.mu.formValid = true
				} else {
					_st.mu.formValid = false
					_st.mu.disableForm(con)
					return false
				}
			})
			_st.mu.disableForm(con)
		},
		submit : function(el,con) {
			var data = {
				mukey : $('input[name=mukey]',con).val(),
				email : $('input[name=email]',con).val(),
				license : {
					id : $('select[name=sttv_course_id]',con).val(),
					title : $('select[name=sttv_course_id] option:selected',con).text(),
					qty : $('select[name=qty]',con).val()
				}
			}

			_st.request({
				route : stajax.rest.url+'/multi-user',
				method : 'POST',
				cdata : data,
				headers : {
					'X-WP-Nonce' : stajax.rest.nonce,
				},
				success : function(d) {
					_st.checkout = 'multi-user'
					_st.cart.empty(function(t) {
						t.add(d.data,true)
					})
					el.append(d.html)
					_st.modal.loader()
					console.log(d)
				},
				error : function(x) {
					var d = x[0].responseJSON

					$('.message',con).text(d.message)
					_st.modal.toggle(function() {
						_st.modal.loader()
					})
					console.log(d)
				}
			})
		}
	},
	fn : function() {}
};


/*
 * 
 * EVENT HANDLERS
 * 
 */
( function ( $ ) { //begin wrapper
	"use strict";

// Opener functions

$('input, select','#mu_form_wrapper').on('change',function(e){
	_st.mu.validate(this,'#mu_form_wrapper')
	_st.modal.action = ''
})

var selectors = '.slide-bar, .modal-toggle, .read-more, .mu-submitter, .cart-fab'
$(document).on('click touchstart',selectors,function(e) {
	e.preventDefault();
	var t = $(this);
	//var s = e.handleObj.selector.split(/,\s+/);
	var c = t.attr('class').split(/\s+/);

	var f = {
		'modal-toggle' : function() {
			_st.modal.init(t.attr('data-action'));
		},
		'slide-bar' : function() {
			_st.menu()
		},
		'read-more' : function() {
			t.parent().css({'display':'none'});
			$('#content-wrapper').css({'max-height':'none'});
		},
		'mu-submitter' : function() {
			_st.modal.init('mu-checkout')
		},
		'cart-fab' : function() {

		}
	}

	c.some(function(v){typeof f[v] !== 'undefined' && f[v]()});
});
	
var thenav = $('body.nav-sidebar-open #main-nav');
thenav.on('click touchstart',function(e) {
	if (e.offsetX > thenav.offsetWidth) {
		alert('Clicked!');
		e.preventDefault();
		_st.closer();
	}
});

$('li.menu-item-has-children>a').click(function(e) {
	e.preventDefault();
	$(this).siblings('ul.sub-menu').toggleClass('active').promise().done(function(){
		$('ul.sub-menu').not(this).removeClass('active');
	});
});

$(document).on('submit','form#sttv_login_form',function(e) {
	e.preventDefault();
	if (0 === $('#sttv_user').val().length){
		$('.message').html('Username is required')
		return;
	}

	var loader = '<img src="'+stajax.contentURL+'/i/sttv-spinner.gif" alt="Loading..." />',
		ld = $('.loading_overlay');
	ld.append(loader).promise().done(function(){
		$(this).fadeIn(250);
	});

	_st.request({
		route : stajax.rest.url+'/auth?action=login',
		method : 'POST',
		headers : {
			'X-WP-Nonce' : stajax.rest.nonce,
			'X-STTV-Auth' : btoa(this.sttv_user.value+':'+this.sttv_pass.value)
		},
		success : function(data) {
			if ( data.code == 'login_success' ) {
				ld.empty().html('<p class="sblock"><strong><i class="material-icons">done</i></strong></p>').fadeIn(250)
				$('.sblock').hide().fadeIn(250)
				setTimeout(function(){
					window.location.href = data.redirect
				},250);
			}
		},
		error : function(x) {
			var data = x[0].responseJSON,
				msg = ( typeof data.errors.too_many_retries !== 'undefined') ? data.errors.too_many_retries[0] : data.message;

			$('.message').html(msg)
			ld.fadeOut(250)
			console.log(data)
		}
	})
});

$('form#sttv_contact').on('submit',function(e) {
	e.preventDefault();
	var loading = $('.loading_overlay',$(this).parent()).html('<img src="'+stajax.contentURL+'/i/sttv-spinner.gif" alt="Loading..." />')

	loading.fadeIn(250)

	_st.request({
		route : stajax.rest.url+'/contact',
		method : 'POST',
		headers : {
			'X-WP-Nonce' : stajax.rest.nonce
		},
		cdata : {
			g_recaptcha_response : grecaptcha.getResponse(),
			sttv_contact_name: this.sttv_contact_name.value,
			sttv_contact_email: this.sttv_contact_email.value,
			sttv_contact_subject: this.sttv_contact_subject.value,
			sttv_contact_message: this.sttv_contact_message.value
		},
		success : function(data) {
			console.log(data)
			if ( data.sent ) {
				loading.empty().html('<p class="sblock"><strong><i class="material-icons">done</i></strong></p>').fadeIn(250)
				var s = $('.sblock');
				var p = $('<p/>',{"class":"smessage"});
				p.appendTo(s).append(data.message);
				$('.sblock').hide().fadeIn(250)
			} else {
				$('.message').html(data.message)
				loading.fadeOut(250)
			}
		},
		error : function(x) {
			$('.message').html('Something went wrong. Please refresh the page and try again.')
			loading.fadeOut(250)
			console.log(x)
		}
	})
	
  });

	$('#subscribe_page_mc').on('submit',function(e){
		e.preventDefault();
		var form = $(this)

		var loading = $('.loading_overlay',$(this).parent()).html('<img src="'+stajax.contentURL+'/i/sttv-spinner.gif" alt="Loading..." />')

		loading.fadeIn(250)

		var fields = {
			fname : $('#sttv_mc_fname',form).val(),
			lname : $('#sttv_mc_lname',form).val(),
			email : $('#sttv_mc_email',form).val(),
			g_recaptcha_response : grecaptcha.getResponse()
		}
		
		_st.request({
			route : stajax.rest.url+'/subscribe',
			method : 'POST',
			cdata : fields,
			headers : {'X-WP-Nonce' : stajax.rest.nonce},
			success : function(d){
				$('input, button',form).prop('disabled',true)
				grecaptcha.reset()
				loading.empty().html('<p class="sblock"><strong><i class="material-icons">done</i></strong></p>').fadeIn(250)
				var s = $('.sblock');
				var p = $('<p/>',{"class":"smessage"});
				p.appendTo(s).append(d.message);
				$('.sblock').hide().fadeIn(250)
				console.log(d)
			},
			error : function(x){
				$('.message',form).html('Something went wrong. Please refresh the page and try again.')
				loading.fadeOut(250)
				console.log(x)
			}
		})
	});

} ( jQuery ) ); //end wrapper

// =require "handlers.js"
( function ( $ ) { //begin wrapper
	"use strict";
	
	$(document).ready(function() {
    	$('select').material_select();
	  });
  
  } ( jQuery ) ); //end wrapper