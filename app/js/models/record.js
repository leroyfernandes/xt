define(['underscore', 'backbone', 'lib/utilities'],function(_, Backbone, util){
  var RecordModel = Backbone.Model.extend({
    defaults: {
      date: util.getTodayDate(),
      title: '',
      category: 'N/A',
      amount: ""
    }
  });

  return RecordModel;

})