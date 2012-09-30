/*
|--------------------------------------------------------------------------
| PERSONNAGES SCRIPT
|--------------------------------------------------------------------------
|
| Script de gestion des personnages (PNJ, Player)
|
*/

/*
|--------------------------------------------------------------------------
| MODELE & COLLECTIONS
|--------------------------------------------------------------------------
*/
// Model - Personnage
// ------------------
// Ce modèle définit la nature d'un personnage
var Personnage = Backbone.Model.extend({
	// Attributs par défaut d'un personnage
	defaults: {
		type: 'garcon',
		pseudo: 'Sergio Flores',
		orientation: 0,
		position: [23,4],
		limits: [0,1,2,3],
		frame: 0
	},
	
	// Intégrité des attributs
	validate: function(att) {
		if(att.orientation) {
			if(att.orientation<0 || att.orientation>3) {
				return "L'orientation du personnage ne peut être comprise qu'entre 0 et 3 !";
			}
			
			if(isNaN(att.orientation)) {
				return "L'orientation du personnage est une valeur numérique !";
			}
		}	
		
		if(att.position) {
			if(att.position[0]<1 || att.position[0]>40)	{
				return "La coordonnée X est comprise entre 1 et 40 !";
			}
			
			if(att.position[1]<1 || att.position[1]>100)	{
				return "La coordonnée Y est comprise entre 1 et 100 !";
			}
			
			if(isNaN(att.position[0]) || isNaN(att.position[1])) {
				return "Les coordonnées du personnage sont des valeurs numériques !";
			}
		}
	},
	
	// Getters
	getX: function() {
		return this.get('position')[0];
	},
	
	getY: function() {
		return this.get('position')[1];
	},
	
	// Setters
	setX: function(x) {
		return this.set({'position':[x,this.getY()]});
	},
	
	setY: function(y) {
		return this.set({'position':[this.getX(),y]});
	}
});

// Collection - PNJ
// ----------------
// Cette collection regroupe les PNJs
var PNJList = Backbone.Collection.extend({
    model: Personnage,
	url: 'data/pnj.json'
});

/*
|--------------------------------------------------------------------------
| VUES (Player, PNJ, Personnages)
|--------------------------------------------------------------------------
*/
// Vue - Player
// ------------
// Cette vue gère le rendu d'un joueur
var PlayerView = Backbone.View.extend({
	// Le joueur est rattaché à la zone de jeu
	el: $('#wrapper'),
	
	// Selon un template particulier
	template: _.template($('#player-template').html()),
	
	events: {
	
	},
	
	initialize: function() {
		_.bindAll(this);
		$(document).bind('keydown', this.move);
		
		this.model.on('change', this.render, this);
		this.render();	
	},
	
	render: function() {
		$('#player').remove();
		this.$el.append(this.template(this.model.toJSON()));
		
		// Positionne l'élément sur la map
		var elt = $('#player');
		var x = elt.data('x');
		var y = elt.data('y');
		positionne(elt,x,y);
		
		return this;
	},
	
	move: function(e) {
		var x = this.model.getX();
		var y = this.model.getY();
		
		switch(e.keyCode) {
			case 37:
				//Gauche
				e.preventDefault();
				x--;
				this.model.set({'orientation':1});
				break;
				
			case 38:
				//Haut
				e.preventDefault();
				y--;
				this.model.set({'orientation':3});
				break;
			
			case 39:
				//Droite
				e.preventDefault();
				x++;
				this.model.set({'orientation':2});
				break;
				
			case 40:
				//Bas
				e.preventDefault();
				y++;
				this.model.set({'orientation':0});
				break;
			
			default:
				break;
		}
		
		var canMove = this.canMoveTo(x,y);
		if(canMove) {
			this.model.set({'position':[x,y]});
		}
	},
	
	canMoveTo: function(x,y) {
		if(x>0 && x<41 && y>0 && y<101) {
			if(COLLISIONS.length!=41 || COLLISIONS[x].length!=101) {
				// Si la map des collisions n'est pas complète, on ne se déplace pas
				return false;	
			} else {
				// Sinon, on check la case ciblée
				var col = COLLISIONS[x][y];
			}
			
			switch(col) {
				case '1':
					return true;
					break;
				
				default:
					return false;
					break;
			}
		}
		
		return false;
	}
});

// Vue - PNJ
// ----------
// Cette vue gère le rendu d'un PNJ
var PNJView = Backbone.View.extend({
	// Chaque PNJ est une nouvelle puce
	tagName: 'li',
	
	// A laquelle on applique un template particulier
	template: _.template($('#pnj-template').html()),
	
	events: {
	
	},
	
	// La vue écoute les changements sur le modèle
	// Lorsque le modèle change, la vue se rafraîchit
	// Comme il y a une relation 1-1 entre le modèle et la vue, on y fait référence directement ici
	initialize: function() {
		COLLISIONS[this.model.getX()][this.model.getY()] = '0';
		this.autoRotate();
		
		this.model.on('change', this.render, this);
	},
	
	// Re-render le PNJ sur la map
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		
		// Positionne l'élément sur la map
		var elt = this.$el.children();
		var x = elt.data('x');
		var y = elt.data('y');
		positionne(elt,x,y);
	
		return this;
	},
	
	rotate: function(orientation) {
		this.model.set({'orientation':orientation});
	},

	// Rotation spontannée aléatoire des PNJs
	autoRotate: function() {	
		// Pour le scope de this dans setInterval	
		var thisPNJ = this;
		
		// Définit les orientations possibles
		var limits = [];
		for(var i=0;i<4;i++) {
			if($.inArray(i,this.model.get('limits'))!=-1) {
				limits.push(i);
			}
		}
		
		setInterval(
			function() {
				var orientation = limits[Math.floor(Math.random()*limits.length)];
				thisPNJ.rotate(orientation);
			}, Math.floor(Math.random()*(10000) + 5000)
		);
	}
});
