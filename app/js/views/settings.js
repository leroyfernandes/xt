define([
  'jquery',
  'underscore',
  'backbone',
  'collections/categories',
  'text!templates/settings.html',
  'common',
  'lib/utilities',
  'views/categories'
], function( $, _, Backbone, Categories, settingsTemplate, Common, util, CategoryListView ) {

  var SettingsView = Backbone.View.extend({

    template: _.template( settingsTemplate ),

    events: {
      'click #addCategory': 'addCategory'
    },

    initialize: function(){
      console.log('settings init');

      Categories.on( 'add', this.addOne, this );
      Categories.on( 'reset', this.addAll, this );
      //Categories.on( 'all', this.addAll, this );

      
    },

    render: function(){
      console.log('settings render');
      this.$el.html( this.template() );

      return this;
    },

    fetchCategories: function(){
      Categories.fetch();
    },

    addOne: function( category ) {
      console.log('settings addOne: '+category.attributes.category);

      var view = new CategoryListView({ model: category });
      $('#list-categories .categoriesList').prepend( view.render().el );
    },

    addAll: function() {
      console.log('settings addAll');
      $('#list-categories .categoriesList').html('');
      
      Categories.each(this.addOne, this);

      if(true){
        console.log('tr');
      }
    },

    categoryAttributes: function(){
      return {
        category: this.$('#categoryName').val().trim()
      };
    },

    addCategory: function(e){
      e.preventDefault();
      console.log('settings addCategory1');

      var addResponse = Categories.create( this.categoryAttributes() );

      for(var z in addResponse.attributes){
        if(addResponse.attributes.hasOwnProperty(z)){
          console.log(addResponse.attributes[z]);
        }
      }

      if(addResponse){
        this.$('#categoryName').val('').focus();
      } 
    }



  });

  return SettingsView;
});
