const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const Annotation = require('./models/annotation')

const bodyParser = require('body-parser')
const port = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
 	extended: true
}));

app.use(express.static('public'))

app.get('/', (req, res) => {
	res.redirect('/page/index')
})

app.get('/page/:pageName', (req, res, next) => {
	res.sendFile(__dirname + '/public/examples/' + req.params.pageName + '.html')
})

app.get('/page/:pageName/admin', (req, res) => {
	res.sendFile(__dirname + '/public/examples/index.html')
})

app.get('/api/search/', (req, res) => {
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

io.on('connection', (socket) => {
	console.log("Socket connected")
	socket.on('disconnect', () => {
		socket.disconnect()
		console.log("Socket disconnected")
	})

	app.post('/api/annotations/', (req, res) => {
		console.log("POST REQUEST: " + req.url)
		res.type("json")
		try {
			Annotation.save(req.body, "", (result) => {
				socket.send(result)
				res.json(result)
			})
		}
		catch(err) {
			console.error(err)
		}
	})

	app.put('/api/annotations/:aid', (req, res) => {
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

	app.delete('/api/annotations/:aid', (req, res) => {
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
})

server.listen(port, () => {
	console.log(`Server listening on port ${port}`)
})