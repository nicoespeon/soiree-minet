/*
|--------------------------------------------------------------------------
| APP SCRIPT
|--------------------------------------------------------------------------
|
| Charge les éléments de l'application
|
*/

// Vue - Application 
// -----------------
// Cette vue organise le rendu de l'application
var AppView = Backbone.View.extend({
	// On se fixe sur l'élément du DOM créé dans ce but
	el: $('#wrapper'),
	
	// Gère les événements qui modifient les personnages (déplacement, rotation, ...)
	events: {
		
	},
	
	// On écoute les différents changements sur nos collections pour leur affecter les effets voulus
	// On récupère les données pour initialiser les PNJs
	initialize: function() {
		// PNJs
		PNJs.on('add', this.addOne, this);
		PNJs.on('reset', this.addAll, this);
		PNJs.on('all', this.render, this);
		
		PNJs.fetch();
		
		// Player
		new PlayerView({model: player});	// Charge le joueur dans l'application
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

$(function() {
	/* Positionnement des éléments de la map avec data-x/data-y */
	$('#wrapper div').each(function() {
		var x = $(this).data('x');
		var y = $(this).data('y');
		positionne(this,x,y);
	});
	
	/* Prépare les éléments de l'application */
	player = new Personnage();			// Crée le modèle de personnage par défaut (player)
	PNJs = new PNJList();				// Crée la collection de PNJs
	
		
	/* Charge la map des collisions */
	$.getJSON('data/collision.json', function(data) {
		var datas = [];
		$.each(data, function(key, val) {
			datas[key] = val;
		});
		
		for(var i=1;i<41;i++) {
			COLLISIONS[i] = [];
			for(var j=1;j<101;j++) {
				var x = j-1;
				var y = i-1;
				COLLISIONS[i][j] = datas[x][y];
			}
		}
	}).complete(function() { 
		/* Charge l'application une fois la map chargée */
		new AppView;
	});
});