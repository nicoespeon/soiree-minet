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
| MODEL - COLLECTIONS - VIEWS
|--------------------------------------------------------------------------
*/
// Personnage - Model
// ------------------
var Personnage = Backbone.Model.extend({
	// Attributs par défaut d'un personnage
	defaults: {
		type: 'garcon',
		pseudo: 'Sergio Flores',
		orientation: DIRECTION.BAS,
		position: [13,13]
	}
});

// PNJ - Collection
// ----------------
var PNJList = Backbone.Collection.extend({
    model: Personnage,
	url: 'data/pnj.json'
});
  
// Player - View
// -------------
/*
var PlayerView = Backbone.View.extend({
	render: function() {
		return this;
	}
});
*/

// PNJ - View
// ----------
var PNJView = Backbone.View.extend({
	el: $('#PNJ'),
	
	template: _.template($('#PNJ-template').html()),
	
	events: {
	
	},
	
	initialize: function() {
		this.collection.on('reset', this.render, this);
	},
	
	render: function() {
		for(var i=0;i<this.collection.length;i++) {
			//Affiche la collection d'un seul coup
			this.$el.append(this.template(this.collection.at(i).toJSON()));
			console.log(this.collection.at(i).get('pseudo')+' initialized !');
		}
		
		//Place les PNJs
		this.$el.children().each(function() {
			// Récupère les data-positions des éléments en tiles
			var top = $(this).data('top');
			var left = $(this).data('left');
			
			// Convertit tiles > px
			top = (top-1)*32;
			left = (left-1)*32;
			
			// Positionne les éléments sur la map
			$(this).css('top', top+'px');
			$(this).css('left', left+'px');
		});
			
		return this;
	},
	
	rotate: function(direction) {
		console.log('Rotated in '+direction+' direction !');
	}
});

/*
|--------------------------------------------------------------------------
| GESTION DES PERSONNAGES
|--------------------------------------------------------------------------
*/
$(function() {	
	// Creating PNJs
	// -------------
	var PNJs = new PNJList();
	new PNJView({collection:PNJs});
	PNJs.fetch();
});