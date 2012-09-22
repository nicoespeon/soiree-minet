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
		position: [13,13]
	}
});

// Collection - PNJ
// ----------------
// Cette collection regroupe les PNJs
var PNJList = Backbone.Collection.extend({
    model: Personnage,
	url: 'data/pnj.json'
});
  
// On crée notre collection de PNJs
var PNJs = new PNJList();	

/*
|--------------------------------------------------------------------------
| VUES (Player, PNJ, Personnages)
|--------------------------------------------------------------------------
*/
// Vue - Player
// ------------
// Cette vue gère le rendu d'un joueur
/*
var PlayerView = Backbone.View.extend({
	render: function() {
		return this;
	}
});
*/

// Vue - PNJ
// ----------
// Cette vue gère le rendu d'un PNJ
var PNJView = Backbone.View.extend({
	// Chaque PNJ est une nouvelle puce
	tagName: 'li',
	
	// A laquelle on applique un template particulier
	template: _.template($('#PNJ-template').html()),
	
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

// Vue - Personnages 
// -----------------
// Cette vue organise le rendu des personnages
var PersonnagesView = Backbone.View.extend({
	// On se fixe sur l'élément du DOM créé dans ce but
	el: $('#wrapper'),
	
	// Gère les événements qui modifient les personnages (déplacement, rotation, ...)
	events: {
		
	},
	
	// On écoute les différents changements sur nos collections pour leur affecter les effets voulus
	// On récupère les données pour initialiser les PNJs
	initialize: function() {
		PNJs.on('add', this.addOne, this);
		PNJs.on('reset', this.addAll, this);
		PNJs.on('all', this.render, this);
		
		PNJs.fetch();
	},
	
	// Ajoute un PNJ en créant une vue pour celui-ci
	// Chaque nouveau PNJ est attaché au 'ul#pnjs'
	addOne: function(personnage) {
		var view = new PNJView({model: personnage});
		this.$('#pnjs').append(view.render().el);	
	},
	
	// Ajoute tous les PNJs de la collection en même temps
	// Vide tous les PNJs présents sur la carte avant (recharge l'affichage)
	addAll: function() {
		this.$('#pnjs').html('');
		PNJs.each(this.addOne,this);
	}
});

/*
|--------------------------------------------------------------------------
| CHARGEMENT DES PERSONNAGES
|--------------------------------------------------------------------------
*/
var Personnages = new PersonnagesView;