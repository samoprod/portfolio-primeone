(function($){

	function ibg(){
		$.each($('.ibg'), function(index, val) {
			if($(this).find('img').length>0){
				$(this).css('background-image','url("'+$(this).find('img').attr('src')+'")');
			}
		});
	}

	$(document).ready(function(){
		var isMobile = {Android: function() {return navigator.userAgent.match(/Android/i);},BlackBerry: function() {return navigator.userAgent.match(/BlackBerry/i);},iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},Opera: function() {return navigator.userAgent.match(/Opera Mini/i);},Windows: function() {return navigator.userAgent.match(/IEMobile/i);},any: function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());}};
		if(isMobile.any()){}

			if(location.hash){
				var hsh=location.hash.replace('#','');
				if($('.popup-'+hsh).length>0){
				// Open Popup
			}else if($('div.'+hsh).length>0){
				$('body,html').animate({scrollTop:$('div.'+hsh).offset().top,},500, function(){});
			}
		}
		$('.wrapper').addClass('loaded');

		var act="click";
		if(isMobile.iOS()){
			var act="touchstart";
		}

		$('.header-menu__icon').click(function(event) {
			$(this).toggleClass('active');
			if($(this).hasClass('active')){
				$('body').data('scroll',$(window).scrollTop());
			}
			$('body').toggleClass('lock');
			$('.header-menu').eq(0).toggleClass('active');
			if(!$(this).hasClass('active')){
				$('body,html').scrollTop(parseInt($('body').data('scroll')));
			}
		});

		//ZOOM
		if($('.gallery').length>0){
			baguetteBox.run('.gallery', {
				// Custom options
			});
		}

		ibg();

		//UP
		$(window).scroll(function() {
			var w=$(window).width();
			if($(window).scrollTop()>150){
				$('#up').stop().fadeIn(300);
			}else{
				$('#up').stop().fadeOut(300);
			}
		});

		$('#up').click(function(event) {
			$('body,html').animate({scrollTop:0},300);
		});

		$('.header-menu__list').eq(0).after($('.header-menu__list').eq(1).clone());
		$('.header-menu').eq(0).prepend($('.header-lang').clone());
		$('.header-menu').eq(0).addClass("mobile-menu");

		if($('input, textarea').length > 0){
			console.log($('input, textarea'));
			$('input, textarea').each(function(){
				$(this).attr("placeholder", $(this).data('value'));
				var that = $(this);
				$(this).focus(function(){
					that.attr("placeholder", "");
				});
				$(this).focusout(function(){
					that.attr("placeholder", that.data('value'));
				});
			});
		}

	});

})(jQuery);
