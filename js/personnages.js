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
		orientation: 0,
		position: [13,13]
	}
});

// Player - Collection
// -------------------
/*
var Player = Backbone.Collection.extend({
	model: Personnage,
	
	move: function(direction) {
		console.log('Moved in '+direction+' direction !');
	}
});
*/

// PNJ - Collection
// ----------------
var PNJ = Backbone.Collection.extend({
	model: Personnage,
	
	rotate: function(direction) {
		console.log('Rotated in '+direction+' direction !');
	}
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
var PNJs = new PNJ();
var PNJView = Backbone.View.extend({
	el: $('#PNJ'),
	
	template: _.template($('#PNJ-template').html()),
	
	events: {
		
	},
	
	initialize: function() {
		PNJs.on('add', this.render, this);
	},
	
	render: function(pnj) {
		this.$el.append(this.template(pnj.toJSON()));
		console.log(pnj.get('pseudo')+' initialized !');
		return this;
	}
});

/*
|--------------------------------------------------------------------------
| GESTION DES PERSONNAGES
|--------------------------------------------------------------------------
*/
$(function() {	
	// Test
	// ----
	/*
	var pnjTest = new PNJ({orientation: DIRECTION.GAUCHE});
	var myAttributes = pnjTest.toJSON();
	console.log(JSON.stringify(myAttributes));
	*/
	
	// Creating PNJs
	// -------------
	new PNJView;
	
	// FETCH des PNJs - Il faudra les fetch() dans la vue plus tard depuis un fichier data.js directement
	var Aymi = new Personnage({pseudo: 'Aymi Li', type: 'fille', position: [15,12]});
	var Stai = new Personnage({pseudo: 'Stai Fouillon', type: 'fille', position: [6,40]});
	var Raguenar = new Personnage({pseudo: 'Raguenar', position: [17,23]});
	PNJs.add([Aymi,Stai,Raguenar]);
	
});