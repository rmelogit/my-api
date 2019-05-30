var mysql  = require('mysql');

function createDBConnection(){
		return mysql.createConnection({
			host: 'localhost',
			user: 'raquel',
			password: 'raquel123',
			database: 'enterprise'
		});
}

module.exports = function() {
	return createDBConnection;
};
