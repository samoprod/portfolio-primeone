//@prepros-append libs/forms.js

var isMobile = {Android: function() {return navigator.userAgent.match(/Android/i);},BlackBerry: function() {return navigator.userAgent.match(/BlackBerry/i);},iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},Opera: function() {return navigator.userAgent.match(/Opera Mini/i);},Windows: function() {return navigator.userAgent.match(/IEMobile/i);},any: function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());}};
if(isMobile.any()){}

	if(location.hash){
		var hsh=location.hash.replace('#','');
		if($('.popup-'+hsh).length>0){
			
		}else if($('div.'+hsh).length>0){
			$('body,html').animate({scrollTop:$('div.'+hsh).offset().top,},500, function(){});
		}
	}
	$('.wrapper').addClass('loaded');

	var act="click";
	if(isMobile.iOS()){
		var act="touchstart";
	}


//POPUP
$('.pl').click(function(event) {
	var pl=$(this).attr('href').replace('#','');
	var v=$(this).data('vid');
	popupOpen(pl,v);
	return false;
});
function popupOpen(pl,v){
	console.log(pl);
	$('.popup').removeClass('active').hide();
	if(!$('.header-menu').hasClass('active')){
		$('body').data('scroll',$(window).scrollTop());
	}
	if(!isMobile.any()){
		$('body').css({paddingRight:$(window).outerWidth()-$('.wrapper').outerWidth()}).addClass('lock');
		$('.pdb').css({paddingRight:$(window).outerWidth()-$('.wrapper').outerWidth()});
	}else{
		setTimeout(function() {
			$('body').addClass('lock');
		},300);
	}
	history.pushState('', '', '#'+pl);
	if(v!='' && v!=null){
		$('.popup-'+pl+' .popup-video__value').html('<iframe src="https://www.youtube.com/embed/'+v+'?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>');
	}
	$('.popup-'+pl).fadeIn(300).delay(300).addClass('active');

	if($('.popup-'+pl).find('.slick-slider').length>0){
		$('.popup-'+pl).find('.slick-slider').slick('setPosition');
	}
}
function openPopupById(popup_id){
	$('#'+popup_id).fadeIn(300).delay(300).addClass('active');
}
function popupClose(){
	$('.popup').removeClass('active').fadeOut(300);
	if(!$('.header-menu').hasClass('active')){
		if(!isMobile.any()){
			setTimeout(function() {
				$('body').css({paddingRight:0});
				$('.pdb').css({paddingRight:0});
			},200);
			setTimeout(function() {
				$('body').removeClass('lock');
				$('body,html').scrollTop(parseInt($('body').data('scroll')));
			},200);
		}else{
			$('body').removeClass('lock');
			$('body,html').scrollTop(parseInt($('body').data('scroll')));
		}
	}
	$('.popup-video__value').html('');

	history.pushState('', '', window.location.href.split('#')[0]);
}
$('.popup-close,.popup__close').click(function(event) {
	popupClose();
	return false;
});
$('.popup').click(function(e) {
	if (!$(e.target).is(".popup>.popup-table>.cell *") || $(e.target).is(".popup-close") || $(e.target).is(".popup__close")) {
		popupClose();
		return false;
	}
});
$(document).on('keydown',function(e) {
	if(e.which==27){
		popupClose();
	}
});

(function($){

	function ibg(){
		$.each($('.ibg'), function(index, val) {
			if($(this).find('img').length>0){
				$(this).css('background-image','url("'+$(this).find('img').attr('src')+'")');
			}
		});
	}

	$(document).ready(function(){

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