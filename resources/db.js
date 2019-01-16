/*
Connect Annovate to a MySQL database

1. Create a MySQL database with name `db`
2. Create a table `annotations` with the following command:
```
CREATE TABLE annotations (
	id INT AUTO_INCREMENT PRIMARY KEY,
	page VARCHAR(30),
	uid VARCHAR(15),
	aid VARCHAR(20),
	tag VARCHAR(30),
	startOffset INT,
	endOffset INT,
	start VARCHAR(200),
	end VARCHAR(200),
	quote TEXT
);
```
3. Modify the database connection configs below accordingly
*/

if(process.env.ENABLE_DB == 'true') {
	const mysql = require('mysql')

	// modify these configs accordingly
	const connection = mysql.createConnection({
		host: 'localhost',
		database: 'db',
		user: 'root',
		password: 'password'
	});

	connection.connect((err) => {
		if(err) throw Error(err)
		console.log("CONNECTED TO MYSQL DATABASE" + '\n')
	})

	module.exports = connection
}
else {
	module.exports = {}
}
