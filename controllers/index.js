const express = require('express')
const router = express.Router()
const Annotation = require('../models/annotation')

var annotation1 = { quote:'ansistors are made from very pure silicon or germanium, but certain other semiconductor materials can also be used. A transistor may have only one kind of charge carrier, in a field effect transistor, or may have two kinds of charge carriers in bipolar junction transistor devices.',ranges:[ { start: '', startOffset: 1360, end: '', endOffset: 1642 } ],text: 'asdfasdf',tags: ['Unclear'] }
var annotation2 = { quote: 'ction to an external cir',
ranges: [ { start: '', startOffset: 197, end: '', endOffset: 221 } ],
text: '', tags: ['Clear']  }
var annotations = {"total": 2,"rows": [annotation1, annotation2]}

router.post('/api/annotations/', (req, res) => {
	console.log("POST REQUEST: " + req.url)
	res.type("json")
	try {
		Annotation.save(req.body, (result) => {
			res.json(result)
		})
	}
	catch(err) {
		console.error(err)
	}
})

router.get('/api/search/', (req, res) => {
	console.log("GET REQUEST: " + req.url)
	res.type("json")
	try {
		Annotation.get(req.query.uid, req.query.page, (result) => {
			res.json(result)
		})
	}
	catch(err) {
		console.error(err)
	}
})

router.put('/api/annotations/', (req, res) => {
	try {
		Annotation.update(req.body, req.query.aid, (result) => {
			res.json(result)
		})
	}
	catch(err) {
		console.error(err)
	}
	res.status(204)
})

module.exports = router