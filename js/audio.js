/*
|--------------------------------------------------------------------------
| AUDIO SCRIPT
|--------------------------------------------------------------------------
|
| Script de gestion du son
|
*/

// Model - Audio
// -------------
// Ce modèle définit la nature d'un player audio
var Audio = Backbone.Model.extend({
	defaults: {
		piste: 'partyrock',
		ext: ['mp3']
	}
});

// Vue - Audio
// -------------
// Cette vue gère le player audio de l'app
var AudioView = Backbone.View.extend({
	events: {
		"click .play": "play",
		"click .pause": "pause"
	},
	
	initialize: function() {
		// On initialise le player pour y accéder
		this.sound = new buzz.sound('sounds/'+this.model.get('piste'), {
		    formats: this.model.get('ext')
		});
		
		// On bind la lecture sur les changements du modèle
		this.model.on('change:piste', this.chgTrack, this);
	},
	
	play: function() {
		this.sound.play()
		    .fadeIn(3000)
		    .loop();
	},
	
	pause: function() {
		this.sound.fadeOut(2000, function() { 
			this.sound.pause(); 
		});
	},
	
	stop: function() {
		this.sound.stop();
	},
	
	chgTrack: function() {
		var nextSound = new buzz.sound('sounds/'+this.model.get('piste'), {
		    formats: this.model.get('ext')
		}); 
		 
		this.sound.fadeWith(nextSound,2000);
		this.sound = nextSound;
		this.sound.loop();
	}
});
