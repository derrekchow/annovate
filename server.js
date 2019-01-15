const express = require('express')
const app = express()

const selfSigned = require('openssl-self-signed-certificate')
const options = { key: selfSigned.key, cert: selfSigned.cert }
const server = require('http').Server(app)

const io = require('socket.io')(server)
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
 	extended: true
}));

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

server.listen(3000, () => {
	console.log(`Server listening on port ${3000}`)
})

