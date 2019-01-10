//const db = require('./db')

exports.save = (req, cb) => {
	var sql = "INSERT INTO annotations (pageName, reaction, content) values (" + JSON.stringify(req.pageName) + ", " + JSON.stringify(req.reaction) + ", " + JSON.stringify(req) + ")"
	db.query(sql, (err, rows) => {
		if(err) throw Error()
		cb(req)
	})
}

exports.getAll = (cb) => {
	db.query('SELECT * FROM annotations', (err, rows) => {
		if(err) throw Error()
		var result = { "total": rows.length, "rows": rows }
		cb(result) // TODO: contstruct the correct array with annotation objects by fetching from db
	})
}