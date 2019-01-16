const db = require('./db')

function createAnnotation(item) {
	var ann = {}
	ann.uid = item.uid
	ann.id = item.aid
	ann.quote = item.quote
	ann.ranges = [{ start: item.start, startOffset: item.startOffset, end: item.end, endOffset: item.endOffset }]
	ann.tags = [ item.tag ]
	ann.text = ''

	return ann
}

exports.save = (ann, action, cb, err_cb) => {
	var sql = "INSERT INTO annotations (page, uid, aid, tag, startOffset, endOffset, start, end, quote) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
	var values = [
		ann.page,
		ann.uid,
		ann.id,
		ann.tags[0],
		ann.ranges[0].startOffset,
		ann.ranges[0].endOffset,
		ann.ranges[0].start,
		ann.ranges[0].end,
		ann.quote
	]
	if(action == "update") {
		sql = "UPDATE annotations SET tag=? WHERE aid=?"
		values = [
			ann.tags[0],
			ann.id
		]
	}

	db.query(sql, values, (err) => {
		if(err) {
			err_cb({ "error": err.code, "error_message": err.sqlMessage })
		} 
		else {
			console.log(ann)
			console.log("Added annotation with tag '" + ann.tags[0] + "' from page '" + ann.page + "' for user", ann.uid + '\n')
			cb(ann)
		}
	})
}

exports.get = (uid, page, cb, err_cb) => {
	if(page == undefined) page = "index"

	var sql = "SELECT * FROM annotations WHERE page=?"
	var values = [page]
	if(uid != undefined) {
		sql += "AND uid=?"
		values.push(uid)
	}

	db.query(sql, values, (err, rows) => {
		if(err) {
			err_cb({ "error": err.code, "error_message": err.sqlMessage })
		}
		else {
			var data = []
			for (var item of rows) {
				data.push(createAnnotation(item))
			}
			var result = { "total": rows.length, "rows": data }
			
			if(uid == undefined) {
				console.log("Retrieved " + data.length + " annotations from page '" + page + "' for ADMIN" + '\n')
			}
			else {
				console.log("Retrieved " + data.length + " annotations from page '" + page + "' for USER " + uid + '\n')
			}
			cb(result)
		}
	})
}

exports.delete = (aid, cb, err_cb) => {
	db.query('DELETE FROM annotations WHERE aid=?', [aid], (err) => {
		if(err) {
			err_cb({ "error": err.code, "error_message": err.sqlMessage })
		}
		else {
			console.log("Deleted annotation " + aid + '\n')
			cb()
		}
	})
}





