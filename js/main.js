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
var TAILLE_TILE 	= 32; 				//Taille du tile en pixels

var DIRECTION = {
	"BAS" 		: 0,
	"GAUCHE" 	: 1,
	"DROITE"	: 2,
	"HAUT"		: 3
}

var DUREE_ANIMATION 	= 4; 				//On change de frame après X animations
var DUREE_DEPLACEMENT 	= 16;				//Gère la fluidité de l'animation
var ETAT_ANIMATION		= -1;				//Personnage initialement immobile

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