/*
|--------------------------------------------------------------------------
| MAIN SCRIPT
|--------------------------------------------------------------------------
|
| Main script for this project
|
*/

//On active la map PKMN
var map = new Map("pkmn");

//On charge le premier personnage
var pnj 	= new Personnage("sasha.png", 1, 5, DIRECTION.BAS);
var joueur 	= new Personnage("sasha.png", 8, 7, DIRECTION.BAS);
map.addPersonnage(joueur);

$(window).load(function () {
	//Initialisation de l'animation
	var canvas = document.getElementById("animation");
	if(!canvas) {
		alert('Impossible de récupérer le canvas !');
		return;
	}
	
	//Modification de la taille du canvas en fonction de la taille de la map
	canvas.width  = map.getSize() * 32;
	canvas.height = map.getSize() * 32;
	$('#control').css('width', canvas.width);
	
	//Récupération du contexte
	var context = canvas.getContext("2d");
	if(!context) {
		alert('Impossible de récupérer le contexte !');
		return;
	}

	//Boucle principale : on (re)dessine la map en permanence à une vitesse de 1000/40 = 25 images/sec
	setInterval(function() {
		map.dessinerMap(context, joueur);
	}, 40);
	
	//Gestion du clavier
	window.onkeydown = function(event) {
		var e = event || window.event;
		var key = e.which || e.keyCode;

		switch(key) {
			case 38 : 													// Flèche haut (haut)
				joueur.deplacer(DIRECTION.HAUT, map);
				break;
				
			case 40 : 													// Flèche bas (bas)
				joueur.deplacer(DIRECTION.BAS, map);
				break;
				
			case 37 : 													// Flèche gauche (gauche)
				joueur.deplacer(DIRECTION.GAUCHE, map);
				break;
				
			case 39 : 													// Flèche droite (droite)
				joueur.deplacer(DIRECTION.DROITE, map);
				break;
				
			case 122 : case 90 :										//z, Z (B)
			
				break;
				
			case 97 : case 65 :											//a, A (A)
				joueur.activer(map);
				break;
				
			case 32 :													//Espace (Start)
				
				break;
				
			case 13 :													//Entrer (Select)
			
				break;
				
			default : 
				//alert(key);
				return true;
		}
	}
	
	//Animation PNJ
	setInterval(
		function() {
			pnj.direction = Math.floor(Math.random()*3);
		}, Math.floor(Math.random()*(10000) + 5000)
	);
});