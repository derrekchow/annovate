const db = require('./db')

// helper function to return an annotation in the proper format for request response
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
	// creates a new annotation
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

	// if request is a PUT
	if(action == "update") {
		// updates an annotation's tag
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
	// by default, the page is `index`
	if(page == undefined) page = "index"

	// select all annotations that belong to the page
	var sql = "SELECT page, uid, aid, tag, startOffset, endOffset, start, end, quote FROM annotations WHERE page=?"
	var values = [page]

	// if request is made by a user, only get annotations associated with that user for the page
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
				// create an array of annotations to return in the request response
				data.push(createAnnotation(item))
			}
			// request response content
			var result = { "total": rows.length, "rows": data }
			
			// if request is made by a page admin
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
	// deletes an annotation given it's aid
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





