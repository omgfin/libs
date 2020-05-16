jQuery(document).ready(function(){
	jQuery('.dropdown-menu .dropdown-toggle').on('click', function(e) {
		if (!jQuery(this).next().hasClass('show')) {
			jQuery(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
		}
		jQuery(this).next(".dropdown-menu").toggleClass('show');
		return false;
	});
	//for mega menu
	jQuery('.mega-menu-title').click(function(){
		if (!jQuery(this).next().hasClass('active')) {
			jQuery('.mega-dropdown-list').removeClass('active');
			jQuery(this).next().addClass('active');
		}
		else if (jQuery(this).next().hasClass('active')) {
			jQuery(this).next().removeClass('active');
		}
		return false;
	});

	if(typeof grecaptcha != 'undefined' && grecaptcha !== void 0){
		function getRecaptcha() {
			grecaptcha.ready(function () {
				jQuery(document).find('.grecaptcha-badge').css('visibility','hidden');
				jQuery(document).find('form').find('button[type="submit"]').prop('disabled',true);
				grecaptcha.execute(variable.google_recaptcha_key, {action: 'login'}).then(function (token) {
					jQuery('input[name="recaptcha_response"]').val(token);
					jQuery(document).find('form').find('button[type="submit"]').prop('disabled',false);
				});
			});
		}
		jQuery(document).on('getRecaptcha', function(){
			if(variable.googleRecaptcha) clearInterval(variable.googleRecaptcha);
			getRecaptcha();
			variable.googleRecaptcha = setInterval(function () {
				jQuery(document).trigger('getRecaptcha');
			},100000);
		});
		jQuery(document).trigger('getRecaptcha');
	}

	function enableLoading(btn) {
		var _w = $(btn).width();
		var oldHtml = '<span class="d-none">' + btn.html() + '</span>';
		oldHtml = '<i class="fas fa-spinner fa-spin" style="width: '+_w+'px;"></i> ' + oldHtml;
		btn.html(oldHtml);
		btn.prop('disabled', true);
	}

	function disableLoading(btn) {
		btn.find('.fas.fa-spinner.fa-spin').remove();
		var oldHtml = btn.find('.d-none').html();
		btn.removeClass('.d-none');
		btn.html(oldHtml);
		btn.prop('disabled', false);
	}

	var form = jQuery('#contact-form-2');
	form.on('submit',function (e) {
		e.preventDefault();
		form.find('.alert').text('').hide();

		enableLoading(form.find('button[type="submit"]'));
		jQuery.post(form[0].action,form.serialize(), function (resp) {
			disableLoading(form.find('button[type="submit"]'));
			form.find('.alert-'+resp.statusText).text(resp.message).show();
			if(resp.statusText == 'warning'){
				jQuery(document).trigger('getRecaptcha');
			}
			if(resp.statusText == 'success'){
				form[0].reset();
			}
		},'json');
	});
});
