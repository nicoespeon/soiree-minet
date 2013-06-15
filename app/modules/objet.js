/*
|--------------------------------------------------------------------------
| OBJET SCRIPT
|--------------------------------------------------------------------------
|
| Script de gestion des objets
|
*/

/*
|--------------------------------------------------------------------------
| MODELE & COLLECTIONS
|--------------------------------------------------------------------------
*/

// Model - Objet
// ------------------
var Objet = Backbone.Model.extend({
	defaults: {
		name: '',
		type: '',
		actif: true,
		ramassable: false,
		position: [0,0]
	},
	
	// Intégrité des attributs
	validate: function(att) {
		
		if(att.position) {
			if(att.position[0]<1 || att.position[0]>40)	{
				return "La coordonnée X est comprise entre 1 et 40 !";
			}
			
			if(att.position[1]<1 || att.position[1]>100)	{
				return "La coordonnée Y est comprise entre 1 et 100 !";
			}
			
			if(isNaN(att.position[0]) || isNaN(att.position[1])) {
				return "Les coordonnées de l'objet sont des valeurs numériques !";
			}
		}
	},

	// Getters
	getX: function() {
		return this.get('position')[0];
	},
	
	getY: function() {
		return this.get('position')[1];
	},
	
	estRamassable: function(){
		return this.get('ramassable');
	},
	
	estActif: function(){
		return this.get('actif');
	}
});

// Collection - Objet
// ----------------
var ObjetList = Backbone.Collection.extend({
    model: Objet,
	url: 'data/objet.json'
});

// Vue - Objet
// ----------
var ObjetView = Backbone.View.extend({
	tagName: 'li',
	
	template: _.template($('#objet-template').html()),
	
	initialize: function() {
		_.bindAll(this);
		if(this.model.estRamassable())
			$(document).bind('keydown', this.pickedUp);
		
		COLLISIONS[this.model.getX()][this.model.getY()] = '0';
		
		this.model.on('change', this.render, this);
	},
	
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		
		// Positionne l'élément sur la map
		var elt = this.$el.children();
		var x = elt.data('x');
		var y = elt.data('y');
		positionne(elt,x,y);
	
		return this;
	},
	
	pickedUp: function(e){
		if(e.keyCode=='13') {
			var direction 	= player.get('orientation');
			var cible 		= getCoordsCible(player.getX(), player.getY(), direction);
			var xCible 		= cible['x'];
			var yCible 		= cible['y'];
			
			if(this.model.getX()==xCible && this.model.getY()==yCible) {
				if(this.model.estRamassable() && this.model.estActif()) {
					// Rend inactif
					this.model.set({'actif':false});
					
					// Retire la collision
					COLLISIONS[this.model.getX()][this.model.getY()] = '1';
					
					// Retire l'objet de la map
					var elt = this.$el.children();
					elt.remove();
					
					// Action spécifique liée à l'objet (quête...)
					switch(this.model.get('type')) {
						case 'key':
						    notification(
    							'notice',
    							'<strong>Objet ramassé</strong> - Vous avez trouvé la clé de la porte !'
    						);
							break;
					}
				}
			}
		}
	}


});