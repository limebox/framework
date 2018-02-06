/**
 * Init.js
 * @NApiVersion 2.x
 */

/*
 * models global object
 * When loading this library, make sure you set the local library variable to "model" (very important).
 * The default subfolder is the root of the SuiteScripts folder. If the models are stashed inside a deeper folder,
 *  dynamically set "models.subfolder" before loading the desired model (see restlet example).
 *  Make sure you include a trailing slash "/"
 */
var models = {
	create: {},
	read: {},
	update: {},
	del: {},
	load: function (){},
	subfolder: ''
};

define([
	'./Preload'
],

function() {

	function load( functions, model ) {

		var action_list = functions.split('');
		var model_files = [];
		var model_actions = [];
		var model_action = '';
		var model_file = '';
		var folders = {
			c: "/SuiteScripts/" + models.subfolder + "Models/Create/",
			r: "/SuiteScripts/" + models.subfolder + "Models/Read/",
			u: "/SuiteScripts/" + models.subfolder + "Models/Update/",
			d: "/SuiteScripts/" + models.subfolder + "Models/Delete/"
		};

		for( var i = 0; i < action_list.length; i++ ) {

			model_actions.push( action_list[ i ] );
			model_files[i] = folders[ action_list[ i ] ] + model;

		}

		// Why the !@#$ NetSuite requires me to stringify and parse the object before "require" accepts it is beyond me. Hopefully this can be removed in the future.
		model_files = JSON.parse( JSON.stringify( model_files ) );

		/*
		 * Dynamically load the model
		 */
		require( model_files,

		function() {

			for( var i = 0; i < arguments.length; i++ ) {

				var modelNameStart = model_files[i].lastIndexOf('/') + 1;
				var modelNameEnd = model_files[i].length;
				var modelName = model_files[i].substring( modelNameStart, modelNameEnd );

				modelName = modelName.charAt(0).toLowerCase() + modelName.substr( 1 );

				switch( model_actions[ i ] ) {
				case 'c':
					models.create[ modelName ] = arguments[i];
					break;
				case 'r':
					models.read[ modelName ] = arguments[i];
					break;
				case 'u':
					models.update[ modelName ] = arguments[i];
					break;
				case 'd':
					models.del[ modelName ] = arguments[i];
					break;
				}

			}

		});

	};

	models.load = load;

	return {
		load: load
	};
	
});