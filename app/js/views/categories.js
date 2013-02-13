define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/category.html',
	'common'
], function( $, _, Backbone, categoryListTemplate, Common ) {

	var CategoryListView = Backbone.View.extend({

		tagName:  'li',

		template: _.template( categoryListTemplate ),

		// The DOM events specific to an item.
		events: {

		},

		// The CategoryListView listens for changes to its model, re-rendering. Since there's
		// a one-to-one correspondence between a **Record** and a **CategoryListView** in this
		// app, we set a direct reference on the model for convenience.
		initialize: function() {
			this.model.on( 'change', this.render, this );
			this.model.on( 'destroy', this.remove, this );
			this.model.on( 'visible', this.toggleVisible, this );
		},

		// Re-render the titles of the todo item.
		render: function() {
			this.$el.html( this.template( this.model.toJSON() ) );
			/*this.$el.toggleClass( 'completed', this.model.get('completed') );*/

			/*this.toggleVisible();*/
			/*this.input = this.$('.edit');*/
			return this;
		},

		// Switch this view into `"editing"` mode, displaying the input field.
		edit: function() {
			this.$el.addClass('editing');
			this.input.focus();
		},

		// Close the `"editing"` mode, saving changes to the todo.
		close: function() {
			var value = this.input.val().trim();

			if ( value ){
				this.model.save({ title: value });
			} else {
				this.clear();
			}

			this.$el.removeClass('editing');
		},

		// If you hit `enter`, we're through editing the item.
		updateOnEnter: function( e ) {
			if ( e.keyCode === Common.ENTER_KEY ) {
				this.close();
			}
		},

		// Remove the item, destroy the model from *localStorage* and delete its view.
		clear: function() {
			this.model.destroy();
		}
	});

	return CategoryListView;
});
