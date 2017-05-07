/**
 * Vendor.js
 * @NApiVersion 2.x
 */

var create = [
];

define( create,

function() {

	var returnObject = {};

	for( var i = 0; i < arguments.length; i++ ) {

		var modelNameStart = create[i].lastIndexOf('/') + 1,
			modelNameEnd = create[i].length,
			modelName = create[i].substring( modelNameStart, modelNameEnd );

		modelName = modelName.charAt(0).toLowerCase() + modelName.substr( 1 );

		returnObject[ modelName ] = arguments[i];

	}

	return returnObject;

});