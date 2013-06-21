App.Collections.SchedulesList = Backbone.Collection.extend({

	model: App.Models.ScheduleModel, 	

	initialize: function(){

		console.info('Schedules list started ...');

		this.on('add', function(model){
			console.info('Model ' +model.cid+ ' added ...');			
		});

		this.on('remove', function(model){
			console.info('Model ' +model.cid+ ' removed ...');
			window.views.allactivities.render();
		});
	},
});