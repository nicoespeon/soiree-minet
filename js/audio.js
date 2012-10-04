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
		this.model.on('change', this.chgTrack, this);
	},
	
	play: function() {
		this.sound.play()
		    .fadeIn(3000)
		    .loop()
		    .bind('timeupdate', function() {
		        //var timer = buzz.toTimer(this.getTime());
	    });
	},
	
	pause: function() {
		this.sound.fadeOut(2000, function() { 
			this.sound.pause(); 
		});
	},
	
	stop: function() {
		//this.sound.stop();
	},
	
	chgTrack: function() {
		this.sound = new buzz.sound('sounds/'+this.model.get('piste'), {
		    formats: this.model.get('ext')
		}); 
		 
		this.play();
	}
});
