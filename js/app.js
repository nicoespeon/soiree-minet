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
var AppView = Backbone.View.extend({
	el: $('#wrapper'),
	
	initialize: function() {
		// PNJs
		PNJs.on('add', this.addOne, this);
		PNJs.on('reset', this.addAll, this);
		PNJs.on('all', this.render, this);
		PNJs.fetch();
		
		// Player
		new PlayerView({model: player});	
		
		//Events
		new EventView({el:$('body'), model: event});
		
		// Audio
		new AudioView({el:$('body'), model: audio});	
	},
	
	// Ajoute un PNJ en créant une vue pour celui-ci
	addOne: function(personnage) {
		var view = new PNJView({model: personnage});
		this.$('#pnjs').append(view.render().el);	
	},
	
	// Ajoute tous les PNJs de la collection en même temps
	addAll: function() {
		this.$('#pnjs').html('');
		PNJs.each(this.addOne,this);
	}
});

// Appel des fonctions de l'application après chargement du DOM
// ------------------------------------------------------------
$(function() {
	// Active le menu de controle
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

	// Positionne les éléments de la map
	$('#wrapper div').each(function() {
		var x = $(this).data('x');
		var y = $(this).data('y');
		positionne(this,x,y);
	});
	
	// Prépare les éléments de l'application
	player 	= new Personnage();			
	PNJs 	= new PNJList();			
	audio	= new Audio();				
	event 	= new Event();
	
	// Charge la map des collisions
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
		new AppView;
	});	
});