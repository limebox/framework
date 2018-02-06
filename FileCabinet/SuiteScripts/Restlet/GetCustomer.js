/**
 *@NApiVersion 2.x
 *@NScriptType Restlet
 */

define([ '../Models/Init' ],

function( model ) {

	function create( context ) {

		

	};

	function read( context ) {

		/*
		 * This is an example for if you store your models into a Subfolder.
		 * Before loading your models, define that subfolder here if not default.
		 */
		// models.subfolder = "Subfolder/";

		/*
		 * Not to load the desired models.
		 * The first parameter expects a string with the required crud functions to include.
		 *  For example, if you have a "Customer.js" file in the create and read folders, you would supply "cr"
		 * The second parameter is the name of the Module. Naming convensions are as follows:
		 *  The name of the file is Pascal case (e.g. MyCustomRecord.js or Customer.js)
		 *  The parameter in the load function is the name of the file without the extension (e.g. "MyCustomRecord" or Customer")
		 *  To call the module, the file gets renamed to Camel Case (e.g. myCustomRecord or customer) and is prefixed by the model type (e.g. create, read, update, del)
		 *    (note: del is used because "delete" is a JavaScript reserved word. It is also highly recommended to never delete a record, rather, use the delete model to mark it inactive)
		 */
		models.load('r', 'Customer');

		if ( context.name ) {

			return models.read.customer.getCustomerByName( context.name, true );

		} else if( context.id ) {

			return models.read.customer.getCustomerById( context.id, true );

		}

	};

	function update( context ) {



	};

	function del( context ) {



	};

	return {
		post : create,
		get : read,
		put : update,
		delete : del
	};

});