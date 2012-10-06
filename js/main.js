/*
|--------------------------------------------------------------------------
| MAIN SCRIPT
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
var TAILLE_TILE = 32; 					// Taille du tile en pixels

var ORIENTATION = [];						// Orientation du personnage
ORIENTATION.push('orientationBas');
ORIENTATION.push('orientationGauche');
ORIENTATION.push('orientationDroite');
ORIENTATION.push('orientationHaut');

var NB_FRAME		 	= 4; 			// Nombre de frames
var NB_IMAGES 			= 50;			// Nombre d'images par déplacement
var DUREE_DEPLACEMENT 	= 600;			// Durée du déplacement (en ms)
var ETAT_ANIMATION		= -1;			// Personnage initialement immobile
var COLLISIONS = [];					// On définit la map des collisions

// Configuration des notifications 
// -------------------------------
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

// Positionne un élément sur la map
// --------------------------------
function positionne(el,x,y) {
	$(el).css({'left':tileToPx(x)+'px','top':tileToPx(y)+'px'});
}