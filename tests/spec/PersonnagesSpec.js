/*
|--------------------------------------------------------------------------
| TESTS SUR LES PERSONNAGES (PNJs, Player)
|--------------------------------------------------------------------------
*/
describe("Personnages", function() {
    beforeEach(function() {
    	$('body').append('<div id="wrapper"></div>');
        perso = new Personnage();
    	persoWithCoords = new Personnage({'position':[1,2]});
    });
    
    afterEach(function() {
	    $('#wrapper').remove();	
    });
    
    /* SPECS RUNNING */
    it("Can be created with defaults values for its attributes", function() {
        expect(perso.get('pseudo')).toBe("Sergio Flores");
    });
    
    it("Set passed attributes on the model instance when created", function() {
        var persoWithAttributes = new Personnage({'pseudo': 'Aymi Li'});
        expect(persoWithAttributes.get('pseudo')).toBe('Aymi Li');
        expect(persoWithAttributes.get('type')).toBe('garcon');
    });
    
    it("Should implement a function to get x-coord", function() {
    	var x = persoWithCoords.getX();
    	expect(x).toBe(1);
    });
    
    it("Should implement a function to get y-coord", function() {
    	var y = persoWithCoords.getY();
    	expect(y).toBe(2);
    });
    
    it("Should implement a function to set x-coord", function() {
    	persoWithCoords.setX(3);
    	var x = persoWithCoords.get('position')[0];
    	expect(x).toBe(3);
    });
    
    it("Should implement a function to set y-coord", function() {
    	persoWithCoords.setY(4);
    	var y = persoWithCoords.get('position')[1];
    	expect(y).toBe(4);
    });
    
    it("Should keep its attributes integrity", function() {
    	var orientation = perso.get('orientation');
    	var x = perso.get('position')[0];
    	var y = perso.get('position')[1];
    
       	perso.set({'orientation':-1});
    	expect(perso.get('orientation')).toBe(orientation);
    	
       	perso.set({'orientation':5});
    	expect(perso.get('orientation')).toBe(orientation);
    	
       	perso.set({'orientation':'char'});
    	expect(perso.get('orientation')).toBe(orientation);
    	
       	perso.set({'position':[0,0]});
    	expect(perso.get('position')[0]).toBe(x);
    	expect(perso.get('position')[1]).toBe(y);
    	
       	perso.set({'position':[-1,-1]});
    	expect(perso.get('position')[0]).toBe(x);
    	expect(perso.get('position')[1]).toBe(y);
    	
       	perso.set({'position':[41,101]});
    	expect(perso.get('position')[0]).toBe(x);
    	expect(perso.get('position')[1]).toBe(y);
    	
       	perso.set({'position':['charX','charY']});
    	expect(perso.get('position')[0]).toBe(x);
    	expect(perso.get('position')[1]).toBe(y);
    })
    
    /* SPECS TO PLAN 
    
    */
    
    // Tests sur le joueur 
    // -------------------
    describe("Tests for Player", function() {
    	beforeEach(function() {
    		player = new PlayerView({model: perso, el: $('#wrapper')});
    	});
    	
    	afterEach(function() {
	    	player.remove();
    	});
    	
    	/* SPECS RUNNING */
	    it("Should be loaded at its initial position on the map", function() {
	    	expect(player.$el.children()).toBe('div#player');
	    	expect(player.el.innerHTML).toContain('data-x');
	    	expect(player.el.innerHTML).toContain('data-y');
	    });
    	
    	it("Should move on keydown {gauche:37, haut:38, droite:39, bas:40)", function() {
    		var e = $.Event('keydown');
    		
	    	for(var i=37;i<=40;i++) {
	    		var spy = jasmine.createSpy('deplacement quand keydown vaut '+i);
	    		perso.on('change', spy);
		    	e.keyCode = i;
		    	$('body').trigger(e);
	    		expect(spy).toHaveBeenCalled();
	    	}
    	});
    	
    	it("Should not be able to move through objects", function() {
    		var e = $.Event('keydown');
    		perso.set({'position':[0,0]});
    		
    		//Placer un obstacle à {x,y}
    		var collisions 		= [];
    		collisions[0] 		= [];
    		collisions[0][1] 	= 0;
    		
    		//Faire se déplacer le player sur {x,y}
    		e.keyCode = 39;
    		$('body').trigger(e);
    		
    		//Vérifier les coordonnées du personnage
    		expect(perso.get('position')).toBe([0,0]);
    	});
    	
    	it("Should not be able to move above map boundaries", function() {
    		var e = $.Event('keydown');
    		
    		// Player en {0,0}
    		// ---------------
    		perso.set({'position':[0,0]});
    		
    		//Faire se déplacer le player sur {101,41}
    		e.keyCode = 37;
    		$('body').trigger(e);
    		e.keyCode = 38;
    		$('body').trigger(e);
    		
    		//Vérifier les coordonnées du personnage
    		expect(perso.get('position')).toBe([0,0]);
    		
    		// Player en {100,40}
    		// ------------------
    		perso.set({'position':[100,40]});
    		
    		//Faire se déplacer le player sur {101,41}
    		e.keyCode = 39;
    		$('body').trigger(e);
    		e.keyCode = 40;
    		$('body').trigger(e);
    		
    		//Vérifier les coordonnées du personnage
    		expect(perso.get('position')).toBe([100,40]);
    	});
    	
    	/* SPECS TO PLAN 
    	it("Should rotate accordingly to the direction of its move", function() {
    	
    	});
    	
    	
    	*/
    });
    
    // Tests sur les PNJs 
    // ------------------
    describe("Tests for PNJs", function() {
    	beforeEach(function() {
    		$('#wrapper').append('<ul id="pnjs"></ul>');
    		pnj = new PNJView({model: perso});
    		$('#pnjs').append(pnj.render());
    	});
    	
    	afterEach(function() {
    		pnj.remove();
    		$('#pnjs').remove();
    	});
    	
    	/* SPECS RUNNING */
    	it("Should be a li element", function() {
    		expect(pnj.el.tagName.toLowerCase()).toBe('li');
    	});
    	
	    it("Should be loaded at its initial position on the map", function() {
	    	expect(pnj.el.innerHTML).toContain('data-x');
	    	expect(pnj.el.innerHTML).toContain('data-y');
	    });
    	
    	it("Should have a div children with 'pnj' and its type value as classes", function() {
	    	expect(pnj.$el.children()).toBe('div');
    		expect(pnj.$el.children()).toHaveClass('pnj');
    		expect(pnj.$el.children()).toHaveClass(pnj.model.get('type'));
    	})
    	
    	
    	/* SPECS TO PLAN 
    	
    	it("Should rotate by itself", function() {
    	
    	});
    	
    	it("Should rotate when interact with the player", function() {
    	
    	});
    	
    	it("Should be able to move vertically", function() {
    	
    	});
    	
    	it("Should be able to move horizontally", function() {
    	
    	});
    	
    	*/
    });
});