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
		res.status(400)
	}
})

router.post('/annotations/', (req, res) => {
	console.log("POST REQUEST: " + req.url)
	Annotation.save(req.body, "", (result) => {
		res.type("json")
		res.json(result)
	}, (err) => {
		res.status(400)
		res.send(err)
	})
})

router.put('/annotations/:aid', (req, res) => {
	console.log("PUT REQUEST: " + req.url)
	Annotation.save(req.body, "update", (result) => {
		res.json(result)
	}, (err) => {
		res.status(400)
		res.send()
	})
})

router.delete('/annotations/:aid', (req, res) => {
	console.log("DELETE REQUEST: " + req.url)
	Annotation.delete(req.params.aid, () => {
		res.status(204)
		res.send()
	}, (err) => {
		res.status(400)
		res.send()
	})
})

module.exports = router