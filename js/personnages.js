/*
|--------------------------------------------------------------------------
| PERSONNAGES SCRIPT
|--------------------------------------------------------------------------
|
| Script de gestion des personnages (PNJ, Player)
|
*/

/*
|--------------------------------------------------------------------------
| MODELE & COLLECTIONS
|--------------------------------------------------------------------------
*/

// Model - Personnage
// ------------------
var Personnage = Backbone.Model.extend({
	defaults: {
		type: 'garcon',
		pseudo: 'Sergio Flores',
		orientation: 0,
		position: [23,4],
		limits: [0,1,2,3],
		frame: 0,
		texte: ["La soirée MiNET arrive... J'ai hâte !"]
	},
	
	// Intégrité des attributs
	validate: function(att) {
		if(att.orientation) {
			if(att.orientation<0 || att.orientation>3) {
				return "L'orientation du personnage ne peut être comprise qu'entre 0 et 3 !";
			}
			
			if(isNaN(att.orientation)) {
				return "L'orientation du personnage est une valeur numérique !";
			}
		}
		
		if(att.position) {
			if(att.position[0]<1 || att.position[0]>40)	{
				return "La coordonnée X est comprise entre 1 et 40 !";
			}
			
			if(att.position[1]<1 || att.position[1]>100)	{
				return "La coordonnée Y est comprise entre 1 et 100 !";
			}
			
			if(isNaN(att.position[0]) || isNaN(att.position[1])) {
				return "Les coordonnées du personnage sont des valeurs numériques !";
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
	
	// Setters
	setX: function(x) {
		return this.set({'position':[x,this.getY()]});
	},
	
	setY: function(y) {
		return this.set({'position':[this.getX(),y]});
	}
});

// Collection - PNJ
// ----------------
var PNJList = Backbone.Collection.extend({
    model: Personnage,
	url: 'data/pnj.json'
});


/*
|--------------------------------------------------------------------------
| VUES (Player, PNJ, Personnages)
|--------------------------------------------------------------------------
*/

// Vue - Player
// ------------
var PlayerView = Backbone.View.extend({
	// Le joueur est rattaché à la zone de jeu
	el: $('#wrapper'),
	
	// Selon un template particulier
	template: _.template($('#player-template').html()),
	
	initialize: function() {
		_.bindAll(this);
		$(document).bind('keydown', this.move);
		
		this.model.on('change', this.render, this);
		this.model.on('change:position', this.scroll, this);
		
		this.render();
		this.etat = 1;
		
		// Scroll initial
		var inst = this;
		setTimeout(function() {
			inst.scroll();
		}, 1000);
	},
	
	render: function() {
		$('#player').remove();
		this.$el.append(this.template(this.model.toJSON()));
		
		// Positionne l'élément sur la map
		var elt = $('#player');
		var x = elt.data('x');
		var y = elt.data('y');
		positionne(elt,x,y);
		
		return this;
	},
	
	move: function(e) {
		// Scroll (même si pas de déplacement)
		this.scroll();
			
		// Annule le déplacement si un est déjà en cours
		if(ISMOVING) {
			return false;
		} 
		
		// Variables initiales
		var zIndex 	= $('#player').css('z-index');
		var canMove = false;
		var moveKey = true;
		
		// ETAPE 1 - On repère la touche enfoncée et on prépare les nouvelles coordonnées
		switch(e.keyCode) {
			case 37:
				//Gauche
				e.preventDefault();
				this.model.set({'orientation':1});
				break;
				
			case 38:
				//Haut
				e.preventDefault();
				this.model.set({'orientation':3});
				break;
			
			case 39:
				//Droite
				e.preventDefault();
				this.model.set({'orientation':2});
				break;
				
			case 40:
				//Bas
				e.preventDefault();
				this.model.set({'orientation':0});
				break;
			
			default:
				moveKey = false;
				break;
		}
		
		// Maintient l'état du z-index après changement d'orientation
		$('#player').css('z-index', zIndex);	
		
		var cible 		= getCoordsCible(this.model.getX(), this.model.getY(), this.model.get('orientation'));
		var xCible 		= cible['x'];
		var yCible 		= cible['y'];
		canMove 		= this.canMoveTo(xCible, yCible);
		isUpper 		= this.canMoveTo(xCible, yCible+1);
		
		// ETAPE 2 - On déplace le personnage si c'est possible
		if(canMove===true && moveKey===true && ISSCROLLING===false) {
			ISMOVING = true;
			this.moveAnimation(isUpper);
		}
	},
	
	canMoveTo: function(x,y) {
		if(x>0 && x<41 && y>0 && y<101) {
			if(COLLISIONS.length!=41 || COLLISIONS[x].length!=101) {
				// Si la map des collisions n'est pas complète, on ne se déplace pas
				return false;
			} else {
				// Sinon, on check la case ciblée
				var col = COLLISIONS[x][y];
			}
			
			if(col=='1') {
				return true;
			}
			
			return false;
		}
		
		return false;
	},
	
	moveAnimation: function(isUpper) {
		var inst 		= this;								// Pour la portée de this dans la fonction animate()
        var decalage 	= 1/NB_FRAMES;						// Déplacement pour un pas
        var frame 		= this.etat%NB_FRAMES;				// Frame à afficher
        var zIndex 		= $('#player').css('z-index');		// z-index du player pour superposition avec pnj

        if(this.etat<=NB_FRAMES) {
        	// Déplace le personnage selon le nombre de frames indiqué
	        var x = this.model.getX();
	        var y = this.model.getY();
	        var direction = this.model.get('orientation');
	
	        switch(direction) {
	            case 0:
	            	y += decalage;
	                break;
	
	            case 1:
                    x -= decalage;
                    break;
	
	            case 2:
                    x += decalage;
                    break;
	
	            case 3:
                    y -= decalage;
                    break;
	        }
	
	        // Anime le déplacement du player jusqu'à la prochaine frame
	        $('#player').animate({
	            top: tileToPx(y)+'px',
	            left: tileToPx(x)+'px'
	        }, DUREE_DEPLACEMENT/NB_FRAMES, function() {
	            inst.model.set({'position':[Math.floor(x*100)/100,Math.floor(y*100)/100],'frame':frame});
	        	if(!isUpper) {
					$('#player').css('z-index', '10');
				}
				if(zIndex=='10' && frame<3) {
					// Laisse le temps au personnage de se "dégager" de l'obstacle avant de le repasser par-dessus
					$('#player').css('z-index', '10');
				}
	            inst.etat++;
	            inst.moveAnimation(isUpper);
	        });
        } else {
        	// Sinon on désactive l'animation
            this.etat 	= 1;
            ISMOVING 	= false;
        }
	
	},
	
	scroll: function() {
		// Orientation du personnage
	    var orientation 	= this.model.get('orientation');
	    
		// Marge limite avant scroll
	    var offsetIn 		= 5;
	    
	    // Coordonnées du joueur
	    var x 				= this.model.getX();
	    var y 				= this.model.getY();
	    
	    // Dimensions de l'écran
	    var winHeight 		= $(window).height();
	    var winWidth 		= $(window).width();
	    var winMidHeight 	= pxToTile(winHeight/2);
	    var winMidWidth 	= pxToTile(winWidth/2);
	
	    // Offset de l'écran par rapport à [0,0]
	    var offsetWin 		= $('html, body').offset();
	    var offsetX 		= -pxToTile(offsetWin.left);
	    var offsetY 		= -pxToTile(offsetWin.top);
	    
	    // Position de la cible par rapport à l'écran
	    var winX 			= x-offsetX;
	    var winY 			= y-offsetY;
	    
	    // Ecart de la position de la cible par rapport au centre
	    var ecartX 			= Math.abs(winMidWidth-winX);
	    var ecartY 			= Math.abs(winMidHeight-winY);
	    var ecartMaxX 		= winMidWidth-offsetIn;
	    var ecartMaxY 		= winMidHeight-offsetIn;
	    
	    if(winX < 0 || tileToPx(winX) > winWidth) {
	    	// Si l'écran est plus loin que la cible, on scroll jusqu'à elle
	    	scroll('horizontal', tileToPx(x-offsetIn));
	    } else if(ecartX > ecartMaxX) {
	    	// Sinon, si la cible atteint la marge limite, on scroll
	        if(orientation==1) {
	            scroll('horizontal', tileToPx(offsetX-ecartMaxX+1));
	        } else if(orientation==2) {
	            scroll('horizontal', tileToPx(offsetX+ecartMaxX+1));
	        }
	    }
	
	    if(winY < 0 || tileToPx(winY) > winHeight) {
	    	// Si l'écran est plus loin que la cible, on scroll en arrière
	        scroll('vertical', tileToPx(y-offsetIn));
	    } else if(ecartY > ecartMaxY) {
	    	// Sinon, si la cible atteint la marge limite, on scroll
	        if(orientation==3) {
	            scroll('vertical', tileToPx(offsetY-ecartMaxY+1));
	        } else if(orientation==0 && y > offsetIn) {
	            scroll('vertical', tileToPx(offsetY+ecartMaxY+1));
	        }
	    }
	}
});

// Vue - PNJ
// ----------
var PNJView = Backbone.View.extend({
	tagName: 'li',
	
	template: _.template($('#pnj-template').html()),
	
	initialize: function() {
		_.bindAll(this);
		$(document).bind('keydown', this.parle);
		
		COLLISIONS[this.model.getX()][this.model.getY()] = '0';
		this.autoRotate();
		
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
	
	rotate: function(orientation) {
		this.model.set({'orientation':orientation});
	},

	// Rotation spontannée aléatoire des PNJs
	autoRotate: function() {
		// Pour le scope de this dans setInterval
		var thisPNJ = this;
		
		// Définit les orientations possibles
		var limits = [];
		for(var i=0;i<4;i++) {
			if($.inArray(i,this.model.get('limits'))!=-1) {
				limits.push(i);
			}
		}
		
		setInterval(
			function() {
				var orientation = limits[Math.floor(Math.random()*limits.length)];
				thisPNJ.rotate(orientation);
			}, Math.floor(Math.random()*(10000) + 5000)
		);
	},
	
	parle: function(e) {
		if(e.keyCode=='13') {
			var direction 	= player.get('orientation');
			var cible 		= getCoordsCible(player.getX(), player.getY(), direction);
			var xCible 		= cible['x'];
			var yCible 		= cible['y'];
			
			if(this.model.getX()==xCible && this.model.getY()==yCible) {
				switch(direction) {
					case 0:
						this.model.set('orientation', 3);
						break;
						
					case 1:
						this.model.set('orientation', 2);
						break;
						
					case 2:
						this.model.set('orientation', 1);
						break;
						
					case 3:
						this.model.set('orientation', 0);
						break;
				}
				
				var texte = this.model.get('texte')[0];
				notification('notice', '<strong>'+this.model.get('pseudo')+'</strong> - '+texte);
				
				var nouveauTexte = [];
				for(var i=1; i<this.model.get('texte').length; i++) {
					nouveauTexte.push(this.model.get('texte')[i]);
				}
				nouveauTexte.push(texte);
				
				this.model.set('texte', nouveauTexte);
			}
		}
	}
});
