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

//On charge les PNJ de la map à travers un tableau pnj[i] = Array(PNJ, ANIMATION=true\false)
var pnj 	= Array();
pnj.push(Array(new PNJ("may.png", 14, 6, DIRECTION.BAS, 'Stéphanie', 'Coucou !'), true));
pnj.push(Array(new PNJ("sasha.png", 11, 13, DIRECTION.HAUT, 'Espeon', 'Cette map est très intéressante...'), false));

for(var i=0; i<pnj.length; i++) {
	map.addPNJ(pnj[i][0]);
}

//On crée le joueur
var joueur 	= new Personnage("sasha.png", 16, 24, DIRECTION.BAS);

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
		
	//Animation PNJ
	setInterval(
		function() {
			for(var i=0; i<pnj.length; i++) {
				if(pnj[i][1]) 	pnj[i][0].direction = Math.floor(Math.random()*3);		//On anime simplement les PNJ qui le peuvent
			}
		}, Math.floor(Math.random()*(10000) + 5000)
	);
	
	//Gestion du clavier
	window.onkeydown = function(event) {
		var e = event || window.event;
		var key = e.which || e.keyCode;

		switch(key) {
			case 38 : 													// Flèche haut (haut)
				joueur.deplacer(DIRECTION.HAUT);
				break;
				
			case 40 : 													// Flèche bas (bas)
				joueur.deplacer(DIRECTION.BAS);
				break;
				
			case 37 : 													// Flèche gauche (gauche)
				joueur.deplacer(DIRECTION.GAUCHE);
				break;
				
			case 39 : 													// Flèche droite (droite)
				joueur.deplacer(DIRECTION.DROITE);
				break;
				
			case 97 : case 65 :											//a, A (A)
				joueur.activer();
				break;
				
			case 122 : case 90 :										//z, Z (B)
			
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
});