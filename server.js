require('dotenv').load();
const express = require('express')
const app = express()
const server = require('http').Server(app)
const port = process.env.PORT

const io = require('socket.io')(server)
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
 	extended: true
}));

app.get('/js/script.js', (req, res) => {
	if(process.env.ENABLE_DB == 'true') {
		res.sendFile(__dirname + '/public/js/script.js')
	}
	else {
		res.sendFile(__dirname + '/public/js/script_nodb.js')
	}
})

app.use(express.static('public'))
app.use('/api', require('./routes/api'))

app.get('/', (req, res) => {
	res.redirect('/page/index')
})
app.get('/page/:pageName', (req, res) => {
	res.sendFile(__dirname + '/public/examples/' + req.params.pageName + '.html')
})
app.get('/page/:pageName/admin', (req, res) => {
	res.sendFile(__dirname + '/public/examples/' + req.params.pageName + '.html')
})

io.on('connection', (socket) => {
	const page = socket.request.headers.referer.split('/')[4]
	socket.join(page)
	console.log("Socket CONNECTED from page `" + page + "`" + '\n')

	socket.on('event', (page) => {
		io.to(page).emit('admin')
	}) 

	socket.on('disconnect', () => {
		socket.disconnect()
		console.log("Socket DISCONNECTED from page `" + page + "`" + '\n')
	})
})

server.listen(port, () => {
	console.log(`Server listening on localhost:${port}`)
})

