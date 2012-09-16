/*
|--------------------------------------------------------------------------
| MAIN SCRIPT
|--------------------------------------------------------------------------
|
| Main script for the game
|
*/


$(function() {
	/* Positionnement des éléments de la map avec data-top/data-left (navigateurs récents) */
	$('#wrapper div').each(function() {
		// Récupère les data-positions des éléments en tiles
		var top = $(this).data('top');
		var left = $(this).data('left');
		
		// Convertit tiles > px
		top = top*32;
		left = left*32;
		
		// Positionne les éléments sur la map
		$(this).css('top', top+'px');
		$(this).css('left', left+'px');
	});
});