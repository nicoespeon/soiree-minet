/*
|--------------------------------------------------------------------------
| CLASS TILESETS
|--------------------------------------------------------------------------
|
| Gestion des blocs
|
*/

/*
|--------------------------------------------------------------------------
| CLASSE GENERALE
|--------------------------------------------------------------------------
*/
function Tileset(url) {	
	this.image 					= new Image();
	this.image.referenceTileset = this; 		//Permet de boucler pour utiliser this.width à la suite
	
	this.image.onload = function() {
		if(!this.complete) {
			throw new Error("Erreur de chargement du tileset '"+url+"'");
		}
		
		//Nombre de tile par ligne (1 tile = 32px)
		this.referenceTileset.width = this.width / TAILLE_TILE;
	}
	
	this.image.src = "tilesets/"+url;	//Pour dessiner l'image
}

/*
|--------------------------------------------------------------------------
| METHODES
|--------------------------------------------------------------------------
*/
Tileset.prototype.dessinerTile = function(num, context, xDestination, yDestination, direction) {
	//Définit la frame (image) à afficher
	var decalageX 	= 0; 
	var decalageY	= 0;
	
	if(ETAT_ANIMATION>=0) {
		// Nombre de pixels restant à parcourir entre les deux cases
		var pixelsAParcourir = TAILLE_TILE * (1 - (ETAT_ANIMATION / DUREE_DEPLACEMENT));
		
		// À partir de ce nombre, on définit le décalage en x et y.
		switch(direction) {
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
	
	var xSourceEnTiles = num % this.width;						//Numéro du tile (modulo) Nombre de tile par ligne
	if(xSourceEnTiles == 0) xSourceEnTiles = this.width;		//Cas où le modulo vaut 0 (xSourceEnTiles = Nombre de tile par ligne)
	var ySourceEnTiles = Math.ceil(num / this.width);			//ceil(Numéro du tile / Nombre de tile par ligne)
	
	//Calcul des coordonnées sur le tileset (on commence à 0, d'où le -1)
	var xSource = (xSourceEnTiles - 1) * TAILLE_TILE;					
	var ySource = (ySourceEnTiles - 1) * TAILLE_TILE;
	
/*
	context.drawImage(
		this.image, 
		xSource, ySource, 				//Commence le tile sur ces coordonnées
		32, 32, 						//Taille du tile
		xDestination + decalageX,  		//Position du tile sur la map
		yDestination + decalageY,
		32, 32							//Taille du tile sur la map (grandissement)
	);
*/
	
	context.drawImage(
		this.image, 
		xSource, ySource, 				//Commence le tile sur ces coordonnées
		TAILLE_TILE, TAILLE_TILE, 		//Taille du tile
		xDestination - decalageX,  		//Position du tile sur la map
		yDestination - decalageY,
		TAILLE_TILE, TAILLE_TILE		//Taille du tile sur la map (grandissement)
	);
	
}