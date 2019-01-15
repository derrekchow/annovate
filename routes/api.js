const express = require('express')
const router = express.Router()
const Annotation = require('../resources/annotation')

router.get('/search/', (req, res) => {
	console.log("GET REQUEST: " + req.url)
	try {
		Annotation.get(req.query.uid, req.query.page, (result) => {
			res.type("json")
			res.json(result)
		})
	}
	catch(err) {
		console.error(err)
	}
})

router.post('/annotations/', (req, res) => {
	console.log("POST REQUEST: " + req.url)
	try {
		Annotation.save(req.body, "", (result) => {
			res.type("json")
			res.json(result)
		})
	}
	catch(err) {
		console.error(err)
	}
})

router.put('/annotations/:aid', (req, res) => {
	console.log("PUT REQUEST: " + req.url)
	try {
		Annotation.save(req.body, "update", (result) => {
			res.json(result)
		})
	}
	catch(err) {
		console.error(err)
	}
})

router.delete('/annotations/:aid', (req, res) => {
	console.log("DELETE REQUEST: " + req.url)
	try {
		Annotation.delete(req.params.aid, () => {
			res.status(204)
			res.send()
		})
	}
	catch(err) {
		console.error(err)
	}
})

module.exports = router