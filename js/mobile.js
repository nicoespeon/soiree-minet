/*
|--------------------------------------------------------------------------
| MOBILE SCRIPT
|--------------------------------------------------------------------------
|
| Mobile fallback
|
*/

$(function() {
	e = $.Event('keydown');
	
	// Simule une activation
	$('#enter').click(function() {
		e.keyCode = 13;
		$('#wrapper').trigger(e);
	});
	
	// Simule un déplacement
	$('#left').hover(function() {
		e.keyCode = 37;
		if(ETAT_ANIMATION<0)	$('#wrapper').trigger(e);
		trigger = setInterval(function() {
			if(ETAT_ANIMATION<0)	$('#wrapper').trigger(e);
		}, DUREE_DEPLACEMENT+50);
	}, function() {
		clearInterval(trigger);
	});
	
	$('#up').hover(function() {
		e.keyCode = 38;
		if(ETAT_ANIMATION<0)	$('#wrapper').trigger(e);
		trigger = setInterval(function() {
			if(ETAT_ANIMATION<0)	$('#wrapper').trigger(e);
		}, DUREE_DEPLACEMENT+50);
	}, function() {
		clearInterval(trigger);
	});
	
	$('#right').hover(function() {
		e.keyCode = 39;
		if(ETAT_ANIMATION<0)	$('#wrapper').trigger(e);
		trigger = setInterval(function() {
			if(ETAT_ANIMATION<0)	$('#wrapper').trigger(e);
		}, DUREE_DEPLACEMENT+50);
	}, function() {
		clearInterval(trigger);
	});
	
	$('#down').hover(function() {
		e.keyCode = 40;
		if(ETAT_ANIMATION<0)	$('#wrapper').trigger(e);
		trigger = setInterval(function() {
			if(ETAT_ANIMATION<0)	$('#wrapper').trigger(e);
		}, DUREE_DEPLACEMENT+50);
	}, function() {
		clearInterval(trigger);
	});
});