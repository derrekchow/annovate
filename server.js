const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('engine.io')(server)

const bodyParser = require('body-parser')
const port = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
 	extended: true
}));

app.use(express.static('public'))
require('./controllers')(app)

app.get('/', (req, res) => {
	res.redirect('/page/index')
})

app.get('/page/:pageName', (req, res, next) => {
	res.sendFile(__dirname + '/public/examples/' + req.params.pageName + '.html')
})

app.get('/page/:pageName/admin', (req, res) => {
	res.sendFile(__dirname + '/public/examples/index.html')
	io.on('connection', (socket) => {
		delete require.cache['./controllers']
		require('./controllers')(app, io)
		console.log("Socket connected")
	})

})

server.listen(port, () => {
	console.log(`Server listening on port ${port}`)
})