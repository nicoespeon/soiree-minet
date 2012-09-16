/*
|--------------------------------------------------------------------------
| MAIN SCRIPT
|--------------------------------------------------------------------------
|
| Main script for the game
|
*/


$(function() {
	/* Positionnement des �l�ments de la map avec data-top/data-left (navigateurs r�cents) */
	$('#wrapper div').each(function() {
		// R�cup�re les data-positions des �l�ments en tiles
		var top = $(this).data('top');
		var left = $(this).data('left');
		
		// Convertit tiles > px
		top = top*32;
		left = left*32;
		
		// Positionne les �l�ments sur la map
		$(this).css('top', top+'px');
		$(this).css('left', left+'px');
	});
});