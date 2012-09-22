describe("Personnages", function() {
    var player;
    var pnj;
    
    describe("Tests for Player", function() {
        beforeEach(function() {
            player = new Personnage();
        });
        
        it("Can be created with defaults values for its attributes", function() {
            expect(player.get('pseudo')).toBe("Sergio Flores");
        });
        
        it("Set passed attributes on the model instance when created", function() {
            player2 = new Personnage({'pseudo': 'Aymi Li'});
            expect(player2.get('pseudo')).toBe('Aymi Li');
            expect(player2.get('type')).toBe('garcon');
        });
    });
});