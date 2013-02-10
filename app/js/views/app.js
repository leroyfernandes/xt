define([
    'jquery',
    'underscore',
    'backbone',
    'collections/records',
    'views/records',
    /* NOTREQ 'text!templates/stats.html',*/
    'common',
    'lib/utilities'
], function( $, _, Backbone, Records, RecordView, /*statsTemplate,*/ Common, util ) {

    var AppView = Backbone.View.extend({

        // Instead of generating a new element, bind to the existing skeleton of
        // the App already present in the HTML.
        el: '#main',

        // Compile our stats template
        /*template: _.template( statsTemplate ),*/

        // Delegated events for creating new items, and clearing completed ones.
        events: {
            'click #addRecord':         'addRecord'
        },

        // At initialization we bind to the relevant events on the `Todos`
        // collection, when items are added or changed. Kick things off by
        // loading any preexisting todos that might be saved in *localStorage*.
        initialize: function() {
            /*this.input = this.$('#new-todo');*/
            /*this.allCheckbox = this.$('#toggle-all')[0];*/
            this.$footer = this.$('#footer');
            this.$main = this.$('#main');

            Records.on( 'add', this.addOne, this );
            Records.on( 'reset', this.addAll, this );
            /*Records.on( 'change:completed', this.filterOne, this );*/
            Records.on( "filter", this.filterAll, this);
            Records.on( 'all', this.render, this );

            Records.fetch();

            this.$title = this.$("#recordTitle");
            this.$date = this.$("#recordDate");
            this.$category = this.$("#recordCategory");
            this.$amount = this.$("#recordAmount");

            //Initial populated values
            this.$date.val(util.getTodayDate());
        },

        // Re-rendering the App just means refreshing the statistics -- the rest
        // of the app doesn't change.
        render: function() {
            var completed = Records.completed().length;
            var remaining = Records.remaining().length;

            if ( Records.length ) {
                this.$main.show();
                this.$footer.show();

                this.$('#filters li a')
                    .removeClass('selected')
                    .filter( '[href="#/' + ( Common.TodoFilter || '' ) + '"]' )
                    .addClass('selected');
            } else {
                this.$main.hide();
                this.$footer.hide();
            }

        },

        // Add a single todo item to the list by creating a view for it, and
        // appending its element to the `<ul>`.
        addOne: function( record ) {
            var view = new RecordView({ model: record });
            $('#spendtable table tbody').prepend( view.render().el );
        },

        // Add all items in the **Todos** collection at once.
        addAll: function() {
            console.log('addAll');
            this.$('#spendtable table tbody').html('');
            Records.each(this.addOne, this);
        },

        filterOne : function (record) {
            todo.trigger("visible");
        },

        filterAll : function () {
            Records.each(this.filterOne, this);
        },

        recordAttributes: function(){
            return {
              title: this.$title.val().trim(),
              date: this.$date.val().trim(),
              category: this.$category.val().trim(),
              amount: parseFloat(this.$amount.val().trim()).toFixed(2),
              order: Records.nextOrder()
            }
        },

        addRecord: function(e){
            e.preventDefault();
            Records.create( this.recordAttributes() );

            //Clear fields
            this.$title.val('');
        }
    });

    return AppView;
});
