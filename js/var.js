/*
|--------------------------------------------------------------------------
| VAR SCRIPT
|--------------------------------------------------------------------------
|
| Variables et fonctions globales de l'application
|
*/

/*
|--------------------------------------------------------------------------
| VARIABLES GLOBALES
|--------------------------------------------------------------------------
*/
// Map
var TAILLE_TILE = 32; 					// Taille du tile en pixels

// Personnages
var ORIENTATION = [];					// Orientation du personnage
ORIENTATION.push('orientationBas');
ORIENTATION.push('orientationGauche');
ORIENTATION.push('orientationDroite');
ORIENTATION.push('orientationHaut');

var NB_FRAMES		 	= 4; 			// Nombre de frames
var DUREE_DEPLACEMENT 	= 400;			// Durée du déplacement (en ms)
var COLLISIONS 			= [];			// On définit la map des collisions

// Indicateurs
var ISPLAYING 			= false;		// Etat du lecteur audio
var ISMOVING			= false;		// Etat du player
var ISSCROLLING			= false;		// Etat du scroll

// Notifications
var TOASTS_LIMIT		= 3;			// Limite le nombre de notifications à l'écran
var TOASTS				= [];			// Enregistre les notifications
$().toastmessage({
    text     : 'H**k me I\'m famous !',
    sticky   : false,
    position : 'bottom-center',
    type     : 'success',
    stayTime : 10000
});


/*
|--------------------------------------------------------------------------
| FONCTIONS GLOBALES
|--------------------------------------------------------------------------
*/

// Convertit les coordonnées (tile) en pixels
// ------------------------------------------
function tileToPx(tile){
	return (tile-1)*TAILLE_TILE;
}

// Convertit les pixels en coordonnées (tile)
// ------------------------------------------
function pxToTile(px){
    return Math.floor(px/TAILLE_TILE);
}

// Positionne un élément sur la map
// --------------------------------
function positionne(el,x,y) {
	$(el).css({'left':tileToPx(x)+'px','top':tileToPx(y)+'px'});
}

// Donne les coordonnées de la case ciblée
// ---------------------------------------
function getCoordsCible(x,y,orientation) {
	switch(orientation) {
		case 0:
			y++;
			break;
			
		case 1:
			x--;
			break;
			
		case 2:
			x++;
			break;
			
		case 3:
			y--;
			break;
	}
	
	return { 'x':x, 'y':y };
}

// Affiche une notification à l'écran
// ----------------------------------
function notification(etat,message) {
	var etat = etat.charAt(0).toUpperCase()+etat.substring(1);
	
	TOASTS.push(
		$().toastmessage(
			'show'+etat+'Toast',
			message
		)
	);
	
	if(TOASTS.length>TOASTS_LIMIT) {
        $().toastmessage('removeToast', TOASTS.shift());
    }
}

// Scroll à l'écran
// ----------------
function scroll(direction,ecart) {
    $('#loading').css('display', 'block');
	ISSCROLLING = true;

	if(direction=='horizontal') {
		$('html, body').animate({scrollLeft: ecart}, DUREE_DEPLACEMENT*0.8, function() {
            $('#loading').css('display', 'none');
			ISSCROLLING = false;
		});
	} else if(direction=='vertical') {
		$('html, body').animate({scrollTop: ecart}, DUREE_DEPLACEMENT*0.8, function() {
            $('#loading').css('display', 'none');
			ISSCROLLING = false;
		});
	}
}

// Animation de chargement

var opts = {
  lines: 10, // The number of lines to draw
  length: 4, // The length of each line
  width: 2, // The line thickness
  radius: 2, // The radius of the inner circle
  corners: 1, // Corner roundness (0..1)
  rotate: 0, // The rotation offset
  color: '#fff', // #rgb or #rrggbb
  speed: 1, // Rounds per second
  trail: 60, // Afterglow percentage
  shadow: false, // Whether to render a shadow
  hwaccel: false, // Whether to use hardware acceleration
  className: 'spinner', // The CSS class to assign to the spinner
  zIndex: 2e9, // The z-index (defaults to 2000000000)
  top: '10px', // Top position relative to parent in px
  left: '10px' // Left position relative to parent in px
};
var target = document.getElementById('loading');
var spinner = new Spinner(opts).spin(target);

