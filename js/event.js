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
			y : '0'
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
		
		// Déplacement (Move)
		
		// Check Konami Code
		this.konami(e);
	},
	
	interaction: function(x,y) {
		Events.forEach(function(el) {
			var event 	= el.attributes;
			var type 	= event.type;
			var eventX 	= event.position.x;
			var eventY	= event.position.y;
			
			if(x==eventX && y==eventY) {
				switch(type) {
					case 'notification':
						var notif 			= event.notification;
						var notifType 		= notif.type;
						var notifMessage	= notif.message;
						
						notification(notifType,notifMessage);
						break;
					
					case 'social':
						var pc = $('#pc');
						pc.addClass('on');
						
						if(pc.hasClass('on')) {
							var texte = $('#social').html();
							setTimeout(function() {
								$.colorbox({
									html: texte,
									title : 'Facebook & Twitter',
									innerWidth: '600px',
									maxHeight: '90%'
								});
							}, 500);
						}
						
						$(document).bind('cbox_closed', function() {
							setTimeout(function() {
								pc.removeClass('on');
							}, 500);
						});
						
						break;
				    
				    case 'twitter':
				        notification('notice', 'Tweeeeeeeet ! Tweeeeeeet ! Tweeeeeet Me, I\'m Famous !'+$('#forest-tweet').html());	        
				        break;
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
			if(konami.length>0 && KEYS.toString().indexOf(konami)>=0) {
				// Définit l'event en fonction de son type
				switch(type) {
					case 'musique':
						var musique 	= event.musique;
						var complement	= ', monte le son';
						
						if(ISPLAYING)	complement = '';
						
						audio.set('piste', musique.src);
						notification(
							'success',
							'<strong>Event débloqué</strong> - Bien joué, tu as trouvé le konami code de <strong>'+musique.titre+'</strong>'+complement+' !'
						);
						
						if(musique.warning!=undefined) {
							setTimeout(function() {
								notification(
									'warning',
									'<strong>One more thing</strong> - '+musique.warning
								);
							}, musique.delai);
						}
						break;
					
					case 'konami':
						player.get('type')=='garcon' ? player.set('type', 'fille') : player.set('type', 'garcon');
						notification(
							'success',
							"<strong>Event débloqué</strong> - Bien joué, tu as trouvé le <strong>KONAMI CODE</strong> !"
						);
						setTimeout(function() {
							notification(
								'warning',
								"<strong>One more thing</strong> - Au cas où tu te poserais la question... c'est réversible !"
							);
						}, 5000);
						break;
						
				    case 'bicyclette':
				        if(DUREE_DEPLACEMENT==400) {
				            DUREE_DEPLACEMENT=200;
				            SCROLL_OFFSET = 2;
				            audio.set('piste', 'city');
				            player.set('attributs', 'bicyclette');
				            
    				        notification(
    							'success',
    							"<strong>Event débloqué</strong> - Bien joué, tu as trouvé le <strong>BICYCLETTE CODE</strong> !"
    						);
    						
    						setTimeout(function() {
    							notification(
    								'warning',
    								"<strong>One more thing</strong> - Au cas où tu te poserais la question... c'est réversible !"
    							);
    						}, 5000);
				        } else {
				            DUREE_DEPLACEMENT=400;
				            SCROLL_OFFSET = 3;
				            audio.set('piste', 'partyrock');
				            player.set('attributs', '');
				        }
				        break;
						
				    case 'video':
				        var video   = event.video;
				        var titre   = video.titre;
				        var texte   = '<iframe width="853" height="480" src="'+video.src+'" frameborder="0" allowfullscreen></iframe>';
				        
				        // Coupe la musique si elle est allumée
				        if($('#audio').hasClass('play')) {
    				        $('#audio').trigger('click');   
				        }
				        
						$.colorbox({
							html: texte,
							title : titre
						});
				        break;
				}
				
				// Réinitialise le keylogger
				KEYS = [];
			}
		
		});
	}
});
