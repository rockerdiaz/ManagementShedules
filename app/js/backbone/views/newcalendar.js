App.Views.NewCalendarView = Backbone.View.extend({

	tagName: '',
	className: '',
	id: '',

	//template: _.template( $("#tpl_calendar").html() ),
	template: swig.compile( $("#tpl_newcalendar").html() ),	

	events: {
		'click #btn_del': 'delDates',
		'click #btn_add': 'saveCalendar',
		'focus .txt_dates': 'bindDatePicker',
	},

	initialize: function(config){

		console.info('New new calendar view ...');
		this.el = config.el;
	},	

	render: function(){		

		this.$el.html(this.template());		
	},

	saveCalendar: function(){

		var model_calendar = new App.Models.CalendarModel();

		model_calendar.set(
			{
				initial_date: this.$el.find("#initial_date").val(),
				end_date: this.$el.find("#end_date").val(),
				state: this.$el.find("#state").val(),			
			}, 
			{
				validate: true
			}
		);

		if( model_calendar.isValid() ){
				
			window.collections.calendar_list.add(model_calendar);			
			this.delDates();

			this.renderMsg('success', 'Calendario almacenado con exito :)', '');			
		}
		else{
			this.renderMsg('error', 'Ha ocurrido un error con las fechas a introducir. Por favor verifique :(', '');			
		}		
	},

	renderMsg: function(type_msg, msg, submsg){
			
		window.views.msgview = new App.Views.MsgView({
			type_msg: type_msg,
			msg: msg,
			submsg: submsg,
		});
		
		window.views.msgview.fadeOutMsg();

		delete window.views.msgview;
	},

	bindDatePicker: function(){
		this.$el.find("input.txt_dates").datepicker({
			dateFormat: 'yy-mm-dd',
			showAnim: 'clip',
			monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
			dayNamesMin: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'],
		});
	},

	delDates: function(){
		this.$el.find("input.txt_dates").val('');	
	}
});