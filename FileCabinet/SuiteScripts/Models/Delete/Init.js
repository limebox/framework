/**
 * Vendor.js
 * @NApiVersion 2.x
 */

var del = [
];

define( del,

function() {

	var returnObject = {};

	for( var i = 0; i < arguments.length; i++ ) {

		var modelNameStart = del[i].lastIndexOf('/') + 1,
			modelNameEnd = del[i].length,
			modelName = del[i].substring( modelNameStart, modelNameEnd );

		modelName = modelName.charAt(0).toLowerCase() + modelName.substr( 1 );

		returnObject[ modelName ] = arguments[i];

	}

	return returnObject;

});