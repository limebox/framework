/**
 * Vendor.js
 * @NApiVersion 2.x
 */

var read = [
	'./ClientLogins',
	'./Customers',
	'./Projects'
];

define( read,

function() {

	var returnObject = {};

	for( var i = 0; i < arguments.length; i++ ) {

		var modelNameStart = read[i].lastIndexOf('/') + 1,
			modelNameEnd = read[i].length,
			modelName = read[i].substring( modelNameStart, modelNameEnd );

		modelName = modelName.charAt(0).toLowerCase() + modelName.substr( 1 );

		returnObject[ modelName ] = arguments[i];

	}

	return returnObject;

});