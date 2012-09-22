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
		orientation: DIRECTION.BAS,
		position: [23,4]
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
		var x = this.model.get('position')[0];
		var y = this.model.get('position')[1];
		
		switch(e.keyCode) {
			case 37:
				e.preventDefault();
				x--;
				break;
				
			case 38:
				e.preventDefault();
				y--;
				break;
			
			case 39:
				e.preventDefault();
				x++;
				break;
				
			case 40:
				e.preventDefault();
				y++;
				break;
			
			default:
				console.log(e.keyCode);
				break;
		}
		
		this.model.set({'position':[x,y]});
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
		this.model.on('change', this.render, this);
	},
	
	// Re-render le PNJ sur la map
	render: function() {
		this.$el.append(this.template(this.model.toJSON()));
		
		// Positionne l'élément sur la map
		var elt = this.$el.children();
		var x = elt.data('x');
		var y = elt.data('y');
		positionne(elt,x,y);
	
		return this;
	},
	
	rotate: function(direction) {
	
	}
});
