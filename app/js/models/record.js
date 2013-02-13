define(['underscore', 'backbone', 'lib/utilities'],function( _, Backbone, util ){
  var RecordModel = Backbone.Model.extend({
    initialize: function(){
      console.log('RecordModel init');

      this.on('change:title', function(){
        console.log('Record title changed: '+ this.get('title'));
      });
      this.on('change:amount', function(){
        console.log('Record title changed: '+ this.get('amount'));
      });
    },
    defaults: {
      date: util.getTodayDate(),
      title: '',
      category: 'N/A'
    },
    validate: function(attributes){
      if(attributes.title === "" || attributes.title === undefined){
        console.log('Record title cannot be blank');
        return 'Record title cannot be blank';
      }

      if(attributes.date === "" || attributes.date === undefined){
        console.log('Record date cannot be blank');
        return 'Record date cannot be blank';
      }

      if(attributes.category === "" || attributes.category === "0"){
        console.log('Record category cannot be blank');
        return 'Record category cannot be blank';
      }

      if(attributes.amount === "" || attributes.amount < 0 || attributes.amount === "NaN"){
        console.log('Record amount cannot be blank');
        return 'Record amount cannot be blank';
      }
    }
  });
  return RecordModel;
});