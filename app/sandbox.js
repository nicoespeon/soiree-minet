// Sandbox
define([
  // Application.
  "app"
],

// Map dependencies from above array.
function(app) {

  // Create the sandbox
  var Sandbox = function(options) {
    this.initialize.apply(this, arguments);
  };

  // Facade for modules, coordinate their activity regarding app events
  _.extend(Sandbox.prototype, {
    initialize: function() {
      /* BIND GLOBAL EVENTS TO ACTIONS */
    }

    /*
      ACTIONS - COORDINATE MODULES ACTIVITY
     */
  });

  // Return the module for AMD compliance.
  return Sandbox;

});
