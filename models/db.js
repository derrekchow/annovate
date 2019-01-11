const mysql = require('mysql')
const connection = mysql.createConnection({
	host: 'localhost',
	database: 'db',
	user: 'root',
	password: 'password'
});

connection.connect((err) => {
	if(err) throw Error(err)
	console.log("CONNECTED TO MYSQL DATABASE")
})

module.exports = connection