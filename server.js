const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const bodyParser = require('body-parser')
const port = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
 	extended: true
}));

app.use(express.static('public'))
app.use('/api', require('./routes/api'))

app.get('/', (req, res) => {
	res.redirect('/page/index')
})

app.get('/page/:pageName', (req, res, next) => {
	res.sendFile(__dirname + '/public/examples/' + req.params.pageName + '.html')
})

app.get('/page/:pageName/admin', (req, res) => {
	res.sendFile(__dirname + '/public/examples/index.html')
})

io.on('connection', (socket) => {
	const room = socket.request.headers.referer.split('/')[4]
	socket.join(room)
	console.log("Socket connected to room `" + room + "`")
	socket.on('event', (page) => {
		console.log("Emit to page `" + page + "`")
		io.to(page).emit('admin')
	}) 
	socket.on('disconnect', () => {
		socket.disconnect()
		console.log("Socket disconnected from room `" + room + "`")
	})
})

server.listen(port, () => {
	console.log(`Server listening on port ${port}`)
})