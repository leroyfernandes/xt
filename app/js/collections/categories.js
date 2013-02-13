define(['underscore', 
    'backbone', 
    'lib/backbone/localstorage', 
    'models/category'], 
function( _, Backbone, Store, Category ){
  var CategoriesCollection = Backbone.Collection.extend({

    model: Category,
    
    localStorage: new Store('xt-categories')
  });

  return new CategoriesCollection();
});