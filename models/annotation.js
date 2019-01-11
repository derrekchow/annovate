// const db = require('./db')

function createAnnotation(item) {
	var ann = {}
	ann.uid = item.uid
	ann.id = item.aid
	ann.quote = item.quote
	ann.ranges = [{ start: '', startOffset: item.startOffset, end: '', endOffset: item.endOffset }]
	ann.tags = [ item.tag ]
	ann.text = ''
	return ann
}

exports.save = (ann, cb) => {
	var sql = "INSERT INTO annotations (page, uid, aid, tag, startOffset, endOffset, quote) VALUES (?, ?, ?, ?, ?, ?, ?)";
	var values = [
		"se212",
		ann.uid,
		ann.id,
		ann.tags[0],
		ann.ranges[0].startOffset,
		ann.ranges[0].endOffset,
		ann.quote
	]
	db.query(sql, values, (err) => {
		if(err) throw Error(err)
		console.log("Added annotation with tag '", ann.tags[0], "' for user", ann.uid)
		cb(ann)
	})
}

exports.get = (uid, page, cb) => {
	if(page == undefined) {
		page = "se212"
	}
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
		console.log("Retrieved", data.length, "annotations for user", uid)
		cb(result) // TODO: contstruct the correct array with annotation objects by fetching from db
	})
}