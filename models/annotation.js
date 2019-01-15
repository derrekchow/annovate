// const db = require('./db')

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

exports.save = (ann, action, cb) => {
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
	console.log(ann)
	db.query(sql, values, (err) => {
		if(err) throw Error(err)
		console.log("Added annotation with tag '" + ann.tags[0] + "' from page '" + ann.page + "' for user", ann.uid)
		cb(ann)
	})
}

exports.get = (uid, page, cb) => {
	if(page == undefined) page = "index"

	var sql = "SELECT * FROM annotations WHERE page='" + page + "'"
	if(uid != undefined) {
		sql += "AND uid='" + uid + "'"
	}
	db.query(sql, (err, rows) => {
		if(err) throw Error(err)
		var data = []
		for (var item of rows) {
			data.push(createAnnotation(item))
		}
		var result = { "total": rows.length, "rows": data }
		if(uid == undefined) {
			console.log("Retrieved", data.length, "annotations from page '" + page + "' for admin")
		}
		else {
			console.log("Retrieved", data.length, "annotations from page '" + page + "' for user", uid)
		}
		cb(result) // TODO: contstruct the correct array with annotation objects by fetching from db
	})
}

exports.delete = (aid, cb) => {
	db.query('DELETE FROM annotations WHERE aid="' + aid + '"', (err) => {
		if(err) throw Error(err)
		console.log("Deleted annotation " + aid)
		cb()
	})
}





