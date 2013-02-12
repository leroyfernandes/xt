define([
  'jquery',
  'backbone',
  'collections/records',
  'common'
], function( $, Backbone, Records, Common ) {

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
      console.log('router: onSettings');
      $('li, ul.nav').removeClass('active')
        .end().find('#liSettings').addClass('active');
    }
  });

  return Workspace;
});
