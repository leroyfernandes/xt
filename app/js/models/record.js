define(['underscore', 'backbone', 'lib/utilities'],function(_, Backbone, util){
  var RecordModel = Backbone.Model.extend({
    initialize: function(){
      console.log('Record created:'+ this.get('title'));
      this.on('change:title', function(){
        console.log('Record title changed: '+ this.get('title'));
      });
      this.on('change:amount', function(){
        console.log('Record title changed: '+ this.get('amount'));
      })
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
    }

  });

  return RecordModel;

})