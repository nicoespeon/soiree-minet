/*
|--------------------------------------------------------------------------
| EVENT SCRIPT
|--------------------------------------------------------------------------
|
| Script de gestion des événements
|
*/

// Model - Event
// -------------
// Ce modèle définit la nature d'un player audio
var Event = Backbone.Model.extend({
	defaults: {
		type: 'notice'
	}
});

// Vue - Event
// -----------
// Cette vue gère les événements de l'app
var EventView = Backbone.View.extend({
	events: {
	
	},
	
	initialize: function() {
		_.bindAll(this);
		$(document).bind('keydown', this.konami);
	},
	
	konami: function(e) {
		var keys = [];
		keys.push(e.keyCode);
		
		if(keys.toString().indexOf(CALLME)>=0) {
			audio.set('piste', 'call-me-maybe');
		}
	}
});
