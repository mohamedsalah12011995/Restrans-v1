/*jslint browser: true*/
/*global $, jQuery, alert*/
$(document).ready(function () {
	
	'use strict';
	
	// Nice Scroll
	$('').niceScroll();
	$('.repCustTabel').niceScroll();
	$('.listItm').niceScroll();
	$('.repInvTable').niceScroll();
	$('.ulMenu').niceScroll();
	$('.invTable').niceScroll();
	$('.invCat').niceScroll();
	$('.invItem').niceScroll();
	
	// Start Code Menu
	$('#searchMenu').click(function () {
		$('#formSearchMenu').fadeIn(500);
		$('#formSearchMenu input').focus();
		$('#searchMenu').hide(500);
	});
	$('#closeSearch').click(function () {
		$('#formSearchMenu').fadeOut(500);
		$('#searchMenu').show(500);
	});
	
	$('#toggleMenu').click(function () {
      if ($('.sidebarMenu').css('display') === "none") {
        $('.chart').animate({
				width: '84.44%',
				marginRight: '16.66%'
			});
		} else {
        $('.chart').animate({
				width: '100%',
				marginRight: '0px'
			});
		}
	});
});
