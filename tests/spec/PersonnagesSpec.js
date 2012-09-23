/*
|--------------------------------------------------------------------------
| TESTS SUR LES PERSONNAGES (PNJs, Player)
|--------------------------------------------------------------------------
*/
describe("Personnages", function() {
    beforeEach(function() {
    	$('body').append('<div id="wrapper"></div>');
        perso = new Personnage();
    });
    
    afterEach(function() {
	    $('#wrapper').remove();	
    });
    
    /* SPECS RUNNING */
    it("Can be created with defaults values for its attributes", function() {
        expect(perso.get('pseudo')).toBe("Sergio Flores");
    });
    
    it("Set passed attributes on the model instance when created", function() {
        persoWithAttributes = new Personnage({'pseudo': 'Aymi Li'});
        expect(persoWithAttributes.get('pseudo')).toBe('Aymi Li');
        expect(persoWithAttributes.get('type')).toBe('garcon');
    });
    
    /* SPECS TO PLAN */
    
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
    	
    	/* SPECS TO PLAN */
    	it("Should not be able to move through objects", function() {
    	
    	});
    	
    	it("Should not be able to move above map boundaries", function() {
    		
    	});
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
    	
    	
    	/* SPECS TO PLAN */
    	it("Should rotate by itself", function() {
    	
    	});
    	
    	it("Should rotate when interact with the player", function() {
    	
    	});
    	
    	it("Should be able to move vertically", function() {
    	
    	});
    	
    	it("Should be able to move horizontally", function() {
    	
    	});
    });
});