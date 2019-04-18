//EXAMPLE file for creating a db model for sql interfacing
const mysql = require('mysql');
const database_name = '';
let conn;
let options = {};
let db = {};

options.host = process.env.DB_HOST || 'Some Host';
options.user = process.env.DB_USERNAME || 'Some User';
options.password = process.env.DB_PASSWORD || 'Some PW';
options.port = process.env.DB_PORT || 'Some Port';
options.database = database_name || 'Some DB Name';
console.log('Connecting to remote database');

conn = mysql.createConnection(options);

conn.connect(err => {
	if (err) {
		console.error(`error connecting: ${err.stack}`);
		return;
	}

	console.log(`connected as id ${conn.threadId}`);
});

db.executeQuery = (query, queryParams) => {
	return new Promise((resolve, reject) => {
		conn.query(query, queryParams, (err, results) => {
			if (err) console.log (err);
			resolve(results);
		});
	}).catch(e => console.log(e));
}

module.exports = db;