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
		type: 'notice'
	}
});

// Vue - Event
// -----------
var EventView = Backbone.View.extend({
	events: {
	
	},
	
	initialize: function() {
		_.bindAll(this);
		$(document).bind('keydown', this.konami);
		
		KEYS = [];
	},
	
	konami: function(e) {
		KEYS.push(e.keyCode);
		
		if(KEYS.toString().indexOf(KONAMI)>=0) {
			var genre = player.get('type');
			if(genre=="garcon") {
				player.set('type', 'fille');
			} else {
				player.set('type', 'garcon');
			}
			
			$().toastmessage('showSuccessToast', "<strong>Event débloqué</strong> - Bien joué, vous avez trouvé le <strong>KONAMI CODE</strong> !");
			
			setTimeout(function() {
				$().toastmessage('showWarningToast', "<strong>One more thing</strong> - Au cas où vous vous poseriez la question... c'est réversible !");
			}, 5000);
			
			KEYS = [];
		}
		
		else if(KEYS.toString().indexOf(CALLME)>=0) {
			audio.set('piste', 'call-me-maybe');
			$().toastmessage('showSuccessToast', '<strong>Event débloqué</strong> - Bien joué, vous avez trouvé le konami code de <strong>Call me maybe</strong> !');
			KEYS = [];
		}
		
		else if(KEYS.toString().indexOf(GANGNAM)>=0) {
			audio.set('piste', 'gangnam-style');
			$().toastmessage('showSuccessToast', '<strong>Event débloqué</strong> - Bien joué, vous avez trouvé le konami code de <strong>Gangnam Style</strong> !');
			KEYS = [];
		}
		
		else if(KEYS.toString().indexOf(NYAN)>=0) {
			audio.set('piste', 'nyan-cat');
			$().toastmessage('showSuccessToast', '<strong>Event débloqué</strong> - Bien joué, vous avez trouvé le konami code de <strong>Nyan Cat</strong> !');
			KEYS = [];
		}
		
		else if(KEYS.toString().indexOf(SPECIAL)>=0) {
			audio.set('piste', 'rickroll');
			$().toastmessage('showSuccessToast', '<strong>Event débloqué</strong> - Bien joué, vous avez trouvé le konami code de <strong>Rick Roll</strong> !');
			
			setTimeout(function() {
				$().toastmessage('showWarningToast', '<strong>One more thing</strong> - Vous venez de vous faire Rick Rolled...');
			}, 5000);
			
			KEYS = [];
		}
		
		else if(KEYS.toString().indexOf(EPIC)>=0) {
			audio.set('piste', 'epic-sax');
			$().toastmessage('showSuccessToast', '<strong>Event débloqué</strong> - Bien joué, vous avez trouvé le konami code de <strong>Epic Sax</strong> !');
			
			setTimeout(function() {
				$().toastmessage('showWarningToast', "<strong>One more thing</strong> - J'ai développé le site, vous pensiez vraiment que vous alliez y échapper ?");
			}, 5000);
			
			KEYS = [];
		}
		
		else if(KEYS.toString().indexOf(GBAR)>=0) {
			audio.set('piste', 'gay-bar');
			$().toastmessage('showSuccessToast', '<strong>Event débloqué</strong> - Bien joué, vous avez trouvé le konami code de <strong>Gay Bar</strong> !');
			
			KEYS = [];
		}
	}
});
