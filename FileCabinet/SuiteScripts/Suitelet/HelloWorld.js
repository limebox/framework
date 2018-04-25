/**
 *@NApiVersion 2.x
 *@NScriptType Suitelet
 */

define([  ],

function(  ) {

	function onRequest(context) {

		context.response.write("Hello World");

	};

	return {
		onRequest : onRequest
	};

});