define([
  'jquery',
  'underscore',
  'backbone',
  'collections/records',
  'views/records',
  /* NOTREQ 'text!templates/stats.html',*/
  'text!templates/index.html',
  'common',
  'lib/utilities'
], function( $, _, Backbone, Records, RecordView, /*statsTemplate,*/ indexTemplate, Common, util ) {

  var AppView = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    //el: '#main',

    // Compile our stats template
    /*template: _.template( statsTemplate ),*/
    template: _.template( indexTemplate ),

    // Delegated events for creating new items, and clearing completed ones.
    events: {
      'click #addRecord':         'addRecord'
    },

    // At initialization we bind to the relevant events on the `Todos`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting todos that might be saved in *localStorage*.
    initialize: function() {
      console.log('app init');
      /*this.input = this.$('#new-todo');*/
      /*this.allCheckbox = this.$('#toggle-all')[0];*/
      /*this.$footer = this.$('#footer');
      this.$main = this.$('#main');*/

      Records.on( 'add', this.addOne, this );
      Records.on( 'reset', this.addAll, this );
      Records.on( "filter", this.filterAll, this);
      //Records.on( 'all', this.render, this );
      /*Records.on( 'change:completed', this.filterOne, this );*/

      /*this.$title = this.$("#recordTitle");
      this.$date = this.$("#recordDate");
      this.$category = this.$("#recordCategory");
      this.$amount = this.$("#recordAmount");*/

      //Initial populated values
      /*this.$("#recordDate").val(util.getTodayDate());*/
    },

    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function() {
      console.log('app render');
      var completed = Records.completed().length;
      var remaining = Records.remaining().length;

      /*if ( Records.length ) {
        this.$main.show();
        this.$footer.show();

        this.$('#filters li a')
          .removeClass('selected')
          .filter( '[href="#/' + ( Common.TodoFilter || '' ) + '"]' )
          .addClass('selected');
      } else {
        this.$main.hide();
        this.$footer.hide();
      }*/
      
      this.$el.html(this.template());
      return this;
    },

    fetchRecords: function(){
      console.log('fetchRecords');
      Records.fetch();
      Records.each(function(record){
        console.log('record: '+record);
      });
    },

    // Add a single todo item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function( record ) {
      console.log('app adOne');
      var view = new RecordView({ model: record });
      $('#spendtable table tbody').prepend( view.render().el );
    },

    // Add all items in the **Todos** collection at once.
    addAll: function() {
      console.log('app addAll');
      $('#spendtable table tbody').html('');
      Records.each(this.addOne, this);
    },

    filterOne : function (record) {
      //todo.trigger("visible");
    },

    filterAll : function () {
      Records.each(this.filterOne, this);
    },

    recordAttributes: function(){
      return {
        title: this.$("#recordTitle").val().trim(),
        date: this.$("#recordDate").val().trim(),
        category: this.$("#recordCategory").val().trim(),
        amount: parseFloat(this.$("#recordAmount").val().trim()).toFixed(2),
        order: Records.nextOrder()
      };
    },

    addRecord: function(e){
      console.log('app addRecord');
      e.preventDefault();
      var addResponse = Records.create( this.recordAttributes() );

      /*for(var z in addResponse.attributes){
        if(addResponse.attributes.hasOwnProperty(z)){
        console.log(addResponse.attributes[z]);
        }
      }*/

      if(addResponse){
        /*this.$title.val('').focus();
        this.$date.val(addResponse.attributes.date);
        this.$amount.val('');*/
      }
    }
  });

  return AppView;
});
