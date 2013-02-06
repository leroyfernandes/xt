define([
	'jquery',
	'backbone',
	'collections/records',
	'common'
], function( $, Backbone, Records, Common ) {

	var Workspace = Backbone.Router.extend({
		routes:{
			'*filter': 'setFilter'
		},

		setFilter: function( param ) {
			// Set the current filter to be used
			Common.TodoFilter = param.trim() || '';

			//Trigger a collection filter event, causing hiding/unhiding
			// of the Todo view items
			Records.trigger('filter');
		}
	});

	return Workspace;
});
