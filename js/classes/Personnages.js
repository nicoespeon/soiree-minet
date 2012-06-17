/*
|--------------------------------------------------------------------------
| CLASS PERSONNAGES
|--------------------------------------------------------------------------
|
| Gestion des personnages du jeu
|
*/

/*
|--------------------------------------------------------------------------
| VARIABLES INITIALES
|--------------------------------------------------------------------------
*/
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
| CLASSE GENERALE
|--------------------------------------------------------------------------
*/
function Personnage(url, posX, posY, direction) {
	//Initialisation des variables
	this.x 				= Math.max(posX, Math.ceil(MILIEU));
	this.y 				= Math.max(posY, Math.ceil(MILIEU));
	this.direction 		= direction;	
	
	//Chargement de l'image
	this.image 					= new Image();
	this.image.referencePerso 	= this;			//Permet de boucler pour utiliser this.width par la suite
	
	this.image.onload = function() {
		if(!this.complete) {
			throw new Error("Erreur de chargement du sprite '"+url+"'");
		}
		
		//Nombre de personnages par ligne/colonne
		this.referencePerso.width 	= this.width / 4;
		this.referencePerso.height 	= this.height / 4; 
	}
	
	this.image.src = "sprites/"+url;
}

/*
|--------------------------------------------------------------------------
| ACTIONS
|--------------------------------------------------------------------------
*/
Personnage.prototype.dessinerPersonnage = function(context) {
	//Définit la frame (image) à afficher
	var frame 		= 0;
	var decalageX 	= 0; 
	var decalageY	= 0;
	
	if(ETAT_ANIMATION >= DUREE_DEPLACEMENT) {
		// Si le déplacement a atteint ou dépassé le temps nécessaire pour s'effectuer, on le termine
		ETAT_ANIMATION = -1;
	} else if(ETAT_ANIMATION>=0) {
		frame = Math.floor(ETAT_ANIMATION/DUREE_ANIMATION);
		
		if(frame>=DUREE_ANIMATION) {
			frame %= DUREE_ANIMATION;	
		}
	
		ETAT_ANIMATION++;	//On passe à l'état suivant
	}
	
	context.drawImage(
		this.image,
		this.width * frame, this.direction * this.height,			//Origine du rectangle source dans le sprite personnage
		this.width, this.height,									//Dimension du personnage original
		MILIEU*TAILLE_TILE - this.width/2, 							//Placement au centre de la map	affichée
		MILIEU*TAILLE_TILE - this.height/2 - 16,
		this.width, this.height										//Dimension du personnage (grandissement)
	);
}

Personnage.prototype.deplacer = function (direction) {
	// On ne peut pas se déplacer si un mouvement est déjà en cours !
	if(ETAT_ANIMATION >= 0) {
		return false;
	}
	
	//Changement de la direction du personnage
	this.direction = direction;
	
	//On efface le retour écran
	$('#control').html('');
	
	//On récupère les coordonnées de la cellule cible
	var prochaineCase = this.getNextCoord(direction);
	
	//On vérifie que la case ciblée est bien sur la carte
	if(prochaineCase.x<MILIEU || prochaineCase.y<MILIEU || prochaineCase.x>map.getMaxWidth() || prochaineCase.y>map.getMaxHeight()) {
		return false;
	}
	
	//On vérifie que la prochaine case ciblée est accessible
	if(map.collision[prochaineCase.y-1][prochaineCase.x-1]!=1) {
		return false;
	}
	
	//On commence à déplacer le personnage
	ETAT_ANIMATION = 1;
	
	//Si tout est ok, on effectue le déplacement
	this.x = prochaineCase.x;
	this.y = prochaineCase.y;
	
	var OFFSET_Y	= Math.floor(this.y-MILIEU);	//Offset d'affichage vertical
	var OFFSET_X	= Math.floor(this.x-MILIEU);	//Offset d'affichage horizontal
	
	//$('#control').html('x:'+this.x+'/y:'+this.y);
	return true;
}

Personnage.prototype.activer = function() {
	//Récupère coordonnées de la cible
	var cible = this.getNextCoord(this.direction);
	var txt = "Il n'y a rien ici !";
	
	switch(map.collision[cible.y-1][cible.x-1]) {				// -1 car la map des collisions commence à 0 
		case 2 :												//Panneau d'information
			var txt = "Soirée MiNET... Coming Soon !";	
			break;
			
		case 3 :												//PNJ
			var pnj 	= map.getPNJ();
			var name	= pnj[cible.y][cible.x]['name'];
			var message	= pnj[cible.y][cible.x]['message'];
			var txt 	= "<b>"+name+"</b> : "+message;
			
			switch(this.direction) {
				case DIRECTION.HAUT :
					map.pnj[pnj[cible.y][cible.x]['id']].setDirection(DIRECTION.BAS);
					break;
				
				case DIRECTION.DROITE :
					map.pnj[pnj[cible.y][cible.x]['id']].setDirection(DIRECTION.GAUCHE);
					break;
					
				case DIRECTION.GAUCHE :
					map.pnj[pnj[cible.y][cible.x]['id']].setDirection(DIRECTION.DROITE);
					break;
					
				case DIRECTION.BAS :
					map.pnj[pnj[cible.y][cible.x]['id']].setDirection(DIRECTION.HAUT);
					break;
			}
			break;
			
		case 4 :												//Maison
			var txt = "C'est le local MiNET... Ca claque !!!";	
			break;
	}	
	
	$('#control').html(txt);
}

/*
|--------------------------------------------------------------------------
| METHODES
|--------------------------------------------------------------------------
*/
Personnage.prototype.getNextCoord = function(direction) {
	//Récupération des coordonnées du personnage
	var coords = { 'x' : this.x, 'y' : this.y };
	
	//Coordonnées cellule adjacente cible
	switch(direction) {
		case DIRECTION.HAUT:
			coords.y--;
			break;
		
		case DIRECTION.DROITE:
			coords.x++;
			break;
		
		case DIRECTION.BAS:
			coords.y++;
			break;
		
		case DIRECTION.GAUCHE:
			coords.x--;		
			break;
	}
	
	return coords;
}