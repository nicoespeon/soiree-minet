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
		konami : '',
	    found: false
	},
	
	found: function() {
    	this.save({
        	found: true
    	});
	}
});

// Collection - Events
// -------------------
var EventList = Backbone.Collection.extend({
    model: Event,
    localStorage: new Backbone.LocalStorage('events'),
    
    found: function() {
        return this.filter(function(event) {
           return event.get('found'); 
        });
    },
    
    remaining: function() {
        return this.without.apply(this, this.found());
    }
});

// Vue - Event
// -----------
var EventView = Backbone.View.extend({
    events: {
        'click .info': 'info'
    },
    
	initialize: function() {
		Events	= new EventList();
		Events.fetch();
		
		// Récupère les donnée du fichier JSON
		$.ajax({
            url: 'data/event.json', 
            success: function(data) {
                // Si le localStorage n'est pas bon, on le remplit avec le fichier JSON
                if(Events.length!==data.length) {
                    Events.reset(data);
                    Events.each(function(event) {
                        event.save();
                    });
                }
            }  
        });
		
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
						
						// Affiche une notification si c'est la première fois (not found)
						if(!el.attributes.found) {
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
    				    }
    				    
    				    Events.getByCid(el.cid).found();
						break;
					
					case 'konami':
						player.get('type')=='garcon' ? player.set('type', 'fille') : player.set('type', 'garcon');
						
						// Affiche une notification si c'est la première fois (not found)
						if(!el.attributes.found) {
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
    				    }
    				    
    				    Events.getByCid(el.cid).found();
						break;
						
				    case 'bicyclette':
				        if(DUREE_DEPLACEMENT==400) {
				            DUREE_DEPLACEMENT=200;
				            SCROLL_OFFSET = 2;
				            audio.set('piste', 'city');
				            player.set('attributs', 'bicyclette');
				            
    						// Affiche une notification si c'est la première fois (not found)
    						if(!el.attributes.found) {
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
        				    }
        				    
        				    Events.getByCid(el.cid).found();
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
	},
	
	info: function() {
        var found       = Events.found().length;
        var total       = Events.length-Events.where({konami:''}).length;
        var prop        = found/total;
        var complement  = "As-tu essayé de parler aux PNJs ?";
        
        if(prop>0.4)    complement = "C'est pas mal, continue à chercher !";
        if(prop>0.9)    complement = "Tu les as presque tous, encore un petit effort !";
        if(prop==1)     complement = "Décidément, on ne peut rien te cacher...";
        
        notification('notice', '<strong>Information</strong> - Tu as trouvé '+found+'/'+total+' codes. '+complement);
	}
});
