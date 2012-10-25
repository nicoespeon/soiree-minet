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
var DUREE_DEPLACEMENT 	= 500;			// Durée du déplacement (en ms)
var ETAT_ANIMATION		= -1;			// Personnage initialement immobile
var COLLISIONS 			= [];			// On définit la map des collisions

// Audio
var ISPLAYING 			= false;		// Etat du lecteur audio

// Notifications
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
