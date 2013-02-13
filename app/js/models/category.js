define(['underscore', 
        'backbone', 
        'lib/utilities'], 
function( _, Backbone, util ){
  var CategoryModel = Backbone.Model.extend({
    initialize: function(){
      console.log('CategoryModel init');

    },
    defaults: {
      date: util.getTodayDate(),
      category: ''
    },
    validate: function(attributes){
      if(attributes.category === "" || attributes.category === undefined){
        console.log('Category name cannot be blank');
        return 'Category name cannot be blank';
      }
    }

  });

  return CategoryModel;
});