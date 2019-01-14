const express = require('express')
const router = express.Router()
const Annotation = require('../models/annotation')

router.get('/search/', (req, res) => {
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

router.post('/annotations/', (req, res) => {
	console.log("POST REQUEST: " + req.url)
	res.type("json")
	try {
		Annotation.save(req.body, "", (result) => {
			res.json(result)
		})
	}
	catch(err) {
		console.error(err)
	}
})

router.put('/annotations/:aid', (req, res) => {
	try {
		Annotation.save(req.body, "update", (result) => {
			res.json(result)
		})
	}
	catch(err) {
		console.error(err)
	}
	res.status(204)
})

router.delete('/annotations/:aid', (req, res) => {
	try {
		console.log(req.params.aid)
		Annotation.delete(req.params.aid, () => {
			res.status(204)
		})
	}
	catch(err) {
		console.error(err)
	}
	res.status(204)
})

module.exports = router