/**
 * Vendor.js
 * @NApiVersion 2.x
 */

define([
	'./ModelDefinitions',
	'./Create/Init',
	'./Read/Init',
	'./Update/Init',
	'./Delete/Init'
],

function( def, create, read, update, del ) {

	return {
		create:  create,
		read:    read,
		update:  update,
		del:     del
	};
	
});