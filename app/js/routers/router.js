define([
  'jquery',
  'backbone',
  'collections/records',
  'views/app',
  'views/settings',
  'common'
], function( $, Backbone, Records, AppView, SettingsView, Common ) {

  var Workspace = Backbone.Router.extend({
    routes:{
      //'*filter': 'setFilter',
      '':'main',
      'records': 'main',
      'reports': 'onReports',
      'settings': 'onSettings'
    },

    main: function(){
      console.log('router: main2');
      $('li, ul.nav').removeClass('active')
        .end().find('#liRecords').addClass('active');

      var view = new AppView();
      $('#holderMain').html( view.render().el );
      view.fetchRecords();

    },

    setFilter: function( param ) {
      // Set the current filter to be used
      Common.TodoFilter = param.trim() || '';

      //Trigger a collection filter event, causing hiding/unhiding
      // of the Todo view items
      Records.trigger('filter');
    },

    onReports: function(){
      console.log('router: onReports');
      $('li, ul.nav').removeClass('active')
        .end().find('#liReports').addClass('active');
    },

    onSettings: function(){
      console.log('router: onSettings2');
      $('li, ul.nav').removeClass('active')
        .end().find('#liSettings').addClass('active');

      var view = new SettingsView();
      $('#holderMain').html( view.render().el );
      view.fetchCategories();
    }
  });

  return Workspace;
});
