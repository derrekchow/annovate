const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000

app.use(bodyParser.urlencoded({
 	extended: true
}));
app.use(bodyParser.json())

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html')
})

app.route('/api/annotations')
	.get((req, res) => {
		console.log("GET request")
	})
	.post((req, res) => {
		console.log("POST " + req.url)
		console.log(req.body)
		res.type("json")
		res.json({name: "Joe Smith"})
	})

app.route('/api/search')
	.get((req, res) => {
		res.setHeader('Content-Type', 'application/json')
		res.send(JSON.stringify({
			"total": 1,
			"rows": [
				{ 
					quote: 'Compared with the vacuum tube',
					ranges: [ 
						{ start: '', startOffset: 1642, end: '', endOffset: 1671 } 
					],
					text: 'This is SO confusing',
					tags: [] 
				}
			]
		}))
	})

app.use(express.static(__dirname + '/public'))

app.listen(port, () => console.log(`Example app listening on port ${port}`))