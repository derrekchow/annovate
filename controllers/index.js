const express = require('express')
const router = express.Router()
const Annotation = require('../models/annotation')

var annotation = { quote:'ansistors are made from very pure silicon or germanium, but certain other semiconductor materials can also be used. A transistor may have only one kind of charge carrier, in a field effect transistor, or may have two kinds of charge carriers in bipolar junction transistor devices.',ranges:[ { start: '', startOffset: 1360, end: '', endOffset: 1642 } ],text: 'asdfasdf',tags: [] }
var annotations = {"total": 1,"rows": [annotation]}

router.post('/api/annotations', (req, res) => {
	console.log("POST REQUEST: " + req.url)
	res.type("json")
	/*
	try {
		Annotation.save(req.body, (result) => {
			console.log("Annotation added to db: " + result)
			res.json(result)
		})
	}
	catch(err) {
		console.error(err)
	}
	*/
	res.json(req.body)
})

router.get('/api/search', (req, res) => {
	console.log("GET REQUEST: " + req.url)
	res.type("json")
	/*
	try {
	Annotation.getAll((result) => {
		console.log(result)
		res.json(result)
	})
	}
	catch(err) {
		console.error(err)
	}
	*/
	res.json(annotations)
})

module.exports = router