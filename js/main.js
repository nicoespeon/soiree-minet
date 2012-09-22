/*
|--------------------------------------------------------------------------
| MAIN SCRIPT
|--------------------------------------------------------------------------
|
| Main script for the game
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

/*
|--------------------------------------------------------------------------
| CHARGEMENT DU JEU
|--------------------------------------------------------------------------
*/
$(function() {
	/* Positionnement des éléments de la map avec data-x/data-y */
	$('#wrapper div').each(function() {
		var x = $(this).data('x');
		var y = $(this).data('y');
		positionne(this,x,y);
	});
});