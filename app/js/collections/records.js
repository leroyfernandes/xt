define(['underscore',	'backbone',	'lib/backbone/localstorage', 'models/record'], function( _, Backbone, Store, Record ) {

	var RecordsCollection = Backbone.Collection.extend({
		// Reference to this collection's model.
		model: Record,

		// Save all of the todo items under the `"todos"` namespace.
		localStorage: new Store('xt-records'),

		// Filter down the list of all todo items that are finished.
		completed: function() {
			return this.filter(function( todo ) {
				return todo.get('completed');
			});
		},

		// Filter down the list to only todo items that are still not finished.
		remaining: function() {
			return this.without.apply( this, this.completed() );
		},

		// We keep the Todos in sequential order, despite being saved by unordered
		// GUID in the database. This generates the next order number for new items.
		nextOrder: function() {
			if ( !this.length ) {
				return 1;
			}
			console.log('Order: '+ this.last().get('order') + 1);
			return this.last().get('order') + 1;
		},

		// Todos are sorted by their original insertion order.
		comparator: function( todo ) {
			return todo.get('order');
		}
	});

	return new RecordsCollection();
});
