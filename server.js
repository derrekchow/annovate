require('dotenv').load();
const express = require('express')
const app = express()
// HTTP server
const server = require('http').Server(app)
const port = process.env.PORT

// Socket.IO
const io = require('socket.io')(server)
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
 	extended: true
}));

// serve different files depending on if db is enabled
app.get('/js/script.js', (req, res) => {
	if(process.env.ENABLE_DB == 'true') {
		res.sendFile(__dirname + '/public/js/script.js')
	}
	else {
		res.sendFile(__dirname + '/public/js/script_nodb.js')
	}
})

// serve static files from the /annovate/public folder
app.use(express.static('public'))

// establish routes to api to be called during annotation events
app.use('/api', require('./routes/api'))

// send pages based on window url
app.get('/', (req, res) => {
	res.redirect('/page/index')
})
app.get('/page/:pageName', (req, res) => {
	res.sendFile(__dirname + '/public/examples/' + req.params.pageName + '.html')
})
app.get('/page/:pageName/admin', (req, res) => {
	res.sendFile(__dirname + '/public/examples/' + req.params.pageName + '.html')
})

// create WebSocket connection between server and client
io.on('connection', (socket) => {
	const page = socket.request.headers.referer.split('/')[4]
	socket.join(page)
	console.log("Socket CONNECTED from page `" + page + "`" + '\n')

	// when a change has been made on a page by a user
	socket.on('event', (page) => {
		// notify any admin pages
		io.to(page).emit('admin')
	}) 

	socket.on('disconnect', () => {
		socket.disconnect()
		console.log("Socket DISCONNECTED from page `" + page + "`" + '\n')
	})
})

// start HTTP server at localhost
server.listen(port, () => {
	console.log(`Server listening on localhost:${port}`)
})

