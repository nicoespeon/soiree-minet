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
	
	// On écoute les différents changements sur nos collections pour leur affecter les effets voulus
	// On récupère les données pour initialiser les PNJs
	initialize: function() {
		// PNJs
		PNJs.on('add', this.addOne, this);
		PNJs.on('reset', this.addAll, this);
		PNJs.on('all', this.render, this);
		PNJs.fetch();
		
		new PlayerView({model: player});				// Charge le joueur dans l'application
		new AudioView({ el:$('body'), model: audio});	// Charge l'audio de l'application
		new EventView({ el:$('body'), model: event});	// Charge les events de l'application
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

// Appel des fonctions de l'application après chargement du DOM
// ------------------------------------------------------------
$(function() {
	/* Active le menu de controle */
	$('nav#control li').click(function() {
		var control = $(this).data('control');
		var icon	= $(this).html();
		
		switch(control) {
			case 'menu':
				$('#menu').fadeToggle(500);
				if(icon=='i') {
					$(this).html('j');
				} else {
					$(this).html('i');
				}
				break;
			
			case 'audio':
				if(icon=='r') {
					$(this).html('p');
					$(this).removeClass('play').addClass('pause');
				} else {
					$(this).html('r');
					$(this).removeClass('pause').addClass('play');
				}
				break;
		}
	});

	/* Positionnement des éléments de la map avec data-x/data-y */
	$('#wrapper div').each(function() {
		var x = $(this).data('x');
		var y = $(this).data('y');
		positionne(this,x,y);
	});
	
	/* Prépare les éléments de l'application */
	player 	= new Personnage();			// Crée le modèle de personnage par défaut (player)
	PNJs 	= new PNJList();			// Crée la collection de PNJs
	audio	= new Audio();				// Crée le modèle du player audio	
	event 	= new Event();
	
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