/*
Connect Annovate to a MySQL database

1. Create a MySQL database with name `db`
2. Create a table `annotations` with the following command:
```
CREATE TABLE annotations (
	id SERIAL PRIMARY KEY,
	page VARCHAR(200),
	uid VARCHAR(30),
	aid VARCHAR(30),
	tag VARCHAR(30),
	startOffset INTEGER,
	endOffset INTEGER,
	startPos VARCHAR(200),
	endPos VARCHAR(200),
	quote TEXT
);
```
3. Modify the database connection configs below accordingly
*/

module.exports = {}

// if db is enabled
if(process.env.ENABLE_DB == 'true') {
	// modify these configs accordingly
	const { Pool } = require('pg')
	const pool = new Pool({
		connectionString: process.env.DATABASE_URL
	})

	pool.connect((err) => {
		if(err) throw Error(err)
		console.log("CONNECTED TO POSTGRES DATABASE" + '\n')
	})

	module.exports = pool
}
