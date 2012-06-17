/*
|--------------------------------------------------------------------------
| CLASS MAP
|--------------------------------------------------------------------------
|
| Gestion des cartes du jeu
|
*/

/*
|--------------------------------------------------------------------------
| VARIABLES
|--------------------------------------------------------------------------
*/
var TAILLE_MAP 	= 11; 							//Taille de la carte (impair pour personnage centré)
var TAILLE_TILE = 32;							//Taille d'un tile (pixels)
var MILIEU		= TAILLE_MAP/2;					//Milieu de la carte affichée

/*
|--------------------------------------------------------------------------
| CLASSE GENERALE
|--------------------------------------------------------------------------
*/
function Map(nom) {
	//Récupération des données synchrones pour affectation des variables
	$.ajax({
			url: './maps/'+nom+'.json', 
			async: false,
			success: function(data) {
				terrain 	= data.terrain;
				tileset 	= data.tileset;
				collision 	= data.collision;
			}
	});	
	
	this.terrain 	= terrain;
	this.collision 	= collision;
	this.tileset 	= new Tileset(tileset);
	
	// Liste des PNJ présents sur le terrain.
	this.pnj = new Array();
}

/*
|--------------------------------------------------------------------------
| ACTIONS
|--------------------------------------------------------------------------
*/
Map.prototype.dessinerMap = function(context, joueur) {
	var OFFSET_Y	= Math.floor(joueur.y-MILIEU);	//Offset d'affichage vertical
	var OFFSET_X	= Math.floor(joueur.x-MILIEU);	//Offset d'affichage horizontal
	
	//Dessine le terrain affiché (portion du terrain total)
	for(var i=OFFSET_Y-1; i<(TAILLE_MAP+OFFSET_Y+1); i++) {		//On boucle de -1 à X+1 pour la translation fluide du décor lors du déplacement
		var ligne 	= this.terrain[Math.max(0,i)];				//Prend la première ligne si l'OFFSET est nul 
		var y 		= (i-OFFSET_Y) * TAILLE_TILE;
		
		for(var j=OFFSET_X-1; j<(TAILLE_MAP+OFFSET_X+1); j++) {	//On boucle de -1 à X+1 pour la translation fluide du décor lors du déplacement
			var x = (j-OFFSET_X) * TAILLE_TILE;
			this.tileset.dessinerTile(ligne[j], context, x, y, joueur.direction);
		}
	}
	
	//Dessin des personnages
	for(var i=0; i<this.pnj.length; i++) {
		this.pnj[i].dessinerPNJ(context);
		
		//On bloque la case où est positionné le PNJ
		this.collision[this.pnj[i].y-1][this.pnj[i].x-1]=3;
	}
	
	joueur.dessinerPersonnage(context);
	
	//Retour admin
	var txtAdmin = '';
	txtAdmin	 += 'Taille de la carte : '+(map.getMaxWidth()-10)+'x'+(map.getMaxHeight()-11)+'<br />';
	txtAdmin	 += 'Position du joueur : '+joueur.x+'/'+joueur.y+'<br />';
	$('#admin').html(txtAdmin);
}

Map.prototype.addPNJ = function(perso) {
	this.pnj.push(perso);
}

/*
|--------------------------------------------------------------------------
| METHODES
|--------------------------------------------------------------------------
*/
Map.prototype.getSize = function() {
	return TAILLE_MAP;
}

Map.prototype.getMaxWidth = function() {
	return this.terrain[0].length;
}

Map.prototype.getMaxHeight = function() {
	return this.terrain.length;
}

Map.prototype.getPNJ = function() {
	var pnj = Array();
	 
	for(var i=0; i<this.pnj.length; i++) {
		pnj[this.pnj[i].y] 								= Array();
		pnj[this.pnj[i].y][this.pnj[i].x] 				= Array();
		pnj[this.pnj[i].y][this.pnj[i].x]['id'] 		= this.pnj[i].id;
		pnj[this.pnj[i].y][this.pnj[i].x]['name'] 		= this.pnj[i].name;
		pnj[this.pnj[i].y][this.pnj[i].x]['message'] 	= this.pnj[i].message;
	}

	return pnj;
}
