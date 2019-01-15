const express = require('express')
const app = express()

const selfSigned = require('openssl-self-signed-certificate')

var options = {
    key: selfSigned.key,
    cert: selfSigned.cert
};
const server = require('https').Server(options, app)
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
	res.sendFile(__dirname + '/public/examples/' + req.params.pageName + '.html')
})

io.on('connection', (socket) => {
	const room = socket.request.headers.referer.split('/')[4]
	socket.join(room)
	console.log("Socket connected to page `" + room + "`")
	socket.on('event', (page) => {
		console.log("Emit to page `" + page + "`")
		io.to(page).emit('admin')
	}) 
	socket.on('disconnect', () => {
		socket.disconnect()
		console.log("Socket disconnected from page `" + room + "`")
	})
})

server.listen(port, () => {
	console.log(`Server listening on port ${port}`)
})

