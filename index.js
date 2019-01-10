const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000

var annotation = { quote:'ansistors are made from very pure silicon or germanium, but certain other semiconductor materials can also be used. A transistor may have only one kind of charge carrier, in a field effect transistor, or may have two kinds of charge carriers in bipolar junction transistor devices.',ranges:[ { start: '', startOffset: 1360, end: '', endOffset: 1642 } ],text: 'asdfasdf',tags: [] }
var annotations = {"total": 1,"rows": [annotation]}

app.use(bodyParser.urlencoded({
 	extended: true
}));
app.use(bodyParser.json())

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html')
})

app.post('/api/annotations', (req, res) => {
	console.log("POST REQUEST: " + req.url)
	console.log(req.body)
	res.type("json")
	res.json(req.body)
})

app.get('/api/search', (req, res) => {
	console.log("GET SEARCH")
	res.type("json")
	res.json(annotations)
})

app.use(express.static(__dirname + '/public'))

app.listen(port, () => console.log(`Example app listening on port ${port}`))