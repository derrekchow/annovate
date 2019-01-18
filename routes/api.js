const express = require('express')
const router = express.Router()
const Annotation = require('../resources/annotation')

/*
	method:   GET
	route:    /api/search?uid=<uid> OR /api/search
	response: array of annotation objects
	example:
	{
	   "total":2,
	   "rows":[
	      {
	         "uid":"e545f1c107b6",
	         "id":"e545f1c107b6-4",
	         "quote":"Prize in Physics for their achievement.",
	         "ranges":[
	            {
	               "start":"",
	               "startOffset":1309,
	               "end":"",
	               "endOffset":1639
	            }
	         ],
	         "tags":[
	            "Interesting"
	         ],
	         "text":""
	      },
	      {
	         "uid":"e545f1c107b6",
	         "id":"e545f1c107b6-8",
	         "quote":"als. Because the controlled (output) power can be higher than the controlling",
	         "ranges":[
	            {
	               "start":"",
	               "startOffset":349,
	               "end":"",
	               "endOffset":426
	            }
	         ],
	         "tags":[
	            "Unclear"
	         ],
	         "text":""
	      }
	   ]
	}
*/
router.get('/search/:uid?', (req, res) => {
	console.log("GET REQUEST: " + req.url)
	Annotation.get(req.params.uid, req.query.page, (result) => {
		res.type("json")
		res.json(result)
	}, (err) => {
		res.status(400)
		res.send(err)
	})
})

/*
	method:   POST
	route:    /api/annotations/
	request:  annotation object
	response: annotation object
	example:
	{
	 "uid":"e545f1c107b6",
	 "id":"e545f1c107b6-8",
	 "quote":"als. Because the controlled (output) power can be higher than the controlling",
	 "ranges":[
	    {
	       "start":"",
	       "startOffset":349,
	       "end":"",
	       "endOffset":426
	    }
	 ],
	 "tags":[
	    "Unclear"
	 ],
	 "text":""
	}
*/
router.post('/annotations', (req, res) => {
	console.log("POST REQUEST: " + req.url)
	Annotation.save(req.body, "", (result) => {
		res.type("json")
		res.json(result)
	}, (err) => {
		res.status(400)
		res.send(err)
	})
})

/*
	method:   PUT
	route:    /api/annotations?aid=<aid>
	request:  annotation object
	response: annotation object (updated)
	example:
	{
	 "uid":"e545f1c107b6",
	 "id":"e545f1c107b6-8",
	 "quote":"als. Because the controlled (output) power can be higher than the controlling",
	 "ranges":[
	    {
	       "start":"",
	       "startOffset":349,
	       "end":"",
	       "endOffset":426
	    }
	 ],
	 "tags":[
	    "Unclear"
	 ],
	 "text":""
	}
*/
router.put('/annotations/:aid', (req, res) => {
	console.log("PUT REQUEST: " + req.url)
	Annotation.save(req.body, "update", (result) => {
		res.json(result)
	}, (err) => {
		res.status(400)
		res.send()
	})
})


/*
	method:   POST
	route:    /api/annotations?aid=<aid>
*/
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