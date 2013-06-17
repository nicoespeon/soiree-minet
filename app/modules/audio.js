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
var Audio = Backbone.Model.extend({
	defaults: {
	    id: 'minet',
		piste: 'partyrock',
		ext: ['mp3','ogg']
	},
	
    localStorage: new Backbone.LocalStorage('audio'),
    
    initialize: function() {
        this.fetch();
    }
});

// Vue - Audio
// -----------
var AudioView = Backbone.View.extend({
	events: {
		"click .play": "play",
		"click .pause": "pause"
	},
	
	initialize: function() {
		// On initialise le player pour y accéder
		this.sound = new buzz.sound('sounds/'+this.model.get('piste'), {
		    formats: this.model.get('ext')
		}).load();
		
		// On bind la lecture sur les changements du modèle
		this.model.on('change:piste', this.chgTrack, this);
	},
	
	play: function() {
		this.sound.play()
		    .fadeIn(1000)
		    .loop();
		    
		ISPLAYING = true;
	},
	
	pause: function() {
		this.sound.pause();
		ISPLAYING = false;
	},
	
	stop: function() {
		this.sound.stop();
		ISPLAYING = true;
	},
	
	chgTrack: function() {
	    this.model.save();
		var nextSound = new buzz.sound('sounds/'+this.model.get('piste'), {
		    formats: this.model.get('ext')
		}).load();
		 
		if(ISPLAYING)	this.sound.fadeWith(nextSound,1000);
		
		this.sound = nextSound;
		this.sound.loop();
	}
});
