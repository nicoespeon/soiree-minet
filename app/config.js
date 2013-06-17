// Set the require.js configuration for your application.
require.config({

  // Initialize the application with the main application file and the JamJS
  // generated configuration file.
  deps: ["../vendor/jam/require.config", "main"],

  paths: {
    "localstorage": "/vendor/plugins/backbone/backbone.localstorage",
    "colorbox":     "/vendor/plugins/jquery/colorbox",
    "toastmessage": "/vendor/plugins/jquery/toastmessage",
    "buzz":         "/vendor/plugins/buzz"
  },

  shim: {
    "localstorage": {
      "deps": [ "backbone" ],
      "exports": "Backbone.LocalStorage"
    },
    "colorbox": {
      "deps": [ "jquery" ],
      "exports": "Colorbox"
    },
    "toastmessage": {
      "deps": [ "jquery" ],
      "exports": "Toast"
    }
  }

});
