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
var Event = Backbone.Model.extend({
	defaults: {
		type: '',
		notification : {
			delai : '',
			type : [],
			message : []
		},
		video : {
			titre : '',
			src : ''
		},
		musique : {
			titre : '',
			src : '',
			warning : '',
			delai : 0
		},
		position : {
			x : '0',
			y : 'y'
		},
		konami : ''
	}
});

// Collection - Events
// -------------------
var EventList = Backbone.Collection.extend({
    model: Event,
	url: 'data/event.json'
});

// Vue - Event
// -----------
var EventView = Backbone.View.extend({
	initialize: function() {
		Events	= new EventList();
		Events.fetch();	
		
		_.bindAll(this);
		$(document).bind('keydown', this.eventDispatcher);
		
		// Keylogger pour Konami Events
		KEYS = [];
	},
	
	eventDispatcher: function(e) {
		// Check Interaction (panneau, objet, ...)
		if(e.keyCode==13) {
			var cible 	= getCoordsCible(player.getX(), player.getY(), player.get('orientation'));
			var x		= cible['x'];
			var y		= cible['y'];
			this.interaction(x,y);
			
			return true;
		}
		
		// Check Konami Code
		this.konami(e);
	},
	
	interaction: function(x,y) {
		Events.forEach(function(el) {
			var event 	= el.attributes;
			var type 	= event.type;
			var eventX 	= event.position.x;
			var eventY	= event.position.y;
			
			if(type=='notification') {	
				if(x==eventX && y==eventY) {
					var notif 			= event.notification;
					var notifType 		= notif.type;
					var notifMessage	= notif.message;
					
					$().toastmessage( 'showToast', {
						type: notifType,
						text: notifMessage
					});
				} 
			}
		});	
	},
	
	konami: function(e) {
		KEYS.push(e.keyCode);
		
		Events.forEach(function(el) {
			var event 	= el.attributes;
			var type 	= event.type;
			var konami 	= event.konami;
			
			// Un Konami Code correspond, on déclenche l'event
			if(KEYS.toString().indexOf(konami)>=0) {
				// Définit l'event en fonction de son type
				switch(type) {
					case 'musique':
						var musique = event.musique;
						audio.set('piste', musique.src);
						$().toastmessage(
							'showSuccessToast', 
							'<strong>Event débloqué</strong> - Bien joué, vous avez trouvé le konami code de <strong>'+musique.titre+'</strong> !'
						);
						if(musique.warning!=undefined) {
							setTimeout(function() {
								$().toastmessage(
									'showWarningToast', 
									'<strong>One more thing</strong> - '+musique.warning
								);
							}, musique.delai);
						}
						break;
					
					case 'konami':
						player.get('type')=='garcon' ? player.set('type', 'fille') : player.set('type', 'garcon');
						$().toastmessage(
							'showSuccessToast', 
							"<strong>Event débloqué</strong> - Bien joué, vous avez trouvé le <strong>KONAMI CODE</strong> !"
						);
						setTimeout(function() {
							$().toastmessage(
								'showWarningToast', 
								"<strong>One more thing</strong> - Au cas où vous vous poseriez la question... c'est réversible !"
							);
						}, 5000);
						break;
				}
				
				// Réinitialise le keylogger
				KEYS = [];
			}
		
		});
	}
});
