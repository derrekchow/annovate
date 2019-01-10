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
		res.send("GET")
	})
	.post((req, res) => {
		console.log("POST " + req.url)
		console.log(req.body)
		res.type("json")
		res.json({name: "Joe Smith"})
	})

app.use(express.static(__dirname + '/public'))

app.listen(port, () => console.log(`Example app listening on port ${port}`))