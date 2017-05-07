var fields = {},
	search = {},
	record = {};

require(['N/search','N/record'],

function(nsSearch, nsRecord){
	search = nsSearch;
	record = nsRecord;
	
	/*
	 * Customer Record
	 */
	fields.CUSTOMER = {
			id: 'internalid',
			companyname: 'companyname'
	};

	/*
	 * Job Record
	 */
	fields.JOB = {
			id: 'internalid'
	};

	/*
	 * ClientLogin Record
	 */
	search.Type.CLIENT_LOGIN = 'customrecord_client_logins';
	fields.CLIENT_LOGIN = {
			id: 'internalid',
			login_email: 'custrecord_login_email'
	};



	fields.join = function( record, fieldMap ) {
		return record + '.' + fieldMap;
	}

});