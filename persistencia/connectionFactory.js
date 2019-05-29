var mysql  = require('mysql');

function createDBConnection(){
		return mysql.createConnection({
			host: '0.0.0.0',
			user: 'root',
			password: '12345',
			database: 'raquel'
		});
}

module.exports = function() {
	return createDBConnection;
};
