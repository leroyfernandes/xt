// Require.js allows us to configure shortcut alias
require.config({
  paths: {
    jquery: 'lib/jquery/jquery.min',
    underscore: 'assets/lodash.min',
    backbone: 'lib/backbone/backbone',
    text: 'lib/require/text',

    bootstrapjs: 'lib/bootstrap/bootstrap'

  },
  // The shim config allows us to configure dependencies for
  // scripts that do not call define() to register a module
  shim: {
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: [
        'underscore',
        'jquery'
      ],
      exports: 'Backbone'
    },
    'bootstrapjs': {
      deps: [
        'jquery'
      ],
      exports: 'BootstrapJS'
    }
  }
});

require([
  'views/app',
  'routers/router'
], function( AppView, Workspace ) {
  // Initialize routing and start Backbone.history()
  new Workspace();

  // Initialize the application view
  new AppView();

  Backbone.history.start();
});
