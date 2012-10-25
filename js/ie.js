/*
|--------------------------------------------------------------------------
| IE SCRIPT
|--------------------------------------------------------------------------
|
| Fallback IE
|
*/
var frame = 0;

$(function() {
	/* Initialise la page */
	$('#content').html($('#introduction').html());

	/* Gère le menu de navigation */
	$('.navbar a').click(function() {
		// Switch l'onglet actif
		$('.navbar li.active').each(function() {
			$(this).removeClass('active');
		});
		$(this).parent().addClass('active');
		
		// Affiche le contenu correspondant
		var rel = $(this).attr('href');
		var texte = $(rel).html();
		$('#content').html(texte);
	});
	
	/* Anime le player */
	setInterval(function() {
		$('#player').removeClass('frame'+frame);
		(frame<3) ? frame++ : frame = 0;
		$('#player').addClass('frame'+frame);
	}, 150);
});