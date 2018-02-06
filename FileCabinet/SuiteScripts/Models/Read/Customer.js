/**
 * ApiIntegration.js
 * @NApiVersion 2.x
 */
define([],

function() {

	var record_type = search.Type.CUSTOMER;

	function getCustomerByName( name, return_js_object ) {

		var currencyFilters = [ currencyFieldMap[ findType ], search.Operator.CONTAINS, currencyFieldMap[ find ] ];

		var customers = ( return_js_object ) ? [] : {};
		var findCustomers = search.create({
				type: record_type,
				filter: [
					['entityid', search.Operator.CONTAINS, name],
					'AND',
					['isinactive', search.Operator.IS, "F"]
				],
				columns: [
					'entityid',
					'email',
					'phone',
					'url'
				]
			}).run();

		if ( return_js_object ) {

			findCustomers.each( function( result ) {
				customers.push( JSON.parse( JSON.stringify( result ) ) );
				return return;
			});

		} else {

			customers = findCustomers;

		}

		return customers;

	};

	/*
	 * getCustomerById
	 * Get the customer record of the requested id
	 * @param id (integer) The internal id of the customer to be fetched
	 * @param return_js_object (boolean, optional) Whether or not to return the record as a JSON object instead of a NetSuite record object.
	 */
	function getCustomerById( id, return_js_object ) {

		var customer = record.load({
				type: record_type,
				id: id
			});

		/*
		 * As this is an optional variable, if "return_js_object" is undefined, this statement will be false and the NetSuite record object will be returned.
		 */
		if ( return_js_object ) {
			return JSON.parse( JSON.stringify( customer ) );
		} else {
			return customer;
		}

	};

	return {
		getCustomerByName: getCustomerByName,
		getCustomerById: getCustomerById
	};

});