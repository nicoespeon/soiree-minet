/*
|--------------------------------------------------------------------------
| CLASS PNJ
|--------------------------------------------------------------------------
|
| Gestion des PNJ du jeu
|
*/

/*
|--------------------------------------------------------------------------
| VARIABLES
|--------------------------------------------------------------------------
*/
var ID_PNJ	= 0; 							//Identifiant d'un pnj

/*
|--------------------------------------------------------------------------
| CLASSE GENERALE
|--------------------------------------------------------------------------
*/
function PNJ(url, posX, posY, direction, name, message) {
	//Initialisation des variables
	this.id 			= ID_PNJ;
	this.x 				= Math.max(posX, Math.ceil(MILIEU));
	this.y 				= Math.max(posY, Math.ceil(MILIEU));
	this.direction 		= direction;	
	this.name			= name;
	this.message		= message;
	
	//Chargement de l'image
	this.image 					= new Image();
	this.image.referencePNJ 	= this;			//Permet de boucler pour utiliser this.width par la suite
	
	this.image.onload = function() {
		if(!this.complete) {
			throw new Error("Erreur de chargement du sprite '"+url+"'");
		}
		
		//Nombre de personnages par ligne/colonne
		this.referencePNJ.width 	= this.width / 4;
		this.referencePNJ.height 	= this.height / 4; 
	}
	
	this.image.src = "sprites/"+url;
	ID_PNJ++;
}

/*
|--------------------------------------------------------------------------
| ACTIONS
|--------------------------------------------------------------------------
*/
PNJ.prototype.dessinerPNJ = function(context) {	
	var OFFSET_Y	= Math.floor(joueur.y-MILIEU);	//Offset d'affichage vertical
	var OFFSET_X	= Math.floor(joueur.x-MILIEU);	//Offset d'affichage horizontal
	var pos_x		= this.x-OFFSET_X;
	var pos_y		= this.y-OFFSET_Y;	
	var decalageX 	= 0; 
	var decalageY	= 0;
	
	if(ETAT_ANIMATION>=0) {
		// Nombre de pixels restant à parcourir entre les deux cases
		var pixelsAParcourir = TAILLE_TILE * (1 - (ETAT_ANIMATION / DUREE_DEPLACEMENT));
		
		// À partir de ce nombre, on définit le décalage en x et y.
		switch(joueur.direction) {
			case DIRECTION.HAUT:
				decalageY = pixelsAParcourir;
				break;
			
			case DIRECTION.BAS:
				decalageY = -pixelsAParcourir;
				break;
				
			case DIRECTION.GAUCHE:
				decalageX = pixelsAParcourir;
				break;
				
			case DIRECTION.DROITE:
				decalageX = -pixelsAParcourir;
				break;
		}
	} 
	
	context.drawImage(
		this.image,
		0, this.direction * this.height,							//Origine du rectangle source dans le sprite personnage
		this.width, this.height,									//Dimension du personnage original
		(pos_x)*TAILLE_TILE - this.width/2 - 16 - decalageX, 		//Placement au centre de la map	affichée
		(pos_y)*TAILLE_TILE - this.height/2 - 32 - decalageY,
		this.width, this.height										//Dimension du personnage (grandissement)
	);
}

/*
|--------------------------------------------------------------------------
| METHODES
|--------------------------------------------------------------------------
*/
PNJ.prototype.getInfos = function() {
	var infos = { 'x' : this.x, 'y' : this.y, 'name' : this.name};
	return infos;
}

PNJ.prototype.setDirection = function(direction) {
	this.direction = direction;
}
